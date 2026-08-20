import React from 'react';
import { motion } from 'framer-motion';

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
  const units = [
    { label: 'DAYS', value: days, delay: 0 },
    { label: 'HOURS', value: hours, delay: 0.15 },
    { label: 'MINUTES', value: minutes, delay: 0.3 },
    { label: 'SECONDS', value: seconds, delay: 0.45 }
  ];

  return (
    <div className="flex flex-col items-center justify-center my-6 sm:my-8 w-full max-w-3xl px-2 select-none">
      {/* 4 Zero-Gravity Floating Holographic Aerospace Glass Pods */}
      <div className="grid grid-cols-4 gap-2.5 sm:gap-4 md:gap-5 w-full">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0]
            }}
            transition={{
              opacity: { delay: index * 0.08, duration: 0.5 },
              y: { repeat: Infinity, duration: 4.5 + unit.delay, ease: 'easeInOut', delay: unit.delay }
            }}
            className="flex flex-col items-center group"
          >
            <div className="relative w-full py-4 sm:py-7 bg-gradient-to-b from-[#1C1635]/80 via-[#16112C]/90 to-[#0D091D]/95 rounded-2xl sm:rounded-3xl border border-white/20 shadow-[0_10px_35px_rgba(0,0,0,0.6),0_0_20px_rgba(255,77,141,0.25)] flex flex-col items-center justify-center overflow-hidden backdrop-blur-2xl transition-all duration-300 group-hover:border-pink-400/50 group-hover:shadow-[0_0_30px_rgba(255,77,141,0.5)]">
              {/* Holographic Laser Sheen on top border */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent shadow-[0_0_12px_#FFD93D]" />

              {/* Number with Laser Hologram Glow */}
              <span className="font-space font-bold text-2xl sm:text-5xl md:text-6xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,77,141,0.7)]">
                {unit.value}
              </span>
            </div>

            {/* Aerospace Label Pill */}
            <span className="mt-2.5 px-3 py-0.5 rounded-full bg-white/5 border border-white/10 text-[9px] sm:text-xs font-space tracking-[0.2em] text-pink-200 font-bold uppercase text-center backdrop-blur-md">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Zero-Latency Quantum Sync Pill */}
      <div className="mt-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/15 text-[11px] font-space text-pink-200/80 backdrop-blur-md shadow-sm">
        <span className="w-2 h-2 rounded-full bg-[#FF4D8D] animate-ping" />
        <span>LIVE QUANTUM SYNC:</span>
        <span className="font-bold text-[#FFD93D] tracking-wider">{milliseconds} ms</span>
      </div>
    </div>
  );
};
