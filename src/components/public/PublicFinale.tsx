import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Sparkles } from 'lucide-react';
import { triggerCustomConfetti } from '../shared/Confetti';
import { soundEngine } from '../../utils/soundEffects';

export const PublicFinale: React.FC = () => {
  const shareWebsite = () => {
    soundEngine.playSparkle(1.2);
    triggerCustomConfetti();
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
    <footer className="relative w-full bg-gradient-to-b from-[#FFF5F5] to-[#FFE5EC] pt-24 pb-20 px-4 overflow-hidden border-t border-pink-100 select-none">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm mb-4 border border-pink-200"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
          <span>SPREAD THE LOVE & CELEBRATION 🌸</span>
        </motion.div>

        <h2 className="text-3xl sm:text-6xl font-fredoka font-bold text-gray-800">
          Happy Birthday From All of Us 💛
        </h2>

        <p className="mt-4 text-base sm:text-lg font-quicksand text-gray-600 max-w-xl mx-auto leading-relaxed">
          Thank you for making this world a kinder, sweeter, and more graceful place every single day.
        </p>

        {/* Share Button */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={shareWebsite}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-base shadow-pop hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Birthday Page 🎈</span>
          </button>
        </div>

        <div className="mt-16 pt-8 border-t border-pink-200/60 text-xs font-quicksand text-gray-400">
          <span>MADE WITH 100% RESPECT & DEVOTION • MARCH 6, 2027</span>
        </div>
      </div>
    </footer>
  );
};
