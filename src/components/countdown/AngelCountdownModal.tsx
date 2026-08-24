import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Heart, Clock, Send, Star } from 'lucide-react';
import { getTimeRemaining, TARGET_BIRTHDAY_IST } from '../../utils/dateCheck';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface AngelCountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AngelCountdownModal: React.FC<AngelCountdownModalProps> = ({ isOpen, onClose }) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(() => {
    const rem = getTimeRemaining(TARGET_BIRTHDAY_IST);
    return Math.max(0, Math.floor(rem.total / 1000));
  });
  const [fractionMs, setFractionMs] = useState<string>('00');
  const [blessingCount, setBlessingCount] = useState<number>(108);
  const [blessingSent, setBlessingSent] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const rem = getTimeRemaining(TARGET_BIRTHDAY_IST);
      setTotalSeconds(Math.max(0, Math.floor(rem.total / 1000)));
      setFractionMs(String(Math.floor((rem.total % 1000) / 10)).padStart(2, '0'));
    }, 40);

    return () => clearInterval(interval);
  }, [isOpen]);

  const handleSendBlessing = (e: React.MouseEvent) => {
    soundEngine.playTempleBell();
    soundEngine.playSparkle(1.6);
    triggerCustomConfetti(e.clientX, e.clientY);
    setBlessingCount((prev) => prev + 1);
    setBlessingSent(true);
    setTimeout(() => setBlessingSent(false), 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl select-none"
        >
          {/* Angelic Halo Golden Expanding Rings */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full border-2 border-amber-300/30 pointer-events-none"
          />

          <motion.div
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 260 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-gradient-to-b from-[#1E1430]/95 via-[#140E24]/98 to-[#0B0716] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(255,217,61,0.35)] border-2 border-amber-300/50 text-center overflow-hidden"
          >
            {/* Top Light Sheen */}
            <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent shadow-[0_0_20px_#FFD93D]" />

            {/* Close Button */}
            <button
              onClick={() => {
                soundEngine.playPop();
                onClose();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-pink-500/30 text-gray-300 hover:text-white flex items-center justify-center transition-all z-10"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Angel Wings Header */}
            <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl mb-3 filter drop-shadow-[0_0_20px_rgba(255,217,61,0.8)]">
              <span>🪽</span>
              <span className="text-2xl sm:text-3xl">✨</span>
              <span>🪽</span>
            </div>

            {/* Sacred Chronometer Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-amber-300/40 text-[#FFD93D] text-[11px] font-space font-bold tracking-widest uppercase mb-4 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE SACRED CHRONOMETER // ANGEL ODYSSEY 🪽</span>
            </div>

            {/* Live Total Seconds Odometer */}
            <div className="my-5 p-5 sm:p-7 rounded-2xl sm:rounded-3xl bg-black/60 border border-white/15 backdrop-blur-xl shadow-inner relative overflow-hidden group">
              <div className="text-[10px] sm:text-xs font-space font-bold text-pink-300/80 tracking-widest uppercase mb-2 flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FFD93D]" />
                <span>EXACT TOTAL SECONDS REMAINING</span>
              </div>

              {/* Glowing Laser Seconds Numerals */}
              <div className="flex items-baseline justify-center gap-1.5 text-center font-space font-extrabold text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-[#FFE5EC] to-[#FF4D8D] drop-shadow-[0_0_35px_rgba(255,217,61,0.85)] tracking-tight">
                <span>{totalSeconds.toLocaleString()}</span>
                <span className="text-xl sm:text-3xl text-[#FFD93D]/70 font-mono">.{fractionMs}</span>
                <span className="text-xs sm:text-sm text-pink-300 font-normal ml-1">s</span>
              </div>

              <span className="text-[9px] sm:text-[10px] font-space text-gray-400 mt-2 block tracking-wider uppercase">
                Synchronized Live with Absolute Event Horizon ⏳
              </span>
            </div>

            {/* Beautiful Calligraphic Praise for the Angel */}
            <div className="my-6 sm:my-8 px-2 sm:px-4 space-y-3">
              <h3 className="font-caveat font-bold text-2xl sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-[#FFF0F5] to-[#FF4D8D] leading-snug drop-shadow-[0_2px_20px_rgba(255,217,61,0.6)]">
                “More the seconds left for the birthday of an angel...” 🪽✨
              </h3>

              <p className="font-caveat text-xl sm:text-2xl text-pink-200/90 leading-relaxed max-w-lg mx-auto">
                Every ticking heartbeat and passing second is a sacred countdown celebrating the kindest, most radiant angel who stepped onto this earth to illuminate our lives with warmth and joy. 🌸🪷
              </p>
            </div>

            {/* Interactive Angel Blessing Action */}
            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-left text-xs font-space text-gray-400 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-[#FFD93D]" />
                <span>Angel Blessings: <strong className="text-white font-bold">{blessingCount}</strong> 💖</span>
              </div>

              <button
                onClick={handleSendBlessing}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FF4D8D] to-[#FF2D78] text-[#1A0B1A] font-fredoka font-bold text-xs sm:text-sm shadow-[0_0_30px_rgba(255,217,61,0.7)] hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>{blessingSent ? 'Angel Blessing Sent! 🪽✨' : 'Send Angel Blessing 🌟'}</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
