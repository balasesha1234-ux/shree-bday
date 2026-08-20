import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const CosmicLotusNebula: React.FC = () => {
  const [isBlooming, setIsBlooming] = useState(false);

  const handleLotusClick = () => {
    soundEngine.playHarmonicPop(3);
    soundEngine.playSparkle(1.5);
    setIsBlooming(true);

    confetti({
      particleCount: 50,
      spread: 100,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#FFD93D', '#FF4D8D', '#FFA8C5', '#FFFFFF', '#7CEBC6'],
      shapes: ['star', 'circle']
    });

    setTimeout(() => setIsBlooming(false), 2000);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto h-[320px] sm:h-[360px] flex items-center justify-center select-none my-2">
      {/* Background Volumetric Sacred Halo */}
      <motion.div
        animate={{
          scale: [1, 1.12, 1],
          opacity: [0.35, 0.6, 0.35]
        }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[radial-gradient(circle,rgba(255,217,61,0.35)_0%,rgba(255,77,141,0.2)_50%,transparent_75%)] blur-2xl pointer-events-none"
      />

      {/* Orbiting Stardust Rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
        className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border border-pink-400/20 border-dashed pointer-events-none"
      />

      {/* Sacred Blooming Lotus SVG Composition */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLotusClick}
        animate={{
          y: [0, -8, 0],
          scale: isBlooming ? [1, 1.15, 1.05] : [1, 1.03, 1]
        }}
        transition={{
          y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
          scale: { repeat: isBlooming ? 0 : Infinity, duration: 3.5, ease: 'easeInOut' }
        }}
        className="relative z-10 cursor-pointer flex flex-col items-center justify-center group"
      >
        <svg
          viewBox="0 0 400 300"
          className="w-64 h-48 sm:w-84 sm:h-64 filter drop-shadow-[0_0_25px_rgba(255,77,141,0.75)] transition-all duration-300 group-hover:drop-shadow-[0_0_35px_rgba(255,217,61,0.9)]"
        >
          <defs>
            {/* Outer Petal Gradient */}
            <linearGradient id="outerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#8B004B" />
              <stop offset="40%" stopColor="#FF2D78" />
              <stop offset="80%" stopColor="#FF9EAA" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Mid Petal Gradient */}
            <linearGradient id="midPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#C2185B" />
              <stop offset="50%" stopColor="#FF4D8D" />
              <stop offset="90%" stopColor="#FFD1DC" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Inner Core Petal Gradient */}
            <linearGradient id="innerPetalGrad" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#D4A84B" />
              <stop offset="40%" stopColor="#FF7A59" />
              <stop offset="85%" stopColor="#FFA8C5" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Golden Stamen Core Glow */}
            <radialGradient id="stamenGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFD700" />
              <stop offset="80%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF4500" />
            </radialGradient>
          </defs>

          {/* ========================================================================= */}
          {/* LAYER 1: OUTER WIDE SPREAD PETALS */}
          {/* ========================================================================= */}
          <g opacity="0.95">
            {/* Far Left Bottom Petal */}
            <path
              d="M 200 240 C 130 240, 50 200, 40 150 C 40 120, 100 130, 200 240 Z"
              fill="url(#outerPetalGrad)"
            />
            {/* Far Right Bottom Petal */}
            <path
              d="M 200 240 C 270 240, 350 200, 360 150 C 360 120, 300 130, 200 240 Z"
              fill="url(#outerPetalGrad)"
            />
            {/* Left Wing Petal */}
            <path
              d="M 200 240 C 120 220, 70 150, 90 90 C 130 90, 160 160, 200 240 Z"
              fill="url(#outerPetalGrad)"
            />
            {/* Right Wing Petal */}
            <path
              d="M 200 240 C 280 220, 330 150, 310 90 C 270 90, 240 160, 200 240 Z"
              fill="url(#outerPetalGrad)"
            />
          </g>

          {/* ========================================================================= */}
          {/* LAYER 2: MID ELEVATED BLOOMING PETALS */}
          {/* ========================================================================= */}
          <g opacity="0.98">
            {/* Mid Left Petal */}
            <path
              d="M 200 240 C 140 200, 110 110, 140 60 C 170 70, 190 140, 200 240 Z"
              fill="url(#midPetalGrad)"
            />
            {/* Mid Right Petal */}
            <path
              d="M 200 240 C 260 200, 290 110, 260 60 C 230 70, 210 140, 200 240 Z"
              fill="url(#midPetalGrad)"
            />
            {/* Central Main Tall Spire Petal */}
            <path
              d="M 200 240 C 165 170, 160 80, 200 35 C 240 80, 235 170, 200 240 Z"
              fill="url(#innerPetalGrad)"
            />
          </g>

          {/* ========================================================================= */}
          {/* LAYER 3: INNER CUPPED PETALS & SACRED STAMEN */}
          {/* ========================================================================= */}
          <g>
            {/* Inner Left Cupped Petal */}
            <path
              d="M 200 240 C 175 190, 165 130, 185 95 C 200 110, 200 170, 200 240 Z"
              fill="url(#innerPetalGrad)"
              opacity="0.9"
            />
            {/* Inner Right Cupped Petal */}
            <path
              d="M 200 240 C 225 190, 235 130, 215 95 C 200 110, 200 170, 200 240 Z"
              fill="url(#innerPetalGrad)"
              opacity="0.9"
            />

            {/* Glowing Golden Seed Pod / Stamen Core */}
            <ellipse
              cx="200"
              cy="210"
              rx="24"
              ry="14"
              fill="url(#stamenGlow)"
              filter="drop-shadow(0 0 10px #FFD700)"
            />

            {/* Stamen Pistil Seeds */}
            {[
              { cx: 188, cy: 208 },
              { cx: 196, cy: 206 },
              { cx: 204, cy: 206 },
              { cx: 212, cy: 208 },
              { cx: 192, cy: 213 },
              { cx: 200, cy: 214 },
              { cx: 208, cy: 213 }
            ].map((dot, idx) => (
              <circle
                key={idx}
                cx={dot.cx}
                cy={dot.cy}
                r="2"
                fill="#5C2900"
              />
            ))}
          </g>

          {/* Golden Radiant Sparkles */}
          <circle cx="200" cy="35" r="3" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFD93D)" />
          <circle cx="140" cy="60" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFD93D)" />
          <circle cx="260" cy="60" r="2.5" fill="#FFFFFF" filter="drop-shadow(0 0 6px #FFD93D)" />
        </svg>

        {/* Sacred Interactive Touch Pill */}
        <span className="mt-1 px-3.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-pink-400/30 text-[10px] font-fredoka font-semibold text-pink-200 shadow-sm flex items-center gap-1.5 group-hover:border-[#FFD93D] group-hover:text-[#FFD93D] transition-colors">
          <Sparkles className="w-3 h-3 text-[#FFD93D]" />
          <span>Sacred Cosmic Lotus (Tap to Bloom 🪷)</span>
        </span>
      </motion.div>
    </div>
  );
};
