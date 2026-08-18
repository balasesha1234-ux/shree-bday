import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Sparkles, Music, Cat, Heart } from 'lucide-react';
import { TEASER_MILESTONES, TeaserMilestone } from '../../data/teasers';

interface TeaserUnlocksProps {
  daysRemaining: number;
}

export const TeaserUnlocks: React.FC<TeaserUnlocksProps> = ({ daysRemaining }) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-12 mb-20">
      <div className="text-center mb-8">
        <span className="text-xs font-space tracking-[0.3em] uppercase text-[#FF2D78] font-bold">
          [ TRANSMISSION PROTOCOLS ]
        </span>
        <h3 className="text-2xl sm:text-3xl font-fredoka text-white mt-1">
          Daily Teaser Milestones
        </h3>
        <p className="text-sm font-quicksand text-gray-400 mt-1 max-w-md mx-auto">
          Secret chapters unlock automatically as Zero Hour approaches in IST.
        </p>
      </div>

      <div className="space-y-4">
        {TEASER_MILESTONES.map((teaser, idx) => {
          const isUnlocked = daysRemaining <= teaser.daysRemaining;

          return (
            <motion.div
              key={teaser.dayIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-2xl p-5 border transition-all duration-500 overflow-hidden ${
                isUnlocked
                  ? 'bg-[#161638]/80 border-[#FF2D78]/50 shadow-[0_0_20px_rgba(255,45,120,0.2)]'
                  : 'bg-[#0E0E24]/60 border-gray-800 opacity-60'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      isUnlocked
                        ? 'bg-[#FF2D78]/20 text-[#FF2D78] border border-[#FF2D78]/40'
                        : 'bg-gray-900 text-gray-600 border border-gray-800'
                    }`}
                  >
                    {isUnlocked ? (
                      teaser.type === 'cat' ? <Cat className="w-6 h-6" /> :
                      teaser.type === 'audio' ? <Music className="w-6 h-6" /> :
                      <Unlock className="w-6 h-6" />
                    ) : (
                      <Lock className="w-6 h-6" />
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-space px-2 py-0.5 rounded bg-pink-950/60 text-[#FF2D78] border border-[#FF2D78]/30 uppercase font-bold">
                        T-{teaser.daysRemaining} DAYS
                      </span>
                      <h4 className="font-fredoka text-lg text-white font-semibold">
                        {isUnlocked ? teaser.title : 'ENCRYPTED FREQUENCY'}
                      </h4>
                    </div>
                    <p className="text-xs font-quicksand text-pink-200/70 mt-0.5">
                      {isUnlocked ? teaser.subtitle : 'Unlock condition not yet fulfilled.'}
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span
                    className={`text-xs font-space font-semibold uppercase ${
                      isUnlocked ? 'text-[#7CEBC6]' : 'text-gray-500'
                    }`}
                  >
                    {isUnlocked ? '● DECRYPTED' : '○ LOCKED'}
                  </span>
                </div>
              </div>

              {isUnlocked && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 pt-4 border-t border-pink-500/20 text-xs font-quicksand text-gray-300 space-y-1.5"
                >
                  <p className="italic text-pink-100/90">"{teaser.lore}"</p>
                  {teaser.easterEgg && (
                    <p className="text-[11px] text-[#FFD93D] flex items-center gap-1 font-caveat text-sm">
                      ✨ Secret Note: {teaser.easterEgg}
                    </p>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
