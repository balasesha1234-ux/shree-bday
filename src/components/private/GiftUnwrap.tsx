import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, Check, Heart, X } from 'lucide-react';
import { GIFTS_DATA, GiftBox } from '../../data/gifts';
import { triggerCustomConfetti } from '../shared/Confetti';
import { soundEngine } from '../../utils/soundEffects';

export const GiftUnwrap: React.FC = () => {
  const [openedBoxIds, setOpenedBoxIds] = useState<Set<number>>(new Set());
  const [activeReveal, setActiveReveal] = useState<GiftBox | null>(null);

  const handleBoxClick = (box: GiftBox, e: React.MouseEvent) => {
    soundEngine.playMeow();
    triggerCustomConfetti(e.clientX, e.clientY);

    setOpenedBoxIds((prev) => new Set([...prev, box.id]));
    setActiveReveal(box);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-fredoka uppercase tracking-widest text-[#FF4D8D] font-bold">
          CHAPTER 03 // 5 SURPRISES
        </span>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800 mt-1">
          Virtual Gift Unwrap 🎁
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Tap each mystery box to unwrap your special coupons, promises, and sweet truths!
        </p>
      </div>

      {/* 5 Gift Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {GIFTS_DATA.map((box) => {
          const isOpened = openedBoxIds.has(box.id);

          return (
            <motion.div
              key={box.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={(e) => handleBoxClick(box, e)}
              className={`cursor-pointer relative rounded-3xl p-7 bg-gradient-to-br ${box.boxColor} border-2 border-white shadow-pop flex flex-col items-center justify-center text-center min-h-[220px] overflow-hidden group`}
            >
              {/* Pattern Stamp */}
              <span className="text-5xl mb-3 group-hover:scale-125 transition-transform duration-300">
                {isOpened ? box.emoji : '🎁'}
              </span>

              <h4 className="font-fredoka font-bold text-gray-800 text-lg">
                {box.title}
              </h4>

              <span className="mt-2 text-xs font-space font-semibold px-3 py-1 rounded-full bg-white/90 text-gray-700 shadow-sm">
                {isOpened ? 'UNWRAPPED ✨' : 'TAP TO UNWRAP 🎀'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Reveal Modal */}
      <AnimatePresence>
        {activeReveal && (
          <div
            onClick={() => setActiveReveal(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-pink-200 text-center"
            >
              <button
                onClick={() => setActiveReveal(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-6xl">{activeReveal.emoji}</span>

              <span className="mt-3 inline-block text-[10px] font-space font-bold px-3 py-1 rounded-full bg-pink-100 text-[#FF4D8D] uppercase tracking-wider">
                {activeReveal.badge}
              </span>

              <h3 className="text-2xl font-fredoka font-bold text-gray-800 mt-2">
                {activeReveal.revealTitle}
              </h3>

              <p className="font-quicksand text-sm text-gray-700 mt-3 leading-relaxed">
                {activeReveal.revealContent}
              </p>

              <button
                onClick={() => setActiveReveal(null)}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#FF4D8D] text-white font-fredoka text-xs font-semibold shadow-sm hover:bg-[#FF2D78]"
              >
                Claim This Gift 💖
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
