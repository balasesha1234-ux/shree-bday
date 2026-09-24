import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Flame, Sparkles, Wind, RotateCcw, Heart } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';
import { triggerCustomConfetti } from '../../shared/Confetti';

interface MobileCandleBlowoutProps {
  onBack: () => void;
}

export const MobileCandleBlowout: React.FC<MobileCandleBlowoutProps> = ({ onBack }) => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [isExtinguished, setIsExtinguished] = useState<boolean>(false);
  const [wishText, setWishText] = useState<string>('');
  const [hasMadeWish, setHasMadeWish] = useState<boolean>(false);

  const extinguishAll = (e: React.MouseEvent) => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti(e.clientX, e.clientY);
    setCandlesLit([false, false, false, false, false]);
    setIsExtinguished(true);
    setHasMadeWish(true);
  };

  const relightCandles = () => {
    soundEngine.playTap();
    setCandlesLit([true, true, true, true, true]);
    setIsExtinguished(false);
    setHasMadeWish(false);
  };

  const handleMakeWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishText.trim()) return;
    soundEngine.playSparkle(2);
    setHasMadeWish(true);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-gradient-to-b from-[#180A22] via-[#220E30] to-[#12051B] text-white flex flex-col justify-between overflow-hidden select-none font-quicksand">
      <div>
        <MobileTopBar light />

        {/* Top Header */}
        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#FFD93D] uppercase">
            BLOW CANDLES 🎂
          </span>
          <button
            onClick={relightCandles}
            className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-[#FFD93D] hover:bg-white/20 transition-all"
            title="Relight Candles"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Cake & Candle Display */}
      <div className="relative z-10 px-6 my-auto text-center flex flex-col items-center">
        <span className="text-xs font-space uppercase tracking-widest text-pink-300 font-bold mb-2">
          {isExtinguished ? '✨ PURE BLISS & BLESSINGS ✨' : 'MAKE A SILENT WISH & TAP TO BLOW'}
        </span>

        {/* Birthday Cake Illustration */}
        <div className="relative w-64 h-56 flex flex-col items-center justify-end my-4">
          {/* Candle Flames */}
          <div className="absolute top-2 w-48 flex justify-between px-4 z-20">
            {candlesLit.map((lit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {lit ? (
                  <motion.div
                    animate={{ scale: [1, 1.25, 1], y: [0, -2, 0] }}
                    transition={{ repeat: Infinity, duration: 1 + idx * 0.2 }}
                    className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_#FFD700] mb-0.5"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0.8, y: 0 }}
                    animate={{ opacity: 0, y: -20 }}
                    className="w-2 h-4 text-gray-400 font-bold text-[10px]"
                  >
                    💨
                  </motion.div>
                )}
                {/* Candle Stick */}
                <div className="w-2.5 h-10 rounded-t-sm bg-gradient-to-b from-pink-300 to-pink-500 shadow-xs border border-white/30" />
              </div>
            ))}
          </div>

          {/* Tier 1 (Top Cake Layer) */}
          <div className="w-48 h-16 rounded-t-3xl bg-gradient-to-r from-pink-300 via-pink-200 to-pink-300 shadow-md border-t-2 border-white/60 relative overflow-hidden flex items-center justify-center">
            <span className="text-xs font-fredoka font-bold text-[#FF4D8D]">
              Shree 🪷
            </span>
          </div>

          {/* Tier 2 (Bottom Cake Layer) */}
          <div className="w-56 h-18 rounded-t-2xl bg-gradient-to-r from-[#D4A84B] via-amber-200 to-[#D4A84B] shadow-xl border-t-2 border-white/70 flex items-center justify-center">
            <span className="text-xs font-space font-bold tracking-widest text-[#3D2040]">
              MARCH 6 • 2027
            </span>
          </div>

          {/* Cake Stand Plate */}
          <div className="w-64 h-4 rounded-full bg-white/40 backdrop-blur-md shadow-lg" />
        </div>

        {/* Action Button */}
        {!isExtinguished ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={extinguishAll}
            className="mt-4 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FF80AC] to-[#FF4D8D] text-[#3D2040] font-fredoka font-bold text-base shadow-[0_0_30px_rgba(255,77,141,0.5)] flex items-center gap-2"
          >
            <Wind className="w-5 h-5" />
            <span>Tap to Blow Out Candles! 🎂</span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-pink-400/40 max-w-xs space-y-2 text-center"
          >
            <p className="font-fredoka text-sm text-[#FFD93D] flex items-center justify-center gap-1.5 font-bold">
              <Sparkles className="w-4 h-4 text-[#FFD93D]" />
              <span>Wish Granted by Sri Sri Radha Krishna! 🪷</span>
            </p>
            <p className="text-xs text-pink-100/90 leading-relaxed font-quicksand">
              "May your silent prayers reach the divine lotus feet and wrap you in endless peace."
            </p>
            <button
              onClick={relightCandles}
              className="mt-2 text-[11px] font-space text-pink-300 underline"
            >
              Relight Candles
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer Note */}
      <div className="relative z-10 px-6 pb-6 text-center">
        <p className="font-caveat text-sm text-pink-200/80 italic">
          "Every flame carries a prayer for your happiness."
        </p>
      </div>
    </div>
  );
};
