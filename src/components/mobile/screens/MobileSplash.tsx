import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, Sparkles } from 'lucide-react';
import { MobileTopBar } from '../shared/MobileTopBar';

interface MobileSplashProps {
  onNext: () => void;
}

export const MobileSplash: React.FC<MobileSplashProps> = ({ onNext }) => {
  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#120816] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* LAYER 1: Deep Atmosphere Background */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1c0b20] via-[#120816] to-[#0a040d]" />

      {/* LAYER 2: GIANT CALLIGRAPHY BEHIND SHREE (Depth Effect) */}
      <div className="absolute inset-0 z-1 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        {/* Giant Glowing Calligraphic "Shree" Floating Behind Her */}
        <motion.div
          animate={{ scale: [1, 1.03, 1], y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
          className="font-script text-8xl sm:text-9xl text-pink-300/25 drop-shadow-[0_0_40px_rgba(255,105,180,0.4)] transform -rotate-3 select-none text-center"
        >
          Shree ♡
        </motion.div>

        {/* Calligraphic "A Brighter Kinder Tomorrow" Behind */}
        <motion.div
          animate={{ opacity: [0.6, 0.9, 0.6] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="font-script text-4xl sm:text-5xl text-amber-200/35 drop-shadow-[0_0_20px_rgba(255,217,61,0.3)] mt-2 select-none text-center"
        >
          A Brighter Kinder Tomorrow
        </motion.div>
      </div>

      {/* LAYER 3: SHREE'S PORTRAIT (Masked into middle ground) */}
      <div className="absolute inset-0 z-2 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative w-full h-full"
        >
          <img
            src="/assets/serial/1s.jpg"
            alt="Shree"
            className="w-full h-full object-cover object-[50%_18%] opacity-90 [mask-image:linear-gradient(to_bottom,black_75%,transparent_98%)]"
          />
          {/* Subtle warm rose vignette over image */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#120816] via-transparent to-black/30" />
        </motion.div>
      </div>

      {/* LAYER 4: Ambient Floating Stardust & Petals */}
      <div className="absolute inset-0 z-3 pointer-events-none">
        <motion.div
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="absolute top-1/4 left-6 text-pink-300/60 text-lg"
        >
          🌸
        </motion.div>
        <motion.div
          animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
          transition={{ repeat: Infinity, duration: 6 }}
          className="absolute top-1/3 right-8 text-amber-300/60 text-sm"
        >
          ✨
        </motion.div>
      </div>

      {/* LAYER 5: FOREGROUND UI & STATUS */}
      <div className="relative z-10">
        <MobileTopBar light />

        {/* Top Header Badge */}
        <div className="px-6 pt-1 flex items-center justify-between">
          <span className="font-script text-2xl text-pink-200 drop-shadow-md">
            A Brighter Kinder Tomorrow
          </span>
          <Sparkles className="w-4 h-4 text-[#FFD93D] animate-pulse" />
        </div>
      </div>

      {/* Bottom Callout & Swipe Button */}
      <div className="relative z-10 px-8 pb-10 flex flex-col items-center text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-script text-2xl text-pink-200 tracking-wider mb-0"
        >
          For
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="font-script text-6xl sm:text-7xl text-white drop-shadow-[0_4px_25px_rgba(255,77,141,0.7)] leading-none my-1"
        >
          Shree ♡
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xs sm:text-sm font-quicksand text-pink-100/90 font-medium max-w-xs mt-2 leading-relaxed"
        >
          A little world made with a lot of love.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-pink-300 text-lg mt-0.5"
        >
          ♡
        </motion.div>

        {/* Tap to Begin Button */}
        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 flex flex-col items-center gap-1 group cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-pink-200 group-hover:bg-[#FF4D8D] group-hover:text-white transition-colors shadow-lg"
          >
            <ChevronUp className="w-5 h-5" />
          </motion.div>
          <span className="text-[10px] font-space font-bold tracking-widest text-pink-100 uppercase mt-1">
            Tap to begin
          </span>
        </motion.button>
      </div>
    </div>
  );
};
