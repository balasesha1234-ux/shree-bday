import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Share2, Sparkles } from 'lucide-react';
import { triggerCustomConfetti } from '../shared/Confetti';
import { soundEngine } from '../../utils/soundEffects';

export const PublicFinale: React.FC = () => {
  const [showSecretWhisper, setShowSecretWhisper] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecretWhisper(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

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
    <footer className="relative w-full bg-gradient-to-b from-[#FFF5F5] via-[#FFF0F3] to-[#FFE5EC] pt-28 pb-24 px-4 overflow-hidden border-t border-pink-100/70 select-none">
      <div className="max-w-3xl mx-auto text-center relative z-10 space-y-6">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#FFD93D] to-[#FF4D8D] text-white flex items-center justify-center text-2xl shadow-sm"
        >
          🪷
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-gray-800 tracking-tight"
        >
          Always Here For You, Shree 🌸
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="text-base sm:text-xl font-quicksand text-gray-600 max-w-xl mx-auto leading-relaxed"
        >
          Thank you for making this world a kinder, sweeter, and more graceful place every single day.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.7 }}
          className="font-caveat text-3xl sm:text-4xl text-[#FF4D8D] font-bold tracking-wide pt-2"
        >
          Happy Birthday, Shree. 💛
        </motion.p>

        {/* Share Button with Calm Pacing */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="pt-6 flex items-center justify-center"
        >
          <button
            onClick={shareWebsite}
            className="flex items-center gap-2 px-7 py-3 rounded-full bg-white/80 hover:bg-white border border-pink-200 text-[#FF4D8D] font-fredoka font-semibold text-xs sm:text-sm shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Birthday Celebration 🎈</span>
          </button>
        </motion.div>

        {/* Secret Ending / Easter Egg for Stillness */}
        {showSecretWhisper && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.0, ease: 'easeInOut' }}
            className="pt-8 text-xs sm:text-sm font-caveat text-pink-400/90 tracking-wider select-none"
          >
            <p>You stayed until the end.</p>
            <p className="text-pink-600/90 font-bold mt-0.5">Thank you. 🌸</p>
          </motion.div>
        )}

        <div className="pt-14 text-[11px] font-space text-gray-400/80">
          <span>MADE WITH 100% DEVOTION & SIBLING ALLIANCE • MARCH 6, 2027</span>
        </div>
      </div>
    </footer>
  );
};
