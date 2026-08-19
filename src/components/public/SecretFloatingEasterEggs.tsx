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
    if (target === 'cat') {
      soundEngine.playMeow();
    } else if (target === 'star') {
      soundEngine.playSparkle(1.3);
    } else {
      soundEngine.playSparkle(1.7);
    }

    triggerCustomConfetti(event.clientX, event.clientY);
    onTapTarget(target, event);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      {/* ========================================================================= */}
      {/* SECRET EASTER EGG 1: 🐱 Kitten Sprite (Camouflaged near Hero polaroid edge) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          rotate: [-4, 5, -4]
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
        className="absolute top-[12%] right-[4%] sm:right-[7%] pointer-events-auto cursor-pointer"
      >
        <motion.div
          whileHover={{ scale: 1.35, rotate: 12 }}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => handleEasterEggClick('cat', e)}
          className="relative text-3xl sm:text-4xl filter drop-shadow-[0_4px_12px_rgba(255,77,141,0.35)] opacity-85 hover:opacity-100 transition-opacity p-2"
        >
          <span className="block hover:animate-bounce">🐱</span>
          <span className="absolute -top-1 -right-1 text-[10px] opacity-0 hover:opacity-100 transition-opacity">✨</span>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* SECRET EASTER EGG 2: ⭐ Stardust Star (Camouflaged in Mid Moments / Diya pond) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, 14, 0],
          rotate: [6, -6, 6]
        }}
        transition={{
          duration: 6.2,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.8
        }}
        className="absolute top-[49%] left-[3%] sm:left-[6%] pointer-events-auto cursor-pointer"
      >
        <motion.div
          whileHover={{ scale: 1.4, rotate: -15 }}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => handleEasterEggClick('star', e)}
          className="relative text-3xl sm:text-4xl filter drop-shadow-[0_4px_14px_rgba(255,217,61,0.45)] opacity-80 hover:opacity-100 transition-opacity p-2"
        >
          <span className="block hover:animate-spin">⭐</span>
          <span className="absolute -bottom-1 -left-1 text-[10px] opacity-0 hover:opacity-100 transition-opacity">✨</span>
        </motion.div>
      </motion.div>

      {/* ========================================================================= */}
      {/* SECRET EASTER EGG 3: 💗 Lotus Heart (Camouflaged near Bottom Wish Wall / Footer) */}
      {/* ========================================================================= */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1.5
        }}
        className="absolute top-[84%] right-[5%] sm:right-[8%] pointer-events-auto cursor-pointer"
      >
        <motion.div
          whileHover={{ scale: 1.4, rotate: 8 }}
          whileTap={{ scale: 0.75 }}
          onClick={(e) => handleEasterEggClick('heart', e)}
          className="relative text-3xl sm:text-4xl filter drop-shadow-[0_4px_14px_rgba(255,77,141,0.45)] opacity-85 hover:opacity-100 transition-opacity p-2"
        >
          <span className="block hover:animate-pulse">💗</span>
          <span className="absolute -top-1 -left-1 text-[10px] opacity-0 hover:opacity-100 transition-opacity">🌸</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
