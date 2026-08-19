import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Shield, Lock } from 'lucide-react';

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
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 pointer-events-auto flex items-center justify-center overflow-hidden select-none"
        >
          {/* Ethereal Dark/Rose Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-2xl"
          />

          {/* Golden Shockwave Expanding Rings */}
          <motion.div
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
            className="absolute w-96 h-96 rounded-full border-4 border-[#D4A84B] shadow-[0_0_80px_#D4A84B] pointer-events-none"
          />

          <motion.div
            initial={{ scale: 0.1, opacity: 1 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1.8, delay: 0.2, ease: 'easeOut' }}
            className="absolute w-96 h-96 rounded-full border-2 border-[#FF4D8D] shadow-[0_0_60px_#FF4D8D] pointer-events-none"
          />

          {/* Left Rose-Velvet Curtain */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-[#241228] via-[#3D1E42] to-[#FF4D8D] border-r-4 border-[#D4A84B] shadow-2xl flex items-center justify-end pr-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.15),transparent)] pointer-events-none" />
          </motion.div>

          {/* Right Rose-Velvet Curtain */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#241228] via-[#3D1E42] to-[#FF4D8D] border-l-4 border-[#D4A84B] shadow-2xl flex items-center justify-start pl-6"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.15),transparent)] pointer-events-none" />
          </motion.div>

          {/* Center Golden Lotus Seal & Portal Emblem */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.8, type: 'spring', damping: 14 }}
            className="relative z-20 flex flex-col items-center justify-center text-center p-8 sm:p-12 max-w-lg mx-4 rounded-3xl bg-gradient-to-b from-[#FFFDF8] to-[#FFF0F3] border-4 border-[#D4A84B] shadow-[0_0_80px_rgba(212,168,75,0.7)]"
          >
            {/* Spinning Golden Lotus Aura */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4A84B] via-[#FFE5EC] to-[#FF4D8D] flex items-center justify-center text-5xl shadow-pop mb-4"
            >
              🪷
            </motion.div>

            {/* Glowing Sibling Constellation Badges */}
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-pink-100 border border-pink-300 text-sm font-fredoka font-bold text-[#FF4D8D]">
                🐱 KITTEN
              </span>
              <span className="text-pink-400">➔</span>
              <span className="px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-sm font-fredoka font-bold text-[#D4A84B]">
                ⭐ STAR
              </span>
              <span className="text-pink-400">➔</span>
              <span className="px-3 py-1 rounded-full bg-rose-100 border border-rose-300 text-sm font-fredoka font-bold text-rose-600">
                💗 HEART
              </span>
            </div>

            <span className="text-[11px] font-space tracking-[0.3em] uppercase text-[#D4A84B] font-bold block">
              AUTHENTICATION GRANTED // WELCOME SHREE
            </span>

            <h3 className="text-3xl sm:text-4xl font-playfair font-bold text-[#3D2040] mt-2">
              Opening Sibling Sanctuary 🌸
            </h3>

            <p className="font-caveat text-xl sm:text-2xl text-gray-700 mt-2 leading-snug">
              "A quiet, personal realm crafted with 100% pride and brotherly love across the distance."
            </p>

            {/* Loading Wave Bar */}
            <div className="w-full h-1.5 bg-pink-100 rounded-full mt-6 overflow-hidden border border-pink-200">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 1.8, ease: 'easeInOut' }}
                className="w-full h-full bg-gradient-to-r from-[#D4A84B] via-[#FF4D8D] to-[#D4A84B]"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
