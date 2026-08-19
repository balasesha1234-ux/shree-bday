import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Heart, X, Volume2, Eye, Settings, Shield } from 'lucide-react';
import { TEASER_MILESTONES, TeaserMilestone } from '../../data/teasers';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface TeaserUnlocksProps {
  daysRemaining: number;
}

export const TeaserUnlocks: React.FC<TeaserUnlocksProps> = ({ daysRemaining }) => {
  // Dev simulation state (default to 0 in dev so user can inspect all immediately)
  const [devSimulatedDays, setDevSimulatedDays] = useState<number | null>(
    import.meta.env.DEV ? 0 : null
  );

  const [selectedRelic, setSelectedRelic] = useState<TeaserMilestone | null>(null);
  const [blessings, setBlessings] = useState<{ [id: number]: number }>({});

  const effectiveDaysRemaining = devSimulatedDays !== null ? devSimulatedDays : daysRemaining;

  const handleOpenRelic = (relic: TeaserMilestone) => {
    if (relic.audioAction === 'bell') soundEngine.playTempleBell();
    else if (relic.audioAction === 'meow') soundEngine.playMeow();
    else soundEngine.playSparkle(1.5);

    setSelectedRelic(relic);
  };

  const handleSendBlessing = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle(1.6);
    triggerCustomConfetti();
    setBlessings((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 mt-16 mb-24 select-none">
      {/* Dev-Only Simulator Toolbar */}
      {import.meta.env.DEV && (
        <div className="mb-8 p-4 rounded-3xl bg-pink-950/40 border border-pink-500/30 text-center max-w-xl mx-auto backdrop-blur-md">
          <div className="flex items-center justify-center gap-2 text-xs font-space font-bold text-[#FFD93D] mb-2 uppercase">
            <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>[DEV TOOLBAR] Countdown Relic Simulator</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] font-space">
            <button
              onClick={() => setDevSimulatedDays(0)}
              className={`px-3 py-1 rounded-lg border font-bold transition-all ${
                devSimulatedDays === 0
                  ? 'bg-[#FF2D78] text-white border-pink-300 shadow-sm'
                  : 'bg-black/40 text-pink-200 border-pink-500/30 hover:bg-pink-900/50'
              }`}
            >
              🔓 Unlock All Relics
            </button>
            <button
              onClick={() => setDevSimulatedDays(10)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 10
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-10d (Relic 1)
            </button>
            <button
              onClick={() => setDevSimulatedDays(7)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 7
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-7d (Relic 2)
            </button>
            <button
              onClick={() => setDevSimulatedDays(5)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 5
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-5d (Relic 3)
            </button>
            <button
              onClick={() => setDevSimulatedDays(3)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 3
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-3d (Relic 4)
            </button>
            <button
              onClick={() => setDevSimulatedDays(1)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 1
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-1d (Relic 5)
            </button>
            <button
              onClick={() => setDevSimulatedDays(null)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === null
                  ? 'bg-[#7CEBC6] text-black font-bold border-white'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              ⏰ Live IST Time
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF2D78]/20 border border-[#FF2D78]/40 text-[#FF6B9D] text-xs font-space font-bold tracking-[0.25em] uppercase mb-3 shadow-[0_0_15px_rgba(255,45,120,0.3)]">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
          <span>TIME CAPSULE ARCHIVES // 5 SACRED CHAPTERS</span>
        </div>
        <h3 className="text-3xl sm:text-5xl font-playfair font-bold text-white tracking-wide">
          The 5 Teaser Memory Relics 💎
        </h3>
        <p className="text-sm font-quicksand text-pink-200/80 mt-2 max-w-xl mx-auto leading-relaxed">
          As March 6 approaches in IST, five golden keepsakes unlock automatically. Tap any unlocked relic to explore her story, hear audio notes, and send blessings!
        </p>
      </div>

      {/* 5 Crystal Relic Cards */}
      <div className="space-y-5">
        {TEASER_MILESTONES.map((relic, idx) => {
          const isUnlocked = effectiveDaysRemaining <= relic.daysRemaining;

          return (
            <motion.div
              key={relic.dayIndex}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={isUnlocked ? { scale: 1.015, transition: { duration: 0.2 } } : {}}
              onClick={() => isUnlocked && handleOpenRelic(relic)}
              className={`group relative rounded-3xl p-6 sm:p-7 border-2 transition-all duration-500 overflow-hidden ${
                isUnlocked
                  ? 'cursor-pointer bg-gradient-to-r from-[#181530]/90 via-[#231B45]/90 to-[#181530]/90 border-pink-500/40 hover:border-[#FF2D78] shadow-[0_0_30px_rgba(255,45,120,0.25)] hover:shadow-[0_0_40px_rgba(255,45,120,0.45)]'
                  : 'bg-[#0E0C1C]/60 border-gray-800/80 opacity-60'
              }`}
            >
              {/* Glowing Background Radial */}
              {isUnlocked && (
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#FF2D78]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#FF2D78]/20 transition-all duration-700" />
              )}

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                {/* Left Side: Sticker Pod & Narrative */}
                <div className="flex items-start sm:items-center gap-5">
                  {/* Glowing Relic Avatar / Lock */}
                  <div
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center shrink-0 text-3xl sm:text-4xl shadow-xl border-2 transition-transform duration-500 group-hover:scale-105 ${
                      isUnlocked
                        ? 'bg-gradient-to-br from-pink-500/30 to-purple-600/30 text-white border-pink-400/60 shadow-[0_0_20px_rgba(255,45,120,0.4)]'
                        : 'bg-gray-900/80 text-gray-600 border-gray-800'
                    }`}
                  >
                    {isUnlocked ? relic.sticker : <Lock className="w-7 h-7 text-gray-500" />}
                  </div>

                  <div className="text-left space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-space px-3 py-1 rounded-full border uppercase font-bold tracking-wider ${relic.tagColor}`}>
                        RELIC 0${relic.dayIndex} • RELEASES AT T-${relic.daysRemaining} DAYS
                      </span>
                      <span className={`text-[10px] font-space font-bold uppercase ${isUnlocked ? 'text-emerald-400' : 'text-gray-500'}`}>
                        {isUnlocked ? '● UNLOCKED & READY' : '○ LOCKED'}
                      </span>
                    </div>

                    <h4 className="font-playfair text-xl sm:text-2xl text-white font-bold tracking-wide group-hover:text-pink-200 transition-colors">
                      {isUnlocked ? relic.title : 'Encrypted Sisterhood Archive'}
                    </h4>

                    <p className="text-xs sm:text-sm font-quicksand text-pink-100/70 max-w-xl line-clamp-2 leading-relaxed">
                      {isUnlocked
                        ? relic.subtitle
                        : `Unlocks automatically at ${relic.daysRemaining} days remaining in IST.`}
                    </p>
                  </div>
                </div>

                {/* Right Side: Photo Preview & Explore Button */}
                <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-4 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-white/10">
                  {isUnlocked ? (
                    <>
                      {/* Photo Thumbnail */}
                      <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-pink-300/60 shadow-lg shrink-0 group-hover:scale-105 transition-transform">
                        <img
                          src={relic.image}
                          alt={relic.title}
                          className="w-full h-full object-cover object-[center_20%]"
                        />
                        <div className="absolute inset-0 bg-pink-500/15 mix-blend-color" />
                      </div>

                      {/* Explore Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenRelic(relic);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] hover:brightness-110 text-white font-fredoka font-bold text-xs shadow-pop hover:scale-105 active:scale-95 transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Open Relic 💎</span>
                      </button>
                    </>
                  ) : (
                    <div className="flex items-center gap-2 text-xs font-space text-gray-500 uppercase tracking-widest px-4 py-2 rounded-2xl bg-black/30 border border-gray-800">
                      <Lock className="w-3.5 h-3.5" />
                      <span>SCHEDULED</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Full-Screen Keepsake Relic Modal */}
      <AnimatePresence>
        {selectedRelic && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRelic(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-gradient-to-b from-[#1E1938] via-[#16122C] to-[#0E0C1C] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-400/50 text-center overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedRelic(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-pink-500/30 text-gray-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Tag */}
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-pink-500/20 border border-pink-400/40 text-pink-200 text-[11px] font-space font-bold uppercase tracking-widest mb-4">
                <span>{selectedRelic.theme}</span>
              </div>

              {/* Photo Portrait Frame */}
              <div className="relative aspect-square max-w-[280px] mx-auto rounded-3xl overflow-hidden border-4 border-pink-300/80 shadow-2xl mb-5">
                <img
                  src={selectedRelic.image}
                  alt={selectedRelic.title}
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <span className="absolute bottom-3 right-3 text-4xl filter drop-shadow">
                  {selectedRelic.sticker}
                </span>
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-space text-pink-300 font-bold border border-pink-500/40">
                  MARCH 6 • IST
                </span>
              </div>

              {/* Title & Lore */}
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-white">
                {selectedRelic.title}
              </h3>
              <p className="text-xs font-space text-[#FFD93D] mt-1 font-semibold uppercase tracking-wider">
                {selectedRelic.ambientVibe}
              </p>

              <div className="my-5 p-4 rounded-2xl bg-white/5 border border-white/10 text-left space-y-3">
                <p className="font-quicksand text-xs sm:text-sm text-pink-100/90 leading-relaxed">
                  {selectedRelic.lore}
                </p>
                <p className="font-caveat text-xl sm:text-2xl text-[#FFD93D] italic">
                  {selectedRelic.quote}
                </p>
              </div>

              {/* Footer Actions */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-space text-gray-400">
                  {154 + (blessings[selectedRelic.dayIndex] || 0)} Stardust Blessings ✨
                </span>

                <button
                  onClick={(e) => handleSendBlessing(selectedRelic.dayIndex, e)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] hover:scale-105 active:scale-95 text-white font-fredoka font-bold text-xs shadow-pop transition-all"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Send Blessing 🌸</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
