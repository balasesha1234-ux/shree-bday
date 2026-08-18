export interface TeaserMilestone {
  dayIndex: number;
  daysRemaining: number;
  title: string;
  subtitle: string;
  lore: string;
  unlocked: boolean;
  type: 'text' | 'image' | 'audio' | 'clue' | 'cat';
  easterEgg?: string;
}

export const TEASER_MILESTONES: TeaserMilestone[] = [
  {
    dayIndex: 1,
    daysRemaining: 14,
    title: 'THE TRANSMISSION BEGINS',
    subtitle: 'A quantum frequency from Hyderabad to Delhi',
    lore: 'An anomaly in spacetime has been detected. Synchronizing clocks across realms.',
    unlocked: true,
    type: 'text',
    easterEgg: '🐾 A pair of tiny kitten paws stepped across the monitor.'
  },
  {
    dayIndex: 2,
    daysRemaining: 10,
    title: 'THE RADIANCE AWAKENS',
    subtitle: 'A silhouette surrounded by pink stardust',
    lore: 'The stars are aligning to celebrate a presence that brought boundless warmth to thousands.',
    unlocked: false,
    type: 'image',
    easterEgg: '🪷 Fragrance of lotus blooms faintly in the air.'
  },
  {
    dayIndex: 3,
    daysRemaining: 7,
    title: 'THE HARMONY RISES',
    subtitle: 'Frequencies of melody and laughter',
    lore: 'Seven songs have been woven into the tapestry of time. Each holding a secret memory.',
    unlocked: false,
    type: 'audio',
    easterEgg: '🎵 She hums a tune when no one is looking.'
  },
  {
    dayIndex: 4,
    daysRemaining: 3,
    title: 'THE INVITATION TO SANCTUARY',
    subtitle: 'Only the pure of heart may enter',
    lore: 'Look closely at the final constellation. A cat, a star, and a heart hold the ancient key.',
    unlocked: false,
    type: 'cat',
    easterEgg: '🐱 Look for the whiskered guardian.'
  },
  {
    dayIndex: 5,
    daysRemaining: 1,
    title: 'THE EVE OF CELEBRATION',
    subtitle: 'Zero Hour approaches at midnight IST',
    lore: 'Tonight, the public realm shall rejoice. And beyond it, a secret world awaits only for her.',
    unlocked: false,
    type: 'text',
    easterEgg: '✨ 22 years of pure magic.'
  }
];
