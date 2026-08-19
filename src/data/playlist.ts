export interface PlaylistItem {
  id: number;
  title: string;
  artist: string;
  duration: string;
  vibe: string;
  personalNote: string;
  albumArt: string;
  audioUrl: string;
}

export const PLAYLIST_DATA: PlaylistItem[] = [
  {
    id: 1,
    title: 'Radha Rani Bhajan & Serenity',
    artist: 'Devotional Sacred Chants',
    duration: '4:15',
    vibe: 'PEACE & PRAYER 🪷',
    personalNote: 'For the quiet mornings when you fold your hands in prayer. May Radha Rani always protect and guide you, Shree 🪷',
    albumArt: '/assets/serial/25s.jpg',
    audioUrl: '/assets/audio/ambient.mp3'
  },
  {
    id: 2,
    title: 'Phoolon Ka Taaron Ka',
    artist: 'Lata Mangeshkar / Acoustic',
    duration: '3:48',
    vibe: 'BEST SISTER EVER 🌸',
    personalNote: 'A million stars in the sky, but you are the sweetest, most caring sister figure anyone could ever ask for 🌸',
    albumArt: '/assets/serial/26s.jpg',
    audioUrl: '/assets/audio/track3.mp3'
  },
  {
    id: 3,
    title: 'I’ll Be There For You',
    artist: 'The Rembrandts / Acoustic',
    duration: '3:05',
    vibe: 'LIFELONG PACT 🛡️',
    personalNote: 'Whenever you need someone to vent to, back you up, or make you laugh when things get heavy — your brother is always 1 call away.',
    albumArt: '/assets/serial/27s.jpg',
    audioUrl: '/assets/audio/track6.mp3'
  },
  {
    id: 4,
    title: 'Kabira (Encore)',
    artist: 'Pritam, Tochi Raina',
    duration: '4:29',
    vibe: 'WISDOM & HEART ✨',
    personalNote: 'A reminder to stay grounded, follow your passion without fear, and never let anyone dim your sparkling energy ✨',
    albumArt: '/assets/serial/28s.jpg',
    audioUrl: '/assets/audio/track4.mp3'
  },
  {
    id: 5,
    title: 'Counting Stars',
    artist: 'OneRepublic',
    duration: '4:17',
    vibe: 'BIG DREAMS 🚀',
    personalNote: 'To celebrate all your hustle, your creative triumphs, and the huge milestones you’re going to achieve this year! 🚀',
    albumArt: '/assets/serial/29s.jpg',
    audioUrl: '/assets/audio/track5.mp3'
  },
  {
    id: 6,
    title: 'Tera Yaar Hoon Main',
    artist: 'Arijit Singh',
    duration: '4:42',
    vibe: 'BROTHER’S SHIELD 🛡️',
    personalNote: 'Distance means nothing when someone means so much. Always proud of who you are and where you are going.',
    albumArt: '/assets/serial/30s.jpg',
    audioUrl: '/assets/audio/track6.mp3'
  },
  {
    id: 7,
    title: 'Shree’s Birthday Dream Melody',
    artist: 'Celebratory Festive Acoustic',
    duration: '3:30',
    vibe: 'PURE CELEBRATION 🎂',
    personalNote: 'The soundtrack to a glorious 22nd birthday celebration for the kindest soul in Delhi! 🎂✨',
    albumArt: '/assets/serial/31s.jpg',
    audioUrl: '/assets/audio/background.mp3'
  }
];
