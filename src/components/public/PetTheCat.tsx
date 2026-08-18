import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Hand } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

export const PetTheCat: React.FC = () => {
  const [petCount, setPetCount] = useState<number>(() => {
    const saved = localStorage.getItem('shree_cat_pets');
    return saved ? parseInt(saved, 10) : 12480;
  });
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [isPurring, setIsPurring] = useState(false);

  const handlePet = (e: React.MouseEvent) => {
    soundEngine.playMeow();

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart = { id: Date.now() + Math.random(), x, y };
    setHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    setIsPurring(true);
    setTimeout(() => setIsPurring(false), 800);

    setPetCount((prev) => {
      const next = prev + 1;
      localStorage.setItem('shree_cat_pets', String(next));
      return next;
    });
  };

  return (
    <section id="pet-cat" className="relative w-full max-w-4xl mx-auto px-4 py-16 text-center select-none">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>SHREE’S FAVORITE CREATURE 🐾</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
        Pet the Birthday Kitty 🐱
      </h2>
      <p className="text-sm font-quicksand text-gray-600 mt-2 max-w-md mx-auto">
        Tap the kitty to give her gentle headpats! Listen for her purrs and meows.
      </p>

      <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-pink-100/80 text-[#FF4D8D] text-xs font-space font-semibold shadow-sm border border-pink-200">
        <span>🐾 TOTAL HEADPATS GIVEN:</span>
        <span className="font-bold text-base text-[#FF2D78]">{petCount.toLocaleString()}</span>
      </div>

      <div className="mt-8 relative max-w-xs mx-auto flex flex-col items-center justify-center">
        <div className="absolute -bottom-4 inset-x-2 h-20 bg-gradient-to-r from-[#FFB3C6] via-[#FFE5EC] to-[#FFB3C6] rounded-full shadow-lg border border-pink-200 pointer-events-none" />

        <motion.div
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={handlePet}
          className="relative z-10 cursor-pointer p-8 rounded-3xl bg-white/90 shadow-pop border-2 border-pink-200 backdrop-blur-md flex flex-col items-center justify-center"
        >
          <motion.div
            animate={
              isPurring
                ? { y: [0, -8, 0], scale: [1, 1.12, 1] }
                : { y: [0, -4, 0] }
            }
            transition={{
              duration: isPurring ? 0.4 : 2,
              repeat: isPurring ? 2 : Infinity,
              ease: 'easeInOut'
            }}
            className="text-8xl filter drop-shadow-md select-none"
          >
            🐱
          </motion.div>

          {isPurring && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0 }}
              className="absolute top-2 font-caveat text-xl font-bold text-[#FF4D8D]"
            >
              *purrrr... meow!* 💗
            </motion.span>
          )}

          <AnimatePresence>
            {hearts.map((h) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 1, scale: 0.5, x: h.x - 30, y: h.y - 40 }}
                animate={{ opacity: 0, scale: 1.8, y: h.y - 120 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute text-2xl pointer-events-none text-[#FF4D8D]"
              >
                💖
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="mt-4 flex items-center gap-1.5 px-4 py-1 rounded-full bg-pink-50 text-xs font-fredoka font-bold text-[#FF4D8D]">
            <Hand className="w-3.5 h-3.5" />
            <span>Tap to Pet Kitty 🐾</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
