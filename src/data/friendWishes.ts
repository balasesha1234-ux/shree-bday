export interface FriendWish {
  id: number;
  name: string;
  relation: string;
  avatarEmoji: string;
  balloonColor: string;
  message: string;
  signature: string;
}

export const FRIEND_WISHES_DATA: FriendWish[] = [
  {
    id: 1,
    name: 'Maa & Papa',
    relation: 'Family',
    avatarEmoji: '👨‍👩‍👧',
    balloonColor: 'bg-[#FF6B9D]',
    message: 'Happy Birthday to our dearest darling! May God bless you with health, success, and pure joy always. So proud of the woman you are becoming! 💖',
    signature: 'With all our blessings'
  },
  {
    id: 2,
    name: 'Your Brother in Hyd',
    relation: 'Brother / Shield',
    avatarEmoji: '🛡️',
    balloonColor: 'bg-[#D4A84B]',
    message: 'Happy Birthday to the greatest sister figure! I will always have your back no matter what. Keep smiling and shining from Delhi to the world! 🌸',
    signature: 'Your Brother in Hyderabad 🛡️'
  },
  {
    id: 3,
    name: 'Riya (Bestie)',
    relation: 'Soul Sister',
    avatarEmoji: '👭',
    balloonColor: 'bg-[#7CEBC6]',
    message: 'Happy Birthday my forever partner in crime! From college drama to 3am gossip, I couldn’t survive without you. Love you to the moon! 🎂✨',
    signature: 'Your soul sister'
  },
  {
    id: 4,
    name: 'Ananya',
    relation: 'Close Friend',
    avatarEmoji: '🌸',
    balloonColor: 'bg-[#FFD93D]',
    message: 'Happy Birthday Shree! You are the warmest, sweetest person in every room. Keep being your authentic radiant self! 🪷',
    signature: 'Forever cheering for you'
  },
  {
    id: 5,
    name: 'Karan',
    relation: 'Friend',
    avatarEmoji: '😎',
    balloonColor: 'bg-[#A78BFA]',
    message: 'Happy  Shree! Treat party is pending in Delhi! Wishing you massive creator milestones and endless happiness this year!',
    signature: 'Party hard!'
  },
  {
    id: 6,
    name: 'Pooja Di',
    relation: 'Elder Sister',
    avatarEmoji: '👑',
    balloonColor: 'bg-[#F472B6]',
    message: 'Happy Birthday little one! May Radharani always wrap you in her blessings and fulfill every silent wish of your pure heart! 🪷🌸',
    signature: 'Big hugs & blessings'
  },
  {
    id: 7,
    name: 'Simran & Gang',
    relation: 'The Squad',
    avatarEmoji: '🎉',
    balloonColor: 'bg-[#38BDF8]',
    message: 'Happy Birthday to our favorite cat queen! Can’t wait to celebrate with you soon! 🐱🎂💖',
    signature: 'The Squad'
  }
];
