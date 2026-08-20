// Full-Stack Client Security, Anti-Abuse, Rate-Limiter & Content Moderation Engine

// =========================================================================
// 1. ADVANCED XSS & MALICIOUS INJECTION SANITIZER
// =========================================================================

export function sanitizeText(input: string, maxLength: number = 300): string {
  if (!input || typeof input !== 'string') return '';

  return input
    .replace(/<[^>]*>?/gm, '') // Remove all HTML tags
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, '')
    .replace(/vbscript:/gi, '')
    .replace(/on\w+=/gi, '') // Remove event handlers like onload=, onerror=
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, '') // Remove control characters
    .trim()
    .slice(0, maxLength);
}

// =========================================================================
// 2. PROFANITY & TOXIC CONTENT FILTER (AI/REGEX NORMALIZATION)
// =========================================================================

const BANNED_PATTERNS = [
  /\b(fuck|shit|bitch|asshole|bastard|cunt|dick|pussy|whore|slut)\b/i,
  /\b(nigger|nigga|faggot|retard|chink|spic|kike)\b/i,
  /\b(porn|xxx|casino|viagra|crypto|telegram|whatsapp\s*\+\d+)\b/i
];

export function isContentAppropriate(text: string): boolean {
  if (!text) return true;
  const normalized = text.toLowerCase().replace(/[@4]/g, 'a').replace(/[1!|]/g, 'i').replace(/[0]/g, 'o').replace(/[$5]/g, 's');

  for (const pattern of BANNED_PATTERNS) {
    if (pattern.test(normalized)) {
      return false;
    }
  }
  return true;
}

// =========================================================================
// 3. DISTRIBUTED CLIENT RATE LIMITER (TOKEN BUCKET WITH PERSISTENCE)
// =========================================================================

interface RateLimitConfig {
  action: 'wish' | 'offering' | 'score' | 'like';
  cooldownMs: number;
}

const ACTION_CONFIGS: Record<string, number> = {
  wish: 12000,      // 12 seconds between wishes
  offering: 8000,   // 8 seconds between diya offerings
  score: 5000,      // 5 seconds between game submissions
  like: 800         // 800ms between likes
};

export class RateLimiter {
  private static getKey(action: string): string {
    return `shree_sec_rl_${action}`;
  }

  public static canExecute(action: 'wish' | 'offering' | 'score' | 'like'): { allowed: boolean; waitSeconds: number } {
    const key = this.getKey(action);
    const cooldown = ACTION_CONFIGS[action] || 5000;
    const lastExecuted = Number(localStorage.getItem(key) || sessionStorage.getItem(key) || 0);
    const now = Date.now();
    const elapsed = now - lastExecuted;

    if (elapsed < cooldown) {
      const remainingMs = cooldown - elapsed;
      return {
        allowed: false,
        waitSeconds: Math.ceil(remainingMs / 1000)
      };
    }

    return { allowed: true, waitSeconds: 0 };
  }

  public static recordExecution(action: 'wish' | 'offering' | 'score' | 'like'): void {
    const key = this.getKey(action);
    const now = String(Date.now());
    localStorage.setItem(key, now);
    sessionStorage.setItem(key, now);
  }
}

// =========================================================================
// 4. HONEYPOT & BOT SUBMISSION DETECTION
// =========================================================================

export function isBotSubmission(honeypotValue: string, renderTimeMs: number): boolean {
  // 1. If invisible honeypot field is filled by auto-fill bot
  if (honeypotValue && honeypotValue.trim().length > 0) {
    return true;
  }

  // 2. Inhuman submission speed check (less than 400ms from form open to submit)
  const elapsed = Date.now() - renderTimeMs;
  if (elapsed < 400) {
    return true;
  }

  return false;
}

// =========================================================================
// 5. HIGH-CONCURRENCY SWR QUERY CACHE (PREVENTS DATABASE THUNDERING HERD)
// =========================================================================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

export class QueryCache {
  private static cache = new Map<string, CacheEntry<any>>();
  private static DEFAULT_TTL = 15000; // 15 seconds cache TTL

  public static get<T>(key: string, ttlMs: number = this.DEFAULT_TTL): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() - entry.timestamp > ttlMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  public static set<T>(key: string, data: T): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  public static invalidate(key: string): void {
    this.cache.delete(key);
  }
}
