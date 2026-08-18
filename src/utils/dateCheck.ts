// Date & Time Utility for IST (Indian Standard Time, UTC + 5:30)

// Target Birthday: March 6, 2027 00:00:00 IST
export const TARGET_BIRTHDAY_IST = new Date('2027-03-06T00:00:00+05:30').getTime();

export type AppMode = 'countdown' | 'public' | 'private';

export interface TimeRemaining {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export function getTimeRemaining(targetDate: number = TARGET_BIRTHDAY_IST): TimeRemaining {
  const now = Date.now();
  const total = targetDate - now;

  if (total <= 0) {
    return {
      total: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
  };
}

export function isBirthdayActive(targetDate: number = TARGET_BIRTHDAY_IST): boolean {
  return Date.now() >= targetDate;
}
