import React, { useState, useEffect } from 'react';

interface LokiGlitchAgeProps {
  suffix?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
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
  { font: "'Rubik Glitch', system-ui", weight: '900', color: '#22c55e', textShadow: '0 0 15px rgba(34,197,94,0.9), 2px 2px 0px #ec4899' },
  { font: "'Press Start 2P', monospace", weight: '700', color: '#a855f7', textShadow: '0 0 15px rgba(168,85,247,0.9), -2px 2px 0px #38bdf8' },
  { font: "'Cinzel Decorative', serif", weight: '900', color: '#eab308', textShadow: '0 0 20px rgba(234,179,8,0.9), 2px -2px 0px #22c55e' },
  { font: "'MedievalSharp', cursive", weight: '700', color: '#ec4899', textShadow: '0 0 18px rgba(236,72,153,0.9), -2px -2px 0px #eab308' },
  { font: "'Orbitron', sans-serif", weight: '900', color: '#06b6d4', textShadow: '0 0 18px rgba(6,182,212,0.9), 2px 2px 0px #a855f7' },
  { font: "'UnifrakturMaguntia', cursive", weight: '700', color: '#f43f5e', textShadow: '0 0 20px rgba(244,63,94,0.9), 0 0 8px #fff' },
  { font: "'Space Grotesk', sans-serif", weight: '800', color: '#10b981', textShadow: '0 0 15px rgba(16,185,129,0.9), -2px 0px 0px #ec4899' }
];

export const LokiGlitchAge: React.FC<LokiGlitchAgeProps> = ({
  suffix = '',
  className = '',
  size = 'md'
}) => {
  const [char1, setChar1] = useState({ rune: 'ᔑ', styleIndex: 0 });
  const [char2, setChar2] = useState({ rune: 'ʖ', styleIndex: 1 });
  const [char3, setChar3] = useState({ rune: 'ᓵ', styleIndex: 2 });

  useEffect(() => {
    // Rapid Loki Morph Interval (65ms)
    const interval = setInterval(() => {
      setChar1({
        rune: MINECRAFT_SGA_RUNES[Math.floor(Math.random() * MINECRAFT_SGA_RUNES.length)],
        styleIndex: Math.floor(Math.random() * FONT_STYLES.length)
      });

      setChar2({
        rune: MINECRAFT_SGA_RUNES[Math.floor(Math.random() * MINECRAFT_SGA_RUNES.length)],
        styleIndex: Math.floor(Math.random() * FONT_STYLES.length)
      });

      setChar3({
        rune: MINECRAFT_SGA_RUNES[Math.floor(Math.random() * MINECRAFT_SGA_RUNES.length)],
        styleIndex: Math.floor(Math.random() * FONT_STYLES.length)
      });
    }, 65);

    return () => clearInterval(interval);
  }, []);

  const s1 = FONT_STYLES[char1.styleIndex];
  const s2 = FONT_STYLES[char2.styleIndex];
  const s3 = FONT_STYLES[char3.styleIndex];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-2xl bg-black/70 border-2 border-emerald-500/50 shadow-[0_0_25px_rgba(34,197,94,0.4)] backdrop-blur-md select-none transition-all duration-75 hover:scale-105 ${className}`}
      title="[AGE: MINECRAFT ENCHANTMENT // LOKI TEMPORAL GLITCH]"
    >
      <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400/90 hidden sm:inline mr-0.5">
        ᛗ
      </span>

      {/* Glyph 1 */}
      <span
        style={{
          fontFamily: s1.font,
          fontWeight: s1.weight,
          color: s1.color,
          textShadow: s1.textShadow
        }}
        className="inline-block transition-all duration-75 text-center min-w-[1.2ch] tracking-tight transform-gpu"
      >
        {char1.rune}
      </span>

      {/* Glyph 2 */}
      <span
        style={{
          fontFamily: s2.font,
          fontWeight: s2.weight,
          color: s2.color,
          textShadow: s2.textShadow
        }}
        className="inline-block transition-all duration-75 text-center min-w-[1.2ch] tracking-tight transform-gpu"
      >
        {char2.rune}
      </span>

      {/* Glyph 3 */}
      <span
        style={{
          fontFamily: s3.font,
          fontWeight: s3.weight,
          color: s3.color,
          textShadow: s3.textShadow
        }}
        className="inline-block transition-all duration-75 text-center min-w-[1.2ch] tracking-tight transform-gpu"
      >
        {char3.rune}
      </span>

      {suffix && (
        <span className="ml-1 text-xs font-space font-extrabold tracking-wider text-emerald-300 uppercase">
          {suffix}
        </span>
      )}
    </span>
  );
};

// Also export as GlitchAge default replacement
export const GlitchAge = LokiGlitchAge;
