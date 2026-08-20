import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Scroll, Heart, Check, Lock, Award } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface SiblingRule {
  id: number;
  title: string;
  emoji: string;
  theme: string;
  law: string;
  secretFootnote: string;
  badgeColor: string;
  accentBorder: string;
}

const SIBLING_RULES: SiblingRule[] = [
  {
    id: 1,
    title: 'The 2 AM Emergency Rant Protocol',
    emoji: '🌙',
    theme: 'SANCTUARY & PEACE',
    law: 'Zero questions asked, zero judgment rendered. Whenever Shree feels overwhelmed, exhausted, or needs to vent, brother’s line is permanently open with instant hype and perspective.',
    secretFootnote: 'Your peace of mind and mental calm will always be top priority.',
    badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
    accentBorder: 'border-indigo-200'
  },
  {
    id: 2,
    title: 'The Unconditional Cheerleader Clause',
    emoji: '🏆',
    theme: 'PRIDE & HYPE',
    law: 'Celebrating every video milestone, creative triumph, and career victory like it is an Olympic gold medal. No dream of yours is too big.',
    secretFootnote: 'Nobody in the universe cheers louder for your wins than your brother.',
    badgeColor: 'bg-pink-100 text-pink-700 border-pink-200',
    accentBorder: 'border-pink-200'
  },
  {
    id: 3,
    title: 'The Street Kitten Rescue Mandate',
    emoji: '🐱',
    theme: 'KINDNESS MANDATE',
    law: 'If Shree spots a stray kitten on the street, pausing the schedule to give headpats, food, and love is legally non-negotiable under sibling bylaws.',
    secretFootnote: 'Whiskered little friends are permanently protected under this alliance.',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    accentBorder: 'border-emerald-200'
  },
  {
    id: 4,
    title: 'The Permanent Guardian Shield',
    emoji: '🛡️',
    theme: 'LIFELONG PROTECTION',
    law: 'Anyone who ever disrespects, underestimates, or tries to bring down Shree has an immediate, lifelong problem with Hyderabad Command.',
    secretFootnote: 'Distance changes nothing. You are always fiercely protected.',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    accentBorder: 'border-amber-200'
  },
  {
    id: 5,
    title: 'The "I Got the Snacks" Covenant',
    emoji: '☕',
    theme: 'WARMTH & HOSPITALITY',
    law: 'Late-night chai talks, favorite treats, and emergency comfort sweets are sponsored on demand with zero hesitation.',
    secretFootnote: 'Snack budget for little sister: Unlimited forever.',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    accentBorder: 'border-rose-200'
  },
  {
    id: 6,
    title: 'Zero Pretenses / 100% Genuine Honesty',
    emoji: '✨',
    theme: 'PURE TRUTH',
    law: 'Unfiltered, constructive advice when asked, zero fake sugarcoating, and 100% backing once you make up your mind.',
    secretFootnote: 'Always real, always honest, always in your corner.',
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-200',
    accentBorder: 'border-sky-200'
  },
  {
    id: 7,
    title: 'Radha Rani’s Daily Blessing',
    emoji: '🪷',
    theme: 'SACRED DEVOTION',
    law: 'A quiet morning prayer for her continuous good health, peace, safety, and extraordinary creative happiness every single sunrise.',
    secretFootnote: 'May Radha Rani forever illuminate your path with grace and joy.',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    accentBorder: 'border-purple-200'
  }
];

export const SiblingCodex: React.FC = () => {
  const [unsealedIds, setUnsealedIds] = useState<{ [id: number]: boolean }>({ 1: true, 4: true });
  const [oathAffirmed, setOathAffirmed] = useState(false);

  const handleUnseal = (id: number) => {
    soundEngine.playTap();
    soundEngine.playWaxSealCrack();
    triggerCustomConfetti();
    setUnsealedIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleAffirmOath = () => {
    soundEngine.playTempleBell();
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();
    setOathAffirmed(true);
    setTimeout(() => setOathAffirmed(false), 5000);
  };

  return (
    <section id="sibling-codex" className="w-full max-w-5xl mx-auto px-4 py-20 select-none">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-amber-200 mb-2">
          <Scroll className="w-3.5 h-3.5" />
          <span>CHAPTER 01 // SIBLING CODEX & UNWRITTEN LAWS 📜🛡️</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          The 7 Sacred Sibling Rules
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Unwritten laws established since day one across the 1,250 KM connection. Tap a seal to unlock the brother's secret footnote!
        </p>
      </div>

      {/* 7 Interactive Rule Cards */}
      <div className="space-y-5">
        {SIBLING_RULES.map((rule, idx) => {
          const isUnsealed = unsealedIds[rule.id];

          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`relative bg-white rounded-3xl p-6 sm:p-8 border-2 transition-all duration-300 shadow-sm hover:shadow-xl ${
                isUnsealed ? `${rule.accentBorder} shadow-pop` : 'border-gray-200 opacity-90'
              }`}
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Left Pod */}
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-200/80 flex items-center justify-center text-3xl shrink-0 shadow-sm">
                    {rule.emoji}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-space font-bold px-2.5 py-0.5 rounded-full border uppercase ${rule.badgeColor}`}>
                        RULE 0${rule.id} • {rule.theme}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-fredoka font-bold text-gray-800 mt-1">
                      {rule.title}
                    </h3>
                  </div>
                </div>

                {/* Unseal Seal Button */}
                <div className="shrink-0">
                  {isUnsealed ? (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-space font-bold border border-emerald-200">
                      <Check className="w-3.5 h-3.5" />
                      <span>SEAL UNLOCKED 🛡️</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUnseal(rule.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4A84B] to-[#F5C642] text-[#2D1B00] font-fredoka font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Break Wax Seal 🛡️</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Law Content */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-3">
                <p className="font-quicksand text-sm sm:text-base text-gray-700 leading-relaxed">
                  "{rule.law}"
                </p>

                {/* Secret Footnote Reveal */}
                {isUnsealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left flex items-start gap-2.5"
                  >
                    <Heart className="w-4 h-4 text-[#FF4D8D] shrink-0 mt-0.5 fill-[#FF4D8D]" />
                    <p className="font-caveat text-xl sm:text-2xl text-[#8C6D23] leading-snug">
                      Brother's Note: {rule.secretFootnote}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Re-affirm Oath Button */}
      <div className="mt-12 text-center">
        <button
          onClick={handleAffirmOath}
          className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF4D8D] via-[#FF2D78] to-[#FF4D8D] hover:brightness-110 text-white font-fredoka font-bold text-sm sm:text-base shadow-pop hover:scale-105 active:scale-95 transition-all mx-auto"
        >
          <Award className="w-5 h-5" />
          <span>{oathAffirmed ? 'Oath Sealed in Gold & Stardust! 🛡️✨' : 'Re-Affirm Sibling Oath Forever 📜🛡️'}</span>
        </button>
      </div>
    </section>
  );
};
