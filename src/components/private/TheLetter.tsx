import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const TheLetter: React.FC = () => {
  const [sealStamped, setSealStamped] = useState(false);

  const handleSealClick = () => {
    soundEngine.playSparkle(1.5);
    soundEngine.playTempleBell();
    triggerCustomConfetti();
    setSealStamped(true);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-24 select-none">
      {/* Background Soft Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#D4A84B]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-[#D4A84B]/30 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4A84B]" />
          <span>CHAPTER 05 // A BROTHER’S TRIBUTE</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl font-playfair font-bold text-[#3D2040]">
          From Your Brother’s Heart 💌
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
          Written with the highest respect and deepest pride across the distance from Hyderabad to Delhi.
        </p>
      </div>

      {/* Parchment Antique Paper Display */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-[#FFFDF8] rounded-3xl p-8 sm:p-14 shadow-2xl border-2 border-[#D4A84B]/40 text-[#2D2D2D] overflow-hidden"
      >
        {/* Decorative Lotus Motifs in Corners */}
        <div className="absolute top-4 left-4 text-3xl select-none opacity-30">🪷</div>
        <div className="absolute top-4 right-4 text-3xl select-none opacity-30">🪷</div>
        <div className="absolute bottom-4 left-4 text-3xl select-none opacity-30">🪷</div>
        <div className="absolute bottom-4 right-4 text-3xl select-none opacity-30">🪷</div>

        {/* Letter Heading */}
        <div className="border-b border-[#D4A84B]/30 pb-6 mb-8 text-center">
          <span className="text-[10px] font-space tracking-[0.3em] text-[#D4A84B] uppercase font-bold block mb-1">
            HYDERABAD ➔ DELHI // MARCH 6, 2027
          </span>
          <h3 className="text-3xl sm:text-5xl font-playfair font-bold text-[#3D2040] mt-2">
            Dearest Shree,
          </h3>
        </div>

        {/* Letter Body in Caveat Handwriting Font */}
        <div className="font-caveat text-2xl sm:text-3xl text-gray-800 leading-relaxed space-y-6">
          <p>
            Happy 22nd Birthday to the most inspiring, pure-hearted sister figure in my life. 🌸
          </p>

          <p>
            Watching you grow and conquer every challenge with grace has been one of my greatest joys. 
            You carry yourself with so much dignity, warmth, and humility — whether you're creating content for millions, 
            stopping in the street to feed stray kittens 🐱, or folding your hands in silent prayer to Radharani 🪷.
          </p>

          <p>
            Having you in my life as a sister figure is a true blessing. You bring so much light, positive energy, 
            and genuine kindness into this world. Whenever life gets overwhelming or you ever feel doubted, 
            I want you to always remember how capable, strong, and deeply valued you are.
          </p>

          <p>
            As your brother, I promise to always stand by your side — to cheer for your biggest milestones, 
            protect your peace, give you honest advice when you need it, and always be the rock you can count on 
            no matter the distance between Hyderabad and Delhi.
          </p>

          <p>
            May Radha Rani always shower her divine grace upon you, protect your pure smile, 
            and grant every single dream your heart holds.
          </p>

          {/* Signature & Interactive Wax Seal */}
          <div className="pt-8 border-t border-[#D4A84B]/30 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* 3D Crimson & Gold Sibling Wax Seal */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSealClick}
              className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-[#8B1E2F] via-[#A8283D] to-[#8B1E2F] p-3 pr-5 rounded-full shadow-xl border-2 border-[#D4A84B] text-white"
              title="Click to stamp the Sibling Seal"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A84B] to-[#F5C642] flex items-center justify-center text-2xl shadow-inner border border-amber-200">
                🛡️
              </div>
              <div className="text-left">
                <span className="text-[10px] font-space tracking-widest uppercase text-amber-200 block">
                  {sealStamped ? 'PACT SEALED 🌸' : 'SIBLING PACT SEAL'}
                </span>
                <span className="text-xs font-fredoka font-bold text-white block">
                  {sealStamped ? 'Bond of Lifetime Protection' : 'Tap to Seal Pact'}
                </span>
              </div>
            </motion.div>

            {/* Handwritten Signature */}
            <div className="text-right">
              <p className="font-playfair text-xl sm:text-2xl text-[#3D2040] font-bold">
                Always in Your Corner,
              </p>
              <p className="font-caveat text-3xl sm:text-4xl text-[#D4A84B] font-bold mt-1">
                Your Brother in Hyderabad 🛡️🌸
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
