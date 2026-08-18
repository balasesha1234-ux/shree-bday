import { useState, useEffect } from 'react';
import { getTimeRemaining, TARGET_BIRTHDAY_IST, TimeRemaining } from '../utils/dateCheck';

export function useCountdown(targetDate: number = TARGET_BIRTHDAY_IST) {
  const [time, setTime] = useState<TimeRemaining>(() => getTimeRemaining(targetDate));
  const [milliseconds, setMilliseconds] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(targetDate);
      setTime(remaining);
      setMilliseconds(Math.floor((remaining.total % 1000) / 10));
    }, 50);

    return () => clearInterval(timer);
  }, [targetDate]);

  return {
    ...time,
    milliseconds: String(milliseconds).padStart(2, '0'),
    formattedDays: String(time.days).padStart(2, '0'),
    formattedHours: String(time.hours).padStart(2, '0'),
    formattedMinutes: String(time.minutes).padStart(2, '0'),
    formattedSeconds: String(time.seconds).padStart(2, '0')
  };
}
