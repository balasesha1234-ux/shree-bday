import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Sparkles, X, Sun, Moon, Flame, Leaf, Check } from 'lucide-react';
import { useCelestialTheme, AMBIANCE_THEMES, RAIN_TYPES, AmbianceTheme, SacredRainType } from '../../hooks/useCelestialTheme';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from './Confetti';

export const CelestialAmbianceController: React.FC = () => {
  const { theme, setTheme, rainType, setRainType, config } = useCelestialTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleSelectTheme = (t: AmbianceTheme, e: React.MouseEvent) => {
    soundEngine.playTempleBell();
    triggerCustomConfetti(e.clientX, e.clientY);
    setTheme(t);
  };

  const handleSelectRain = (r: SacredRainType, e: React.MouseEvent) => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti(e.clientX, e.clientY);
    setRainType(r);
  };

  return (
    <div className="fixed top-4 sm:top-5 right-4 sm:right-6 z-40 select-none">
      {/* Floating Trigger Pill */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          soundEngine.playTap();
          setIsOpen(!isOpen);
        }}
        className="flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/95 backdrop-blur-xl border-2 border-[#D4A84B]/40 shadow-xl text-gray-800 text-xs font-fredoka font-semibold hover:border-[#D4A84B] transition-all group"
        title="Change Ambiance & Particle Rain"
      >
        <span className="text-base group-hover:rotate-12 transition-transform duration-300">
          {config.emoji}
        </span>
        <span className="hidden sm:inline font-space text-[11px] font-bold tracking-wide uppercase text-gray-700">
          {config.name}
        </span>
        <span className="text-xs text-[#D4A84B] font-bold font-mono">•</span>
        <span className="text-sm">
          {rainType === 'lotus' ? '🪷' : rainType === 'marigold' ? '🌼' : rainType === 'stardust' ? '✨' : '🐾'}
        </span>
      </motion.button>

      {/* Expanded Ambiance Menu Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop click to close */}
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 z-50 w-[300px] sm:w-[340px] celestial-panel rounded-3xl p-5 shadow-2xl border-2 border-[#D4A84B]/40 text-gray-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-pink-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🪷</span>
                  <div>
                    <h4 className="text-sm font-fredoka font-bold text-gray-900">
                      Celestial Ambiance
                    </h4>
                    <p className="text-[10px] font-space text-gray-500 uppercase tracking-wider">
                      Atmosphere & Sacred Rain
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 1. Theme Selector */}
              <div className="mb-4">
                <span className="text-[10px] font-space font-bold uppercase tracking-widest text-[#D4A84B] block mb-2">
                  1. Choose Lighting & Mood
                </span>

                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(AMBIANCE_THEMES) as AmbianceTheme[]).map((key) => {
                    const item = AMBIANCE_THEMES[key];
                    const isSelected = theme === key;

                    return (
                      <button
                        key={key}
                        onClick={(e) => handleSelectTheme(key, e)}
                        className={`p-2.5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-gradient-to-br from-amber-50 to-pink-50 border-[#D4A84B] shadow-md scale-[1.02]'
                            : 'bg-white/80 hover:bg-pink-50/50 border-gray-200/80 hover:border-pink-200'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg">{item.emoji}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#D4A84B]" />}
                        </div>
                        <div>
                          <p className="text-xs font-fredoka font-bold text-gray-900 leading-tight">
                            {item.name}
                          </p>
                          <p className="text-[9px] font-quicksand text-gray-500 mt-0.5 leading-tight truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Sacred Rain (Particles) Selector */}
              <div>
                <span className="text-[10px] font-space font-bold uppercase tracking-widest text-[#D4A84B] block mb-2">
                  2. Sacred Particle Rain
                </span>

                <div className="grid grid-cols-4 gap-1.5">
                  {RAIN_TYPES.map((r) => {
                    const isSelected = rainType === r.id;

                    return (
                      <button
                        key={r.id}
                        onClick={(e) => handleSelectRain(r.id, e)}
                        className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-pink-100/80 border-[#FF4D8D] text-[#FF4D8D] shadow-sm font-bold scale-105'
                            : 'bg-white/80 hover:bg-gray-50 border-gray-200 text-gray-600'
                        }`}
                      >
                        <span className="text-xl mb-0.5">{r.emoji}</span>
                        <span className="text-[10px] font-fredoka leading-tight">
                          {r.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sibling Footer Note */}
              <div className="mt-4 pt-2.5 border-t border-pink-100 flex items-center justify-between text-[10px] font-space text-gray-400">
                <span>✨ 24K Gold Foil Active</span>
                <span className="text-[#D4A84B] font-bold">K ♡ S</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
