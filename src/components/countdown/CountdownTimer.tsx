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
      const p = Array.from({ length: 6 }, () => MINECRAFT_RUNES[Math.floor(Math.random() * MINECRAFT_RUNES.length)]).join('');
      setEnchantPhrase(p);
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: 'DAYS', value: days },
    { label: 'HOURS', value: hours },
    { label: 'MINUTES', value: minutes },
    { label: 'SECONDS', value: seconds }
  ];

  return (
    <div className="flex flex-col items-center justify-center my-8 w-full max-w-4xl px-4 select-none">
      {/* Loki / Minecraft Enchanting Table Age Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6 flex flex-wrap items-center justify-center gap-3 px-5 py-2 rounded-2xl bg-[#080816]/90 border border-emerald-500/40 shadow-[0_0_30px_rgba(34,197,94,0.3)] backdrop-blur-xl"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-xs font-space font-bold uppercase tracking-widest text-emerald-400">
          LEVEL CIPHER:
        </span>
        <LokiGlitchAge suffix="CHAPTER" className="text-lg sm:text-2xl" />
        <span className="font-mono text-xs text-purple-400 tracking-widest font-bold hidden sm:inline">
          [{enchantPhrase}]
        </span>
      </motion.div>

      {/* Glitch Timer Cards (4 Primary Countdown Units) */}
      <div className="grid grid-cols-4 gap-2 md:gap-6 w-full">
        {units.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full aspect-[4/5] sm:aspect-square bg-[#12122B]/90 rounded-2xl md:rounded-3xl border border-[#FF2D78]/30 shadow-neon-glow flex items-center justify-center overflow-hidden backdrop-blur-xl group">
              {/* Top ambient highlight */}
              <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF2D78] to-transparent opacity-80" />

              {/* Number display */}
              <span className="font-space font-bold text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-white tracking-tight drop-shadow-[0_0_25px_rgba(255,45,120,0.8)]">
                {unit.value}
              </span>

              {/* Scanline line overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
            </div>

            <span className="mt-2 sm:mt-3 text-[10px] sm:text-xs font-space tracking-[0.25em] text-pink-300/70 font-semibold uppercase">
              {unit.label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Quantum Sync Milliseconds */}
      <div className="mt-5 flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1A1A3A]/60 border border-pink-500/20 text-xs font-space text-pink-300/80">
        <span className="w-2 h-2 rounded-full bg-[#FF2D78] animate-ping" />
        <span>QUANTUM SYNC:</span>
        <span className="font-bold text-white tracking-widest">{milliseconds} ms</span>
      </div>
    </div>
  );
};
