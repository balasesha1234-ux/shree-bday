import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Heart, Lock, ShieldCheck, X, ZoomIn, Camera, Star } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface MemoryCardData {
  id: string;
  title: string;
  subtitle: string;
  note: string;
  image: string;
  initialRotate: number;
  initialScale: number;
  depthZ: number;
  badge: string;
  emoji: string;
}

const MEMORIES: MemoryCardData[] = [
  {
    id: 'baby',
    title: 'The Tiny Legend Era 🍼',
    subtitle: 'Little Shree • Purest Cuteness',
    note: 'Sorry for using this pic haha, but you look SOOO cute in this! 🥹❤️',
    image: '/assets/images/childhood_baby.jpg',
    initialRotate: -5,
    initialScale: 0.93,
    depthZ: -40,
    badge: 'STAGE 1: TODDLER DAYS ✨',
    emoji: '👶'
  },
  {
    id: 'traditional',
    title: 'Sacred Devotional Days 💛',
    subtitle: 'Radha Rani Grace • Sibling Bond',
    note: 'Unbreakable brotherly protection since the golden days! 🪷🛡️',
    image: '/assets/images/childhood_memory.jpg',
    initialRotate: 1.8,
    initialScale: 1.06,
    depthZ: 40,
    badge: 'STAGE 2: SIBLING CODEX 🪷',
    emoji: '🪷'
  },
  {
    id: 'cart',
    title: 'Village & Gaumata Days 🐄',
    subtitle: 'Riverbank Bullock Cart Adventure',
    note: 'Animal lover & kindest soul since day one! 🌾🌸',
    image: '/assets/images/childhood_bullock_cart.jpg',
    initialRotate: 5,
    initialScale: 0.93,
    depthZ: -40,
    badge: 'STAGE 3: PURE HEART 🌾',
    emoji: '🐮'
  }
];

// Interactive 3D Tilt Card (Replicating Memory Lane's Gyroscopic Physics & Glare)
const InteractivePolaroidCard: React.FC<{
  memory: MemoryCardData;
  isCenter: boolean;
  onSelect: (mem: MemoryCardData) => void;
}> = ({ memory, isCenter, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse coordinate motion values for spring-damped tilt
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 180 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [0, 1], [-15, 15]);
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playTap();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleClick = () => {
    soundEngine.playCameraShutter();
    confetti({
      particleCount: 30,
      spread: 70,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#FF2D78', '#FFD93D', '#7CEBC6', '#FFFFFF']
    });
    onSelect(memory);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative flex justify-center cursor-pointer py-4"
      style={{ perspective: '1200px' }}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
          zIndex: isHovered ? 40 : isCenter ? 25 : 10
        }}
        initial={{
          rotate: memory.initialRotate,
          scale: memory.initialScale,
          y: isCenter ? -12 : 12,
          z: memory.depthZ
        }}
        animate={{
          rotate: isHovered ? 0 : memory.initialRotate,
          scale: isHovered ? 1.08 : memory.initialScale,
          y: isHovered ? -24 : isCenter ? -12 : 12,
          z: isHovered ? 60 : memory.depthZ
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`relative bg-[#FCFBF7] p-4 sm:p-5 pb-6 sm:pb-7 rounded-3xl border border-amber-200/70 flex flex-col justify-between transform-gpu w-full max-w-sm ${
          isCenter
            ? 'shadow-[0_25px_65px_rgba(255,77,141,0.3),0_15px_35px_rgba(0,0,0,0.18)] ring-2 ring-pink-400/40'
            : 'shadow-[0_15px_45px_rgba(0,0,0,0.16)] opacity-95 hover:opacity-100'
        }`}
      >
        {/* Vintage Masking Tape at Top with Realistic Shadow */}
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 bg-amber-200/90 backdrop-blur-sm border border-amber-300/80 shadow-md rounded-sm pointer-events-none z-20 ${
            isCenter ? '-rotate-2' : 'rotate-1'
          }`}
        />

        {/* Dynamic Holographic Glare Overlay */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none z-30 opacity-25 mix-blend-overlay bg-gradient-to-tr from-transparent via-white to-transparent"
            style={{
              backgroundPosition: `${glareX} ${glareY}`
            }}
          />
        )}

        {/* Photo Container with Depth Sheen */}
        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-950 border border-stone-200 shadow-inner">
          <img
            src={memory.image}
            alt={memory.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          />

          {/* Soft Warm Film Grain & Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-amber-950/25 via-transparent to-amber-500/10 pointer-events-none" />

          {/* Floating Sparkle Icon */}
          <motion.div
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-md text-amber-500"
          >
            <Sparkles className="w-3.5 h-3.5" />
          </motion.div>

          {/* Hover Zoom Prompt */}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
            <span className="px-4 py-2 rounded-full bg-white/95 text-[#FF2D78] text-xs font-fredoka font-bold flex items-center gap-1.5 shadow-2xl scale-95 hover:scale-100 transition-transform">
              <ZoomIn className="w-4 h-4 text-[#FF2D78]" />
              <span>Tap to Enlarge</span>
            </span>
          </div>

          {/* Top Stage Badge */}
          <div className="absolute top-2.5 left-2.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[9px] font-space font-bold text-[#FFD93D] shadow-sm">
            {memory.badge}
          </div>
        </div>

        {/* Handwritten Caption Section */}
        <div className="mt-4 text-center">
          <h4 className="font-fredoka font-bold text-base sm:text-lg text-stone-900 mb-1 flex items-center justify-center gap-1.5">
            <span>{memory.title}</span>
          </h4>
          <p className="font-caveat text-xl sm:text-2xl font-bold text-pink-900 leading-snug">
            "{memory.note}"
          </p>
          <div className="mt-2.5 pt-2 border-t border-stone-200 flex items-center justify-center gap-1 text-[10px] sm:text-xs font-space font-bold text-stone-600 uppercase tracking-wider">
            <Heart className="w-3.5 h-3.5 fill-[#FF2D78] text-[#FF2D78]" />
            <span>{memory.subtitle}</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const ChildhoodPolaroid: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryCardData | null>(null);

  return (
    <section className="relative w-full max-w-6xl mx-auto my-16 px-4 select-none">
      {/* Header with High-Contrast Rich Pink Title & Badges */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 border border-pink-300 text-[#FF2D78] text-xs font-space font-bold tracking-widest uppercase mb-3 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF2D78]" />
          <span>GOLDEN VAULT • SACRED MEMORY ARCHIVE 📷</span>
        </div>

        {/* Rich Pink Heading with Crisp Drop Shadow */}
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-fredoka font-bold text-[#FF2D78] drop-shadow-sm mb-3">
          The Secret Childhood Polaroid Gallery 💛
        </h3>

        {/* Prominent Sibling Confidentiality Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-[#2D1B2D] border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-space font-bold shadow-xl my-2 max-w-2xl">
          <Lock className="w-4 h-4 text-[#FFD93D] shrink-0 animate-pulse" />
          <span>🔒 100% PRIVATE SIBLING VAULT • NO ONE CAN ACCESS THESE EXCEPT ME AND YOU 🛡️</span>
        </div>

        {/* Heartfelt Apology & Note */}
        <p className="text-sm sm:text-base font-caveat font-bold text-pink-900/90 mt-2 max-w-xl mx-auto">
          "Sorry for using these photos haha, but you look so very cute in all of them! 🥹💛"
        </p>
      </div>

      {/* 3D Depth Interactive Polaroid Cards (Center Elevated, Sides in Background Depth) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-4 md:gap-6 items-center justify-center pt-6 max-w-5xl mx-auto">
        {MEMORIES.map((memory) => (
          <InteractivePolaroidCard
            key={memory.id}
            memory={memory}
            isCenter={memory.id === 'traditional'}
            onSelect={(mem) => setSelectedMemory(mem)}
          />
        ))}
      </div>

      {/* High-Resolution Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#FCFBF7] p-5 sm:p-8 rounded-3xl shadow-2xl border border-pink-200/70 cursor-default"
            >
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-all shadow-md z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>

              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100 text-[#FF2D78] text-xs font-space font-bold uppercase mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#FF2D78]" />
                  <span>Private Sibling Vault Item</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-stone-900">
                  {selectedMemory.title}
                </h3>
                <p className="font-caveat text-2xl sm:text-3xl font-bold text-pink-900 mt-2">
                  "{selectedMemory.note}"
                </p>
                <p className="font-quicksand text-xs sm:text-sm text-stone-500 mt-1">
                  🔒 Confidential Sibling Vault • Strictly for you & your brother figure.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
