import { createClient } from '@supabase/supabase-js';
import { sanitizeText, isContentAppropriate, RateLimiter, QueryCache } from './security';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-public-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

// =========================================================================
// DATA INTERFACES
// =========================================================================
export interface FanWish {
  id: string;
  name: string;
  message: string;
  city?: string;
  emoji?: string;
  likes: number;
  created_at: string;
}

export interface SacredOffering {
  id: string;
  name: string;
  type: 'diya' | 'lotus';
  blessing: string;
  x: number;
  y: number;
  speed_x?: number;
  speed_y?: number;
  rotation?: number;
  size?: number;
  created_at?: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  rank: string;
  avatar: string;
  city?: string;
  created_at: string;
}

export const INITIAL_MOCK_WISHES: FanWish[] = [];
export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [];

// =========================================================================
// 1. FAN WISHES API (WITH SWR QUERY CACHE & SANITIZATION)
// =========================================================================

export async function getFanWishes(): Promise<FanWish[]> {
  const cached = QueryCache.get<FanWish[]>('fan_wishes', 10000);
  if (cached) return cached;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('fan_wishes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && data) {
        QueryCache.set('fan_wishes', data);
        return data;
      }
    } catch (_) {}
  }

  const local = localStorage.getItem('shree_fan_wishes');
  const result = local ? JSON.parse(local) : [];
  QueryCache.set('fan_wishes', result);
  return result;
}

export async function submitFanWish(wish: Omit<FanWish, 'id' | 'likes' | 'created_at'>): Promise<FanWish> {
  const cleanName = sanitizeText(wish.name, 40);
  const cleanMessage = sanitizeText(wish.message, 300);
  const cleanCity = wish.city ? sanitizeText(wish.city, 30) : '';

  if (!cleanName || !cleanMessage) {
    throw new Error('Name and message cannot be empty');
  }

  if (!isContentAppropriate(cleanName) || !isContentAppropriate(cleanMessage)) {
    throw new Error('Please keep wishes kind, respectful, and joyful! 🌸');
  }

  const { allowed, waitSeconds } = RateLimiter.canExecute('wish');
  if (!allowed) {
    throw new Error(`Please wait ${waitSeconds}s before submitting another wish!`);
  }

  RateLimiter.recordExecution('wish');

  const newWish: FanWish = {
    id: String(Date.now()),
    name: cleanName,
    message: cleanMessage,
    city: cleanCity,
    emoji: wish.emoji || '🌸',
    likes: 0,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('fan_wishes')
        .insert([{
          name: cleanName,
          message: cleanMessage,
          city: cleanCity,
          emoji: wish.emoji || '🌸',
          likes: 0
        }])
        .select()
        .single();

      if (!error && data) {
        QueryCache.invalidate('fan_wishes');
        return data;
      }
    } catch (_) {}
  }

  const existing = await getFanWishes();
  const updated = [newWish, ...existing];
  localStorage.setItem('shree_fan_wishes', JSON.stringify(updated));
  QueryCache.set('fan_wishes', updated);
  return newWish;
}

// =========================================================================
// 2. SACRED DIYA & LOTUS OFFERINGS API
// =========================================================================

export async function getSacredOfferings(): Promise<SacredOffering[]> {
  const cached = QueryCache.get<SacredOffering[]>('sacred_offerings', 10000);
  if (cached) return cached;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('sacred_offerings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!error && data && data.length > 0) {
        QueryCache.set('sacred_offerings', data);
        return data;
      }
    } catch (_) {}
  }

  const local = localStorage.getItem('shree_handdrawn_offerings');
  const result = local ? JSON.parse(local) : [];
  QueryCache.set('sacred_offerings', result);
  return result;
}

export async function submitSacredOffering(offering: Omit<SacredOffering, 'id' | 'created_at'>): Promise<SacredOffering> {
  const cleanName = sanitizeText(offering.name, 40);
  const cleanBlessing = sanitizeText(offering.blessing, 300);

  if (!cleanName || !cleanBlessing) {
    throw new Error('Name and blessing cannot be empty');
  }

  if (!isContentAppropriate(cleanName) || !isContentAppropriate(cleanBlessing)) {
    throw new Error('Please keep sacred offerings pure and respectful! 🪷');
  }

  const { allowed, waitSeconds } = RateLimiter.canExecute('offering');
  if (!allowed) {
    throw new Error(`Please wait ${waitSeconds}s before lighting another offering!`);
  }

  RateLimiter.recordExecution('offering');

  const newOffering: SacredOffering = {
    id: String(Date.now()),
    name: cleanName,
    type: offering.type,
    blessing: cleanBlessing,
    x: offering.x,
    y: offering.y,
    speed_x: offering.speed_x || 0.01,
    speed_y: offering.speed_y || -0.01,
    rotation: offering.rotation || 0,
    size: offering.size || 50,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('sacred_offerings')
        .insert([{
          name: cleanName,
          type: offering.type,
          blessing: cleanBlessing,
          x: offering.x,
          y: offering.y,
          speed_x: offering.speed_x || 0.01,
          speed_y: offering.speed_y || -0.01,
          rotation: offering.rotation || 0,
          size: offering.size || 50
        }])
        .select()
        .single();

      if (!error && data) {
        QueryCache.invalidate('sacred_offerings');
        return data;
      }
    } catch (_) {}
  }

  const existing = await getSacredOfferings();
  const updated = [newOffering, ...existing];
  localStorage.setItem('shree_handdrawn_offerings', JSON.stringify(updated));
  QueryCache.set('sacred_offerings', updated);
  return newOffering;
}

// =========================================================================
// 3. LEADERBOARD API
// =========================================================================

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const cached = QueryCache.get<LeaderboardEntry[]>('leaderboard', 8000);
  if (cached) return cached;

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(20);

      if (!error && data) {
        QueryCache.set('leaderboard', data);
        return data;
      }
    } catch (_) {}
  }

  const local = localStorage.getItem('shree_leaderboard');
  const result = local ? JSON.parse(local) : [];
  QueryCache.set('leaderboard', result);
  return result;
}

export async function submitScore(entry: Omit<LeaderboardEntry, 'id' | 'created_at'>): Promise<LeaderboardEntry> {
  const cleanName = sanitizeText(entry.name, 30);
  const cleanCity = entry.city ? sanitizeText(entry.city, 30) : '';
  const score = Math.max(0, Math.min(999999, Math.floor(entry.score)));

  const newEntry: LeaderboardEntry = {
    id: String(Date.now()),
    name: cleanName || 'Starlight Player',
    score,
    rank: entry.rank,
    avatar: entry.avatar || '🐱',
    city: cleanCity,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .insert([{
          name: cleanName || 'Starlight Player',
          score,
          rank: entry.rank,
          avatar: entry.avatar || '🐱',
          city: cleanCity
        }])
        .select()
        .single();

      if (!error && data) {
        QueryCache.invalidate('leaderboard');
        return data;
      }
    } catch (_) {}
  }

  const existing = await getLeaderboard();
  const updated = [...existing, newEntry].sort((a, b) => b.score - a.score).slice(0, 20);
  localStorage.setItem('shree_leaderboard', JSON.stringify(updated));
  QueryCache.set('leaderboard', updated);
  return newEntry;
}

export const getArcadeLeaderboard = getLeaderboard;
export const submitArcadeScore = submitScore;
