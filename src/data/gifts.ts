export interface GiftBox {
  id: number;
  title: string;
  emoji: string;
  boxColor: string;
  badge: string;
  revealTitle: string;
  revealContent: string;
}

export const GIFTS_DATA: GiftBox[] = [
  {
    id: 1,
    title: 'The Bro-Protection Shield 🛡️',
    emoji: '🛡️',
    boxColor: 'from-amber-100 to-amber-200',
    badge: 'SIBLING PACT #1',
    revealTitle: 'Unconditional Sibling Shield Activated',
    revealContent: 'No matter what happens in life, where you are, or what drama comes your way, you will always have your brother standing right in front of you as your rock and shield.'
  },
  {
    id: 2,
    title: '2:00 AM Rant Pass ☕',
    emoji: '☕',
    boxColor: 'from-pink-100 to-rose-200',
    badge: 'NO JUDGMENT ZONE',
    revealTitle: '24/7 Sister Support Helpline',
    revealContent: 'Valid anytime: Cry, rant about work, vent about annoying people, or send 40 random cat reels. Zero judgment, 100% brotherly listening.'
  },
  {
    id: 3,
    title: 'Delhi ➔ Hyd All-Snacks Pass 🍕',
    emoji: '🍕',
    boxColor: 'from-orange-100 to-amber-200',
    badge: 'FOODIE VOUCHER',
    revealTitle: '100% Unlimited Treats on Demand',
    revealContent: 'Whenever you visit or we meet: All your favorite biryani, chaat, pastries, and ice creams are 100% on my tab. No questions asked!'
  },
  {
    id: 4,
    title: 'Lifetime Kitty Foster Fund 🐾',
    emoji: '🐱',
    boxColor: 'from-emerald-100 to-teal-200',
    badge: 'FOR THE KITTENS',
    revealTitle: 'Unlimited Cat Treats & Rescue Fund',
    revealContent: 'A dedicated promise to always support every stray kitten you rescue, baby-talk with, or want to feed. The cats of the world thank you, Shree!'
  },
  {
    id: 5,
    title: 'Proud Brother Milestone Trophy 🏆',
    emoji: '🏆',
    boxColor: 'from-purple-100 to-indigo-200',
    badge: 'ETERNAL RESPECT',
    revealTitle: 'Best Sister & Creator in the World',
    revealContent: 'Watching you grow, work so hard, stay humble, and spread so much kindness fills my heart with immense brotherly pride. Keep conquering the world!'
  }
];
