import React, { useState, useEffect } from 'react';

interface GlitchAgeProps {
  suffix?: string; // e.g. "th" or "nd" or " YEARS"
  className?: string;
}

const GLITCH_GLYPHS = ['18', '27', '99', '04', '73', '88', '19', '42', '56', '31', '64', '??', '##', 'XX', '∞'];

export const GlitchAge: React.FC<GlitchAgeProps> = ({ suffix = '', className = '' }) => {
  const [displayValue, setDisplayValue] = useState('??');
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    // Fast-paced scramble interval
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * GLITCH_GLYPHS.length);
      setDisplayValue(GLITCH_GLYPHS[randomIndex]);
      setGlitchActive(Math.random() > 0.6);
    }, 60);

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-flex items-center font-space font-extrabold tracking-wider transition-all duration-75 select-none ${
        glitchActive
          ? 'text-[#FF2D78] drop-shadow-[0_0_12px_rgba(255,45,120,0.8)] scale-105'
          : 'text-[#7CEBC6] drop-shadow-[0_0_10px_rgba(124,235,198,0.7)]'
      } ${className}`}
      title="[AGE: ENCRYPTED // TOP SECRET]"
    >
      <span className="font-mono bg-black/40 px-1.5 py-0.5 rounded-lg border border-pink-500/40 text-pink-400">
        {displayValue}
      </span>
      {suffix && <span className="ml-0.5 font-fredoka">{suffix}</span>}
    </span>
  );
};
