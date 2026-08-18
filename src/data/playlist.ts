export interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  duration: string;
  vibe: string;
  personalNote: string;
  albumArt: string;
}

export const PLAYLIST_DATA: PlaylistItem[] = [
  {
    id: 1,
    title: 'Radha Rani Bhajan & Serenity',
    artist: 'Devotional Sacred Chants',
    duration: '4:15',
    vibe: 'PEACE & PRAYER',
    personalNote: 'For the quiet mornings when you fold your hands in prayer. May Radha Rani always protect and guide you, Shree 🪷',
    albumArt: '/assets/serial/25s.jpg'
  },
  {
    id: 2,
    title: 'Phoolon Ka Taaron Ka (Sibling Anthem)',
    artist: 'Lata Mangeshkar / Acoustic',
    duration: '3:48',
    vibe: 'BEST SISTER EVER',
    personalNote: 'A million stars in the sky, but you are the sweetest, most caring sister figure anyone could ever ask for 🌸',
    albumArt: '/assets/serial/26s.jpg'
  },
  {
    id: 3,
    title: 'I’ll Be There For You',
    artist: 'The Rembrandts / Acoustic',
    duration: '3:05',
    vibe: 'LIFELONG PACT',
    personalNote: 'Whenever you need someone to vent to, back you up, or make you laugh when things get heavy — your brother is always 1 call away.',
    albumArt: '/assets/serial/27s.jpg'
  },
  {
    id: 4,
    title: 'Kabira (Encore)',
    artist: 'Pritam, Tochi Raina',
    duration: '4:29',
    vibe: 'WISDOM & HEART',
    personalNote: 'A reminder to stay grounded, follow your passion without fear, and never let anyone dim your sparkling energy ✨',
    albumArt: '/assets/serial/28s.jpg'
  },
  {
    id: 5,
    title: 'Counting Stars',
    artist: 'OneRepublic',
    duration: '4:17',
    vibe: 'BIG DREAMS',
    personalNote: 'To celebrate all your hustle, your creative triumphs, and the huge milestones you’re going to achieve this year! 🚀',
    albumArt: '/assets/serial/29s.jpg'
  },
  {
    id: 6,
    title: 'Tera Yaar Hoon Main',
    artist: 'Arijit Singh',
    duration: '4:59',
    vibe: 'FAMILY & SIBLING BOND',
    personalNote: 'Distance between Hyderabad and Delhi changes nothing. You will always be family to me.',
    albumArt: '/assets/serial/30s.jpg'
  },
  {
    id: 7,
    title: 'Shree Radhe Govinda Dhun',
    artist: 'Temple Flute & Bells',
    duration: '5:32',
    vibe: 'DIVINE BLESSINGS',
    personalNote: 'Wishing you divine health, peaceful sleep, endless smiles, and abundant success at 22! 🪔',
    albumArt: '/assets/serial/31s.jpg'
  }
];
