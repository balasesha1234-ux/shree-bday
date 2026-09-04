export interface LetterPage {
  pageNumber: number;
  title: string;
  salutation: string;
  body: string;
  closing: string;
  date: string;
}

export const LETTER_PAGES: LetterPage[] = [
  {
    pageNumber: 1,
    title: 'A Lighter World',
    salutation: 'To Shree,',
    body: 'Thank you for spreading faith, kindness, music and joy. You make this world feel a little lighter. In a world full of noise, your pure devotion and calm warmth are a rare sanctuary. Never lose that gentle strength.',
    closing: 'With gratitude, Always. ♡',
    date: 'March 6, 2027'
  },
  {
    pageNumber: 2,
    title: 'The Grace You Carry',
    salutation: 'Shree,',
    body: 'Grace isn’t something you put on — it is who you are at your core. The way you treat people with genuine respect, look out for voiceless animals, and hold close to your Krishna bhakti inspires everyone around you.',
    closing: 'Proud of you, always. ♡',
    date: 'March 2027'
  },
  {
    pageNumber: 3,
    title: 'A Brother’s Shield',
    salutation: 'To My Sister,',
    body: 'No matter the physical distance between Bangalore, Hyderabad, and Delhi — 1,250 kilometers or across oceans — you will always have an unshakeable wall standing behind you. Whatever path you take, I have your back.',
    closing: 'Your brother, always. 🛡️',
    date: 'March 2027'
  },
  {
    pageNumber: 4,
    title: 'Same Soul, Bigger Purpose',
    salutation: 'To Shree,',
    body: 'Same soul, bigger purpose. Every hurdle you crossed has only sharpened your resilience. Keep your head high and your heart grounded. The journey ahead has great things reserved just for you.',
    closing: 'Keep shining bright. ✨',
    date: 'March 2027'
  },
  {
    pageNumber: 5,
    title: 'When Your Voice Heals',
    salutation: 'Shree,',
    body: 'Your voice doesn’t just carry music — it carries peace. Hearing you sing bhajan and kirtan washes away the stress of the day. Keep singing from your soul; music is your superpower.',
    closing: 'Never stop singing. 🎵',
    date: 'March 2027'
  },
  {
    pageNumber: 6,
    title: 'The Cat Whisperer',
    salutation: 'To the Pure Heart,',
    body: 'Stopping on busy roads to feed and pet stray kittens tells the whole story of who you are. How someone treats small, defenseless animals reveals their true character. Yours is purely golden.',
    closing: 'Stay gentle, stay you. 🐱',
    date: 'March 2027'
  },
  {
    pageNumber: 7,
    title: 'Quiet Strength',
    salutation: 'To Shree,',
    body: 'In a loud world, she speaks kindness. You never had to be loud to make an impact. Your warmth leaves a lasting footprint on everyone lucky enough to know you.',
    closing: 'Deepest respect. 🪷',
    date: 'March 2027'
  },
  {
    pageNumber: 8,
    title: 'Midnight 11:11 Wishes',
    salutation: 'At 11:11,',
    body: 'Some wishes aren’t meant to come true in the usual way. Some are simply meant to remind you how grateful you are to exist, to laugh, and to walk in divine grace.',
    closing: 'May every prayer be answered. 🌙',
    date: 'March 2027'
  },
  {
    pageNumber: 9,
    title: 'Stepping Forward',
    salutation: 'Shree,',
    body: 'A new birthday isn’t just adding a number — it is claiming your space, trusting your instincts, and celebrating every battle you won quietly on your own.',
    closing: 'Always cheering for you. 🌸',
    date: 'March 2027'
  },
  {
    pageNumber: 10,
    title: 'Things I Never Said',
    salutation: 'Dear Sister,',
    body: 'I might not say it every day, but watching you grow into such an independent, dignified, and devoted person makes me the proudest brother on this planet. You inspire me more than you know.',
    closing: 'Infinite love. 💖',
    date: 'March 2027'
  },
  {
    pageNumber: 11,
    title: 'Under Radha’s Grace',
    salutation: 'Radhe Radhe,',
    body: 'May Radha Rani wrap you in peace and good health. May your days be filled with sweet laughter and every silent prayer answered before you even speak it.',
    closing: 'Shree Krishna Sharanam. 🪷',
    date: 'March 2027'
  },
  {
    pageNumber: 12,
    title: 'Forever & Always',
    salutation: 'To Shree,',
    body: 'A kinder tomorrow is still possible because souls like you exist in this world. Happy Birthday, Shree. Today, tomorrow, and for all the years to come.',
    closing: 'With all my love and gratitude, Always. ♡',
    date: 'March 6, 2027'
  }
];

export interface MobileTrack {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: string;
  durationSeconds: number;
  audioUrl: string;
  coverImage: string;
  subtitle: string;
  spotifyUri?: string;
  spotifyUrl: string;
}

export const MOBILE_TRACKS: MobileTrack[] = [
  {
    id: 1,
    title: 'Jaya Janardhana',
    artist: 'Shree Naval Kishori',
    album: 'Sacred Bhakti',
    duration: '4:28',
    durationSeconds: 268,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/1s.jpg',
    subtitle: 'Bhakti • Closer to You',
    spotifyUri: 'spotify:track:jaya-janardhana',
    spotifyUrl: 'https://open.spotify.com/search/Jaya%20Janardhana'
  },
  {
    id: 2,
    title: 'Achyutam Keshavam',
    artist: 'Shree Melodies',
    album: 'Serenity & Grace',
    duration: '5:12',
    durationSeconds: 312,
    audioUrl: '/assets/audio/ambient.mp3',
    coverImage: '/assets/serial/11s.jpg',
    subtitle: 'Peace • A Lighter Tomorrow',
    spotifyUri: 'spotify:track:achyutam-keshavam',
    spotifyUrl: 'https://open.spotify.com/search/Achyutam%20Keshavam'
  },
  {
    id: 3,
    title: 'Radha Rani Bhajan',
    artist: 'Soul Strings & Shree',
    album: 'Warmth',
    duration: '3:45',
    durationSeconds: 225,
    audioUrl: '/assets/audio/background.mp3',
    coverImage: '/assets/serial/13s.jpg',
    subtitle: 'Kindness • In Every Note',
    spotifyUri: 'spotify:track:radha-rani-bhajan',
    spotifyUrl: 'https://open.spotify.com/search/Radha%20Rani'
  },
  {
    id: 4,
    title: 'Peace by the Yamuna',
    artist: 'Brotherly Ode',
    album: 'Alliance',
    duration: '4:02',
    durationSeconds: 242,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/15s.jpg',
    subtitle: 'You • Always',
    spotifyUri: 'spotify:track:flute-peace',
    spotifyUrl: 'https://open.spotify.com/search/Sacred%20Flute%20Meditation'
  }
];

export interface HangingWish {
  id: number;
  author: string;
  message: string;
  likes: number;
  tapeColor: 'pink' | 'gold' | 'mint' | 'lavender';
  category: 'Latest' | 'Popular' | 'Yours';
  pinnedNote?: string;
}

export const HANGING_WISHES: HangingWish[] = [
  {
    id: 1,
    author: 'A Fellow Admirer',
    message: 'You make the world softer and kinder. May this birthday bring you everything your pure heart yearns for! ♡',
    likes: 248,
    tapeColor: 'pink',
    category: 'Popular',
    pinnedNote: 'Good People Brighter Days ♡'
  },
  {
    id: 2,
    author: 'From a True Friend',
    message: 'Grateful for your kindness always. Shree, your presence is an absolute gift to everyone around you.',
    likes: 192,
    tapeColor: 'gold',
    category: 'Popular'
  },
  {
    id: 3,
    author: 'Little Stray Cat Club',
    message: 'Meow! Thank you for the head scratches and pure affection whenever you walk past us! 🐱🌸',
    likes: 315,
    tapeColor: 'mint',
    category: 'Latest'
  },
  {
    id: 4,
    author: 'Temple Devotee',
    message: 'May Shree Krishna & Radha Rani bless you with peace, health, and limitless joy this special year.',
    likes: 156,
    tapeColor: 'lavender',
    category: 'Latest'
  },
  {
    id: 5,
    author: 'Your Brother',
    message: 'Always here for you, Shree. Today and for every tomorrow yet to come. Happy Birthday! 🌸🛡️',
    likes: 999,
    tapeColor: 'gold',
    category: 'Yours',
    pinnedNote: 'Forever Sibling Alliance'
  }
];

export interface GalleryPhoto {
  id: number;
  image: string;
  caption: string;
  category: 'Candid' | 'Performances' | 'Special';
  rotation: number;
  tapeColor: 'pink' | 'gold' | 'mint' | 'lavender';
  sticker?: string;
  note?: string;
  reactions: { hearts: number; stars: number; flowers: number };
}

export const MOBILE_GALLERY: GalleryPhoto[] = [
  { id: 1, image: '/assets/serial/1s.jpg', caption: 'Pure Radiant Smile 🌸', category: 'Candid', rotation: -2, tapeColor: 'pink', sticker: '🌸', note: 'Some moments just stay forever. ♡', reactions: { hearts: 142, stars: 98, flowers: 85 } },
  { id: 2, image: '/assets/serial/2s.jpg', caption: 'Talking to the street kitties', category: 'Candid', rotation: 2.5, tapeColor: 'mint', sticker: '🐱', reactions: { hearts: 215, stars: 120, flowers: 64 } },
  { id: 3, image: '/assets/serial/6s.jpg', caption: 'Royal Delhi moments ✨', category: 'Special', rotation: -1.5, tapeColor: 'gold', sticker: '✨', reactions: { hearts: 180, stars: 145, flowers: 92 } },
  { id: 4, image: '/assets/serial/13s.jpg', caption: 'Graceful in traditional attire', category: 'Special', rotation: 3, tapeColor: 'lavender', sticker: '🪷', reactions: { hearts: 290, stars: 210, flowers: 180 } },
  { id: 5, image: '/assets/serial/5s.jpg', caption: 'Live on stage singing bhajans', category: 'Performances', rotation: -2.8, tapeColor: 'pink', sticker: '🎤', reactions: { hearts: 320, stars: 195, flowers: 110 } },
  { id: 6, image: '/assets/serial/8s.jpg', caption: 'Laughter that fills the whole room', category: 'Candid', rotation: 1.8, tapeColor: 'gold', sticker: '💖', reactions: { hearts: 175, stars: 90, flowers: 72 } },
  { id: 7, image: '/assets/serial/11s.jpg', caption: 'Visiting holy shrines in peace', category: 'Special', rotation: -1.2, tapeColor: 'mint', sticker: '🪷', reactions: { hearts: 240, stars: 160, flowers: 155 } },
  { id: 8, image: '/assets/serial/15s.jpg', caption: 'Stepping into a glorious new year', category: 'Special', rotation: 2.2, tapeColor: 'gold', sticker: '🎂', reactions: { hearts: 410, stars: 305, flowers: 250 } },
];
