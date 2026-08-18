import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, ChevronDown, Lock } from 'lucide-react';
import { GlitchAge } from '../shared/GlitchAge';

interface PrivateIntroProps {
  onStartScroll: () => void;
}

export const PrivateIntro: React.FC<PrivateIntroProps> = ({ onStartScroll }) => {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden select-none">
      {/* Background Floating Polaroids */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [-4, -2, -4] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-10 w-36 h-48 bg-white p-2 rounded-2xl shadow-xl hidden md:block"
        >
          <img src="/assets/serial/4s.jpg" alt="Shree" className="w-full h-36 object-cover rounded-xl" />
        </motion.div>

        <motion.div
          animate={{ y: [0, 20, 0], rotate: [5, 7, 5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-20 right-12 w-36 h-48 bg-white p-2 rounded-2xl shadow-xl hidden md:block"
        >
          <img src="/assets/serial/6s.jpg" alt="Shree" className="w-full h-36 object-cover rounded-xl" />
        </motion.div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#D4A84B] font-fredoka text-xs font-bold shadow-sm border border-[#D4A84B]/40"
        >
          <Lock className="w-3.5 h-3.5 text-[#D4A84B]" />
          <span>CONFIDENTIAL SIBLING SANCTUARY 🌸</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-7xl font-playfair font-bold text-[#3D2040] leading-tight"
        >
          Happy <GlitchAge suffix="th" className="mx-1 text-3xl sm:text-5xl align-middle" /> Birthday, <br />
          <span className="text-gradient-pink font-fredoka">My Dearest Sister Shree!</span> 🎂✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-xl font-quicksand text-gray-700 max-w-xl mx-auto leading-relaxed"
        >
          Beyond the fans and public wishes, here is a personal space crafted by your brother in Hyderabad 
          to celebrate your journey, your laughter, and the pure bond we share.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-6"
        >
          <button
            onClick={onStartScroll}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-base shadow-pop hover:scale-105 active:scale-95 transition-all mx-auto"
          >
            <span>Explore Your Brother’s Sanctuary 🌸</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
