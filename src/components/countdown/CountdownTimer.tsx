import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { AngelCountdownModal, CountdownUnitType } from './AngelCountdownModal';
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
  const [selectedUnit, setSelectedUnit] = useState<CountdownUnitType>('SECONDS');

  const units: { label: CountdownUnitType; value: string; delay: number }[] = [
    { label: 'DAYS', value: days, delay: 0 },
    { label: 'HOURS', value: hours, delay: 0.12 },
    { label: 'MINUTES', value: minutes, delay: 0.24 },
    { label: 'SECONDS', value: seconds, delay: 0.36 }
  ];

  const handleOpenPod = (unit: CountdownUnitType, index: number) => {
    setSelectedUnit(unit);
    soundEngine.playHarmonicPop(index);
    setIsAngelModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-6 sm:my-10 w-full max-w-5xl px-2 sm:px-4 select-none">
        {/* 4 Massive Zero-Gravity Floating Holographic Aerospace Glass Pods */}
        <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-7 w-full max-w-full">
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
              onClick={() => handleOpenPod(unit.label, index)}
              className="flex flex-col items-center cursor-pointer group"
            >
              <div className="relative w-full py-4 sm:py-8 md:py-14 bg-gradient-to-b from-[#1E1738]/90 via-[#16102D]/95 to-[#0C081B]/98 rounded-xl sm:rounded-[2.5rem] border-2 border-white/25 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(255,77,141,0.35)] flex flex-col items-center justify-center overflow-hidden backdrop-blur-3xl transition-all duration-300 group-hover:border-amber-300/80 group-hover:shadow-[0_0_50px_rgba(255,217,61,0.6)] group-hover:scale-[1.03]">
                {/* Holographic Laser Sheen on top border */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent shadow-[0_0_20px_#FFD93D]" />

                {/* Number Container with Kinetic Flip / Slide Transition */}
                <div className="relative h-10 sm:h-20 md:h-28 lg:h-32 w-full flex items-center justify-center overflow-hidden">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.span
                      key={unit.value}
                      initial={{ y: -35, opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                      animate={{ y: 0, opacity: 1, scale: 1, filter: 'blur(0px)' }}
                      exit={{ y: 35, opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="font-space font-extrabold text-2xl xs:text-3xl sm:text-6xl md:text-8xl lg:text-9xl text-white tracking-tight drop-shadow-[0_0_30px_rgba(255,77,141,0.8)] leading-none text-center"
                    >
                      {unit.value}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>

              {/* Aerospace Label Pill */}
              <span className="mt-2 sm:mt-4 px-2 sm:px-4 py-0.5 sm:py-1 rounded-full bg-white/10 border border-white/20 text-[9px] sm:text-xs md:text-sm font-space tracking-[0.25em] text-pink-200 font-extrabold uppercase text-center backdrop-blur-md shadow-md group-hover:border-amber-300/60 group-hover:text-amber-200 transition-colors">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Zero-Latency Quantum Sync Pill & Interactive Tap Hint */}
        <div
          onClick={() => handleOpenPod('SECONDS', 3)}
          className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-2.5 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-space text-pink-200 backdrop-blur-md shadow-lg cursor-pointer hover:border-amber-300/60 hover:bg-white/15 hover:scale-105 active:scale-95 transition-all"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D8D] animate-ping" />
          <span className="font-semibold">LIVE QUANTUM SYNC:</span>
          <span className="font-extrabold text-[#FFD93D] tracking-wider">{milliseconds} ms</span>
          <span className="text-pink-300 font-bold ml-1 flex items-center gap-1">
            <span>•</span>
            <span className="text-amber-300">✨ Tap any pod for Angel Chronometer 🪽</span>
          </span>
        </div>
      </div>

      {/* Angel Tribute Pop-up Modal */}
      <AngelCountdownModal
        isOpen={isAngelModalOpen}
        onClose={() => setIsAngelModalOpen(false)}
        initialUnit={selectedUnit}
      />
    </>
  );
};
