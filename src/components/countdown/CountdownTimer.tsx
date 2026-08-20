import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LokiGlitchAge } from '../shared/LokiGlitchAge';

interface CountdownTimerProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  milliseconds: string;
}

const MINECRAFT_RUNES = ['ᔑ', 'ʖ', 'ᓵ', 'ᖱ', 'ᒷ', '⎓', 'ㄍ', '⍑', '╎', '⋮', 'ꖌ', 'ꖎ', 'ᒲ', 'リ', '𝙹', '!¡', 'ᑑ', '∷', 'ᓭ', 'ℸ ̣', '⚍', '⍊', '∴', '̇/', '||', 'ㄗ'];

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  days,
  hours,
  minutes,
  seconds,
  milliseconds
}) => {
  const [enchantPhrase, setEnchantPhrase] = useState('ᔑʖᓵᖱᒷ');

  useEffect(() => {
    const interval = setInterval(() => {
      const p = Array.from({ length: 5 }, () => MINECRAFT_RUNES[Math.floor(Math.random() * MINECRAFT_RUNES.length)]).join('');
      setEnchantPhrase(p);
    }, 90);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'DAYS', shortLabel: 'DAYS', value: days },
    { label: 'HOURS', shortLabel: 'HRS', value: hours },
    { label: 'MINUTES', shortLabel: 'MIN', value: minutes },
    { label: 'SECONDS', shortLabel: 'SEC', value: seconds }
  ];

  return (
    <div className="flex flex-col items-center justify-center my-6 sm:my-8 w-full max-w-4xl px-2 sm:px-4 select-none">
      {/* Loki / Minecraft Enchanting Table Age Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 inline-flex items-center justify-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 rounded-2xl bg-[#080816]/95 border border-emerald-500/40 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-xl"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-[11px] sm:text-xs font-space font-bold uppercase tracking-wider sm:tracking-widest text-emerald-400">
          LEVEL CIPHER:
        </span>
        <LokiGlitchAge suffix="CHAPTER" className="text-base sm:text-2xl" />
        <span className="font-mono text-xs text-purple-400 tracking-widest font-bold hidden sm:inline">
          [{enchantPhrase}]
        </span>
      </motion.div>

      {/* Responsive Countdown Grid */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 md:gap-6 w-full">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            className="flex flex-col items-center"
          >
            {/* Countdown Pod */}
            <div className="relative w-full py-3 sm:py-6 bg-gradient-to-b from-[#16142E]/95 via-[#1E193C]/95 to-[#120F24]/95 rounded-2xl sm:rounded-3xl border border-pink-500/40 shadow-[0_0_20px_rgba(255,45,120,0.3)] flex flex-col items-center justify-center overflow-hidden backdrop-blur-xl">
              {/* Top ambient glowing line */}
              <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF2D78] to-transparent opacity-80" />

              {/* Number */}
              <span className="font-space font-bold text-2xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tight drop-shadow-[0_0_20px_rgba(255,45,120,0.8)]">
                {unit.value}
              </span>

              {/* Scanline texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
            </div>

            {/* Label */}
            <span className="mt-2 text-[9px] sm:text-xs font-space tracking-[0.2em] text-pink-200/80 font-bold uppercase text-center">
              <span className="inline sm:hidden">{unit.shortLabel}</span>
              <span className="hidden sm:inline">{unit.label}</span>
            </span>
          </motion.div>
        ))}
      </div>

      {/* Quantum Sync Milliseconds */}
      <div className="mt-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A3A]/80 border border-pink-500/30 text-[11px] sm:text-xs font-space text-pink-300">
        <span className="w-2 h-2 rounded-full bg-[#FF2D78] animate-ping" />
        <span className="font-semibold">QUANTUM SYNC:</span>
        <span className="font-bold text-white tracking-widest">{milliseconds} ms</span>
      </div>
    </div>
  );
};
