import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';
import { triggerCustomConfetti } from '../../shared/Confetti';

interface MobileLetterLockProps {
  onBack: () => void;
  onEnterPrivate: () => void;
}

export const MobileLetterLock: React.FC<MobileLetterLockProps> = ({ onBack, onEnterPrivate }) => {
  // Secret sequence: 0 = awaiting Cat (🐱), 1 = awaiting Star (⭐), 2 = awaiting Heart (💖), 3 = Unlocked!
  const [tapStep, setTapStep] = useState(0);
  const [showPortal, setShowPortal] = useState(false);

  const handleTapSecretCharm = (charm: 'cat' | 'star' | 'heart') => {
    if (tapStep === 0 && charm === 'cat') {
      soundEngine.playSparkle(1.2);
      setTapStep(1);
    } else if (tapStep === 1 && charm === 'star') {
      soundEngine.playSparkle(1.5);
      setTapStep(2);
    } else if (tapStep === 2 && charm === 'heart') {
      soundEngine.playSparkle(1.8);
      soundEngine.playTempleBell();
      triggerCustomConfetti();
      setTapStep(3);
      setShowPortal(true);
      setTimeout(() => {
        onEnterPrivate();
      }, 1500);
    } else {
      // Wrong sequence tap -> gentle reset
      soundEngine.playPop();
      setTapStep(0);
    }
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#FFF2F4] text-[#3D2040] flex flex-col justify-between overflow-hidden select-none">
      <div>
        <MobileTopBar light={false} />

        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm hover:bg-pink-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#FF4D8D] uppercase">
            A LETTER TO YOU
          </span>
          <div className="w-9" />
        </div>
      </div>

      {/* Sealed Envelope Card: "A Letter From The Developer" */}
      <div className="relative z-10 px-6 my-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-full max-w-xs bg-[#FFF8F8] border-2 border-pink-200 rounded-3xl p-6 sm:p-7 shadow-2xl flex flex-col items-center"
        >
          {/* Top Stamp with SECRET CHARM 1: 🐱 CAT (Hidden in plain sight) */}
          <button
            onClick={() => handleTapSecretCharm('cat')}
            className={`absolute -top-3 -left-3 w-10 h-10 rounded-2xl bg-white shadow-md border border-pink-200 flex items-center justify-center text-lg hover:scale-110 active:scale-95 transition-all cursor-pointer ${
              tapStep >= 1 ? 'border-amber-400 bg-amber-50 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''
            }`}
            title="A curious kitten stamp"
          >
            🐱
          </button>

          {/* Top Right Stamp with SECRET CHARM 2: ⭐ STAR (Hidden in plain sight) */}
          <button
            onClick={() => handleTapSecretCharm('star')}
            className={`absolute -top-3 -right-3 w-10 h-10 rounded-2xl bg-white shadow-md border border-pink-200 flex items-center justify-center text-lg hover:scale-110 active:scale-95 transition-all cursor-pointer ${
              tapStep >= 2 ? 'border-amber-400 bg-amber-50 shadow-[0_0_10px_rgba(245,158,11,0.5)]' : ''
            }`}
            title="A stardust celestial stamp"
          >
            ⭐
          </button>

          {/* Golden Seal with Lock & SECRET CHARM 3: 💖 HEART */}
          <div className="relative mb-3">
            <button
              onClick={() => handleTapSecretCharm('heart')}
              className={`w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#D4A84B] text-[#3D2040] flex items-center justify-center shadow-lg border-2 border-white transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                tapStep === 3 ? 'scale-110 shadow-[0_0_20px_rgba(255,77,141,0.8)]' : ''
              }`}
              title="Wax Seal"
            >
              <Lock className="w-6 h-6" />
            </button>

            {/* Hidden subtle heart badge */}
            <button
              onClick={() => handleTapSecretCharm('heart')}
              className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-pink-100 border border-pink-300 flex items-center justify-center text-xs hover:scale-125 transition-transform"
            >
              💖
            </button>
          </div>

          <h3 className="font-script text-3xl sm:text-4xl text-[#3D2040] leading-tight">
            A Letter From The Developer
          </h3>

          <p className="font-quicksand text-xs text-gray-600 mt-2 leading-relaxed">
            "To the world, she is a talented creator and kind singer. But to someone special, she is the world itself. Some memories are sealed only for her eyes."
          </p>

          {/* Hint regarding the secret scattered charms */}
          <div className="mt-4 pt-3 border-t border-pink-100/80 w-full flex items-center justify-center gap-1.5 text-[11px] font-space text-[#FF4D8D]">
            <span>{tapStep === 0 ? '🐾 A secret bond unlocks this seal...' : tapStep === 1 ? '✨ Follow the star in the sky...' : tapStep === 2 ? '💖 Seal with brotherly heart...' : '🌸 Sanctuary Unlocked!'}</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 px-8 pb-8 text-center">
        <p className="font-script text-2xl text-[#FF4D8D]">
          With love, Always ♡
        </p>
      </div>

      {/* Golden Lotus Portal Overlay on Unlock */}
      {showPortal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl flex flex-col items-center justify-center text-white text-center p-6"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -30 }}
            animate={{ scale: [1, 1.2, 1], rotate: 0 }}
            transition={{ duration: 1.2 }}
            className="text-6xl mb-3"
          >
            🪷✨
          </motion.div>
          <h2 className="font-script text-5xl text-[#FFD93D] mb-2">
            Welcome, Shree ♡
          </h2>
          <p className="font-caveat text-xl text-pink-200">
            Entering the Private Sanctuary...
          </p>
        </motion.div>
      )}
    </div>
  );
};
