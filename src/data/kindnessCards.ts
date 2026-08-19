export interface KindnessCard {
  id: number;
  badge: string;
  title: string;
  quote: string;
  description: string;
  icon: 'heart' | 'lotus' | 'cat' | 'sparkle' | 'smile' | 'star';
  bgGradient: string;
  image: string;
}

export const KINDNESS_CARDS_DATA: KindnessCard[] = [
  {
    id: 1,
    badge: "WARMTH & EMPATHY",
    title: "A Presence That Heals",
    quote: "She doesn't just create content; she creates a safe, gentle space.",
    description: "In an internet full of noise, Shree's kindness stands out like a soothing sanctuary. She makes every single person feel acknowledged, loved, and worthy.",
    icon: "heart",
    bgGradient: "from-[#FFF0F3] to-[#FFE5EC]",
    image: "/assets/serial/16s.jpg"
  },
  {
    id: 2,
    badge: "DEVOTION & PURITY",
    title: "Grace Rooted in Bhakti",
    quote: "Her devotion to Radharani reflects in the quiet radiance of her character.",
    description: "Her spiritual reverence isn't a persona — it's the genuine heartbeat of her humility. It keeps her grounded, peaceful, and full of divine grace.",
    icon: "lotus",
    bgGradient: "from-[#FFFDF0] to-[#FFF4D6]",
    image: "/assets/serial/17s.jpg"
  },
  {
    id: 3,
    badge: "COMPASSION FOR CREATURES",
    title: "The Cat Protector 🐱",
    quote: "A person's true nature is seen in how they treat little animals.",
    description: "Her eyes melt the moment she sees a kitten. Her genuine tenderness for street animals speaks louder than words about the gentleness of her soul.",
    icon: "cat",
    bgGradient: "from-[#F0F8FF] to-[#E1F5FE]",
    image: "/assets/serial/18s.jpg"
  },
  {
    id: 4,
    badge: "PLAYFUL JOY",
    title: "Laughter That Illuminates",
    quote: "A joyful spirit that refuses to let adulthood steal her wonder.",
    description: "She can turn the most ordinary mundane moment into a belly-laugh celebration with her silly jokes, playful teasings, and infectious smile.",
    icon: "smile",
    bgGradient: "from-[#F3E5F5] to-[#EDE7F6]",
    image: "/assets/serial/19s.jpg"
  },
  {
    id: 5,
    badge: "HUMBLE AUTHENTICITY",
    title: "Always True to Herself",
    quote: "Kindness is not what she does; it is simply who she is.",
    description: "Never boastful, always uplifting others, and consistently choosing empathy over ego. That is the rare magic of Shree.",
    icon: "star",
    bgGradient: "from-[#FFF5F5] to-[#FFE0E6]",
    image: "/assets/serial/20s.jpg"
  },
  {
    id: 6,
    badge: "RADIANT SMILES",
    title: "Infinite Positivity",
    quote: "Her optimism spreads light wherever her footsteps fall.",
    description: "Bringing positive energy, heartwarming creativity, and unshakeable resilience to everyone around her.",
    icon: "sparkle",
    bgGradient: "from-[#F0FDF4] to-[#DCFCE7]",
    image: "/assets/serial/21s.jpg"
  }
];
