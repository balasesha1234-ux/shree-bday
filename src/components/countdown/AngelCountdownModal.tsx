import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Clock, Sun, Moon, Zap, Orbit, Compass } from 'lucide-react';
import { getTimeRemaining, TARGET_BIRTHDAY_IST, TimeRemaining } from '../../utils/dateCheck';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export type CountdownUnitType = 'DAYS' | 'HOURS' | 'MINUTES' | 'SECONDS';

interface UnitTributeContent {
  title: string;
  badge: string;
  icon: string;
  calligraphyQuote: string;
  description: string;
  colorGradient: string;
}

const UNIT_TRIBUTES: Record<CountdownUnitType, UnitTributeContent> = {
  DAYS: {
    title: 'Solar Days Horizon',
    badge: 'SACRED DAWN COUNTDOWN 🌅',
    icon: '🌅',
    calligraphyQuote: '“Every rising sun brings the world closer to her birthday...” 🌅🪷',
    description:
      'Counting each blessed sunrise until the entire universe rejoices for the kindest soul who fills every heart with pure warmth and grace.',
    colorGradient: 'from-[#FFD93D] via-[#FFE5EC] to-[#FF4D8D]'
  },
  HOURS: {
    title: 'Golden Hours Continuum',
    badge: 'HOURLY SIBLING ALLIANCE ☀️',
    icon: '☀️',
    calligraphyQuote: '“These golden hours counting down to her radiance...” ☀️⏳',
    description:
      'Every passing hour is a testament to the laughter, genuine honesty, and the 1,250 KM supersonic sibling shield guarded forever with pride.',
    colorGradient: 'from-[#FFA94D] via-[#FFD93D] to-[#FF4D8D]'
  },
  MINUTES: {
    title: 'Harmonic Minutes Cycle',
    badge: 'MINUTES OF ANTICIPATION 🌸',
    icon: '🌸',
    calligraphyQuote: '“Every fleeting minute brings us closer to her smile...” 🌸✨',
    description:
      'Thousands of minutes ticking in celestial harmony, drawing her beloved family, stray kittens, and worldwide fans together in celebration.',
    colorGradient: 'from-[#FF4D8D] via-[#FF85A2] to-[#D4A84B]'
  },
  SECONDS: {
    title: 'Absolute Quantum Seconds',
    badge: 'ANGEL CHRONOMETER 🪽',
    icon: '🪽',
    calligraphyQuote: '“More the seconds left for the birthday of an angel...” 🪽✨',
    description:
      'Every single ticking second is a sacred countdown celebrating the kindest, purest angel who stepped onto this earth to illuminate our world.',
    colorGradient: 'from-[#FFD93D] via-[#FFF0F5] to-[#FF2D78]'
  }
};

interface AngelCountdownModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialUnit?: CountdownUnitType;
}

export const AngelCountdownModal: React.FC<AngelCountdownModalProps> = ({
  isOpen,
  onClose,
  initialUnit = 'SECONDS'
}) => {
  const [activeUnit, setActiveUnit] = useState<CountdownUnitType>(initialUnit);
  const [time, setTime] = useState<TimeRemaining>(() => getTimeRemaining(TARGET_BIRTHDAY_IST));
  const [fractionMs, setFractionMs] = useState<string>('00');
  const [stardustRipple, setStardustRipple] = useState<{ x: number; y: number; id: number } | null>(null);

  useEffect(() => {
    setActiveUnit(initialUnit);
  }, [initialUnit, isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      const rem = getTimeRemaining(TARGET_BIRTHDAY_IST);
      setTime(rem);
      setFractionMs(String(Math.floor((rem.total % 1000) / 10)).padStart(2, '0'));
    }, 40);

    return () => clearInterval(interval);
  }, [isOpen]);

  const currentTribute = UNIT_TRIBUTES[activeUnit];

  // Calculate live dynamic metrics
  const totalSeconds = Math.max(0, Math.floor(time.total / 1000));
  const totalMinutes = Math.max(0, Math.floor(time.total / (1000 * 60)));
  const totalHours = Math.max(0, Math.floor(time.total / (1000 * 60 * 60)));
  const totalDays = Math.max(0, time.days);

  const getActiveDisplayValue = () => {
    switch (activeUnit) {
      case 'DAYS':
        return {
          main: totalDays.toLocaleString(),
          sub: `${String(time.hours).padStart(2, '0')}h ${String(time.minutes).padStart(2, '0')}m left`,
          unitLabel: 'SOLAR DAYS'
        };
      case 'HOURS':
        return {
          main: totalHours.toLocaleString(),
          sub: `${String(time.minutes).padStart(2, '0')}m ${String(time.seconds).padStart(2, '0')}s left`,
          unitLabel: 'TOTAL HOURS'
        };
      case 'MINUTES':
        return {
          main: totalMinutes.toLocaleString(),
          sub: `${String(time.seconds).padStart(2, '0')}.${fractionMs}s live`,
          unitLabel: 'TOTAL MINUTES'
        };
      case 'SECONDS':
      default:
        return {
          main: totalSeconds.toLocaleString(),
          sub: `.${fractionMs}s live quantum`,
          unitLabel: 'TOTAL SECONDS'
        };
    }
  };

  const activeDisplay = getActiveDisplayValue();

  const handleUnitSwitch = (unit: CountdownUnitType, index: number) => {
    setActiveUnit(unit);
    soundEngine.playHarmonicPop(index);
  };

  const handleInteractiveStarlightTap = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const noteIdx = Math.floor((x / rect.width) * 6);

    soundEngine.playHarmonicPop(noteIdx);
    triggerCustomConfetti(e.clientX, e.clientY);

    setStardustRipple({ x, y, id: Date.now() });
    setTimeout(() => setStardustRipple(null), 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-2xl select-none"
        >
          {/* Angelic Halo Golden Expanding Rings */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute w-96 sm:w-[520px] h-96 sm:h-[520px] rounded-full border-2 border-amber-300/30 pointer-events-none"
          />

          <motion.div
            initial={{ scale: 0.85, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-xl w-full bg-gradient-to-b from-[#1F1533]/95 via-[#130D24]/98 to-[#0B0716] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_60px_rgba(255,217,61,0.3)] border-2 border-amber-300/50 text-center overflow-hidden"
          >
            {/* Top Light Sheen */}
            <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent shadow-[0_0_20px_#FFD93D]" />

            {/* Close Button */}
            <button
              onClick={() => {
                soundEngine.playPop();
                onClose();
              }}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-pink-500/30 text-gray-300 hover:text-white flex items-center justify-center transition-all z-10"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Angel Wings / Emblem Header */}
            <div className="flex items-center justify-center gap-3 text-3xl sm:text-4xl mb-2 filter drop-shadow-[0_0_20px_rgba(255,217,61,0.8)]">
              <span>🪽</span>
              <span className="text-2xl sm:text-3xl">{currentTribute.icon}</span>
              <span>🪽</span>
            </div>

            {/* Sacred Chronometer Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-amber-300/40 text-[#FFD93D] text-[10px] sm:text-xs font-space font-bold tracking-widest uppercase mb-3 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentTribute.badge}</span>
            </div>

            {/* Unit Switcher Tabs */}
            <div className="grid grid-cols-4 gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 max-w-md mx-auto mb-4">
              {(['DAYS', 'HOURS', 'MINUTES', 'SECONDS'] as CountdownUnitType[]).map((unit, idx) => (
                <button
                  key={unit}
                  onClick={() => handleUnitSwitch(unit, idx)}
                  className={`py-1.5 rounded-xl text-[10px] sm:text-xs font-space font-bold uppercase transition-all ${
                    activeUnit === unit
                      ? 'bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] text-[#1A0B1A] shadow-md scale-105'
                      : 'text-gray-400 hover:text-pink-200 hover:bg-white/5'
                  }`}
                >
                  {unit}
                </button>
              ))}
            </div>

            {/* Live Ticking Odometer Card */}
            <div className="my-4 p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-black/65 border border-white/15 backdrop-blur-xl shadow-inner relative overflow-hidden group">
              <div className="text-[10px] sm:text-xs font-space font-bold text-pink-300/80 tracking-widest uppercase mb-1.5 flex items-center justify-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#FFD93D]" />
                <span>{activeDisplay.unitLabel} TO MARCH 6, 2027</span>
              </div>

              {/* Glowing Laser Numbers */}
              <div className="flex items-baseline justify-center gap-2 text-center font-space font-extrabold text-3xl sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-[#FFE5EC] to-[#FF4D8D] drop-shadow-[0_0_35px_rgba(255,217,61,0.85)] tracking-tight">
                <span>{activeDisplay.main}</span>
                <span className="text-sm sm:text-lg font-space font-bold text-pink-300/80">
                  {activeDisplay.sub}
                </span>
              </div>

              <span className="text-[9px] sm:text-[10px] font-space text-gray-400 mt-2 block tracking-wider uppercase">
                Synchronized with Absolute Event Horizon ⏳
              </span>
            </div>

            {/* Calligraphic Praise for the Angel */}
            <div className="my-5 sm:my-6 px-2 sm:px-4 space-y-2.5">
              <h3 className="font-caveat font-bold text-2xl sm:text-3.5xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-[#FFF0F5] to-[#FF4D8D] leading-snug drop-shadow-[0_2px_20px_rgba(255,217,61,0.6)]">
                {currentTribute.calligraphyQuote}
              </h3>

              <p className="font-caveat text-lg sm:text-2.5xl text-pink-200/90 leading-relaxed max-w-lg mx-auto">
                {currentTribute.description}
              </p>
            </div>

            {/* Interactive Starlight Wave Resonance (Replaces Boring Buttons!) */}
            <div
              onPointerDown={handleInteractiveStarlightTap}
              className="mt-4 p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-amber-300/30 cursor-pointer transition-all relative overflow-hidden group"
              title="Tap or drag along the starlight wave to play celestial chimes!"
            >
              {/* Expanding Click Ripple */}
              {stardustRipple && (
                <motion.div
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 4, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  style={{ left: stardustRipple.x, top: stardustRipple.y }}
                  className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300/40 pointer-events-none"
                />
              )}

              <div className="flex items-center justify-between text-[11px] font-space text-amber-200">
                <span className="flex items-center gap-1.5 font-bold">
                  <Orbit className="w-3.5 h-3.5 animate-spin text-[#FFD93D]" />
                  <span>Interactive Starlight Wave</span>
                </span>
                <span className="text-[10px] font-fredoka text-pink-300 font-semibold">
                  Tap / Drag to Play Chimes ✨
                </span>
              </div>

              {/* Animated Equalizer Sine Wave */}
              <div className="flex items-center justify-between gap-1 h-6 mt-2 px-1">
                {[40, 70, 45, 90, 60, 100, 75, 50, 85, 65, 95, 40, 80, 55, 90, 45].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                    transition={{
                      duration: 0.8 + (i % 3) * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.05
                    }}
                    className="w-1 bg-gradient-to-t from-[#FFD93D] to-[#FF4D8D] rounded-full group-hover:from-white group-hover:to-[#FFD93D] transition-colors"
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
