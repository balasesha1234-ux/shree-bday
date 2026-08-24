import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface PrivateFinaleProps {
  onReplay: () => void;
}

export const PrivateFinale: React.FC<PrivateFinaleProps> = ({ onReplay }) => {
  const [showSecretWhisper, setShowSecretWhisper] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecretWhisper(true);
    }, 4500);

    return () => clearTimeout(timer);
  }, []);

  const handleReplayClick = () => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();
    onReplay();
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-28 text-center select-none">
      <div className="space-y-6">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#D4A84B] to-[#FF4D8D] text-white flex items-center justify-center text-3xl shadow-pop"
        >
          🪷
        </motion.div>

        <h2 className="text-4xl sm:text-6xl font-playfair font-bold text-[#3D2040]">
          Always Here For You, Shree 🌸
        </h2>

        <p className="font-caveat text-2xl sm:text-3xl text-gray-700 max-w-xl mx-auto leading-relaxed">
          "May this next magnificent chapter bring you endless peace, extraordinary triumphs, and continuous smiles. 
          Your brother will always be cheering for you."
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={handleReplayClick}
            className="flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-[#FF4D8D] font-fredoka font-bold text-sm shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Replay Sanctuary Experience 🌸</span>
          </button>
        </div>

        {/* Secret Ending Whisper */}
        {showSecretWhisper && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.8 }}
            className="pt-8 text-sm font-caveat text-amber-700/80 tracking-wider"
          >
            <p>You stayed until the end.</p>
            <p className="text-[#3D2040] font-bold mt-0.5">Thank you, Shree. 🌸</p>
          </motion.div>
        )}

        <div className="pt-12 text-xs font-space text-gray-400">
          <span>MADE WITH 100% BROTHERLY RESPECT & ADMIRATION • MARCH 6, 2027</span>
        </div>
      </div>
    </section>
  );
};
