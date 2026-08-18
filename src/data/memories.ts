export interface PolaroidMemory {
  id: number;
  title: string;
  image: string;
  caption: string;
  date: string;
  tag: string;
  sticker: string;
  tapeColor: 'pink' | 'gold' | 'mint' | 'lavender';
  rotation: number;
}

export const MEMORIES_DATA: PolaroidMemory[] = [
  { id: 1, title: 'Pure Radiant Smile', image: '/assets/serial/1s.jpg', caption: 'The smile that lights up the whole room! Always proud of you, Shree 🌸', date: 'March 2026', tag: 'Pure Joy', sticker: '🌸', tapeColor: 'pink', rotation: -2.5 },
  { id: 2, title: 'Cat Whisperer', image: '/assets/serial/2s.jpg', caption: 'Stopping on the road to talk to a stray kitten for 15 minutes 🐱', date: 'Jan 2026', tag: 'Cat Lover', sticker: '🐱', tapeColor: 'mint', rotation: 3.1 },
  { id: 3, title: 'Sacred Devotion', image: '/assets/serial/3s.jpg', caption: 'Deep in prayer at the temple — your pure devotion is inspiring 🪷', date: 'Nov 2025', tag: 'Devotion', sticker: '🪷', tapeColor: 'gold', rotation: -1.8 },
  { id: 4, title: 'Sibling Banter', image: '/assets/serial/4s.jpg', caption: 'That goofy laughter when we shared the funniest inside joke ever 😂', date: 'Sept 2025', tag: 'Banter', sticker: '😂', tapeColor: 'lavender', rotation: 2.4 },
  { id: 5, title: 'Creator Milestones', image: '/assets/serial/5s.jpg', caption: 'Reaching a huge creator milestone! Nobody works harder than you 🚀', date: 'July 2025', tag: 'Milestone', sticker: '🚀', tapeColor: 'gold', rotation: -3.2 },
  { id: 6, title: 'Delhi Royalty', image: '/assets/serial/6s.jpg', caption: 'Aesthetic queen walking around Delhi looking like royalty ✨', date: 'May 2025', tag: 'Elegance', sticker: '✨', tapeColor: 'pink', rotation: 1.5 },
  { id: 7, title: 'Evening Chai Talks', image: '/assets/serial/7s.jpg', caption: 'Late evening chai and talking about our biggest life dreams ☕', date: 'April 2025', tag: 'Deep Talks', sticker: '☕', tapeColor: 'lavender', rotation: -2.0 },
  { id: 8, title: 'Spreading Warmth', image: '/assets/serial/8s.jpg', caption: 'Always making sure everyone around you is happy and smiling 💖', date: 'Feb 2025', tag: 'Kindness', sticker: '💖', tapeColor: 'pink', rotation: 2.8 },
  { id: 9, title: 'Peace by the Water', image: '/assets/serial/9s.jpg', caption: 'Peaceful moments by the river reflecting on life 🌊', date: 'Dec 2024', tag: 'Serenity', sticker: '🌊', tapeColor: 'mint', rotation: -1.4 },
  { id: 10, title: 'Iconic Expressions', image: '/assets/serial/10s.jpg', caption: 'That iconic dramatic reaction when something silly happened 🎭', date: 'Oct 2024', tag: 'Drama Queen', sticker: '🎭', tapeColor: 'gold', rotation: 3.5 },
  { id: 11, title: 'Temple Peace', image: '/assets/serial/11s.jpg', caption: 'Visiting sacred shrines and seeking divine Radharani blessings 🪷', date: 'Aug 2024', tag: 'Sacred Grace', sticker: '🪷', tapeColor: 'gold', rotation: -2.7 },
  { id: 12, title: 'Sweet Celebrations', image: '/assets/serial/12s.jpg', caption: 'Celebrating your achievements with ice cream and endless laughs 🍦', date: 'June 2024', tag: 'Celebration', sticker: '🍦', tapeColor: 'pink', rotation: 1.9 },
  { id: 13, title: 'Grace & Poise', image: '/assets/serial/13s.jpg', caption: 'Looking graceful in traditional attire — the true embodiment of grace 🌸', date: 'April 2024', tag: 'Grace', sticker: '🌸', tapeColor: 'lavender', rotation: -3.0 },
  { id: 14, title: 'Long Distance Calls', image: '/assets/serial/14s.jpg', caption: 'Every long-distance call from Hyderabad to Delhi keeping the bond strong 📞', date: 'Feb 2024', tag: 'Hyd ➔ Del', sticker: '📞', tapeColor: 'mint', rotation: 2.2 },
  { id: 15, title: 'New Chapter!', image: '/assets/serial/15s.jpg', caption: 'A brand new chapter with the biggest heart and the brightest future ahead! 🎂', date: 'March 2027', tag: 'New Chapter 🎂', sticker: '🎂', tapeColor: 'gold', rotation: -1.0 }
];
