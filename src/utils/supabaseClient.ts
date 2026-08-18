import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id') &&
  !supabaseAnonKey.includes('your-anon-public-key')
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
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
  x_pos: number;
  y_pos: number;
  created_at: string;
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

// Clean empty defaults (ready for fresh real submissions)
export const INITIAL_MOCK_WISHES: FanWish[] = [];
export const INITIAL_LEADERBOARD: LeaderboardEntry[] = [];

// =========================================================================
// ASYNC DATABASE API HELPERS (Supabase with LocalStorage Fallback)
// =========================================================================

export async function getFanWishes(): Promise<FanWish[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('fan_wishes')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data) return data;
    } catch (_) {}
  }
  const local = localStorage.getItem('shree_fan_wishes');
  return local ? JSON.parse(local) : [];
}

export async function submitFanWish(wish: Omit<FanWish, 'id' | 'likes' | 'created_at'>): Promise<FanWish> {
  const newWish: FanWish = {
    id: String(Date.now()),
    ...wish,
    likes: 0,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('fan_wishes')
        .insert([{
          name: wish.name,
          message: wish.message,
          city: wish.city,
          emoji: wish.emoji || '🌸',
          likes: 0
        }])
        .select()
        .single();
      if (!error && data) return data;
    } catch (_) {}
  }

  const existing = await getFanWishes();
  const updated = [newWish, ...existing];
  localStorage.setItem('shree_fan_wishes', JSON.stringify(updated));
  return newWish;
}

export async function getArcadeLeaderboard(): Promise<LeaderboardEntry[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('arcade_leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(20);
      if (!error && data) return data;
    } catch (_) {}
  }
  const local = localStorage.getItem('shree_arcade_leaderboard');
  return local ? JSON.parse(local) : [];
}

export async function submitArcadeScore(entry: Omit<LeaderboardEntry, 'id' | 'created_at'>): Promise<LeaderboardEntry> {
  const newEntry: LeaderboardEntry = {
    id: String(Date.now()),
    ...entry,
    created_at: new Date().toISOString()
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('arcade_leaderboard')
        .insert([entry])
        .select()
        .single();
      if (!error && data) return data;
    } catch (_) {}
  }

  const existing = await getArcadeLeaderboard();
  const updated = [newEntry, ...existing].sort((a, b) => b.score - a.score).slice(0, 20);
  localStorage.setItem('shree_arcade_leaderboard', JSON.stringify(updated));
  return newEntry;
}
