export interface FriendWish {
  id: number;
  name: string;
  relation: string;
  avatarEmoji: string;
  avatarImg?: string;
  balloonColor: string;
  message: string;
  signature: string;
}

export const FRIEND_WISHES_DATA: FriendWish[] = [
  {
    id: 1,
    name: 'Arun',
    relation: 'Creative Partner & Artist',
    avatarEmoji: '🎨',
    avatarImg: '/assets/team/arun.jpg',
    balloonColor: 'bg-gradient-to-br from-[#FF6B9D] to-[#FF4D8D]',
    message: 'Happy Birthday, Shree ✨💗 May life bless you with good health, endless happiness, and may you truly deserve every good thing in the world.🌸 I hope you’re always surrounded by love, positivity, laughter, and wonderful people, and I’m grateful that I was one of them. Once again, Happiest Birthday, Devotional Queen @shreenavalkishori ✨🤍🫠',
    signature: 'With endless love & wishes, Arun 🎨✨'
  },
  {
    id: 2,
    name: 'Prasanya',
    relation: 'Karthik’s Favorite & Sister Circle',
    avatarEmoji: '🌸',
    avatarImg: '/assets/team/prasanya.jpg',
    balloonColor: 'bg-gradient-to-br from-[#F472B6] to-[#DB2777]',
    message: 'Happiest Birthday to the sweetest, most graceful soul, Shree! 🌸✨ May your special year be overflowing with endless happiness, good health, divine blessings, and radiant smiles. You inspire so many with your warmth! Keep shining bright, gorgeous! 💖🪷',
    signature: 'With warmest love, Prasanya 🌸'
  },
  {
    id: 3,
    name: 'Dhrubayan',
    relation: 'Special Blessings & Inner Circle',
    avatarEmoji: '✨',
    avatarImg: '/assets/team/dhrubayan.jpg',
    balloonColor: 'bg-gradient-to-br from-[#60A5FA] to-[#3B82F6]',
    message: 'Wishing Shree a very Happy Birthday! May life bring you immense success, health, and peace. Keep spreading your positive energy and grace wherever you go! 🌟',
    signature: 'Best wishes, Dhrubayan ✨'
  },
  {
    id: 4,
    name: 'Maa & Papa',
    relation: 'Family',
    avatarEmoji: '👨‍👩‍👧',
    balloonColor: 'bg-[#FF6B9D]',
    message: 'Happy Birthday to our dearest darling! May God bless you with health, success, and pure joy always. So proud of the woman you are becoming! 💖',
    signature: 'With all our blessings'
  },
  {
    id: 5,
    name: 'Your Brother in Hyd',
    relation: 'Brother / Shield',
    avatarEmoji: '🛡️',
    balloonColor: 'bg-[#D4A84B]',
    message: 'Happy Birthday to the greatest sister figure! I will always have your back no matter what. Keep smiling and shining from Delhi to the world! 🌸',
    signature: 'Your Brother in Hyderabad 🛡️'
  },
  {
    id: 6,
    name: 'Riya (Bestie)',
    relation: 'Soul Sister',
    avatarEmoji: '👭',
    balloonColor: 'bg-[#7CEBC6]',
    message: 'Happy Birthday my forever partner in crime! From college drama to 3am gossip, I couldn’t survive without you. Love you to the moon! 🎂✨',
    signature: 'Your soul sister'
  },
  {
    id: 7,
    name: 'Ananya',
    relation: 'Close Friend',
    avatarEmoji: '🌸',
    balloonColor: 'bg-[#FFD93D]',
    message: 'Happy Birthday Shree! You are the warmest, sweetest person in every room. Keep being your authentic radiant self! 🪷',
    signature: 'Forever cheering for you'
  },
  {
    id: 8,
    name: 'Karan',
    relation: 'Friend',
    avatarEmoji: '😎',
    balloonColor: 'bg-[#A78BFA]',
    message: 'Happy Birthday Shree! Treat party is pending in Delhi! Wishing you massive creator milestones and endless happiness this year!',
    signature: 'Party hard!'
  },
  {
    id: 9,
    name: 'Pooja Di',
    relation: 'Elder Sister',
    avatarEmoji: '👑',
    balloonColor: 'bg-[#F472B6]',
    message: 'Happy Birthday little one! May Radharani always wrap you in her blessings and fulfill every silent wish of your pure heart! 🪷🌸',
    signature: 'Big hugs & blessings'
  },
  {
    id: 10,
    name: 'Simran & Gang',
    relation: 'The Squad',
    avatarEmoji: '🎉',
    balloonColor: 'bg-[#38BDF8]',
    message: 'Happy Birthday to our favorite cat queen! Can’t wait to celebrate with you soon! 🐱🎂💖',
    signature: 'The Squad'
  }
];
