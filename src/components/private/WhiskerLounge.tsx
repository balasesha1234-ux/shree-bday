import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Award, RefreshCw, Star } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const WhiskerLounge: React.FC = () => {
  const [purrLevel, setPurrLevel] = useState<number>(25);
  const [kittenMood, setKittenMood] = useState<'sleeping' | 'happy' | 'playful' | 'purring'>('happy');
  const [treatFed, setTreatFed] = useState<string | null>(null);
  const [awardUnlocked, setAwardUnlocked] = useState<boolean>(false);
  const [yarnPos, setYarnPos] = useState({ x: 50, y: 70 });
  const [isPetting, setIsPetting] = useState<boolean>(false);

  const handlePetKitten = (e: React.MouseEvent) => {
    soundEngine.playCatPurr();
    setIsPetting(true);

    const nextPurr = Math.min(100, purrLevel + 15);
    setPurrLevel(nextPurr);
    setKittenMood(nextPurr >= 100 ? 'purring' : 'happy');

    if (nextPurr >= 100 && !awardUnlocked) {
      soundEngine.playSparkle(1.5);
      soundEngine.playSparkle(1.8);
      setAwardUnlocked(true);

      confetti({
        particleCount: 65,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF7CE5', '#FFD93D', '#7CEBC6', '#FFFFFF'],
        shapes: ['star', 'circle']
      });
    }

    setTimeout(() => setIsPetting(false), 600);
  };

  const handleFeedTreat = (treat: 'salmon' | 'milk' | 'catnip') => {
    soundEngine.playTreatMunch();
    soundEngine.playMeow();
    setTreatFed(treat);
    setKittenMood('happy');
    setPurrLevel((prev) => Math.min(100, prev + 20));

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#FFB6C1', '#FFD700', '#FFFFFF']
    });

    setTimeout(() => setTreatFed(null), 2500);
  };

  return (
    <section id="whisker-lounge" className="w-full max-w-5xl mx-auto px-4 py-20 select-none">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-emerald-600 font-fredoka text-xs font-semibold shadow-sm border border-emerald-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTER 05 // WHISKER HAVEN SANCTUARY 🐾🐱</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          The Cozy Kitten Lounge
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Dedicated to Shree's pure love for street kittens. Pet Mochi, feed tasty treats, and fill the Purr Meter!
        </p>
      </div>

      {/* Main Lounge Card */}
      <div className="relative bg-gradient-to-b from-[#F3FAF7] via-[#E8F6F0] to-[#DCF0E7] rounded-3xl p-6 sm:p-10 shadow-pop border-2 border-emerald-200 overflow-hidden">
        {/* Purr Meter Progress Bar */}
        <div className="max-w-md mx-auto mb-8 bg-white/90 rounded-2xl p-4 border border-emerald-200/80 shadow-sm">
          <div className="flex items-center justify-between text-xs font-space font-bold mb-1.5">
            <span className="text-emerald-700 flex items-center gap-1.5">
              <span>🐱 PURR METER:</span>
              <span className="text-pink-500 font-fredoka text-sm">{purrLevel}%</span>
            </span>
            <span className="text-gray-500 text-[10px] uppercase">
              {purrLevel >= 100 ? 'MAXIMUM PURR HAPPINESS 💗' : 'PET MOCHI TO FILL'}
            </span>
          </div>

          <div className="w-full h-3.5 rounded-full bg-gray-100 overflow-hidden border border-emerald-100">
            <motion.div
              style={{ width: `${purrLevel}%` }}
              className="h-full bg-gradient-to-r from-emerald-400 via-[#7CEBC6] to-[#FF4D8D] rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Kitten Play Area */}
        <div className="relative w-full h-72 sm:h-84 rounded-3xl bg-white/80 border-2 border-emerald-200/60 shadow-inner flex flex-col items-center justify-center overflow-hidden">
          {/* Heart Particles on Petting */}
          {isPetting && (
            <div className="absolute top-10 flex gap-2 animate-bounce">
              <span className="text-2xl">💗</span>
              <span className="text-xl text-pink-400">✨</span>
              <span className="text-2xl">🐾</span>
            </div>
          )}

          {/* Velvet Cushion & Kitten */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePetKitten}
            className="cursor-pointer relative flex flex-col items-center group"
          >
            {/* Cushion Glow */}
            <div className="w-48 sm:w-56 h-16 rounded-full bg-gradient-to-r from-[#FFB3C6] via-[#FF85A1] to-[#FF4D8D] shadow-xl border-2 border-pink-200 mb-2" />

            {/* Resting Kitten Avatar */}
            <div className="absolute -top-14 text-7xl sm:text-8xl filter drop-shadow-lg transition-transform duration-300 group-hover:-translate-y-2">
              {purrLevel >= 100 ? '😻' : isPetting ? '😸' : treatFed ? '😋' : '🐱'}
            </div>

            {/* Name Tag Pill */}
            <div className="px-3.5 py-1 rounded-full bg-emerald-100/90 border border-emerald-300 text-emerald-800 font-fredoka font-bold text-xs shadow-sm mt-1">
              Mochi 🐾 (Tap to Pet)
            </div>
          </motion.div>

          {/* Floating Treat Fed Feedback */}
          {treatFed && (
            <motion.div
              initial={{ scale: 0, y: 10 }}
              animate={{ scale: 1, y: -20 }}
              className="absolute bottom-16 px-4 py-1.5 rounded-full bg-white text-emerald-700 font-fredoka font-bold text-xs shadow-lg border border-emerald-300 flex items-center gap-1.5"
            >
              <span>Yum! Mochi loved the {treatFed}! 🐟✨</span>
            </motion.div>
          )}
        </div>

        {/* Interactive Treat & Toy Action Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => handleFeedTreat('salmon')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 text-gray-700 font-fredoka font-semibold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-xl">🐟</span>
            <span>Feed Salmon Flakes</span>
          </button>

          <button
            onClick={() => handleFeedTreat('milk')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 text-gray-700 font-fredoka font-semibold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-xl">🥛</span>
            <span>Warm Milk Bowl</span>
          </button>

          <button
            onClick={() => handleFeedTreat('catnip')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-emerald-50 border border-emerald-200 text-gray-700 font-fredoka font-semibold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <span className="text-xl">🌿</span>
            <span>Catnip Treat</span>
          </button>

          <button
            onClick={() => setPurrLevel(20)}
            className="p-2.5 rounded-2xl bg-white hover:bg-gray-100 border border-gray-200 text-gray-500 hover:text-gray-800 transition-all"
            title="Reset Purr Meter"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* Award Unlocked Plaque */}
        {awardUnlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-8 max-w-md mx-auto p-5 rounded-3xl bg-gradient-to-r from-amber-50 to-pink-50 border-2 border-[#D4A84B] shadow-md text-center"
          >
            <div className="flex items-center justify-center gap-2 text-[#D4A84B] mb-1">
              <Star className="w-5 h-5 fill-[#D4A84B]" />
              <span className="font-space font-bold text-xs uppercase tracking-widest">
                OFFICIAL SANCTUARY AWARD
              </span>
              <Star className="w-5 h-5 fill-[#D4A84B]" />
            </div>

            <h4 className="font-fredoka font-bold text-xl text-gray-800">
              Master Cat Whisperer of the Century 🐾🏆
            </h4>
            <p className="font-quicksand text-xs text-gray-600 mt-1">
              Awarded to Shree for infinite tenderness, headpats, and love given to whiskered souls everywhere!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};
