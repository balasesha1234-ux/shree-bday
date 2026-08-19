import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Terminal, Radio, Shield, Disc, Flame, Settings } from 'lucide-react';
import { TEASER_MILESTONES, TeaserMilestone } from '../../data/teasers';
import { soundEngine } from '../../utils/soundEffects';

interface TeaserUnlocksProps {
  daysRemaining: number;
}

export const TeaserUnlocks: React.FC<TeaserUnlocksProps> = ({ daysRemaining }) => {
  // In dev mode, allow manual simulation override or force-unlock-all
  const [devSimulatedDays, setDevSimulatedDays] = useState<number | null>(
    import.meta.env.DEV ? 0 : null // Default to unlocked in dev so user can inspect immediately
  );

  const [decryptedIds, setDecryptedIds] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });
  const [scramblingId, setScramblingId] = useState<number | null>(null);

  const effectiveDaysRemaining = devSimulatedDays !== null ? devSimulatedDays : daysRemaining;

  const handleDecrypt = (id: number) => {
    soundEngine.playSparkle(1.8);
    setScramblingId(id);

    setTimeout(() => {
      setDecryptedIds((prev) => ({ ...prev, [id]: true }));
      setScramblingId(null);
    }, 600);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-12 mb-20 select-none">
      {/* Dev-Only Teaser Simulator Controls */}
      {import.meta.env.DEV && (
        <div className="mb-8 p-4 rounded-2xl bg-pink-950/40 border border-pink-500/30 text-center max-w-xl mx-auto backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 text-xs font-space font-bold text-[#FFD93D] mb-2 uppercase">
            <Settings className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
            <span>[DEV TOOLBAR] Auto-Schedule Teaser Simulator</span>
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
              🔓 Unlock All
            </button>
            <button
              onClick={() => setDevSimulatedDays(10)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 10
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-10d (Drop 1)
            </button>
            <button
              onClick={() => setDevSimulatedDays(7)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 7
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-7d (Drop 2)
            </button>
            <button
              onClick={() => setDevSimulatedDays(5)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 5
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-5d (Drop 3)
            </button>
            <button
              onClick={() => setDevSimulatedDays(3)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 3
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-3d (Drop 4)
            </button>
            <button
              onClick={() => setDevSimulatedDays(1)}
              className={`px-2.5 py-1 rounded-lg border transition-all ${
                devSimulatedDays === 1
                  ? 'bg-[#FF2D78] text-white border-pink-300'
                  : 'bg-black/40 text-pink-200 border-pink-500/30'
              }`}
            >
              T-1d (Drop 5)
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
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FF2D78]/15 border border-[#FF2D78]/40 text-[#FF6B9D] text-xs font-space font-bold tracking-[0.25em] uppercase mb-2">
          <Radio className="w-3.5 h-3.5 animate-pulse text-[#FF2D78]" />
          <span>SCHEDULED TRANSMISSION PROTOCOLS</span>
        </div>
        <h3 className="text-2xl sm:text-4xl font-fredoka text-white font-bold">
          Daily Teaser Milestones 📡
        </h3>
        <p className="text-sm font-quicksand text-gray-400 mt-1 max-w-md mx-auto">
          Secret chapters unlock automatically in real-time as Zero Hour approaches in IST.
        </p>
      </div>

      <div className="space-y-4">
        {TEASER_MILESTONES.map((teaser, idx) => {
          // Auto-schedule unlock logic: unlocked if current days remaining <= teaser release threshold
          const isUnlockedBySchedule = effectiveDaysRemaining <= teaser.daysRemaining;
          const isDecrypted = decryptedIds[teaser.dayIndex];
          const isScrambling = scramblingId === teaser.dayIndex;

          return (
            <motion.div
              key={teaser.dayIndex}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`relative rounded-3xl p-5 sm:p-6 border transition-all duration-500 overflow-hidden ${
                isUnlockedBySchedule
                  ? 'bg-gradient-to-r from-[#14122C]/90 via-[#1D163A]/90 to-[#14122C]/90 border-[#FF2D78]/50 shadow-[0_0_25px_rgba(255,45,120,0.25)]'
                  : 'bg-[#0B0A18]/60 border-gray-800/80 opacity-50'
              }`}
            >
              {/* Scanline Background Texture */}
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.4)_51%)] bg-[size:100%_4px] pointer-events-none opacity-40" />

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                {/* Left Side: Badge, Icon & Title */}
                <div className="flex items-center gap-4">
                  {/* Hologram Icon Pod */}
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 text-2xl shadow-lg border ${
                      isUnlockedBySchedule
                        ? 'bg-gradient-to-br from-[#FF2D78]/30 to-[#FF6B9D]/20 text-white border-[#FF2D78]/60 shadow-[0_0_15px_rgba(255,45,120,0.4)]'
                        : 'bg-gray-900/80 text-gray-600 border-gray-800'
                    }`}
                  >
                    {isUnlockedBySchedule ? teaser.hologramIcon : <Lock className="w-6 h-6 text-gray-500" />}
                  </div>

                  <div className="text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-space px-2.5 py-0.5 rounded-full bg-pink-950/80 text-[#FF6B9D] border border-[#FF2D78]/40 uppercase font-bold tracking-wider">
                        MILESTONE 0{teaser.dayIndex} • RELEASES AT T-{teaser.daysRemaining} DAYS
                      </span>
                      <span className={`text-[10px] font-space font-bold uppercase ${isUnlockedBySchedule ? 'text-emerald-400' : 'text-gray-600'}`}>
                        {isUnlockedBySchedule ? '● DECRYPTED' : '○ LOCKED'}
                      </span>
                    </div>

                    <h4 className="font-fredoka text-lg sm:text-xl text-white font-bold mt-1">
                      {isUnlockedBySchedule
                        ? isScrambling
                          ? 'ᔑ ʖ ᓵ [DECRYPTING] ᖱ ᒷ'
                          : teaser.title
                        : 'ENCRYPTED QUANTUM FREQUENCY'}
                    </h4>

                    <p className="text-xs font-quicksand text-pink-200/70 mt-0.5">
                      {isUnlockedBySchedule
                        ? teaser.subtitle
                        : `Unlocks automatically at ${teaser.daysRemaining} days remaining in IST.`}
                    </p>
                  </div>
                </div>

                {/* Right Side: Hologram Fragment or Decrypt Action */}
                <div className="w-full md:w-auto flex items-center justify-end gap-3">
                  {isUnlockedBySchedule ? (
                    isDecrypted ? (
                      teaser.previewImage && (
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-pink-400/60 shadow-pop shrink-0">
                          <img
                            src={teaser.previewImage}
                            alt="Hologram Fragment"
                            className="w-full h-full object-cover object-[center_20%] filter contrast-125 brightness-110"
                          />
                          <div className="absolute inset-0 bg-pink-500/20 mix-blend-color" />
                          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[8px] font-space text-pink-300 text-center font-bold">
                            FRAGMENT
                          </div>
                        </div>
                      )
                    ) : (
                      <button
                        onClick={() => handleDecrypt(teaser.dayIndex)}
                        disabled={isScrambling}
                        className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF2D78] to-[#FF6B9D] hover:scale-105 active:scale-95 text-white font-space font-bold text-xs shadow-pop border border-pink-300 transition-all"
                      >
                        <Terminal className="w-4 h-4" />
                        <span>{isScrambling ? 'DECODING...' : 'DECRYPT 📡'}</span>
                      </button>
                    )
                  ) : (
                    <span className="text-xs font-space text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" />
                      <span>SCHEDULED</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Decrypted Lore Box */}
              {isUnlockedBySchedule && isDecrypted && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="relative z-10 mt-4 pt-4 border-t border-pink-500/20 text-xs font-quicksand text-gray-300 space-y-2 text-left"
                >
                  <p className="font-caveat text-xl sm:text-2xl text-pink-100/90 leading-snug">
                    "{teaser.lore}"
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-[#FFD93D] font-space font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
                    <span>ENCRYPTED FOOTNOTE: {teaser.easterEgg}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
