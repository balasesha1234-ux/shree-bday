import React from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { WashiTape } from '../shared/WashiTape';
import { ArrowRight, Sparkles } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';
import { triggerCustomConfetti } from '../../shared/Confetti';

interface MobileUnlockProps {
  onUnlock: () => void;
}

export const MobileUnlock: React.FC<MobileUnlockProps> = ({ onUnlock }) => {
  const handleEnter = () => {
    soundEngine.playSparkle(1.8);
    soundEngine.playTempleBell();
    triggerCustomConfetti();
    onUnlock();
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#FFF2F4] text-[#3D2040] flex flex-col justify-between overflow-hidden select-none">
      {/* Soft Rose Aura & Floating Petals */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-pink-300/35 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-amber-200/35 blur-3xl pointer-events-none" />

      <MobileTopBar light={false} />

      {/* Collage Area with 3 Overlapping Polaroids matching reference */}
      <div className="relative z-10 px-6 pt-2 flex-1 flex flex-col items-center justify-center">
        <div className="relative w-72 h-72 mb-6">
          {/* Top Left Polaroid */}
          <motion.div
            initial={{ rotate: -12, scale: 0.9 }}
            animate={{ rotate: -8, scale: 1 }}
            className="absolute top-0 left-2 w-36 bg-white p-2.5 pb-5 rounded-xl shadow-xl border border-pink-100 transform -rotate-8 z-10"
          >
            <WashiTape color="mint" rotation={-5} className="absolute -top-2 left-4" />
            <img src="/assets/serial/1s.jpg" alt="Memory" className="w-full aspect-square object-cover rounded-lg" />
          </motion.div>

          {/* Top Right Note Card */}
          <motion.div
            initial={{ rotate: 10, scale: 0.9 }}
            animate={{ rotate: 6, scale: 1 }}
            className="absolute top-2 right-2 w-34 bg-[#FFFDF7] p-3.5 rounded-xl shadow-lg border border-[#F3E8D0] transform rotate-6 z-20"
          >
            <WashiTape color="pink" rotation={3} className="absolute -top-2 right-3" />
            <p className="font-script text-xl text-[#FF4D8D]">
              Same soul...
            </p>
            <p className="font-caveat text-sm font-bold text-gray-700 mt-0.5">
              Bigger purpose ♡
            </p>
          </motion.div>

          {/* Bottom Center Overlapping Polaroid */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-46 bg-white p-2.5 pb-6 rounded-2xl shadow-2xl border border-pink-100 transform rotate-2 z-30"
          >
            <WashiTape color="gold" rotation={-1} className="absolute -top-2 left-1/2 -translate-x-1/2" />
            <img src="/assets/serial/13s.jpg" alt="Grace" className="w-full aspect-[4/3] object-cover rounded-xl" />
            <p className="font-script text-center text-base text-[#FF4D8D] mt-2">
              pure grace & devotion
            </p>
          </motion.div>
        </div>

        {/* Text Area */}
        <div className="text-center mt-1">
          <p className="font-playfair italic text-xl text-gray-600">
            It's time
          </p>
          <h2 className="font-script text-6xl sm:text-7xl text-[#FF4D8D] my-1 drop-shadow-sm">
            Shree ♡
          </h2>
          <div className="text-xl text-[#FF4D8D] font-bold">♡</div>
        </div>
      </div>

      {/* Button: Enter Her World -> */}
      <div className="relative z-10 px-8 pb-10 flex flex-col items-center">
        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={handleEnter}
          className="w-full max-w-xs py-4 rounded-full bg-[#3D2040] hover:bg-[#2A162D] text-white font-fredoka font-semibold text-sm shadow-2xl flex items-center justify-center gap-2 border border-pink-300/30 transition-all cursor-pointer"
        >
          <span>Enter Her World</span>
          <ArrowRight className="w-4 h-4 text-[#FFD93D]" />
        </motion.button>
      </div>
    </div>
  );
};
