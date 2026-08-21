import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Lock, ShieldCheck, X, ZoomIn, Camera } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface MemoryCard {
  id: string;
  title: string;
  subtitle: string;
  note: string;
  image: string;
  tilt: number;
  badge: string;
}

const MEMORIES: MemoryCard[] = [
  {
    id: 'baby',
    title: 'The Tiny Legend Era 🍼',
    subtitle: 'Little Shree • Purest Cuteness',
    note: 'Sorry for using this pic haha, but you look SOOO cute in this! 🥹❤️',
    image: '/assets/images/childhood_baby.jpg',
    tilt: -3.5,
    badge: 'STAGE 1: TODDLER DAYS ✨'
  },
  {
    id: 'traditional',
    title: 'Sacred Devotional Days 💛',
    subtitle: 'Radha Rani Grace • Sibling Bond',
    note: 'Unbreakable brotherly protection since the golden days! 🪷🛡️',
    image: '/assets/images/childhood_memory.jpg',
    tilt: 0,
    badge: 'STAGE 2: SIBLING CODEX 🪷'
  },
  {
    id: 'cart',
    title: 'Village & Gaumata Days 🐄',
    subtitle: 'Riverbank Bullock Cart Adventure',
    note: 'Animal lover & kindest soul since day one! 🌾🌸',
    image: '/assets/images/childhood_bullock_cart.jpg',
    tilt: 3.5,
    badge: 'STAGE 3: PURE HEART 🌾'
  }
];

export const ChildhoodPolaroid: React.FC = () => {
  const [selectedMemory, setSelectedMemory] = useState<MemoryCard | null>(null);

  const handleCardClick = (memory: MemoryCard) => {
    soundEngine.playCameraShutter();
    setSelectedMemory(memory);
  };

  return (
    <section className="relative w-full max-w-6xl mx-auto my-16 px-4 select-none">
      {/* Header with Confidentiality Notice */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-200 text-xs font-space font-bold tracking-widest uppercase mb-3 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>GOLDEN VAULT • SACRED MEMORY ARCHIVE 📷</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-fredoka font-bold text-white mb-2">
          The Secret Childhood Polaroid Gallery 💛
        </h3>

        {/* Prominent Sibling Confidentiality & Apology Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl bg-black/60 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-space font-semibold backdrop-blur-md shadow-lg my-2 max-w-2xl">
          <Lock className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />
          <span>🔒 100% PRIVATE SIBLING VAULT • NO ONE CAN ACCESS THESE EXCEPT ME AND YOU 🛡️</span>
        </div>

        <p className="text-xs sm:text-sm font-quicksand text-amber-100/70 mt-2 max-w-xl mx-auto italic">
          "Sorry for using these photos haha, but you look so very cute in all of them! 🥹💛"
        </p>
      </div>

      {/* 3-Card 3D Depth Polaroid Deck */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center justify-center pt-4">
        {MEMORIES.map((memory) => (
          <motion.div
            key={memory.id}
            initial={{ rotate: memory.tilt, y: 0 }}
            whileHover={{
              rotate: 0,
              scale: 1.05,
              y: -12,
              zIndex: 20
            }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={() => handleCardClick(memory)}
            className="relative cursor-pointer group bg-[#FCFBF7] p-4 sm:p-5 pb-6 sm:pb-7 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.65),0_0_30px_rgba(234,179,8,0.2)] border border-amber-200/50 flex flex-col justify-between transform-gpu"
          >
            {/* Vintage Masking Tape at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-6 bg-amber-200/85 backdrop-blur-sm border border-amber-300/60 shadow-sm rounded-sm -rotate-1 pointer-events-none z-10" />

            {/* Photo Container */}
            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-200 shadow-inner">
              <img
                src={memory.image}
                alt={memory.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Soft Warm Film Grain & Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-950/25 via-transparent to-amber-500/10 pointer-events-none" />

              {/* Hover Zoom Prompt */}
              <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <span className="px-3.5 py-1.5 rounded-full bg-white/95 text-stone-800 text-xs font-fredoka font-bold flex items-center gap-1.5 shadow-xl">
                  <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tap to Enlarge</span>
                </span>
              </div>

              {/* Top Badge */}
              <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] font-space font-bold text-amber-300">
                {memory.badge}
              </div>
            </div>

            {/* Handwritten Caption Section */}
            <div className="mt-4 text-center">
              <h4 className="font-fredoka font-bold text-base text-stone-900 mb-1">
                {memory.title}
              </h4>
              <p className="font-caveat text-lg sm:text-xl font-bold text-amber-900 leading-snug">
                "{memory.note}"
              </p>
              <div className="mt-2.5 pt-2 border-t border-stone-200/70 flex items-center justify-center gap-1 text-[10px] sm:text-xs font-space font-semibold text-stone-500 uppercase tracking-wider">
                <Heart className="w-3 h-3 fill-amber-500 text-amber-500" />
                <span>{memory.subtitle}</span>
              </div>
            </div>
          </motion.div>
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
              className="relative max-w-4xl w-full bg-[#FCFBF7] p-5 sm:p-8 rounded-3xl shadow-2xl border border-amber-200/60 cursor-default"
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-space font-bold uppercase mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                  <span>Private Sibling Vault Item</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-stone-900">
                  {selectedMemory.title}
                </h3>
                <p className="font-caveat text-2xl sm:text-3xl font-bold text-amber-900 mt-2">
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
