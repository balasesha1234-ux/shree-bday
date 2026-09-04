import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Sparkles, Star } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';
import { triggerCustomConfetti } from '../../shared/Confetti';

interface MobileElevenElevenProps {
  onBack: () => void;
}

export const MobileElevenEleven: React.FC<MobileElevenElevenProps> = ({ onBack }) => {
  const [wishInput, setWishInput] = useState('');
  const [wishesConstellation, setWishesConstellation] = useState<string[]>([
    'Peace and endless smiles for Shree 🌸',
    'May your sacred music touch millions of souls 🎵',
    'Health, abundance, and divine protection 🪷'
  ]);
  const [shootingStar, setShootingStar] = useState(false);
  const [isWishing, setIsWishing] = useState(false);

  const handleMakeWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wishInput.trim()) return;

    soundEngine.playSparkle(2.0);
    soundEngine.playTempleBell();
    triggerCustomConfetti();

    setShootingStar(true);
    setTimeout(() => setShootingStar(false), 2200);

    setWishesConstellation([wishInput.trim(), ...wishesConstellation]);
    setWishInput('');
    setIsWishing(false);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#070512] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Deep Cosmos Stardust Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-16 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-amber-200/10 blur-3xl pointer-events-none" />

        {/* Shooting star animation */}
        {shootingStar && (
          <motion.div
            initial={{ x: -100, y: 80, opacity: 1 }}
            animate={{ x: 500, y: -250, opacity: 0 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute z-30 w-40 h-1 bg-gradient-to-r from-transparent via-white to-amber-200 shadow-[0_0_20px_white]"
          />
        )}
      </div>

      <div>
        <MobileTopBar light />

        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#FFD93D] uppercase">
            11:11 SANCTUARY
          </span>
          <div className="w-9" />
        </div>
      </div>

      {/* Crescent Moon & Glowing 11:11 */}
      <div className="relative z-10 px-6 my-auto flex flex-col items-center text-center">
        {/* Golden Crescent Moon */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="text-5xl mb-3 drop-shadow-[0_0_25px_rgba(255,217,61,0.7)]"
        >
          🌙
        </motion.div>

        {/* Glowing 11:11 Digital Typography */}
        <motion.h2
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="font-space text-6xl sm:text-7xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-pink-100 to-[#FFD93D] drop-shadow-[0_0_35px_rgba(255,217,61,0.65)]"
        >
          11:11
        </motion.h2>

        <p className="font-caveat text-xl text-pink-200 max-w-xs mt-3 leading-relaxed">
          "Some wishes aren’t meant to come true in the usual way. Some are simply meant to remind you how grateful you are."
        </p>

        {/* Wishes Constellation Pills */}
        <div className="w-full max-w-xs mt-5 space-y-1.5 max-h-36 overflow-y-auto no-scrollbar">
          {wishesConstellation.slice(0, 3).map((w, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-quicksand text-pink-100"
            >
              <Star className="w-3 h-3 text-[#FFD93D] fill-[#FFD93D] shrink-0" />
              <span className="truncate">{w}</span>
            </motion.div>
          ))}
        </div>

        {/* Make a Wish Button / Input */}
        {!isWishing ? (
          <button
            onClick={() => setIsWishing(true)}
            className="mt-6 flex items-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FF4D8D] to-[#FF2D78] text-[#3D2040] font-fredoka font-bold text-sm shadow-[0_0_25px_rgba(255,77,141,0.5)] hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#3D2040]" />
            <span>Make an 11:11 Wish ✨</span>
          </button>
        ) : (
          <form onSubmit={handleMakeWish} className="w-full max-w-xs mt-5 flex gap-2">
            <input
              type="text"
              required
              autoFocus
              placeholder="Type your silent prayer or wish..."
              value={wishInput}
              onChange={(e) => setWishInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-full bg-white/15 border border-pink-400/50 text-white placeholder-gray-400 text-xs font-quicksand focus:outline-none focus:ring-2 focus:ring-[#FFD93D]"
            />
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#FFD93D] text-[#3D2040] font-fredoka font-bold text-xs shadow-md"
            >
              Send 🚀
            </button>
          </form>
        )}
      </div>

      {/* Footer message */}
      <div className="relative z-10 px-8 pb-8 text-center text-[10px] font-space text-gray-500">
        <span>STARLIGHT SANCTUARY • RADIATING INFINITE BLESSINGS</span>
      </div>
    </div>
  );
};
