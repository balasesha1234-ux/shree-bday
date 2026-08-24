import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useCountdown } from '../../hooks/useCountdown';
import { CountdownTimer } from './CountdownTimer';
import { LokiGlitchAge } from '../shared/GlitchAge';
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
      {/* Immersive 3D Starfield Warp (Clean & Airy) */}
      <DeepSpaceVoyage />
      <CosmicStardustFloating />

      {/* Cosmic Shooting Stars & Subtle Cat Paws */}
      <ShootingStars />
      <PawPrints />

      {/* ========================================================================= */}
      {/* MASSIVE CENTERED HERO COUNTDOWN VIEWPORT */}
      {/* ========================================================================= */}
      <main className="relative z-10 w-full min-h-[92vh] max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center py-10 sm:py-16">
        {/* Elegant Top Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-pink-400/30 text-pink-200 text-xs sm:text-sm font-space font-bold tracking-widest uppercase mb-5 sm:mb-7 backdrop-blur-md shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-[#FFD93D]" />
          <span>MARCH 6 • MIDNIGHT IST COUNTDOWN 🌸</span>
        </motion.div>

        {/* Grand Bold Single-Line Title with Film-Like Cinematic Blur Reveal */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.92, filter: 'blur(14px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-fredoka font-bold tracking-tight text-white drop-shadow-[0_4px_35px_rgba(255,77,141,0.55)] leading-normal flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 w-full max-w-full px-2 py-1"
        >
          <span className="shrink-0">SHREE’S</span>
          <LokiGlitchAge />
          <span className="shrink-0">BIRTHDAY 🎂</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg font-quicksand text-pink-100/85 max-w-2xl leading-relaxed"
        >
          A worldwide celebration for the kindest creator, animal lover & best sister in the universe. Synchronizing live at Midnight IST! 🌸✨
        </motion.p>

        {/* Massive Centered Countdown Timer with Staggered Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.0, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex justify-center mt-2 sm:mt-4"
        >
          <CountdownTimer
            days={countdown.formattedDays}
            hours={countdown.formattedHours}
            minutes={countdown.formattedMinutes}
            seconds={countdown.formattedSeconds}
            milliseconds={countdown.milliseconds}
          />
        </motion.div>

        {/* Local Dev Simulator Button */}
        {import.meta.env.DEV && (
          <div className="mt-4 sm:mt-6">
            <button
              onClick={() => setTriggerMidnight(true)}
              className="px-5 py-2.5 rounded-full bg-pink-950/70 hover:bg-pink-900/90 text-pink-300 border border-pink-500/50 text-xs font-space font-bold transition-all flex items-center gap-2 mx-auto shadow-md hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
              <span>[DEV ONLY] Simulate Zero Hour</span>
            </button>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* 3D CELESTIAL ORBITAL ASTROLABE (SCROLL-REVEAL SECTION) */}
      {/* ========================================================================= */}
      <section className="relative z-10 w-full max-w-5xl mx-auto px-4 py-12 sm:py-16 flex flex-col items-center">
        <OrbitalAstrolabe
          days={countdown.formattedDays}
          hours={countdown.formattedHours}
          minutes={countdown.formattedMinutes}
          seconds={countdown.formattedSeconds}
        />
      </section>

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
