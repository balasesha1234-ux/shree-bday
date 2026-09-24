export interface FriendWish {
  id: number;
  name: string;
  shortName?: string;
  relation: string;
  avatarEmoji: string;
  avatarImg?: string;
  avatarPosition?: string;
  balloonColor: string;
  message: string;
  signature: string;
}

export const FRIEND_WISHES_DATA: FriendWish[] = [
  {
    id: 1,
    name: 'Karthik',
    relation: 'Website Architect & Brother 👑',
    avatarEmoji: '👑',
    balloonColor: 'bg-gradient-to-br from-[#FFD700] via-[#D4A84B] to-[#B8860B]',
    message: 'Architected and built this sanctuary with endless pride, devotion, and gratitude for the kindest sister in the world. I wanted to build something that could truly hold your memories, celebrate your grace, and protect your happiness forever. May your voice continue to touch souls across the world, and may Sri Sri Radha Krishna always shower you with infinite peace, health, and joy! Happy Birthday, Shree! 🪷✨',
    signature: 'Your brother & guardian always, Karthik 👑🛡️💻'
  },
  {
    id: 2,
    name: 'Arun',
    relation: 'Visual Artist & Creative Partner 🎨',
    avatarEmoji: '🎨',
    avatarImg: '/assets/team/arun.jpg',
    avatarPosition: 'center',
    balloonColor: 'bg-gradient-to-br from-[#FF6B9D] to-[#FF4D8D]',
    message: 'Happy Birthday, Shree ✨💗 May life bless you with good health, endless happiness, and may you truly deserve every good thing in the world.🌸 I hope you’re always surrounded by love, positivity, laughter, and wonderful people, and I’m grateful that I was one of them. Once again, Happiest Birthday, Devotional Queen @shreenavalkishori ✨🤍🫠',
    signature: 'With endless love & wishes, Arun 🎨✨'
  },
  {
    id: 3,
    name: 'Prasanya',
    relation: 'Karthik’s Favorite & Sister Circle 🌸',
    avatarEmoji: '🌸',
    avatarImg: '/assets/team/prasanya.jpg',
    avatarPosition: 'center',
    balloonColor: 'bg-gradient-to-br from-[#F472B6] to-[#DB2777]',
    message: 'Happiest Birthday to the sweetest, most graceful soul, Shree! 🌸✨ May your special year be overflowing with endless happiness, good health, divine blessings, and radiant smiles. You inspire so many with your warmth! Keep shining bright, gorgeous! 💖🪷',
    signature: 'Forever cheering for you with all my love, Prasanya 🌸💖'
  },
  {
    id: 4,
    name: 'Dhrubayan',
    relation: 'Special Blessings & Inner Circle ✨',
    avatarEmoji: '✨',
    avatarImg: '/assets/team/dhrubayan.jpg',
    avatarPosition: 'center',
    balloonColor: 'bg-gradient-to-br from-[#60A5FA] to-[#3B82F6]',
    message: 'Wishing Shree a joyous, blissful, and fulfilling birthday! Keep illuminating every space you enter with your pure heart, gentle strength, and spiritual positivity. May this year bring you immense success, health, and peace! 🌟',
    signature: 'With warmest wishes & infinite positivity, Dhrubayan ✨'
  },
  {
    id: 5,
    name: 'Vardhan Prabhu ji',
    shortName: 'Vardhan Ji',
    relation: 'Spiritual Guide & Mentor 🪷',
    avatarEmoji: '🪷',
    avatarImg: '/assets/team/vardhan.jpg',
    avatarPosition: 'center 18%',
    balloonColor: 'bg-gradient-to-br from-[#A855F7] to-[#7E22CE]',
    message: "Happy Birthday to u Shree ji From Your Insignificant Servent Gunda Vardhan...Keep Hardworking like this .... always Radha Krishna's and Srila Prabhupada blessings will be with you...Hare Krishna",
    signature: 'From Your Insignificant Servant, Gunda Vardhan 🪷🙏'
  }
];
