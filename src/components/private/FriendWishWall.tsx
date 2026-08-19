import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, X, Sparkles } from 'lucide-react';
import { FRIEND_WISHES_DATA, FriendWish } from '../../data/friendWishes';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const FriendWishWall: React.FC = () => {
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());
  const [selectedWish, setSelectedWish] = useState<FriendWish | null>(null);

  const handlePop = (wish: FriendWish, e: React.MouseEvent) => {
    soundEngine.playHarmonicPop(wish.id);
    triggerCustomConfetti(e.clientX, e.clientY);
    setPoppedIds((prev) => new Set([...prev, wish.id]));
    setSelectedWish(wish);
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20">
      <div className="text-center max-w-xl mx-auto mb-14">
        <span className="text-xs font-fredoka uppercase tracking-widest text-[#FF4D8D] font-bold">
          CHAPTER 04 // CLOSE CIRCLE
        </span>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800 mt-1">
          Friend Wish Balloons 🎈
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Secret messages gathered from the people who hold you closest. Tap a balloon to pop & read!
        </p>
      </div>

      {/* Floating Balloons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {FRIEND_WISHES_DATA.map((item, idx) => {
          const isPopped = poppedIds.has(item.id);

          return (
            <motion.div
              key={item.id}
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 + idx * 0.3, ease: 'easeInOut' }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={(e) => handlePop(item, e)}
              className="cursor-pointer flex flex-col items-center text-center p-4"
            >
              <div
                className={`w-20 h-24 sm:w-24 sm:h-28 rounded-full ${item.balloonColor} text-white flex flex-col items-center justify-center shadow-lg border-2 border-white relative`}
              >
                <span className="text-2xl">{item.avatarEmoji}</span>
                <span className="text-xs font-fredoka font-bold mt-1 max-w-[70px] truncate">
                  {item.name}
                </span>

                {/* Balloon string */}
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-0.5 h-6 bg-gray-400" />
              </div>

              <span className="mt-8 text-[11px] font-quicksand font-bold text-gray-600">
                {isPopped ? 'READ 💌' : 'TAP TO POP 🎈'}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Pop-up Message Modal */}
      <AnimatePresence>
        {selectedWish && (
          <div
            onClick={() => setSelectedWish(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl border border-pink-200 text-center"
            >
              <button
                onClick={() => setSelectedWish(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="text-5xl">{selectedWish.avatarEmoji}</span>

              <h3 className="text-2xl font-fredoka font-bold text-gray-800 mt-2">
                From {selectedWish.name}
              </h3>
              <span className="text-xs font-space text-[#FF4D8D] uppercase tracking-wider font-semibold">
                {selectedWish.relation}
              </span>

              <div className="my-6 p-6 rounded-2xl bg-pink-50/50 border border-pink-100 text-left">
                <p className="font-quicksand text-sm text-gray-800 leading-relaxed italic">
                  "{selectedWish.message}"
                </p>
                <p className="text-right text-xs font-fredoka font-bold text-[#FF4D8D] mt-3">
                  {selectedWish.signature}
                </p>
              </div>

              <button
                onClick={() => setSelectedWish(null)}
                className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-fredoka font-semibold"
              >
                Close 🌸
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
