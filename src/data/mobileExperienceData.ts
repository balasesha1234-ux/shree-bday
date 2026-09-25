export interface LetterPage {
  pageNumber: number;
  title: string;
  salutation: string;
  body: string;
  closing: string;
  date: string;
}

export type PaletteKey = 'rose' | 'midnight' | 'sage' | 'sunset' | 'amethyst';

export interface BookPalette {
  id: PaletteKey;
  name: string;
  icon: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  titleColor: string;
  salutationColor: string;
  bodyColor: string;
  closingColor: string;
  dateColor: string;
  accentIcon: string;
  petalEmoji: string;
  paginationBg: string;
  paginationActive: string;
  dotColor: string;
}

export const BOOK_PALETTES: Record<PaletteKey, BookPalette> = {
  rose: {
    id: 'rose',
    name: 'Rose Gold',
    icon: '🌸',
    bgGradient: 'bg-gradient-to-b from-[#FFF0F5] via-[#FFF5F7] to-[#FFE4E8]',
    cardBg: 'bg-[#FFFDF8]',
    cardBorder: 'border-[#FFB6C1]/60 shadow-[0_15px_40px_rgba(255,182,193,0.35)]',
    titleColor: 'text-[#FF4D8D]',
    salutationColor: 'text-[#FF2D78]',
    bodyColor: 'text-[#3D2040]',
    closingColor: 'text-[#FF4D8D]',
    dateColor: 'text-pink-400',
    accentIcon: '🌸',
    petalEmoji: '🌸',
    paginationBg: 'bg-white text-gray-700 hover:bg-pink-50 border-pink-100',
    paginationActive: 'text-[#FF4D8D]',
    dotColor: 'bg-[#FF4D8D]'
  },
  midnight: {
    id: 'midnight',
    name: 'Midnight Stardust',
    icon: '🌙',
    bgGradient: 'bg-gradient-to-b from-[#0B0814] via-[#150F26] to-[#0D0817]',
    cardBg: 'bg-[#18112C]/95 text-white backdrop-blur-xl',
    cardBorder: 'border-[#9370DB]/50 shadow-[0_15px_40px_rgba(147,112,219,0.3)]',
    titleColor: 'text-[#FFD93D]',
    salutationColor: 'text-[#C084FC]',
    bodyColor: 'text-purple-100',
    closingColor: 'text-[#FFD93D]',
    dateColor: 'text-purple-300/70',
    accentIcon: '✨',
    petalEmoji: '🪷',
    paginationBg: 'bg-white/10 text-purple-200 hover:bg-white/20 border-white/10',
    paginationActive: 'text-[#FFD93D]',
    dotColor: 'bg-[#FFD93D]'
  },
  sage: {
    id: 'sage',
    name: 'Vrindavan Sage',
    icon: '🍃',
    bgGradient: 'bg-gradient-to-b from-[#F0FDF4] via-[#ECFDF5] to-[#D1FAE5]',
    cardBg: 'bg-[#FCFDF9]',
    cardBorder: 'border-[#A7F3D0]/80 shadow-[0_15px_40px_rgba(16,185,129,0.25)]',
    titleColor: 'text-[#059669]',
    salutationColor: 'text-[#047857]',
    bodyColor: 'text-[#064E3B]',
    closingColor: 'text-[#059669]',
    dateColor: 'text-emerald-500',
    accentIcon: '🍃',
    petalEmoji: '🍃',
    paginationBg: 'bg-white text-emerald-800 hover:bg-emerald-50 border-emerald-100',
    paginationActive: 'text-[#059669]',
    dotColor: 'bg-[#059669]'
  },
  sunset: {
    id: 'sunset',
    name: 'Sunset Peach',
    icon: '🌅',
    bgGradient: 'bg-gradient-to-b from-[#FFF7ED] via-[#FFEDD5] to-[#FED7AA]',
    cardBg: 'bg-[#FFFDF7]',
    cardBorder: 'border-[#FDBA74]/80 shadow-[0_15px_40px_rgba(249,115,22,0.25)]',
    titleColor: 'text-[#EA580C]',
    salutationColor: 'text-[#C2410C]',
    bodyColor: 'text-[#431407]',
    closingColor: 'text-[#EA580C]',
    dateColor: 'text-amber-500',
    accentIcon: '🌅',
    petalEmoji: '🌼',
    paginationBg: 'bg-white text-amber-900 hover:bg-orange-50 border-orange-100',
    paginationActive: 'text-[#EA580C]',
    dotColor: 'bg-[#EA580C]'
  },
  amethyst: {
    id: 'amethyst',
    name: 'Amethyst Lilac',
    icon: '💜',
    bgGradient: 'bg-gradient-to-b from-[#FAF5FF] via-[#F3E8FF] to-[#E9D5FF]',
    cardBg: 'bg-[#FEFBFF]',
    cardBorder: 'border-[#D8B4FE]/80 shadow-[0_15px_40px_rgba(168,85,247,0.25)]',
    titleColor: 'text-[#9333EA]',
    salutationColor: 'text-[#7E22CE]',
    bodyColor: 'text-[#3B0764]',
    closingColor: 'text-[#9333EA]',
    dateColor: 'text-purple-400',
    accentIcon: '💜',
    petalEmoji: '🌸',
    paginationBg: 'bg-white text-purple-900 hover:bg-purple-50 border-purple-100',
    paginationActive: 'text-[#9333EA]',
    dotColor: 'bg-[#9333EA]'
  }
};

export interface StoryBook {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  badge: string;
  coverImage?: string;
  defaultPalette: PaletteKey;
  pages: LetterPage[];
}

export const BOOK_LETTER_TO_SHREE: StoryBook = {
  id: 'letter-open',
  title: "A Brother’s Shield",
  subtitle: "12 Letters of Unconditional Faith & Protection",
  icon: '✉️',
  badge: '12 Letters',
  defaultPalette: 'rose',
  pages: [
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
      closing: 'With all my love and gratitude, Karthik. ♡',
      date: 'March 6, 2027'
    }
  ]
};

export const BOOK_WHY_YOU_MATTER: StoryBook = {
  id: 'why-you-matter',
  title: "Why You Matter",
  subtitle: "A Tribute to Your Incomparable Light",
  icon: '⭐',
  badge: '6 Reflections',
  defaultPalette: 'amethyst',
  pages: [
    {
      pageNumber: 1,
      title: 'The Quiet Beacon',
      salutation: 'Dear Shree,',
      body: 'In a world that constantly rushes and trades honesty for attention, your pure heart is an anchor. You do not perform kindness; it naturally overflows from you into every room you enter. That quiet authenticity is rare and priceless.',
      closing: 'Never change, Shree. ✨',
      date: 'March 2027'
    },
    {
      pageNumber: 2,
      title: 'A Voice That Heals',
      salutation: 'Shree,',
      body: 'When you sing kirtan and melodies, it is never just notes on a scale. It carries an emotion that washes away heavy days and gives people a moment of sacred peace. Music flows through you like a divine gift.',
      closing: 'Keep singing with your soul. 🎵',
      date: 'March 2027'
    },
    {
      pageNumber: 3,
      title: 'For the Voiceless Ones',
      salutation: 'To the Pure Hearted,',
      body: 'How someone treats voiceless, defenseless animals reveals the truest depth of their character. Stopping on busy streets to feed stray kittens and gentle dogs shows a heart made of pure gold. The universe notices every little act of mercy you show.',
      closing: 'Pure grace, always. 🐱',
      date: 'March 2027'
    },
    {
      pageNumber: 4,
      title: 'Dignity Through Storms',
      salutation: 'To My Sister,',
      body: 'You have walked through moments that could have easily made anyone cold or bitter. Yet, each time, you chose patience, humility, and gentle perseverance. Your quiet strength is your greatest crown.',
      closing: 'So proud of your courage. 🛡️',
      date: 'March 2027'
    },
    {
      pageNumber: 5,
      title: 'Rooted in Radha-Krishna',
      salutation: 'Radhe Radhe,',
      body: 'Your devotion is not a show or a costume; it is the ground beneath your feet. It keeps you calm in turbulence and gracious in success. Walking in faith brings a glow no spotlight can ever recreate.',
      closing: 'Divine blessings forever. 🪷',
      date: 'March 2027'
    },
    {
      pageNumber: 6,
      title: 'The Irreplaceable Space',
      salutation: 'To Shree,',
      body: 'You matter because without you, the stories, the music, the laughs, and our sibling bond would have an irreplaceable void. On this birthday, remember you are deeply cherished, respected, and loved beyond measure.',
      closing: 'With endless pride, Karthik. ♡',
      date: 'March 6, 2027'
    }
  ]
};

export const BOOK_MEMORIES_WE_SHARE: StoryBook = {
  id: 'memories-we-share',
  title: "Memories We Share",
  subtitle: "Moments, Laughter & Shared Milestones",
  icon: '📸',
  badge: '6 Memories',
  defaultPalette: 'sunset',
  pages: [
    {
      pageNumber: 1,
      title: 'Where Dreams Took Flight',
      salutation: 'Shree,',
      body: 'Thinking back to when everything was just a spark of hope — the early recordings, the nervous rehearsals, and the raw courage it took to step into the world. You worked quietly while others were resting.',
      closing: 'Look how far you have come. 🌟',
      date: 'Memories Archive'
    },
    {
      pageNumber: 2,
      title: 'Bridging Every Kilometer',
      salutation: 'To My Sister,',
      body: 'Whether the map says Hyderabad, Bangalore, or Delhi — 1,250 kilometers never felt like a distance. A single call, a funny meme, or a quick life update instantly erases the miles. Distance only proves how strong the bond is.',
      closing: 'Always close at heart. 🚄',
      date: 'Memories Archive'
    },
    {
      pageNumber: 3,
      title: 'The Unspoken Humor',
      salutation: 'Hey Shree,',
      body: 'Nobody understands our inside jokes or the silent glances we exchange across a crowded room. Having a sibling who knows exactly what you mean before you speak a single word is one of life’s greatest luxuries.',
      closing: 'Partners in crime, always. 😄',
      date: 'Memories Archive'
    },
    {
      pageNumber: 4,
      title: 'Late Night Creative Fuel',
      salutation: 'Dear Sister,',
      body: 'Those late nights reviewing music drafts, fine-tuning lyrics, and debating ideas until 2 AM. Your eye for detail and passion for your craft inspires everyone who works alongside you.',
      closing: 'A true artist at heart. 🎧',
      date: 'Memories Archive'
    },
    {
      pageNumber: 5,
      title: 'Rescue Missions & Stray Kittens',
      salutation: 'To the Cat Whisperer,',
      body: 'Remembering all the times a stray kitten completely stopped our schedule because you couldn’t walk past without making sure it was safe and fed. That tenderness is the soul of all our best memories.',
      closing: 'The sweetest soul. 🐾',
      date: 'Memories Archive'
    },
    {
      pageNumber: 6,
      title: 'Golden Horizons Ahead',
      salutation: 'To Shree,',
      body: 'We have collected so many laughs, lessons, and milestones already, but the best part is knowing that the most breathtaking chapters of your journey are still ahead. I will be cheering in the front row for all of them.',
      closing: 'Here to every tomorrow, Karthik. ♡',
      date: 'March 6, 2027'
    }
  ]
};

export const BOOK_SIBLING_ALLIANCE: StoryBook = {
  id: 'gratitude',
  title: "Gratitude & Sibling Alliance",
  subtitle: "The Shield, The Trust & The Sacred Bond",
  icon: '🛡️',
  badge: '6 Chapters',
  defaultPalette: 'sage',
  pages: [
    {
      pageNumber: 1,
      title: 'The Unshakeable Pact',
      salutation: 'To Shree,',
      body: 'Sibling alliance is not just about sharing family roots. It is a lifelong, unshakeable pact: no matter how high you fly or what battles you face, there is a shield behind you that will never drop.',
      closing: 'Standing with you, always. 🛡️',
      date: 'Alliance Codex'
    },
    {
      pageNumber: 2,
      title: 'Thank You for Your Trust',
      salutation: 'Dear Sister,',
      body: 'Thank you for trusting my judgment, for sharing your hopes and doubts openly, and for valuing my counsel as your brother. That trust is sacred to me, and I will protect it with everything I have.',
      closing: 'Honor and respect. 🤝',
      date: 'Alliance Codex'
    },
    {
      pageNumber: 3,
      title: 'Your Unbreakable Fortress',
      salutation: 'Shree,',
      body: 'My purpose as your brother isn’t to steer your boat or tell you where the wind should blow. It is to be the lighthouse when the sea is rough, and the steady anchor when you need rest. Walk fearlessly.',
      closing: 'You will never stand alone. ⚓',
      date: 'Alliance Codex'
    },
    {
      pageNumber: 4,
      title: 'Watching You Conquer',
      salutation: 'To the Champion,',
      body: 'There is no greater honor for a brother than watching his sister stand on her own two feet, command respect through dignity, and remain humble even as doors open for her. You make me proud every single day.',
      closing: 'With infinite admiration. 👑',
      date: 'Alliance Codex'
    },
    {
      pageNumber: 5,
      title: 'Through Storms and Sunshine',
      salutation: 'Dearest Sister,',
      body: 'Celebrations come with crowds, but real alliances are tested when things are quiet and heavy. No matter the season, my door, my phone, and my support are unconditionally yours.',
      closing: 'A steadfast brother. 🌿',
      date: 'Alliance Codex'
    },
    {
      pageNumber: 6,
      title: 'A Sacred Lifelong Oath',
      salutation: 'To Shree,',
      body: 'Happy Birthday, Shree. On this day, I renew my silent brotherly oath: to celebrate your victories, guard your peace, and stand behind you through all the years God gives us.',
      closing: 'Your brother always, Karthik. 🪷',
      date: 'March 6, 2027'
    }
  ]
};

export const BOOK_THINGS_I_NEVER_SAID: StoryBook = {
  id: 'things-i-never-said',
  title: "Things I Never Said",
  subtitle: "Quiet Truths, Silent Prayers & Deep Pride",
  icon: '💬',
  badge: '6 Truths',
  defaultPalette: 'midnight',
  pages: [
    {
      pageNumber: 1,
      title: 'Quiet Pride',
      salutation: 'Shree,',
      body: 'I might not say it every day or write essays in group chats, but every time someone praises your humility or mentions how kind you are, a quiet pride swells inside my chest. That’s my sister.',
      closing: 'My heart swells with pride. 🌙',
      date: 'Unspoken Words'
    },
    {
      pageNumber: 2,
      title: 'You Inspire Me Too',
      salutation: 'Dear Sister,',
      body: 'You often come to me for advice, but the truth is you inspire me just as much. Watching your morning discipline, your dedication to riyaaz, and your relentless devotion pushes me to be a better person.',
      closing: 'You teach me without knowing. ✨',
      date: 'Unspoken Words'
    },
    {
      pageNumber: 3,
      title: 'When I Silently Worry',
      salutation: 'To My Sister,',
      body: 'When life gets busy and you take on so much responsibility, I silently worry whether you are getting enough sleep, eating on time, and taking care of yourself. Don’t forget to breathe and rest.',
      closing: 'Your health comes first. 🌸',
      date: 'Unspoken Words'
    },
    {
      pageNumber: 4,
      title: 'A Prayer in Every Temple',
      salutation: 'Radhe Radhe,',
      body: 'Whenever I visit a temple and bow my head before the deity, my prayer for you is simple: ‘Keep her heart pure, protect her from envy and malice, and shower her path with good health and laughter.’',
      closing: 'Under divine shelter. 🪷',
      date: 'Unspoken Words'
    },
    {
      pageNumber: 5,
      title: 'You Don’t Have to Prove Anything',
      salutation: 'Shree,',
      body: 'You hold yourself to exceptionally high standards, but I want you to know: you don’t need accolades, viral numbers, or perfection to be worthy. To me, your value was set the day you entered my life.',
      closing: 'You are enough, exactly as you are. 💖',
      date: 'Unspoken Words'
    },
    {
      pageNumber: 6,
      title: 'Always One Call Away',
      salutation: 'Dearest Shree,',
      body: 'If the world ever feels loud, confusing, or ungrateful, remember you have a refuge. No explanations needed, no judgments passed — just a brother who loves you and believes in you unconditionally.',
      closing: 'Forever in your corner, Karthik. ♡',
      date: 'March 6, 2027'
    }
  ]
};

export const STORY_BOOKS: Record<string, StoryBook> = {
  'letter-open': BOOK_LETTER_TO_SHREE,
  'why-you-matter': BOOK_WHY_YOU_MATTER,
  'memories-we-share': BOOK_MEMORIES_WE_SHARE,
  'gratitude': BOOK_SIBLING_ALLIANCE,
  'things-i-never-said': BOOK_THINGS_I_NEVER_SAID
};

// Backward compatibility
export const LETTER_PAGES: LetterPage[] = BOOK_LETTER_TO_SHREE.pages;

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
    title: 'Garuda Gamana Tava',
    artist: 'Shree Naval Kishori',
    album: 'Sacred Invocations',
    duration: '4:20',
    durationSeconds: 260,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/1s.jpg',
    subtitle: 'Mahav Vishnu Stotram • Sacred Grace',
    spotifyUri: 'spotify:track:garuda-gamana',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 2,
    title: 'Sri Venkatesha Stotram',
    artist: 'Shree Naval Kishori, Ashwin Trivedi',
    album: 'Divine Radiance',
    duration: '4:32',
    durationSeconds: 272,
    audioUrl: '/assets/audio/ambient.mp3',
    coverImage: '/assets/serial/2s.jpg',
    subtitle: 'Seven Hills Sacred Hymn',
    spotifyUri: 'spotify:track:venkatesha-stotram',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 3,
    title: 'Jaya Janardhana',
    artist: 'Shree Naval Kishori',
    album: 'Sacred Bhakti',
    duration: '5:26',
    durationSeconds: 326,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/11s.jpg',
    subtitle: 'Bhakti • Closer to You',
    spotifyUri: 'spotify:track:jaya-janardhana',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 4,
    title: 'Ramachandraya Janaka',
    artist: 'Shree Naval Kishori',
    album: 'Mangala Stotram',
    duration: '3:28',
    durationSeconds: 208,
    audioUrl: '/assets/audio/background.mp3',
    coverImage: '/assets/serial/13s.jpg',
    subtitle: 'Sita Rama Mangala Gaan',
    spotifyUri: 'spotify:track:ramachandraya-janaka',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 5,
    title: 'Shri Hari Stotram',
    artist: 'Shree Naval Kishori, Ashwin Trivedi',
    album: 'Maha Stotram',
    duration: '3:56',
    durationSeconds: 236,
    audioUrl: '/assets/audio/track3.mp3',
    coverImage: '/assets/serial/14s.jpg',
    subtitle: 'Jagajjaalapaalam Sacred Chant',
    spotifyUri: 'spotify:track:shri-hari-stotram',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 6,
    title: 'Aditya Hridaya Stotra',
    artist: 'Shree Naval Kishori',
    album: 'Surya Upasana',
    duration: '6:16',
    durationSeconds: 376,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/16s.jpg',
    subtitle: 'Sage Agastya Surya Hymn',
    spotifyUri: 'spotify:track:aditya-hridaya',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 7,
    title: 'Jai Dev Jai Dev',
    artist: 'Shree Naval Kishori',
    album: 'Ganesh Aradhana',
    duration: '4:11',
    durationSeconds: 251,
    audioUrl: '/assets/audio/ambient.mp3',
    coverImage: '/assets/serial/17s.jpg',
    subtitle: 'Mangal Murti Aarti',
    spotifyUri: 'spotify:track:jai-dev-jai-dev',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 8,
    title: 'Harivarasanam',
    artist: 'Shree Naval Kishori',
    album: 'Sabarimala Sacred Melodies',
    duration: '7:56',
    durationSeconds: 476,
    audioUrl: '/assets/audio/background.mp3',
    coverImage: '/assets/serial/18s.jpg',
    subtitle: 'Viswamohanam Divine Lullaby',
    spotifyUri: 'spotify:track:harivarasanam',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 9,
    title: 'Kaal Bhairav Ashtakam',
    artist: 'Shree Naval Kishori',
    album: 'Kashi Kshetra',
    duration: '4:21',
    durationSeconds: 261,
    audioUrl: '/assets/audio/track3.mp3',
    coverImage: '/assets/serial/19s.jpg',
    subtitle: 'Devaraja Sevyamana Sacred Hymn',
    spotifyUri: 'spotify:track:kaal-bhairav',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
  },
  {
    id: 10,
    title: 'Ganapati Thalam',
    artist: 'Shree Naval Kishori',
    album: 'Vakratunda Invocations',
    duration: '3:22',
    durationSeconds: 202,
    audioUrl: '/assets/audio/sacred_flute.mp3',
    coverImage: '/assets/serial/20s.jpg',
    subtitle: 'Gajananam Sacred Rhythm',
    spotifyUri: 'spotify:track:ganapati-thalam',
    spotifyUrl: 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C'
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
