import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Eye, X, ZoomIn } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

export const ChildhoodPolaroid: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    soundEngine.playCameraShutter();
    setIsOpen(true);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto my-12 px-4 select-none">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs font-space font-bold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>GOLDEN VAULT • UNSEALED MEMORY 📷</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-white">
          The Sacred Childhood Archives 💛
        </h3>
        <p className="text-xs sm:text-sm font-quicksand text-amber-100/70 mt-1 max-w-md mx-auto">
          Some memories are timeless. A little glimpse from the golden days!
        </p>
      </div>

      {/* Vintage Polaroid Frame */}
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.03, rotate: 0 }}
          initial={{ rotate: -2 }}
          onClick={handleOpen}
          className="relative cursor-pointer group bg-[#FCFBF7] p-4 sm:p-6 pb-6 sm:pb-8 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(234,179,8,0.2)] border border-amber-100/40 max-w-md w-full transition-all duration-300 transform-gpu"
        >
          {/* Vintage Masking Tape at Top */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-200/80 backdrop-blur-sm border border-amber-300/60 shadow-sm rounded-sm -rotate-1 pointer-events-none" />

          {/* Photo Container */}
          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-stone-900 border border-stone-200/50 shadow-inner">
            <img
              src="/assets/images/childhood_memory.jpg"
              alt="Sacred Childhood Memory"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {/* Soft Warm Film Grain & Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-amber-950/20 via-transparent to-amber-500/10 pointer-events-none" />

            {/* Hover Zoom Badge */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
              <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-stone-800 text-xs font-fredoka font-bold flex items-center gap-1.5 shadow-lg">
                <ZoomIn className="w-3.5 h-3.5 text-amber-600" />
                <span>Tap to Expand Photo</span>
              </span>
            </div>
          </div>

          {/* Handwritten Caption Section */}
          <div className="mt-4 sm:mt-5 text-center">
            <p className="font-caveat text-xl sm:text-2xl font-bold text-stone-800 leading-snug">
              "Sorry for using this photo haha, but you look so very cute in this! 🥹💛"
            </p>
            <p className="font-space text-[10px] sm:text-xs text-amber-700 font-semibold tracking-wider uppercase mt-2 flex items-center justify-center gap-1">
              <Heart className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>Devotional Golden Days • Radha Rani Grace 🪷</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* High-Res Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[#FCFBF7] p-4 sm:p-8 rounded-3xl shadow-2xl border border-amber-200/50 cursor-default"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700 transition-all shadow-md z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden bg-stone-900 border border-stone-200">
                <img
                  src="/assets/images/childhood_memory.jpg"
                  alt="Sacred Childhood Memory (High Res)"
                  className="w-full max-h-[70vh] object-contain mx-auto"
                />
              </div>

              <div className="mt-5 text-center">
                <p className="font-caveat text-2xl sm:text-3xl font-bold text-stone-800">
                  "Sorry for using this photo haha, but you look so very cute in this! 🥹💛"
                </p>
                <p className="font-quicksand text-xs sm:text-sm text-stone-500 mt-1">
                  Priceless memories from the golden days with pure sibling protection and devotion.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
