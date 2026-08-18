import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface MidnightRevealProps {
  onComplete: () => void;
}

export const MidnightReveal: React.FC<MidnightRevealProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'flash' | 'shatter' | 'text' | 'done'>('flash');

  useEffect(() => {
    // Phase 1: White flash (0ms - 400ms)
    const t1 = setTimeout(() => {
      setPhase('shatter');
      // Fire grand confetti storm
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#FF4D8D', '#FF2D78', '#FFD93D', '#7CEBC6', '#FFFFFF']
      });
    }, 400);

    // Phase 2: Massive Happy Birthday Text (1200ms)
    const t2 = setTimeout(() => {
      setPhase('text');
    }, 1200);

    // Phase 3: Transition into public birthday celebration (3800ms)
    const t3 = setTimeout(() => {
      setPhase('done');
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none">
      <AnimatePresence>
        {phase === 'flash' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white"
          />
        )}

        {phase === 'shatter' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="text-8xl sm:text-9xl font-bold font-space text-[#FF2D78]"
          >
            00:00:00:00
          </motion.div>
        )}

        {phase === 'text' && (
          <motion.div
            initial={{ scale: 0.2, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ type: 'spring', damping: 12 }}
            className="text-center px-4"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-6xl sm:text-8xl md:text-9xl font-fredoka font-bold text-gradient-pink drop-shadow-[0_10px_35px_rgba(255,45,120,0.8)]"
            >
              HAPPY BIRTHDAY SHREE! 🎂✨
            </motion.div>
            <p className="mt-4 text-xl sm:text-2xl font-quicksand text-white font-medium">
              Zero Hour Arrived — The Realm Awakes 🌸🐱
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
