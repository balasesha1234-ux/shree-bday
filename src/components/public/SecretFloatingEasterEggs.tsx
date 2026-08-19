import React from 'react';
import { motion } from 'framer-motion';
import { TapTarget } from '../../hooks/useTapSequence';
import { triggerCustomConfetti } from '../shared/Confetti';
import { soundEngine } from '../../utils/soundEffects';

interface SecretFloatingEasterEggsProps {
  onTapTarget: (target: TapTarget, event: React.MouseEvent) => void;
}

interface FloatingSticker {
  id: string;
  emoji: string;
  isSecretTarget?: TapTarget;
  topPct: number;
  leftPct?: number;
  rightPct?: number;
  floatDuration: number;
  delay: number;
  glowColor: string;
}

const ALL_FLOATING_STICKERS: FloatingSticker[] = [
  // --- TOP SECTION (Hero / Cake / Photobooth) ---
  { id: 'decoy-1', emoji: '🌸', topPct: 6, leftPct: 4, floatDuration: 5.2, delay: 0.2, glowColor: 'rgba(255,77,141,0.4)' },
  { id: 'secret-cat', emoji: '🐱', isSecretTarget: 'cat', topPct: 11, rightPct: 5, floatDuration: 5.6, delay: 0.5, glowColor: 'rgba(255,77,141,0.5)' },
  { id: 'decoy-2', emoji: '🎂', topPct: 18, leftPct: 6, floatDuration: 4.8, delay: 1.1, glowColor: 'rgba(255,217,61,0.4)' },
  { id: 'decoy-3', emoji: '✨', topPct: 24, rightPct: 7, floatDuration: 6.0, delay: 0.8, glowColor: 'rgba(255,255,255,0.6)' },
  
  // --- UPPER MID SECTION (Public Moments / Kindness Tribute) ---
  { id: 'decoy-4', emoji: '🪷', topPct: 32, leftPct: 3, floatDuration: 5.4, delay: 1.5, glowColor: 'rgba(255,77,141,0.4)' },
  { id: 'decoy-5', emoji: '👑', topPct: 39, rightPct: 4, floatDuration: 4.9, delay: 0.3, glowColor: 'rgba(255,217,61,0.5)' },
  { id: 'secret-star', emoji: '⭐', isSecretTarget: 'star', topPct: 47, leftPct: 5, floatDuration: 5.8, delay: 1.2, glowColor: 'rgba(255,217,61,0.6)' },
  { id: 'decoy-6', emoji: '🐾', topPct: 54, rightPct: 6, floatDuration: 5.1, delay: 0.7, glowColor: 'rgba(124,235,198,0.4)' },

  // --- LOWER MID SECTION (Diya Pond / Story Creator / Arcade) ---
  { id: 'decoy-7', emoji: '☕', topPct: 62, leftPct: 4, floatDuration: 6.2, delay: 1.8, glowColor: 'rgba(255,179,198,0.4)' },
  { id: 'decoy-8', emoji: '🎈', topPct: 69, rightPct: 5, floatDuration: 4.7, delay: 0.4, glowColor: 'rgba(107,197,248,0.5)' },
  { id: 'decoy-9', emoji: '🪔', topPct: 76, leftPct: 3, floatDuration: 5.5, delay: 1.3, glowColor: 'rgba(255,217,61,0.5)' },

  // --- BOTTOM FINALE SECTION (Wish Wall / Footer) ---
  { id: 'secret-heart', emoji: '💗', isSecretTarget: 'heart', topPct: 83, rightPct: 6, floatDuration: 5.0, delay: 0.9, glowColor: 'rgba(255,77,141,0.6)' },
  { id: 'decoy-10', emoji: '🧁', topPct: 89, leftPct: 5, floatDuration: 5.7, delay: 1.6, glowColor: 'rgba(224,212,240,0.5)' },
  { id: 'decoy-11', emoji: '🎀', topPct: 94, rightPct: 4, floatDuration: 4.6, delay: 0.2, glowColor: 'rgba(255,77,141,0.4)' },
  { id: 'decoy-12', emoji: '💫', topPct: 97, leftPct: 6, floatDuration: 6.1, delay: 1.0, glowColor: 'rgba(255,217,61,0.5)' }
];

export const SecretFloatingEasterEggs: React.FC<SecretFloatingEasterEggsProps> = ({ onTapTarget }) => {
  const handleStickerClick = (sticker: FloatingSticker, event: React.MouseEvent) => {
    if (sticker.isSecretTarget === 'cat') {
      soundEngine.playMeow();
      onTapTarget('cat', event);
    } else if (sticker.isSecretTarget === 'star') {
      soundEngine.playSparkle(1.4);
      onTapTarget('star', event);
    } else if (sticker.isSecretTarget === 'heart') {
      soundEngine.playSparkle(1.8);
      onTapTarget('heart', event);
    } else {
      // Innocent decoy click
      soundEngine.playSparkle(1.1 + (Math.random() * 0.4));
    }

    triggerCustomConfetti(event.clientX, event.clientY);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-30 select-none">
      {ALL_FLOATING_STICKERS.map((sticker) => {
        const style: React.CSSProperties = {
          top: `${sticker.topPct}%`
        };
        if (sticker.leftPct !== undefined) style.left = `${sticker.leftPct}%`;
        if (sticker.rightPct !== undefined) style.right = `${sticker.rightPct}%`;

        return (
          <motion.div
            key={sticker.id}
            style={style}
            animate={{
              y: [0, -14, 0],
              rotate: [-5, 5, -5]
            }}
            transition={{
              duration: sticker.floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: sticker.delay
            }}
            className="absolute pointer-events-auto cursor-pointer"
          >
            <motion.div
              whileHover={{ scale: 1.35, rotate: 12 }}
              whileTap={{ scale: 0.75 }}
              onClick={(e) => handleStickerClick(sticker, e)}
              className="relative text-2xl sm:text-3.5xl filter opacity-80 hover:opacity-100 transition-opacity p-2 select-none"
              style={{
                filter: `drop-shadow(0 4px 12px ${sticker.glowColor})`
              }}
            >
              <span className="block hover:animate-bounce">{sticker.emoji}</span>
              <span className="absolute -top-1 -right-1 text-[10px] opacity-0 hover:opacity-100 transition-opacity">✨</span>
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};
