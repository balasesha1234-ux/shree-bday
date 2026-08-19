import React from 'react';
import { motion } from 'framer-motion';
import { TapTarget } from '../../hooks/useTapSequence';
import { triggerCustomConfetti } from '../shared/Confetti';
import { soundEngine } from '../../utils/soundEffects';

interface SecretFloatingEasterEggsProps {
  onTapTarget: (target: TapTarget, event: React.MouseEvent) => void;
}

export const SecretFloatingEasterEggs: React.FC<SecretFloatingEasterEggsProps> = ({ onTapTarget }) => {
  const handleEasterEggClick = (target: TapTarget, event: React.MouseEvent) => {
    soundEngine.playSparkle(1.4);
    triggerCustomConfetti();
    onTapTarget(target, event);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      {/* ========================================================================= */}
      {/* SECRET EASTER EGG 1: 🐱 Kitten (Floating naturally in Top Hero section) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, -16, 0],
          rotate: [-6, 6, -6]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-[14%] right-[5%] sm:right-[10%] pointer-events-auto cursor-pointer"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.3, rotate: 12 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => handleEasterEggClick('cat', e)}
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 hover:bg-white text-2xl sm:text-3xl flex items-center justify-center shadow-lg border border-pink-200/80 backdrop-blur-md transition-all group"
          title="A floating kitten"
        >
          <span className="group-hover:animate-bounce">🐱</span>
        </motion.button>
      </motion.div>

      {/* ========================================================================= */}
      {/* SECRET EASTER EGG 2: ⭐ Twinkling Star (Floating near Mid Photobooth / Diya) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, 18, 0],
          rotate: [8, -8, 8]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1
        }}
        className="absolute top-[48%] left-[4%] sm:left-[8%] pointer-events-auto cursor-pointer"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.35, rotate: -15 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => handleEasterEggClick('star', e)}
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 hover:bg-white text-2xl sm:text-3xl flex items-center justify-center shadow-lg border border-amber-200/80 backdrop-blur-md transition-all group"
          title="A twinkling star"
        >
          <span className="group-hover:animate-spin">⭐</span>
        </motion.button>
      </motion.div>

      {/* ========================================================================= */}
      {/* SECRET EASTER EGG 3: 💗 Tender Heart (Floating near Bottom Finale / Wish Wall) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [-5, 5, -5]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2
        }}
        className="absolute top-[82%] right-[6%] sm:right-[12%] pointer-events-auto cursor-pointer"
      >
        <motion.button
          type="button"
          whileHover={{ scale: 1.3, rotate: 10 }}
          whileTap={{ scale: 0.8 }}
          onClick={(e) => handleEasterEggClick('heart', e)}
          className="w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/80 hover:bg-white text-2xl sm:text-3xl flex items-center justify-center shadow-lg border border-rose-200/80 backdrop-blur-md transition-all group"
          title="A tender heart"
        >
          <span className="group-hover:animate-pulse">💗</span>
        </motion.button>
      </motion.div>
    </div>
  );
};
