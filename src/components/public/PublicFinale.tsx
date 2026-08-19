import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Sparkles, KeyRound } from 'lucide-react';
import { TapTarget } from '../../hooks/useTapSequence';

interface PublicFinaleProps {
  onTapTarget: (target: TapTarget, event: React.MouseEvent) => void;
  tapStep: number;
}

export const PublicFinale: React.FC<PublicFinaleProps> = ({ onTapTarget, tapStep }) => {
  const shareWebsite = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Happy Birthday Shree! 🎂',
        text: 'Join the worldwide celebration for Shree’s Birthday!',
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard! Share it with friends! 🌸');
    }
  };

  return (
    <footer className="relative w-full bg-gradient-to-b from-[#FFF5F5] to-[#FFE5EC] pt-20 pb-20 px-4 overflow-hidden border-t border-pink-100 select-none">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm mb-4"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>SPREAD THE LOVE & CELEBRATION</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Happy Birthday From All of Us 💛
        </h2>

        <p className="mt-3 text-sm sm:text-base font-quicksand text-gray-600 max-w-xl mx-auto">
          Thank you for making this world a kinder, sweeter, and more graceful place every day.
        </p>

        {/* Share Button */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={shareWebsite}
            className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-sm shadow-pop hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Celebration 🎈</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PROMINENT SECRET TAP CONSTELLATION (Cat -> Star -> Heart) */}
        {/* ========================================================================= */}
        <div className="mt-16 pt-10 border-t border-pink-200/70 flex flex-col items-center">
          <span className="text-[11px] font-space font-bold tracking-[0.25em] text-pink-400 uppercase mb-4 flex items-center gap-1.5">
            <KeyRound className="w-3.5 h-3.5 text-[#D4A84B]" />
            <span>SIBLING CONSTELLATION KEY (TAP SEQUENCE: 🐱 ➔ ⭐ ➔ 💗)</span>
          </span>

          {/* Glowing 3-Pedestal Tap Target Dock */}
          <div className="flex items-center justify-center gap-6 sm:gap-10">
            {/* TARGET 1: 🐱 Kitten */}
            <motion.button
              type="button"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.25, rotate: 5 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => onTapTarget('cat', e)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-pop border-2 transition-all ${
                tapStep >= 1
                  ? 'bg-emerald-100 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)] scale-110'
                  : 'bg-white/95 border-pink-200 hover:border-[#FF4D8D] hover:shadow-lg'
              }`}
              title="Step 1: Tap the Kitten 🐱"
            >
              🐱
            </motion.button>

            {/* Connecting Shimmer Line */}
            <div className="w-6 sm:w-10 h-0.5 border-t-2 border-dashed border-pink-300" />

            {/* TARGET 2: ⭐ Star */}
            <motion.button
              type="button"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
              whileHover={{ scale: 1.25, rotate: -5 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => onTapTarget('star', e)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-pop border-2 transition-all ${
                tapStep >= 2
                  ? 'bg-amber-100 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.5)] scale-110'
                  : 'bg-white/95 border-pink-200 hover:border-[#FFD93D] hover:shadow-lg'
              }`}
              title="Step 2: Tap the Star ⭐"
            >
              ⭐
            </motion.button>

            {/* Connecting Shimmer Line */}
            <div className="w-6 sm:w-10 h-0.5 border-t-2 border-dashed border-pink-300" />

            {/* TARGET 3: 💗 Heart */}
            <motion.button
              type="button"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              whileHover={{ scale: 1.25, rotate: 5 }}
              whileTap={{ scale: 0.85 }}
              onClick={(e) => onTapTarget('heart', e)}
              className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shadow-pop border-2 transition-all ${
                tapStep >= 3
                  ? 'bg-pink-100 border-pink-500 shadow-[0_0_25px_rgba(255,77,141,0.6)] scale-110 animate-bounce'
                  : 'bg-white/95 border-pink-200 hover:border-[#FF4D8D] hover:shadow-lg'
              }`}
              title="Step 3: Tap the Heart 💗"
            >
              💗
            </motion.button>
          </div>

          {/* Interactive Progress Text */}
          <div className="mt-4 h-6 text-center">
            {tapStep === 0 && (
              <span className="text-xs font-quicksand text-gray-500">
                Tap the 3 symbols in order to unlock Shree’s Secret Sibling Sanctuary! 🌸
              </span>
            )}
            {tapStep === 1 && (
              <span className="text-xs font-fredoka font-bold text-emerald-600 animate-pulse">
                🐾 Step 1/3 Unlocked! Now tap the Star (⭐)...
              </span>
            )}
            {tapStep === 2 && (
              <span className="text-xs font-fredoka font-bold text-amber-600 animate-pulse">
                ✨ Step 2/3 Unlocked! Now tap the Heart (💗)...
              </span>
            )}
            {tapStep >= 3 && (
              <span className="text-xs font-fredoka font-bold text-[#FF4D8D] animate-bounce">
                🎉 Sanctum Unlocked! Opening Private Sibling Realm...
              </span>
            )}
          </div>
        </div>

        <div className="mt-8 text-xs font-quicksand text-gray-400">
          <span>MADE WITH 100% RESPECT & DEVOTION • MARCH 6, 2027</span>
        </div>
      </div>
    </footer>
  );
};
