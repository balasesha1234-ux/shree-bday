import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TapSequenceOverlayProps {
  isUnlocked: boolean;
}

export const TapSequenceOverlay: React.FC<TapSequenceOverlayProps> = ({ isUnlocked }) => {
  return (
    <AnimatePresence>
      {isUnlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
        >
          {/* Pink Mist Curtain Left */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#FF4D8D] to-[#FF85A2] backdrop-blur-2xl"
          />

          {/* Pink Mist Curtain Right */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#FF4D8D] to-[#FF85A2] backdrop-blur-2xl"
          />

          {/* Center Sacred Welcome Badge */}
          <motion.div
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring', damping: 14 }}
            className="relative z-10 text-center px-6 py-8 rounded-3xl bg-white/95 shadow-2xl border border-pink-200 max-w-sm mx-4"
          >
            <span className="text-4xl">🐱⭐💗</span>
            <h3 className="text-2xl font-fredoka font-bold text-[#FF4D8D] mt-2">
              Sanctuary Unlocked
            </h3>
            <p className="text-xs font-quicksand text-gray-600 mt-1">
              Opening your private birthday world...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
