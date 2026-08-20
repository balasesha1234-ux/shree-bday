import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Radio, Shield } from 'lucide-react';
import { GlitchAge } from '../shared/GlitchAge';
import { useCountdown } from '../../hooks/useCountdown';
import { CountdownTimer } from './CountdownTimer';
import { CosmicConstellation } from './CosmicConstellation';
import { MidnightReveal } from './MidnightReveal';
import { PawPrints } from '../shared/PawPrints';
import { ShootingStars } from '../shared/ShootingStars';

interface CountdownPageProps {
  onUnlockBirthday: () => void;
}

export const CountdownPage: React.FC<CountdownPageProps> = ({ onUnlockBirthday }) => {
  const countdown = useCountdown();
  const [triggerMidnight, setTriggerMidnight] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-[#0A0A1A] text-white flex flex-col items-center justify-between overflow-hidden selection:bg-[#FF2D78] selection:text-white select-none">
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#FF2D78]/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-[#6BC5F8]/15 rounded-full blur-[140px]" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-[#FF6B9D]/15 rounded-full blur-[160px]" />
      </div>

      {/* Walking Cat Paws Easter Egg */}
      <ShootingStars />
      <PawPrints />

      {/* Top Banner Header */}
      <header className="relative z-10 w-full max-w-6xl mx-auto pt-8 px-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
          <Radio className="w-4 h-4 text-[#FF2D78] animate-pulse" />
          <span className="text-xs font-space uppercase tracking-widest text-gray-300 font-semibold">
            GLOBAL BROADCAST // WORLDWIDE CELEBRATION PROTOCOL 🌸
          </span>
        </div>

        {/* Live Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-space font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE BROADCAST READY</span>
        </div>
      </header>

      {/* Center Cinematic Content */}
      <main className="relative z-10 w-full max-w-5xl mx-auto px-4 flex flex-col items-center text-center mt-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FF2D78]/15 border border-[#FF2D78]/40 text-[#FF6B9D] text-xs font-space font-bold tracking-[0.2em] mb-4 uppercase shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-[#FFD93D]" />
          <span>PROJECT SHREE // COUNTDOWN TO ZERO HOUR 🚀</span>
        </motion.div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-fredoka font-bold tracking-tight text-white drop-shadow-[0_5px_30px_rgba(255,45,120,0.5)] leading-tight">
          SHREE’S <GlitchAge suffix="TH" className="mx-2 text-3xl sm:text-5xl md:text-6xl align-middle" /> BIRTHDAY 🎂
        </h1>

        <p className="mt-3 text-sm sm:text-base font-quicksand text-pink-200/90 max-w-2xl leading-relaxed">
          A worldwide celebration for the best sister, kindest creator & cat whisperer in the universe! 🌸 <br className="hidden sm:inline" />
          Synchronizing live worldwide at Midnight IST on March 6.
        </p>

        {/* Marvel Countdown Timer */}
        <CountdownTimer
          days={countdown.formattedDays}
          hours={countdown.formattedHours}
          minutes={countdown.formattedMinutes}
          seconds={countdown.formattedSeconds}
          milliseconds={countdown.milliseconds}
        />

        {/* Local Dev Simulator Button */}
        {import.meta.env.DEV && (
          <div className="my-6">
            <button
              onClick={() => setTriggerMidnight(true)}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] hover:scale-105 active:scale-95 text-white font-fredoka font-bold text-xs shadow-[0_0_20px_rgba(255,45,120,0.6)] border border-pink-300 transition-all flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4 text-[#FFD93D]" />
              <span>💥 [DEV ONLY] Trigger Zero Hour Simulation</span>
            </button>
          </div>
        )}

        {/* Daily Teaser Milestones */}
        <CosmicConstellation />
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-6 text-center text-xs font-quicksand text-gray-500 border-t border-white/5">
        <p className="flex items-center justify-center gap-1.5">
          Crafted with 100% Brotherly Pride & Support for Shree 🐱🛡️ // Long Distance Sync
        </p>
      </footer>

      {/* Midnight Reveal Transition Overlay */}
      {triggerMidnight && (
        <MidnightReveal onComplete={onUnlockBirthday} />
      )}
    </div>
  );
};
