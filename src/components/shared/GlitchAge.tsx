import React, { useState, useEffect } from 'react';

interface LokiGlitchAgeProps {
  suffix?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero' | 'compact';
}

// Minecraft Enchanting Table (Standard Galactic Alphabet) & Ancient Norse Runes
const MINECRAFT_SGA_RUNES = [
  'ᔑ', 'ʖ', 'ᓵ', 'ᖱ', 'ᒷ', '⎓', 'ㄍ', '⍑', '╎', '⋮',
  'ꖌ', 'ꖎ', 'ᒲ', 'リ', '𝙹', '!¡', 'ᑑ', '∷', 'ᓭ', 'ℸ ̣',
  '⚍', '⍊', '∴', '̇/', '||', 'ㄗ', 'ᚨ', 'ᛒ', 'ᚲ', 'ᛞ',
  'ᛖ', 'ᛉ', 'ᛊ', 'ᛋ', 'ᛗ', 'ᛚ', 'ᛦ', 'ᚱ', 'ᚦ', 'ᚠ'
];

// Diverse Font Styles (like Loki Title Card sequence)
const FONT_STYLES = [
  { font: "'Rubik Glitch', system-ui", weight: '900', color: '#22c55e', textShadow: '0 0 8px rgba(34,197,94,0.9)' },
  { font: "'Press Start 2P', monospace", weight: '700', color: '#a855f7', textShadow: '0 0 8px rgba(168,85,247,0.9)' },
  { font: "'Cinzel Decorative', serif", weight: '900', color: '#eab308', textShadow: '0 0 10px rgba(234,179,8,0.9)' },
  { font: "'Orbitron', sans-serif", weight: '900', color: '#06b6d4', textShadow: '0 0 8px rgba(6,182,212,0.9)' },
  { font: "'Space Grotesk', sans-serif", weight: '800', color: '#10b981', textShadow: '0 0 8px rgba(16,185,129,0.9)' }
];

export const LokiGlitchAge: React.FC<LokiGlitchAgeProps> = ({
  suffix = '',
  className = '',
  size = 'compact'
}) => {
  const [char1, setChar1] = useState({ rune: 'ᔑ', styleIndex: 0 });
  const [char2, setChar2] = useState({ rune: 'ʖ', styleIndex: 1 });

  useEffect(() => {
    // Rapid Loki Morph Interval (70ms)
    const interval = setInterval(() => {
      setChar1({
        rune: MINECRAFT_SGA_RUNES[Math.floor(Math.random() * MINECRAFT_SGA_RUNES.length)],
        styleIndex: Math.floor(Math.random() * FONT_STYLES.length)
      });

      setChar2({
        rune: MINECRAFT_SGA_RUNES[Math.floor(Math.random() * MINECRAFT_SGA_RUNES.length)],
        styleIndex: Math.floor(Math.random() * FONT_STYLES.length)
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  const s1 = FONT_STYLES[char1.styleIndex];
  const s2 = FONT_STYLES[char2.styleIndex];

  return (
    <span
      className={`inline-flex items-center justify-center w-12 sm:w-16 md:w-20 h-6 sm:h-9 md:h-11 mx-1 sm:mx-2 rounded-lg sm:rounded-xl bg-black/80 border border-emerald-400/60 shadow-[0_0_15px_rgba(34,197,94,0.45)] backdrop-blur-md select-none shrink-0 overflow-hidden align-middle ${className}`}
      title="[AGE CONCEALED: MINECRAFT SGA CIPHER]"
    >
      {/* Rune 1 - Fixed width container */}
      <span className="w-5 sm:w-8 md:w-9 flex items-center justify-center text-center">
        <span
          style={{
            fontFamily: s1.font,
            fontWeight: s1.weight,
            color: s1.color,
            textShadow: s1.textShadow
          }}
          className="text-sm sm:text-2xl md:text-3xl leading-none transform-gpu"
        >
          {char1.rune}
        </span>
      </span>

      {/* Rune 2 - Fixed width container */}
      <span className="w-5 sm:w-8 md:w-9 flex items-center justify-center text-center">
        <span
          style={{
            fontFamily: s2.font,
            fontWeight: s2.weight,
            color: s2.color,
            textShadow: s2.textShadow
          }}
          className="text-sm sm:text-2xl md:text-3xl leading-none transform-gpu"
        >
          {char2.rune}
        </span>
      </span>

      {suffix && (
        <span className="text-[9px] sm:text-xs font-space font-extrabold text-emerald-300 uppercase ml-0.5">
          {suffix}
        </span>
      )}
    </span>
  );
};

export const GlitchAge = LokiGlitchAge;
