import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import { CountdownTimer } from './CountdownTimer';
import { LokiGlitchAge } from '../shared/GlitchAge';
import { CosmicLotusNebula } from './CosmicLotusNebula';
import { OrbitalAstrolabe } from './OrbitalAstrolabe';
import { MidnightReveal } from './MidnightReveal';
import { PawPrints } from '../shared/PawPrints';
import { ShootingStars } from '../shared/ShootingStars';
import { DeepSpaceVoyage } from './DeepSpaceVoyage';
import { CosmicStardustFloating } from './CosmicStardustFloating';

interface CountdownPageProps {
  onUnlockBirthday: () => void;
}

export const CountdownPage: React.FC<CountdownPageProps> = ({ onUnlockBirthday }) => {
  const countdown = useCountdown();
  const [triggerMidnight, setTriggerMidnight] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#060412] text-white flex flex-col items-center justify-between overflow-x-hidden selection:bg-[#FF2D78] selection:text-white select-none">
      {/* Immersive 3D Starfield Warp & Volumetric Nebula Voyage */}
      <DeepSpaceVoyage />
      <CosmicStardustFloating />

      {/* Cosmic Shooting Stars & Subtle Cat Paws */}
      <ShootingStars />
      <PawPrints />

      {/* Center Cinematic Content */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-4 flex flex-col items-center text-center pt-12 sm:pt-16 pb-12">
        {/* Elegant Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-pink-400/30 text-pink-200 text-xs font-space font-semibold tracking-widest uppercase mb-5 backdrop-blur-md shadow-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
          <span>MARCH 6 • MIDNIGHT IST COUNTDOWN 🌸</span>
        </motion.div>

        {/* Clean Single-Line Unbroken Title with Compact Minecraft Rune Cipher */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-[1.35rem] sm:text-4xl md:text-5xl lg:text-6xl font-fredoka font-bold tracking-tight text-white drop-shadow-[0_4px_25px_rgba(255,77,141,0.4)] leading-none flex items-center justify-center flex-nowrap whitespace-nowrap gap-1.5 sm:gap-3 w-full max-w-full overflow-hidden"
        >
          <span className="shrink-0">SHREE’S</span>
          <LokiGlitchAge />
          <span className="shrink-0">BIRTHDAY 🎂</span>
        </motion.h1>

        <p className="mt-3 text-sm sm:text-base font-quicksand text-pink-100/80 max-w-xl leading-relaxed">
          A worldwide celebration for the kindest creator, animal lover & best sister in the universe. Synchronizing live at Midnight IST! 🌸✨
        </p>

        {/* Concept 4: The Fluid Gravitational Cosmic Lotus Nebula */}
        <div className="relative w-full -my-8 z-0">
          <CosmicLotusNebula />
        </div>

        {/* Clean Floating Zero-Gravity Countdown Timer */}
        <div className="relative z-10 w-full">
          <CountdownTimer
            days={countdown.formattedDays}
            hours={countdown.formattedHours}
            minutes={countdown.formattedMinutes}
            seconds={countdown.formattedSeconds}
            milliseconds={countdown.milliseconds}
          />
        </div>

        {/* Concept 1: The 3D Interactive Celestial Orbital Astrolabe */}
        <div className="relative z-10 w-full mt-4">
          <OrbitalAstrolabe
            days={countdown.formattedDays}
            hours={countdown.formattedHours}
            minutes={countdown.formattedMinutes}
            seconds={countdown.formattedSeconds}
          />
        </div>

        {/* Local Dev Simulator Button */}
        {import.meta.env.DEV && (
          <div className="my-5">
            <button
              onClick={() => setTriggerMidnight(true)}
              className="px-5 py-2 rounded-full bg-pink-950/60 hover:bg-pink-900/80 text-pink-300 border border-pink-500/40 text-xs font-space font-bold transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>[DEV ONLY] Simulate Zero Hour</span>
            </button>
          </div>
        )}
      </main>

      {/* Clean Minimalist Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs font-quicksand text-gray-500 border-t border-white/5">
        <p className="flex items-center justify-center gap-1.5">
          Crafted with 100% Brotherly Pride & Support for Shree 🐱🛡️
        </p>
      </footer>

      {/* Midnight Reveal Transition Overlay */}
      {triggerMidnight && (
        <MidnightReveal onComplete={onUnlockBirthday} />
      )}
    </div>
  );
};
