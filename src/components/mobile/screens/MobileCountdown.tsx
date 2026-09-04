import React from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { WashiTape } from '../shared/WashiTape';
import { useCountdown } from '../../../hooks/useCountdown';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileCountdownProps {
  onNext: () => void;
  onPrev: () => void;
}

export const MobileCountdown: React.FC<MobileCountdownProps> = ({ onNext, onPrev }) => {
  const countdown = useCountdown();

  const handleNextClick = () => {
    soundEngine.playSparkle(1.5);
    onNext();
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#1a0e20] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Depth Background with Animated Golden Stardust */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="/assets/serial/6s.jpg"
          alt="Atmosphere"
          className="w-full h-full object-cover blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0e20]/90 via-[#22102a]/85 to-[#1a0e20]" />
      </div>

      <MobileTopBar light />

      {/* Top Taped Note matching reference */}
      <div className="relative z-10 px-8 pt-2 flex flex-col items-center">
        <div className="relative bg-[#FFFDF7] text-[#3D2040] px-6 py-3.5 rounded-2xl shadow-xl border border-[#F3E8D0] max-w-xs text-center transform -rotate-1">
          <WashiTape color="pink" rotation={-4} className="absolute -top-2.5 left-1/2 -translate-x-1/2" />
          <p className="font-caveat text-xl font-bold leading-tight text-[#FF2D78]">
            "Good people make brighter days. ♡"
          </p>
        </div>
      </div>

      {/* Central Luxury Days Counter Module with Gold Fluted Pods */}
      <div className="relative z-10 px-5 my-auto text-center flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-playfair italic text-2xl text-pink-100 mb-6 drop-shadow-sm flex items-center gap-2"
        >
          <span>Her day is almost here...</span>
          <Sparkles className="w-4 h-4 text-[#FFD93D] animate-spin" style={{ animationDuration: '6s' }} />
        </motion.p>

        {/* 4 Luxury Pods with Gold Shimmer & Space Font */}
        <div className="grid grid-cols-4 gap-2.5 w-full max-w-sm">
          {[
            { label: 'DAYS', val: countdown.formattedDays },
            { label: 'HOURS', val: countdown.formattedHours },
            { label: 'MIN', val: countdown.formattedMinutes },
            { label: 'SEC', val: countdown.formattedSeconds }
          ].map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: 'spring', stiffness: 220 }}
              className="relative bg-gradient-to-b from-white/15 to-white/5 backdrop-blur-xl rounded-2xl p-3 sm:p-3.5 border-2 border-amber-300/30 flex flex-col items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.3)] hover:border-pink-300 transition-colors"
            >
              {/* Subtle gold fluted corner notch */}
              <div className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-[#FFD93D]/60" />

              <span className="font-space text-2xl sm:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                {item.val}
              </span>
              <span className="font-space text-[9px] font-bold text-pink-300/90 tracking-widest uppercase mt-1">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Pinned Note with Heart */}
      <div className="relative z-10 px-8 pb-8 flex flex-col items-center text-center">
        <div className="bg-black/45 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-xs font-quicksand text-pink-100 max-w-xs leading-relaxed shadow-lg">
          <p className="italic">
            "Some wishes are meant to remind you how grateful you are."
          </p>
          <span className="block text-pink-300 text-base mt-1 font-bold">♡</span>
        </div>

        <button
          onClick={handleNextClick}
          className="mt-5 flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FF4D8D] to-[#FF2D78] text-[#3D2040] font-fredoka font-bold text-xs shadow-[0_0_20px_rgba(255,77,141,0.5)] hover:scale-105 active:scale-95 transition-all"
        >
          <span>Unlock Celebrations</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#3D2040]" />
        </button>
      </div>
    </div>
  );
};
