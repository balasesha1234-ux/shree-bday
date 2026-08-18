import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Sparkles, Send } from 'lucide-react';
import { triggerCustomConfetti } from '../shared/Confetti';
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
    <footer className="relative w-full bg-gradient-to-b from-[#FFF5F5] to-[#FFE5EC] pt-20 pb-16 px-4 overflow-hidden border-t border-pink-100">
      {/* Decorative Floating Lotus & Balloons */}
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

        {/* Share Buttons */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            onClick={shareWebsite}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-semibold text-sm shadow-pop hover:scale-105 active:scale-95 transition-all"
          >
            <Share2 className="w-4 h-4" />
            <span>Share Celebration 🎈</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* SECRET TAP SEQUENCE TARGETS (Innocently embedded in artwork & decorations) */}
        {/* Sequence: 🐱 Cat -> ⭐ Star -> 💗 Heart */}
        {/* ========================================================================= */}
        <div className="mt-16 pt-8 border-t border-pink-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-quicksand text-gray-500">
          <div className="flex items-center gap-2">
            <span>Made with endless love for Shree</span>
            {/* HIDDEN TARGET #1: 🐱 Cat */}
            <button
              type="button"
              onClick={(e) => onTapTarget('cat', e)}
              className="inline-flex items-center justify-center p-1 rounded-full hover:bg-pink-200/40 text-sm transition-transform active:scale-125 focus:outline-none"
              title="A sweet little kitten"
            >
              🐱
            </button>
          </div>

          <div className="flex items-center gap-4">
            {/* HIDDEN TARGET #2: ⭐ Star */}
            <button
              type="button"
              onClick={(e) => onTapTarget('star', e)}
              className="inline-flex items-center justify-center p-1 rounded-full hover:bg-pink-200/40 text-sm transition-transform active:scale-125 focus:outline-none"
              title="A twinkling star"
            >
              ⭐
            </button>

            <span>Hyderabad ✈️ Delhi</span>

            {/* HIDDEN TARGET #3: 💗 Heart */}
            <button
              type="button"
              onClick={(e) => onTapTarget('heart', e)}
              className="inline-flex items-center justify-center p-1 rounded-full hover:bg-pink-200/40 text-sm transition-transform active:scale-125 focus:outline-none"
              title="A tender heart"
            >
              💗
            </button>
          </div>
        </div>

        {/* Discreet Step Hint (invisible to normal users, helpful if looking closely) */}
        {tapStep > 0 && tapStep < 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-2 text-[10px] font-caveat text-pink-400 tracking-wider"
          >
            ✨ The realm resonates... ({tapStep}/3)
          </motion.div>
        )}
      </div>
    </footer>
  );
};
