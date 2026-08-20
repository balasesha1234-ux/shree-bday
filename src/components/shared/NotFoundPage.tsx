import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Sparkles, Home, Compass, Heart, Radio } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface NotFoundPageProps {
  onGoHome: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onGoHome }) => {
  const [petCount, setPetCount] = useState<number>(0);
  const [isWarping, setIsWarping] = useState<boolean>(false);

  const handlePetSpaceKitten = () => {
    soundEngine.playMeow();
    soundEngine.playSparkle(1.4);
    setPetCount((prev) => prev + 1);

    confetti({
      particleCount: 25,
      spread: 60,
      origin: { x: 0.5, y: 0.45 },
      colors: ['#FFD93D', '#FF4D8D', '#7CEBC6', '#FFFFFF']
    });
  };

  const handleWarpHome = () => {
    soundEngine.playLaserPulse();
    setIsWarping(true);

    confetti({
      particleCount: 60,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD93D', '#FF4D8D', '#7CEBC6', '#FFFFFF']
    });

    setTimeout(() => {
      onGoHome();
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-[#060412] text-white flex flex-col items-center justify-between p-4 sm:p-8 select-none overflow-hidden">
      {/* Background Volumetric Nebula Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#FF4D8D]/20 via-[#7CEBC6]/15 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FFD93D]/15 rounded-full blur-[120px]" />
      </div>

      {/* Top Telemetry Radar Bar */}
      <header className="relative z-10 w-full max-w-4xl flex items-center justify-between py-4 border-b border-white/10 text-xs font-space">
        <div className="flex items-center gap-2 text-pink-300 font-bold">
          <Radio className="w-4 h-4 animate-pulse text-[#FFD93D]" />
          <span>DEEP-SPACE RESCUE PROTOCOL 🛸</span>
        </div>

        <div className="flex items-center gap-3 text-white/70">
          <span className="hidden sm:inline">SECTOR: UNCHARTED VOID</span>
          <span className="text-[#FFD93D] font-bold">STATUS: 404 DRIFT</span>
        </div>
      </header>

      {/* Center Cinematic Content */}
      <main className="relative z-10 max-w-2xl w-full mx-auto flex flex-col items-center text-center my-auto py-12">
        {/* Floating Astronaut Kitten in Zero Gravity */}
        <motion.div
          animate={{
            y: [0, -18, 0],
            rotate: [-4, 4, -4]
          }}
          transition={{
            repeat: Infinity,
            duration: 4.5,
            ease: 'easeInOut'
          }}
          onClick={handlePetSpaceKitten}
          className="relative cursor-pointer group mb-6"
        >
          {/* Glowing Space Helmet Aura */}
          <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-pink-500/30 via-cyan-400/20 to-amber-300/30 border-2 border-white/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(124,235,198,0.4)] group-hover:scale-105 transition-transform duration-300">
            {/* Astronaut Kitten Avatar */}
            <span className="text-6xl sm:text-7xl filter drop-shadow-lg">
              {petCount > 0 ? '😻' : '🐱'}
            </span>
          </div>

          {/* Tiny Space Backpack */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#1A142E]/90 border border-pink-400 text-[10px] font-space font-bold text-pink-200 shadow-md whitespace-nowrap flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFD93D]" />
            <span>Captain Mochi (Tap to Pet 🐾)</span>
          </div>

          {/* Pet Hearts Feedback */}
          {petCount > 0 && (
            <motion.div
              key={petCount}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -25 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-pink-400 font-bold text-sm flex items-center gap-1"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Purr x{petCount}!</span>
            </motion.div>
          )}
        </motion.div>

        {/* 404 Glowing Title */}
        <div className="relative inline-block mb-3">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl sm:text-8xl md:text-9xl font-space font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-[#FF4D8D] to-[#7CEBC6] drop-shadow-[0_0_35px_rgba(255,77,141,0.6)]"
          >
            404
          </motion.h1>
        </div>

        <h2 className="text-2xl sm:text-4xl font-fredoka font-bold text-white mb-3">
          Lost in the Stardust Nebula! 🌌
        </h2>

        <p className="text-sm sm:text-base font-quicksand text-pink-100/80 max-w-lg leading-relaxed mb-8">
          The cosmic coordinates you’re looking for drifted beyond the known universe. But don’t worry—Captain Mochi has engaged warp thrusters to guide you back home!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={handleWarpHome}
            disabled={isWarping}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FF7A59] to-[#FF4D8D] text-[#1A0B1A] font-fredoka font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(255,217,61,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            <Rocket className="w-4 h-4 fill-current" />
            <span>{isWarping ? 'Engaging Warp Drive...' : 'Warp Back to Sanctuary 🚀'}</span>
          </button>

          <button
            onClick={handlePetSpaceKitten}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 font-fredoka font-bold text-sm backdrop-blur-md hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#FFD93D]" />
            <span>Pet Space Kitten 🐾</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full text-center text-xs font-quicksand text-gray-500 py-4 border-t border-white/5">
        <span>Deep-Space Rescue Signal // Shree's Birthday Odyssey 2027 🌸🛡️</span>
      </footer>
    </div>
  );
};
