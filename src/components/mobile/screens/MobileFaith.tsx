import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Flame, Sparkles } from 'lucide-react';
import { WashiTape } from '../shared/WashiTape';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileFaithProps {
  onBack: () => void;
}

export const MobileFaith: React.FC<MobileFaithProps> = ({ onBack }) => {
  const [diyasLit, setDiyasLit] = useState(3);

  const lightDiya = () => {
    soundEngine.playSparkle(1.5);
    setDiyasLit((d) => d + 1);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#1a1122] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Twilight Temple Riverbank matching Screen 08 */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/serial/11s.jpg"
          alt="Temple Twilight"
          className="w-full h-full object-cover object-[50%_25%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#150a1c] via-[#1a0f24]/50 to-black/40" />
      </div>

      <div>
        <MobileTopBar light />

        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/25 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#FFD93D] uppercase">
            SACRED FAITH
          </span>
          <div className="w-9" />
        </div>
      </div>

      {/* Floating Quote from Screen 08 */}
      <div className="relative z-10 px-8 my-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 max-w-xs"
        >
          <p className="font-playfair italic text-lg sm:text-xl text-pink-100 leading-snug">
            "In a loud world, she speaks kindness."
          </p>
        </motion.div>

        {/* Floating River Diyas */}
        <div className="flex items-center gap-3 mt-6">
          {Array.from({ length: Math.min(diyasLit, 6) }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2.5 + i * 0.3, ease: 'easeInOut' }}
              className="text-2xl drop-shadow-[0_0_12px_rgba(255,217,61,0.8)]"
            >
              🪔
            </motion.div>
          ))}
        </div>

        <button
          onClick={lightDiya}
          className="mt-4 flex items-center gap-2 px-5 py-2 rounded-full bg-amber-400/20 hover:bg-amber-400/30 border border-amber-300/40 text-[#FFD93D] text-xs font-fredoka font-semibold shadow-md active:scale-95 transition-all"
        >
          <Flame className="w-3.5 h-3.5 text-amber-300" />
          <span>Light a Floating Diya</span>
        </button>
      </div>

      {/* Torn Parchment Note matching Screen 08 bottom */}
      <div className="relative z-10 px-8 pb-8 flex flex-col items-center">
        <div className="relative bg-[#FFFDF5] text-[#3D2040] p-4 rounded-xl shadow-2xl border border-[#F3E8D0] max-w-xs text-center transform rotate-1">
          <WashiTape color="gold" rotation={-2} className="absolute -top-2 left-1/2 -translate-x-1/2" />
          <p className="font-caveat text-lg font-bold text-gray-800 leading-tight">
            Faith • Music • Kindness
          </p>
          <p className="font-script text-2xl text-[#FF4D8D] font-bold mt-1">
            You, Shree ♡
          </p>
        </div>
      </div>
    </div>
  );
};
