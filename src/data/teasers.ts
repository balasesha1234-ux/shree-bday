export interface TeaserMilestone {
  dayIndex: number;
  daysRemaining: number;
  title: string;
  subtitle: string;
  theme: string;
  lore: string;
  quote: string;
  image: string;
  sticker: string;
  tagColor: string;
  accentColor: string;
  ambientVibe: string;
  audioAction: 'bell' | 'meow' | 'sparkle';
}

export const TEASER_MILESTONES: TeaserMilestone[] = [
  {
    dayIndex: 1,
    daysRemaining: 10,
    title: 'The Whiskered Kindness Archive',
    subtitle: 'Celebrating her boundless empathy for little strays',
    theme: 'COMPASSION & PURRS 🐾',
    lore: 'Across busy streets and crowded lanes, Shree has never passed a stray kitten without stopping to offer gentle headpats, food, and genuine love. This first relic honors her purest instinct — unconditional tenderness.',
    quote: '“True kindness is how you treat those who can never repay you.”',
    image: '/assets/serial/2s.jpg',
    sticker: '🐱',
    tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    accentColor: '#7CEBC6',
    ambientVibe: 'Soft Cat Purrs & Morning Sunshine',
    audioAction: 'meow'
  },
  {
    dayIndex: 2,
    daysRemaining: 7,
    title: 'The Sacred Grace of Bhakti',
    subtitle: 'A soul deeply grounded in Radha Rani’s blessings',
    theme: 'DEVOTION & PEACE 🪷',
    lore: 'Despite reaching extraordinary milestones as a creator, she remains humbly bowed in prayer. Her heart is anchored in temple chants, sacred diyas, and divine grace that radiates through her calm presence.',
    quote: '“Grounded by faith, elevated by humility, blessed by Radharani.”',
    image: '/assets/serial/3s.jpg',
    sticker: '🪷',
    tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    accentColor: '#FFD93D',
    ambientVibe: 'Vrindavan Flute & Temple Incense',
    audioAction: 'bell'
  },
  {
    dayIndex: 3,
    daysRemaining: 5,
    title: 'The 7 Melodies of Shared Joy',
    subtitle: 'Sneak peek into the soundtrack of late-night calls',
    theme: 'MUSIC & LAUGHTER 🎵',
    lore: 'Seven songs have been hand-picked into a vintage vinyl archive. Each track preserves a memory — from uncontrollable bursts of sibling laughter to quiet late-night conversations about life and big dreams.',
    quote: '“Some conversations feel like warm chai on a cold winter night.”',
    image: '/assets/serial/25s.jpg',
    sticker: '🎵',
    tagColor: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
    accentColor: '#6BC5F8',
    ambientVibe: 'Lo-Fi Acoustic Guitar & Stardust Notes',
    audioAction: 'sparkle'
  },
  {
    dayIndex: 4,
    daysRemaining: 3,
    title: 'The 1,250 KM Sibling Shield',
    subtitle: 'Unbreakable protection and pride across the distance',
    theme: 'LIFELONG LOYALTY 🛡️',
    lore: 'Between Hyderabad and Delhi lies 1,250 kilometers of land, but zero distance in loyalty. A brotherly shield built on fierce protective pride, ready to celebrate her triumphs and back her up through anything.',
    quote: '“No matter where life leads you, your brother stands right beside you.”',
    image: '/assets/serial/6s.jpg',
    sticker: '🛡️',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    accentColor: '#E0D4F0',
    ambientVibe: 'Eternal Loyalty Protocol & Zero Latency',
    audioAction: 'sparkle'
  },
  {
    dayIndex: 5,
    daysRemaining: 1,
    title: 'The Golden Eve of Celebration',
    subtitle: 'The eve of her 22nd milestone chapter',
    theme: 'MIDNIGHT ZERO HOUR 🎂',
    lore: 'All stardust constellations are locked into position. The diyas are set to float, the photobooth is primed, and the universe is ready to celebrate the sweetest human at Midnight IST.',
    quote: '“The countdown nears its end, but her story is only just beginning.”',
    image: '/assets/serial/23s.jpg',
    sticker: '🎂',
    tagColor: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    accentColor: '#FF4D8D',
    ambientVibe: 'Golden Stardust Fireworks & Sacred Chimes',
    audioAction: 'sparkle'
  }
];
