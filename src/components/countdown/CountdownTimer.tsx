import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Clock, Eye } from 'lucide-react';
import { AngelCountdownModal } from './AngelCountdownModal';
import { soundEngine } from '../../utils/soundEffects';

interface CountdownTimerProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
}

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  days,
  hours,
  minutes,
  seconds,
  milliseconds
}) => {
  const [isAngelModalOpen, setIsAngelModalOpen] = useState(false);

  const units = [
    { label: 'DAYS', value: days, delay: 0 },
    { label: 'HOURS', value: hours, delay: 0.12 },
    { label: 'MINUTES', value: minutes, delay: 0.24 },
    { label: 'SECONDS', value: seconds, delay: 0.36 }
  ];

  const handleOpenAngelModal = () => {
    soundEngine.playSparkle(1.5);
    setIsAngelModalOpen(true);
  };

  return (
    <>
      <div
        onClick={handleOpenAngelModal}
        className="flex flex-col items-center justify-center my-6 sm:my-10 w-full max-w-5xl px-2 sm:px-4 select-none cursor-pointer group"
      >
        {/* 4 Massive Zero-Gravity Floating Holographic Aerospace Glass Pods */}
        <div className="grid grid-cols-4 gap-3 sm:gap-5 md:gap-7 w-full">
          {units.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -10, 0]
              }}
              transition={{
                opacity: { delay: index * 0.08, duration: 0.5 },
                y: { repeat: Infinity, duration: 4.8 + unit.delay, ease: 'easeInOut', delay: unit.delay }
              }}
              className="flex flex-col items-center"
            >
              <div className="relative w-full py-6 sm:py-10 md:py-14 bg-gradient-to-b from-[#1E1738]/90 via-[#16102D]/95 to-[#0C081B]/98 rounded-2xl sm:rounded-[2.5rem] border-2 border-white/25 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,77,141,0.35)] flex flex-col items-center justify-center overflow-hidden backdrop-blur-3xl transition-all duration-300 group-hover:border-pink-400/70 group-hover:shadow-[0_0_50px_rgba(255,77,141,0.65)] group-hover:scale-[1.02]">
                {/* Holographic Laser Sheen on top border */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent shadow-[0_0_20px_#FFD93D]" />

                {/* Number Container with Kinetic Flip / Slide Transition */}
                <div className="relative h-12 sm:h-24 md:h-28 lg:h-32 w-full flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={unit.value}
                      initial={{ y: -35, opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ y: 35, opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="font-space font-extrabold text-4xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tight drop-shadow-[0_0_30px_rgba(255,77,141,0.8)] leading-none text-center"
                    >
                      {unit.value}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Aerospace Label Pill */}
              <span className="mt-3.5 sm:mt-4 px-4 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] sm:text-xs md:text-sm font-space tracking-[0.25em] text-pink-200 font-extrabold uppercase text-center backdrop-blur-md shadow-md">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Zero-Latency Quantum Sync Pill & Tap Hint */}
        <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-space text-pink-200 backdrop-blur-md shadow-lg group-hover:border-amber-300/60 group-hover:bg-white/15 transition-all">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D8D] animate-ping" />
          <span className="font-semibold">LIVE QUANTUM SYNC:</span>
          <span className="font-extrabold text-[#FFD93D] tracking-wider">{milliseconds} ms</span>
          <span className="text-pink-300 font-bold ml-1 flex items-center gap-1">
            <span>•</span>
            <span className="text-amber-300">✨ Tap for Angel Tribute 🪽</span>
          </span>
        </div>
      </div>

      {/* Angel Tribute Pop-up Modal */}
      <AngelCountdownModal
        isOpen={isAngelModalOpen}
        onClose={() => setIsAngelModalOpen(false)}
      />
    </>
  );
};
