import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Star, Heart, X, Compass, Orbit, Zap } from 'lucide-react';
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
    y: 28,
    size: 26,
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
    y: 18,
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
    y: 28,
    size: 26,
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
    y: 78,
    size: 34,
    glowColor: '#FF6B9D',
    tribute: 'Standing on the threshold of an extraordinary new chapter. Guided by courage, supported by everyone who loves her, and destined for greatness.',
    quote: '“The sky is not her limit; it is merely her starting canvas.”',
    image: '/assets/serial/23s.jpg'
  }
];

// Connection lines between stars
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
  const [stardustCount, setStardustCount] = useState<number>(1842);
  const [showShockwave, setShowShockwave] = useState<boolean>(false);
  const mapRef = useRef<HTMLDivElement>(null);

    // Jaw-Dropping 4-Wave Stardust Cascade & Golden Aurora Shockwave
  const triggerBigStardustExplosion = (e?: React.MouseEvent) => {
    soundEngine.playSparkle(1.6);
    soundEngine.playTempleBell();

    setShowShockwave(true);
    setTimeout(() => setShowShockwave(false), 1400);

    setStardustCount((prev) => prev + 1);

    const originX = e ? e.clientX / window.innerWidth : 0.5;
    const originY = e ? e.clientY / window.innerHeight : 0.5;

    // Wave 1: Central Golden Diamond & Star Burst (Immediate)
    confetti({
      particleCount: 160,
      spread: 180,
      origin: { x: originX, y: originY },
      colors: ['#FFD93D', '#FFE58F', '#FFFFFF', '#FF4D8D', '#FF85A1', '#7CEBC6'],
      ticks: 300,
      gravity: 0.7,
      scalar: 1.5,
      shapes: ['star', 'circle']
    });

    // Wave 2: Dual Cosmic Side Cannons (Left & Right Horizon)
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 55,
        spread: 90,
        origin: { x: 0.05, y: 0.7 },
        colors: ['#FFD93D', '#FF4D8D', '#E0D4F0', '#FFFFFF'],
        ticks: 280,
        gravity: 0.65,
        scalar: 1.4,
        shapes: ['star']
      });
      confetti({
        particleCount: 100,
        angle: 125,
        spread: 90,
        origin: { x: 0.95, y: 0.7 },
        colors: ['#FFD93D', '#7CEBC6', '#6BC5F8', '#FFFFFF'],
        ticks: 280,
        gravity: 0.65,
        scalar: 1.4,
        shapes: ['star']
      });
    }, 180);

    // Wave 3: High-Altitude Stardust Celestial Fountain
    setTimeout(() => {
      confetti({
        particleCount: 140,
        spread: 200,
        origin: { x: 0.5, y: 0.2 },
        colors: ['#FFD93D', '#FF6B9D', '#FFFFFF', '#7CEBC6', '#FFE58F'],
        ticks: 320,
        gravity: 0.5,
        scalar: 1.6,
        shapes: ['star', 'circle']
      });
    }, 380);

    // Wave 4: Gentle Floating Cosmic Glitter Rain
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 140,
        origin: { x: 0.5, y: 0.1 },
        colors: ['#FFD93D', '#FFFFFF', '#E0D4F0'],
        ticks: 400,
        gravity: 0.35,
        scalar: 1.2,
        shapes: ['star']
      });
    }, 600);
  };

  const handleStarClick = (star: ConstellationStar) => {
    soundEngine.playSparkle(1.3 + star.id * 0.1);
    setActiveStar(star);
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 mt-16 mb-24 select-none">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border border-pink-400/40 text-[#FF6B9D] text-xs font-space font-bold tracking-[0.25em] uppercase mb-3 shadow-[0_0_20px_rgba(255,45,120,0.3)]">
          <Orbit className="w-4 h-4 text-[#FFD93D] animate-spin" style={{ animationDuration: '10s' }} />
          <span>SHREE’S CELESTIAL GALAXY // 6 GUIDING STARS</span>
        </div>
        <h3 className="text-2xl sm:text-5xl md:text-6xl font-playfair font-bold text-white tracking-wide drop-shadow-[0_5px_25px_rgba(255,45,120,0.4)] px-2">
          The Constellation of Grace 🌌
        </h3>
        <p className="text-sm sm:text-base font-quicksand text-pink-100/80 mt-2 max-w-xl mx-auto leading-relaxed">
          Hover and tap the glowing stars across the night sky to explore her story, or ignite the galaxy with a massive stardust explosion!
        </p>
      </div>

      {/* Massive Stardust Shockwave Visual Overlay */}
      <AnimatePresence>
        {showShockwave && (
          <motion.div
            initial={{ opacity: 0.9, scale: 0.2 }}
            animate={{ opacity: 0, scale: 3.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              <div className="w-[85vw] h-[85vw] rounded-full border-4 border-[#FFD93D] shadow-[0_0_150px_#FF4D8D,inset_0_0_100px_#FFD93D] bg-gradient-to-r from-[#FF4D8D]/30 via-[#FFD93D]/40 to-[#7CEBC6]/30 backdrop-blur-md" />
              <div className="absolute w-[65vw] h-[65vw] rounded-full border-2 border-white/60 shadow-[0_0_80px_#FFFFFF]" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Interactive Constellation Star Map Container */}
      <div
        ref={mapRef}
        className="relative w-full min-h-[480px] sm:min-h-[540px] aspect-auto sm:aspect-[16/10] bg-gradient-to-b from-[#0F0C22]/95 via-[#181335]/95 to-[#0B091A]/95 rounded-3xl sm:rounded-[2.5rem] border-2 border-pink-500/40 shadow-[0_0_50px_rgba(255,45,120,0.3)] overflow-hidden p-4 sm:p-6"
      >
        {/* Deep Space Star Dust Background Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(#FF6B9D_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,77,141,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* SVG Constellation Connection Laser Beams */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <defs>
            <linearGradient id="beamGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF4D8D" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#FFD93D" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#7CEBC6" stopOpacity="0.7" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {CONNECTIONS.map(([startId, endId], idx) => {
            const startStar = CONSTELLATION_STARS.find((s) => s.id === startId);
            const endStar = CONSTELLATION_STARS.find((s) => s.id === endId);
            if (!startStar || !endStar) return null;

            const isHighLit =
              hoveredStarId === startId ||
              hoveredStarId === endId ||
              activeStar?.id === startId ||
              activeStar?.id === endId;

            return (
              <g key={`line-${idx}`}>
                <line
                  x1={`${startStar.x}%`}
                  y1={`${startStar.y}%`}
                  x2={`${endStar.x}%`}
                  y2={`${endStar.y}%`}
                  stroke={isHighLit ? 'url(#beamGradient)' : 'rgba(255, 77, 141, 0.25)'}
                  strokeWidth={isHighLit ? '3' : '1.5'}
                  strokeDasharray={isHighLit ? 'none' : '4 4'}
                  filter={isHighLit ? 'url(#glow)' : undefined}
                  className="transition-all duration-300"
                />
              </g>
            );
          })}
        </svg>

        {/* Render 6 Interactive Stars */}
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
              {/* Outer Pulsing Aura Ring */}
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-35 pointer-events-none"
                style={{
                  backgroundColor: star.glowColor,
                  width: star.size * 2,
                  height: star.size * 2,
                  left: -star.size / 2,
                  top: -star.size / 2,
                  animationDuration: `${2.5 + star.id * 0.3}s`
                }}
              />

              {/* Glowing Star Orb */}
              <div
                className="relative rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 group-hover:scale-110"
                style={{
                  width: star.size * 1.5,
                  height: star.size * 1.5,
                  backgroundColor: star.glowColor,
                  boxShadow: `0 0 25px ${star.glowColor}, 0 0 50px ${star.glowColor}80`
                }}
              >
                <span className="text-base sm:text-lg filter drop-shadow">
                  {star.emoji}
                </span>
              </div>

              {/* Hover Badge Pill */}
              <div className="mt-2 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-pink-400/50 text-[10px] sm:text-xs font-space font-bold text-white whitespace-nowrap shadow-xl opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all">
                {star.name}
              </div>
            </motion.div>
          );
        })}

        {/* Bottom Floating Stardust Ignition Bar inside Map */}
        <div className="absolute bottom-4 inset-x-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 p-3 sm:p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10">
          <div className="flex items-center gap-2 text-xs font-space text-pink-200">
            <Sparkles className="w-4 h-4 text-[#FFD93D] animate-pulse" />
            <span>
              <strong className="text-[#FFD93D] font-bold">{stardustCount.toLocaleString()}</strong> STARDUST BLESSINGS SENT ✨
            </span>
          </div>

          <button
            onClick={triggerBigStardustExplosion}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD93D] via-[#FF4D8D] to-[#FF2D78] hover:brightness-110 text-white font-fredoka font-bold text-xs sm:text-sm shadow-[0_0_20px_rgba(255,217,61,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <Zap className="w-4 h-4 fill-current text-amber-200" />
            <span>Drop Big Stardust Explosion 🌟</span>
          </button>
        </div>
      </div>

      {/* Full-Screen Star Relic Modal */}
      <AnimatePresence>
        {activeStar && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveStar(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg select-none"
          >
            <motion.div
              initial={{ scale: 0.88, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.88, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-gradient-to-b from-[#1F193B] via-[#16122C] to-[#0D0B18] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-400/60 text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveStar(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-pink-500/30 text-gray-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Theme Badge */}
              <div
                className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-[11px] font-space font-bold uppercase tracking-wider mb-4 border"
                style={{
                  backgroundColor: `${activeStar.glowColor}20`,
                  borderColor: activeStar.glowColor,
                  color: activeStar.glowColor
                }}
              >
                <span>{activeStar.theme}</span>
              </div>

              {/* Star Portrait Frame */}
              <div
                className="relative aspect-square max-w-[240px] mx-auto rounded-3xl overflow-hidden border-4 shadow-2xl mb-4"
                style={{ borderColor: activeStar.glowColor }}
              >
                <img
                  src={activeStar.image}
                  alt={activeStar.name}
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <span className="absolute bottom-3 right-3 text-4xl filter drop-shadow">
                  {activeStar.emoji}
                </span>
              </div>

              {/* Title & Tribute */}
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
                {activeStar.name}
              </h3>

              <div className="my-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-2.5">
                <p className="font-quicksand text-xs sm:text-sm text-pink-100/90 leading-relaxed">
                  {activeStar.tribute}
                </p>
                <p className="font-caveat text-xl sm:text-2xl text-[#FFD93D] italic">
                  {activeStar.quote}
                </p>
              </div>

              {/* Send Stardust Button */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-space text-gray-400">
                  MARCH 6 • CELEBRATING SHREE
                </span>

                <button
                  onClick={(e) => {
                    triggerBigStardustExplosion(e);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] hover:scale-105 active:scale-95 text-white font-fredoka font-bold text-xs shadow-pop transition-all"
                >
                  <Sparkles className="w-4 h-4 fill-current text-white" />
                  <span>Send Stardust ✨</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
