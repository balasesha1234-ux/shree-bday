export interface TeaserMilestone {
  dayIndex: number;
  daysRemaining: number;
  title: string;
  subtitle: string;
  lore: string;
  type: 'signal' | 'silhouette' | 'audio' | 'shield' | 'zero_hour';
  hologramIcon: string;
  previewImage?: string;
  easterEgg: string;
}

export const TEASER_MILESTONES: TeaserMilestone[] = [
  {
    dayIndex: 1,
    daysRemaining: 10,
    title: 'THE QUANTUM SIGNAL',
    subtitle: 'An anomaly detected across the digital cosmos',
    lore: 'Global telemetry sensors have detected a surge of radiant energy. A worldwide celebration frequency is initializing across all networks.',
    type: 'signal',
    hologramIcon: '📡',
    previewImage: '/assets/serial/2s.jpg',
    easterEgg: '🐾 A stray kitten stepped across the terminal console.'
  },
  {
    dayIndex: 2,
    daysRemaining: 7,
    title: 'THE RADIANT SILHOUETTE',
    subtitle: 'Spectral analysis of our favorite creator',
    lore: 'Atmospheric scans reveal a presence defined by pure grace, infectious laughter, and an extraordinary heart of gold. The stars are aligning.',
    type: 'silhouette',
    hologramIcon: '🌸',
    previewImage: '/assets/serial/6s.jpg',
    easterEgg: '🪷 Fragrance of lotus blooms faintly in the air.'
  },
  {
    dayIndex: 3,
    daysRemaining: 5,
    title: 'THE HARMONY FREQUENCIES',
    subtitle: 'Seven celebratory melodies woven into time',
    lore: 'Audio spectrograms indicate 7 vinyl records preparing to spin. Memories of shared dreams, laughter, and late-night sibling calls.',
    type: 'audio',
    hologramIcon: '🎵',
    previewImage: '/assets/serial/25s.jpg',
    easterEgg: '✨ She hums a tune when nobody is looking.'
  },
  {
    dayIndex: 4,
    daysRemaining: 3,
    title: 'THE GUARDIAN SHIELD',
    subtitle: 'A confidential sanctuary prepares to awaken',
    lore: 'Beyond the public celebration for millions, a private sanctuary built with unconditional brotherly loyalty and pride is locking into coordinate position.',
    type: 'shield',
    hologramIcon: '🛡️',
    previewImage: '/assets/serial/1s.jpg',
    easterEgg: '🔒 Some bonds remain unshakeable across any distance.'
  },
  {
    dayIndex: 5,
    daysRemaining: 1,
    title: 'THE EVE OF ZERO HOUR',
    subtitle: 'Midnight IST synchronization imminent',
    lore: 'All quantum systems calibrated. Floating diyas lit, stardust arcade charged, candles ready to be blown. The universe celebrates Shree tomorrow at midnight!',
    type: 'zero_hour',
    hologramIcon: '🎂',
    previewImage: '/assets/serial/23s.jpg',
    easterEgg: '🎉 Get ready to celebrate our favorite human.'
  }
];
