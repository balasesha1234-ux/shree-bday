import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Scroll, Check, Heart, Sparkles, Award, Lock, Flame } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface SiblingRule {
  id: number;
  title: string;
  emoji: string;
  theme: string;
  motto: string;
  law: string;
  secretFootnote: string;
  badgeColor: string;
  accentBorder: string;
}

const SIBLING_RULES: SiblingRule[] = [
  {
    id: 1,
    title: 'The Unconditional Sibling Shield',
    emoji: '🛡️',
    theme: 'PERPETUAL PROTECTION',
    motto: 'NON DEFICIET PRAESIDIUM // रक्षा सदैव',
    law: 'In any battle, crisis, or challenge, the brother stands as an impenetrable shield. No excuses, no delays, zero compromise.',
    secretFootnote: '1,250 KM is just a number. You are fiercely guarded 24/7/365.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    accentBorder: 'border-amber-300'
  },
  {
    id: 2,
    title: 'The Universal Hype Protocol',
    emoji: '👑',
    theme: 'BIGGEST SUPPORTER',
    motto: 'SEMPER LAUDATIO // सदैव गौरव',
    law: 'Every reel, milestone, photo, and achievement is celebrated with 100% genuine pride and unmatched energy.',
    secretFootnote: 'Your biggest cheerleader from day one to the end of time.',
    badgeColor: 'bg-pink-100 text-pink-900 border-pink-300',
    accentBorder: 'border-pink-300'
  },
  {
    id: 3,
    title: 'The Street Kitten Rescue Mandate',
    emoji: '🐱',
    theme: 'COMPASSION LAW',
    motto: 'PROTECTIO FELINA // मार्जार रक्षणम्',
    law: 'If Shree spots a stray kitten on the street, pausing the schedule to give headpats, food, and love is legally non-negotiable under sibling bylaws.',
    secretFootnote: 'Whiskered little friends are permanently protected under this alliance.',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    accentBorder: 'border-emerald-300'
  },
  {
    id: 4,
    title: 'The Anti-Disrespect Directive',
    emoji: '⚡',
    theme: 'ZERO TOLERANCE',
    motto: 'NEMO ME IMPUNE LACESSET // निन्दा न क्षम्यते',
    law: 'Anyone who ever disrespects, underestimates, or tries to hurt Shree has an immediate, lifelong problem with Hyderabad Command.',
    secretFootnote: 'Zero tolerance for bad vibes. You deserve only honor and respect.',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    accentBorder: 'border-rose-300'
  },
  {
    id: 5,
    title: 'The Unlimited Snack Covenant',
    emoji: '☕',
    theme: 'WARMTH & COMFORT',
    motto: 'CONVIVIUM SINE FINE // अनन्त उपहार',
    law: 'Late-night chai talks, favorite treats, and emergency comfort sweets are sponsored on demand with zero hesitation.',
    secretFootnote: 'Snack budget for little sister: Unlimited forever.',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    accentBorder: 'border-amber-300'
  },
  {
    id: 6,
    title: '100% Genuine Truth & Loyalty',
    emoji: '💎',
    theme: 'PURE INTEGRITY',
    motto: 'VERITAS AETERNA // सत्य निष्ठा',
    law: 'Unfiltered, constructive advice when asked, zero fake sugarcoating, and 100% backing once you make up your mind.',
    secretFootnote: 'Always real, always honest, always in your corner.',
    badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
    accentBorder: 'border-cyan-300'
  },
  {
    id: 7,
    title: 'Radha Rani’s Daily Sunrise Blessing',
    emoji: '🪷',
    theme: 'SACRED DEVOTION',
    motto: 'BENEDICTIO DIVINA // श्रीराधा कृपा',
    law: 'A quiet morning prayer for her continuous good health, peace, safety, and extraordinary creative happiness every single sunrise.',
    secretFootnote: 'May Radha Rani forever illuminate your path with grace and joy.',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    accentBorder: 'border-purple-300'
  }
];

export const SiblingCodex: React.FC = () => {
  const [unsealedIds, setUnsealedIds] = useState<{ [id: number]: boolean }>({ 1: true, 4: true });
  const [oathAffirmed, setOathAffirmed] = useState(false);

  const handleUnseal = (id: number) => {
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
      {/* Royal Grimoire Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-amber-100 border border-[#D4A84B] text-[#5C4410] font-space text-xs font-bold tracking-widest uppercase mb-3 shadow-md">
          <Shield className="w-4 h-4 text-[#D4A84B]" />
          <span>ORDER OF THE SIBLING SHIELD // ROYAL CODEX 📜🛡️</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-gray-900 tracking-wide">
          The Seven Sacred Sibling Laws
        </h2>

        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
          Ancient unwritten laws binding Hyderabad and Delhi. Tap any wax seal to break the seal and reveal the brother's secret footnote!
        </p>
      </div>

      {/* 7 Illuminated Royal Codex Cards */}
      <div className="space-y-6">
        {SIBLING_RULES.map((rule, idx) => {
          const isUnsealed = unsealedIds[rule.id];

          return (
            <motion.div
              key={rule.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className={`relative bg-[#FCFBF7] rounded-3xl p-6 sm:p-8 border-2 transition-all duration-400 shadow-lg ${
                isUnsealed
                  ? 'border-[#D4A84B] shadow-[0_15px_45px_rgba(212,168,75,0.25)] ring-1 ring-[#D4A84B]/50'
                  : 'border-stone-200/80 hover:border-amber-300'
              }`}
            >
              {/* Gold Filigree Corner Accents */}
              <div className="absolute top-3 left-3 text-amber-500/40 text-xs select-none">✦</div>
              <div className="absolute top-3 right-3 text-amber-500/40 text-xs select-none">✦</div>

              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                {/* Left Pod */}
                <div className="flex items-start sm:items-center gap-4">
                  {/* Royal Crest / Shield Badge */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FFF9EE] to-[#FFECCC] border-2 border-[#D4A84B] flex items-center justify-center text-3xl shrink-0 shadow-md">
                    {rule.emoji}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`text-[10px] font-space font-extrabold px-3 py-0.5 rounded-full border uppercase ${rule.badgeColor}`}>
                        LAW 0${rule.id} • {rule.theme}
                      </span>
                      <span className="text-[10px] font-cinzel font-bold text-amber-700 tracking-wider">
                        [{rule.motto}]
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-stone-900 mt-1">
                      {rule.title}
                    </h3>
                  </div>
                </div>

                {/* Wax Seal Action Button */}
                <div className="shrink-0">
                  {isUnsealed ? (
                    <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-50 text-[#8C6D23] text-xs font-space font-bold border border-[#D4A84B]/60 shadow-sm">
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>SEAL UNBROKEN & ACTIVE 🛡️</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleUnseal(rule.id)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-br from-[#8B1E2F] to-[#B91C1C] text-amber-100 font-cinzel font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all border border-[#D4A84B]"
                    >
                      <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                      <span>Break Royal Wax Seal 🛡️</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Law Content */}
              <div className="mt-4 pt-4 border-t border-stone-200/70 space-y-3">
                <p className="font-playfair text-base sm:text-lg text-stone-800 leading-relaxed italic">
                  "{rule.law}"
                </p>

                {/* Secret Footnote Reveal */}
                {isUnsealed && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="p-4 rounded-2xl bg-amber-50/80 border border-[#D4A84B]/60 text-left flex items-start gap-3 shadow-inner"
                  >
                    <Heart className="w-5 h-5 text-[#FF2D78] shrink-0 mt-0.5 fill-[#FF2D78]" />
                    <p className="font-caveat text-xl sm:text-2xl text-[#6B5316] font-bold leading-snug">
                      Brother's Decree: {rule.secretFootnote}
                    </p>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Re-affirm Oath Button */}
      <div className="mt-14 text-center">
        <button
          onClick={handleAffirmOath}
          className="flex items-center justify-center gap-2 px-9 py-4 rounded-full bg-gradient-to-r from-[#D4A84B] via-[#F5C642] to-[#D4A84B] text-[#2D1B00] font-cinzel font-bold text-sm sm:text-base shadow-2xl hover:scale-105 active:scale-95 transition-all mx-auto border-2 border-white/50"
        >
          <Award className="w-5 h-5" />
          <span>{oathAffirmed ? 'Oath Sealed in Eternal Stardust! 🛡️✨' : 'Affirm Royal Sibling Covenant Forever 📜🛡️'}</span>
        </button>
      </div>
    </section>
  );
};
