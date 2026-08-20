import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Heart, Star } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface ConstellationStar {
  id: number;
  name: string;
  theme: string;
  emoji: string;
  x: number; // Percentage 0-100
  y: number; // Percentage 0-100
  size: number;
  glowColor: string;
  tribute: string;
  quote: string;
  image: string;
}

const CONSTELLATION_STARS: ConstellationStar[] = [
  {
    id: 1,
    name: 'Star of Radiant Kindness',
    theme: 'COMPASSION & WARMTH 🌸',
    emoji: '🌸',
    x: 18,
    y: 25,
    size: 28,
    glowColor: '#FF4D8D',
    tribute: 'A constant beacon of empathy. She never passes someone in need without offering warmth, gentle words, and a listening heart.',
    quote: '“Her presence turns ordinary moments into unforgettable memories.”',
    image: '/assets/serial/1s.jpg'
  },
  {
    id: 2,
    name: 'Star of Sacred Grace',
    theme: 'DEVOTION & PEACE 🪷',
    emoji: '🪷',
    x: 50,
    y: 15,
    size: 32,
    glowColor: '#FFD93D',
    tribute: 'Anchored in humble prayers, traditional roots, and the divine grace of Radha Rani. Her soul radiates quiet strength and pure light.',
    quote: '“Grounded by faith, elevated by humility, guided by devotion.”',
    image: '/assets/serial/3s.jpg'
  },
  {
    id: 3,
    name: 'The Whiskered Guardian',
    theme: 'ANIMAL LOVER & PURRS 🐾',
    emoji: '🐱',
    x: 82,
    y: 25,
    size: 28,
    glowColor: '#7CEBC6',
    tribute: 'The greatest friend every stray kitten could ask for. Her tender care for little street animals shows the purity of her spirit.',
    quote: '“A heart that stops for little paws is a heart touched by grace.”',
    image: '/assets/serial/2s.jpg'
  },
  {
    id: 4,
    name: 'Star of Creative Brilliance',
    theme: 'ARTISTRY & PASSION 🚀',
    emoji: '✨',
    x: 24,
    y: 65,
    size: 28,
    glowColor: '#6BC5F8',
    tribute: 'Bringing imagination to life with tireless dedication, storytelling talent, and a creative spark that inspires thousands every single day.',
    quote: '“She creates worlds out of dreams and lights them with her smile.”',
    image: '/assets/serial/5s.jpg'
  },
  {
    id: 5,
    name: 'Star of Golden Laughter',
    theme: 'JOY & CANDID SMILES 🎭',
    emoji: '🎭',
    x: 76,
    y: 65,
    size: 28,
    glowColor: '#E0D4F0',
    tribute: 'Those priceless bursts of laughter that light up whole rooms. Unfiltered, contagious joy that makes everyone around her feel at home.',
    quote: '“Laughter that echoes like temple bells on a sunny morning.”',
    image: '/assets/serial/10s.jpg'
  },
  {
    id: 6,
    name: 'The Polaris of Big Dreams',
    theme: 'THE BRIGHT FUTURE 🌟',
    emoji: '🌟',
    x: 50,
    y: 80,
    size: 34,
    glowColor: '#FF6B9D',
    tribute: 'Standing on the threshold of an extraordinary new chapter. Guided by courage, supported by everyone who loves her, and destined for greatness.',
    quote: '“The sky is not her limit; it is merely her starting canvas.”',
    image: '/assets/serial/23s.jpg'
  }
];

const CONNECTIONS = [
  [1, 2],
  [2, 3],
  [1, 4],
  [3, 5],
  [4, 6],
  [5, 6],
  [2, 6],
  [1, 5],
  [3, 4]
];

export const CosmicConstellation: React.FC = () => {
  const [activeStar, setActiveStar] = useState<ConstellationStar | null>(null);
  const [hoveredStarId, setHoveredStarId] = useState<number | null>(null);
  const [stardustCount, setStardustCount] = useState<number>(2450);
  const [isExploding, setIsExploding] = useState<boolean>(false);

  // Trigger Full-Screen Cinematic 4-Wave Stardust Explosion
  const triggerMassiveStardustExplosion = (e?: React.MouseEvent) => {
    soundEngine.playSparkle(1.5);
    soundEngine.playStardustExplosion();
    setIsExploding(true);
    setStardustCount((prev) => prev + 1);

    const clickX = e ? e.clientX / window.innerWidth : 0.5;
    const clickY = e ? e.clientY / window.innerHeight : 0.5;

    // --- WAVE 1: Central Golden Diamond & Stardust Burst ---
    confetti({
      particleCount: 160,
      spread: 160,
      origin: { x: clickX, y: clickY },
      colors: ['#FFD93D', '#FF4D8D', '#7CEBC6', '#FFFFFF', '#FF6B9D'],
      ticks: 350,
      gravity: 0.7,
      scalar: 1.4,
      shapes: ['star', 'circle']
    });

    // --- WAVE 2: Dual Cosmic Cannons from Horizon (after 180ms) ---
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 55,
        spread: 90,
        origin: { x: 0.05, y: 0.65 },
        colors: ['#FFD93D', '#FF4D8D', '#E0D4F0', '#FFFFFF'],
        ticks: 300,
        scalar: 1.2,
        shapes: ['star']
      });

      confetti({
        particleCount: 80,
        angle: 125,
        spread: 90,
        origin: { x: 0.95, y: 0.65 },
        colors: ['#7CEBC6', '#FF4D8D', '#FFD93D', '#FFFFFF'],
        ticks: 300,
        scalar: 1.2,
        shapes: ['star']
      });
    }, 180);

    // --- WAVE 3: High-Altitude Celestial Fountain (after 420ms) ---
    setTimeout(() => {
      confetti({
        particleCount: 140,
        spread: 200,
        origin: { x: 0.5, y: 0.25 },
        colors: ['#FF4D8D', '#FFD93D', '#6BC5F8', '#FFFFFF'],
        ticks: 350,
        gravity: 0.6,
        scalar: 1.3,
        shapes: ['star', 'circle']
      });
    }, 420);

    // --- WAVE 4: Gentle Floating Cosmic Glitter Rain ---
    setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 180,
        origin: { x: 0.5, y: 0.1 },
        colors: ['#FFD93D', '#FFFFFF', '#FFB6C1'],
        ticks: 400,
        gravity: 0.4,
        scalar: 0.9,
        shapes: ['circle']
      });
    }, 700);

    setTimeout(() => setIsExploding(false), 2400);
  };

  const handleStarClick = (star: ConstellationStar) => {
    soundEngine.playTap();
    setActiveStar(star);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-2 mt-12 mb-16 select-none">
      {/* Dynamic Screen-Covering Shockwave Rings */}
      <AnimatePresence>
        {isExploding && (
          <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
            {/* Shockwave Ring 1 */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeOut' }}
              className="w-[30vw] h-[30vw] rounded-full border-4 border-[#FFD93D] shadow-[0_0_80px_rgba(255,217,61,0.8)]"
            />
            {/* Shockwave Ring 2 */}
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 4.2, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeOut', delay: 0.15 }}
              className="absolute w-[25vw] h-[25vw] rounded-full border-4 border-[#FF4D8D] shadow-[0_0_100px_rgba(255,77,141,0.8)]"
            />
            {/* Ambient Aurora Flash */}
            <motion.div
              initial={{ opacity: 0.4 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              className="absolute inset-0 bg-gradient-to-t from-[#FF4D8D]/20 via-[#FFD93D]/20 to-transparent"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-400/30 text-[#FF6B9D] text-xs font-space font-semibold uppercase tracking-widest mb-2 shadow-sm">
          <Star className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D] animate-spin" />
          <span>INTERACTIVE STAR MAP & STARDUST GALAXY 🌌</span>
        </div>
        <h3 className="text-3xl sm:text-5xl font-fredoka font-bold text-white drop-shadow-[0_4px_20px_rgba(255,77,141,0.4)]">
          The Constellation of Grace
        </h3>
        <p className="text-xs sm:text-sm font-quicksand text-pink-100/80 mt-1 max-w-md mx-auto">
          Tap any glowing star node to reveal her memories, or ignite the giant screen-wide Stardust Explosion!
        </p>
      </div>

      {/* Seamless Floating Star Map (Responsive 480px) */}
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 backdrop-blur-md overflow-hidden p-4 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        {/* SVG Laser Beams */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="starBeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D8D" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFD93D" stopOpacity="1" />
              <stop offset="100%" stopColor="#7CEBC6" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {CONNECTIONS.map(([startId, endId], idx) => {
            const s1 = CONSTELLATION_STARS.find((s) => s.id === startId);
            const s2 = CONSTELLATION_STARS.find((s) => s.id === endId);
            if (!s1 || !s2) return null;

            const isHighLit =
              hoveredStarId === startId ||
              hoveredStarId === endId ||
              activeStar?.id === startId ||
              activeStar?.id === endId;

            return (
              <line
                key={`beam-${idx}`}
                x1={`${s1.x}%`}
                y1={`${s1.y}%`}
                x2={`${s2.x}%`}
                y2={`${s2.y}%`}
                stroke={isHighLit ? 'url(#starBeam)' : 'rgba(255, 77, 141, 0.3)'}
                strokeWidth={isHighLit ? '3' : '1.5'}
                strokeDasharray={isHighLit ? 'none' : '4 4'}
                className="transition-all duration-300"
              />
            );
          })}
        </svg>

        {/* 6 Interactive Stars with Pulsing Glow Auras */}
        {CONSTELLATION_STARS.map((star) => {
          const isSelected = activeStar?.id === star.id;
          const isHovered = hoveredStarId === star.id;

          return (
            <motion.div
              key={star.id}
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              animate={{
                y: [0, -6, 0],
                scale: isHovered || isSelected ? 1.25 : 1
              }}
              transition={{
                y: { repeat: Infinity, duration: 3 + star.id * 0.4, ease: 'easeInOut' },
                scale: { duration: 0.2 }
              }}
              onMouseEnter={() => setHoveredStarId(star.id)}
              onMouseLeave={() => setHoveredStarId(null)}
              onClick={() => handleStarClick(star)}
              className="absolute z-10 cursor-pointer flex flex-col items-center group select-none"
            >
              {/* Star Orb */}
              <div
                className="relative rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: star.size * 1.35,
                  height: star.size * 1.35,
                  backgroundColor: star.glowColor,
                  boxShadow: `0 0 25px ${star.glowColor}AA`
                }}
              >
                <span className="text-base sm:text-lg filter drop-shadow">
                  {star.emoji}
                </span>

                {/* Animated Pulsing Ring */}
                <span
                  className="absolute inset-0 rounded-full animate-ping opacity-40"
                  style={{ backgroundColor: star.glowColor }}
                />
              </div>

              {/* Star Label */}
              <div className="mt-2 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-pink-400/50 text-[10px] sm:text-xs font-space font-bold text-white whitespace-nowrap shadow-lg">
                {star.name}
              </div>
            </motion.div>
          );
        })}

        {/* Bottom Control Bar */}
        <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between gap-2 p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
          <span className="text-xs font-space text-pink-200">
            ✨ <strong className="text-[#FFD93D]">{stardustCount}</strong> Stardust Explosions Triggered
          </span>

          {/* Big Stardust Explosion Button */}
          <button
            onClick={(e) => triggerMassiveStardustExplosion(e)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[#FF4D8D] via-[#FFD93D] to-[#FF2D78] text-[#1A0B1A] font-fredoka font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(255,217,61,0.7)] hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 fill-[#1A0B1A]" />
            <span>Drop Big Stardust Explosion 🌟</span>
          </button>
        </div>
      </div>

      {/* Star Modal */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStar(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full bg-gradient-to-b from-[#1E1838] via-[#141029] to-[#0D0B18] rounded-3xl p-6 shadow-2xl border border-pink-400/50 text-center overflow-hidden"
            >
              <button
                onClick={() => setActiveStar(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-pink-500/30 text-gray-300 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div
                className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-space font-bold uppercase tracking-wider mb-3 border"
                style={{
                  backgroundColor: `${activeStar.glowColor}20`,
                  borderColor: activeStar.glowColor,
                  color: activeStar.glowColor
                }}
              >
                <span>{activeStar.theme}</span>
              </div>

              {/* Photo Portrait */}
              <div
                className="relative aspect-square max-w-[210px] mx-auto rounded-2xl overflow-hidden border-2 shadow-2xl mb-3"
                style={{ borderColor: activeStar.glowColor }}
              >
                <img
                  src={activeStar.image}
                  alt={activeStar.name}
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <span className="absolute bottom-2 right-2 text-2xl filter drop-shadow">
                  {activeStar.emoji}
                </span>
              </div>

              <h4 className="font-playfair text-2xl font-bold text-white">
                {activeStar.name}
              </h4>

              <div className="my-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2">
                <p className="font-quicksand text-xs text-pink-100/90 leading-relaxed">
                  {activeStar.tribute}
                </p>
                <p className="font-caveat text-xl text-[#FFD93D] italic">
                  {activeStar.quote}
                </p>
              </div>

              <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-space text-gray-400">
                  MARCH 6 • CELEBRATION
                </span>

                <button
                  onClick={(e) => {
                    triggerMassiveStardustExplosion(e);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] hover:scale-105 active:scale-95 text-white font-fredoka font-bold text-xs shadow-pop transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Send Stardust 🌟</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
