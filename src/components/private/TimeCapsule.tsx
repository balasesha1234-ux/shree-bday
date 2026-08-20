import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Sparkles, Mail, Award, Compass, Heart, X, Check } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface EmergencyLetter {
  id: number;
  label: string;
  emoji: string;
  theme: string;
  content: string;
  brotherSignature: string;
}

const EMERGENCY_LETTERS: EmergencyLetter[] = [
  {
    id: 1,
    label: 'Open when you are overthinking or doubting yourself',
    emoji: '🌙',
    theme: 'CALM & GROUNDING',
    content: 'Take a deep breath, Shree. You have already overcome things you thought would break you, and you did it with grace. You do not need to have everything figured out right now. Your talent, your heart, and your work speak for themselves. Never let temporary noise make you doubt your extraordinary light.',
    brotherSignature: 'Your brother is always in your corner. Breathe easy 🌸'
  },
  {
    id: 2,
    label: 'Open after an exhausting or frustrating day',
    emoji: '☕',
    theme: 'COMFORT & HYPE',
    content: 'Some days take more energy than they give, and that is okay. Put down your phone, grab a warm cup of chai, and rest. You are allowed to be tired without feeling guilty. Tomorrow is a brand new sunrise, and you are unstoppable.',
    brotherSignature: 'Chai is sponsored, peace is guaranteed 🛡️'
  },
  {
    id: 3,
    label: 'Open whenever you need a reminder of how proud I am of you',
    emoji: '🏆',
    theme: 'PRIDE & LOYALTY',
    content: 'Watching your dedication, your kindness toward strangers, and your relentless creative energy makes me so immensely proud to be your brother. You are building something truly special with pure honesty. Never forget who you are.',
    brotherSignature: 'Lifelong pride & protection from Hyderabad 🛡️✨'
  }
];

const PREDICTIONS = [
  { icon: '🚀', text: 'Millions more souls inspired by your storytelling and genuine warmth.' },
  { icon: '🐱', text: 'At least 15 stray kittens fed, protected, and given forever cuddles.' },
  { icon: '🏆', text: 'Unlocking a monumental creative project that you’ve dreamed of for years.' },
  { icon: '☕', text: 'Endless late-night sibling chai conversations laughing until our stomachs hurt.' },
  { icon: '🪷', text: 'Unstoppable mental peace, vitality, and blessings from Radha Rani every sunrise.' }
];

export const TimeCapsule: React.FC = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [activeTab, setActiveTab] = useState<'predictions' | 'warranty' | 'emergency'>('predictions');
  const [openedLetters, setOpenedLetters] = useState<{ [id: number]: boolean }>({});
  const [selectedLetter, setSelectedLetter] = useState<EmergencyLetter | null>(null);

  const handleUnlockCapsule = () => {
    soundEngine.playCapsuleUnlock();
    soundEngine.playSparkle(1.5);
    setIsUnlocked(true);

    confetti({
      particleCount: 75,
      spread: 120,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD93D', '#FF4D8D', '#D4A84B', '#FFFFFF']
    });
  };

  const handleOpenLetter = (letter: EmergencyLetter) => {
    soundEngine.playTap();
    soundEngine.playWaxSealCrack();
    setOpenedLetters((prev) => ({ ...prev, [letter.id]: true }));
    setSelectedLetter(letter);
  };

  return (
    <section id="time-capsule" className="w-full max-w-5xl mx-auto px-4 py-20 select-none">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-amber-200 mb-2">
          <Compass className="w-3.5 h-3.5 text-[#D4A84B]" />
          <span>CHAPTER 04 // THE SIBLING TIME CAPSULE 🏆</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          The Golden Sibling Capsule
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          A sealed vault containing future predictions, lifetime sibling warranty, and emergency letters.
        </p>
      </div>

      {/* Main Container */}
      <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FAF6EE] to-[#F5EFE0] rounded-3xl p-6 sm:p-10 shadow-pop border-2 border-[#E8DFC8] overflow-hidden">
        {!isUnlocked ? (
          /* Locked Capsule Dial Interface */
          <div className="text-center py-12 flex flex-col items-center">
            {/* 3D Golden Cylinder Icon */}
            <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#FFD93D] via-[#D4A84B] to-[#996515] text-[#2D1B00] flex items-center justify-center text-4xl shadow-2xl mb-6 border-4 border-amber-200 animate-bounce">
              <Lock className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="text-xs font-space font-bold uppercase tracking-widest text-[#D4A84B]">
              COMBINATION CIPHER // MARCH 6 PROTOCOL
            </span>

            <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-gray-800 mt-2">
              Sealed with Brotherly Loyalty
            </h3>

            <p className="text-sm font-quicksand text-gray-600 max-w-md mt-2 mb-8">
              This capsule holds your 22nd year predictions, official protection warranty, and 3 emergency letters.
            </p>

            <button
              onClick={handleUnlockCapsule}
              className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A84B] via-[#F5C642] to-[#FF4D8D] text-[#2D1B00] font-fredoka font-bold text-base shadow-pop hover:scale-105 active:scale-95 transition-all"
            >
              <Unlock className="w-5 h-5" />
              <span>Unlock Golden Capsule ✨</span>
            </button>
          </div>
        ) : (
          /* Unlocked Archive Interface */
          <div>
            {/* Tab Selector */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-8 pb-4 border-b border-amber-200">
              <button
                onClick={() => {
                  soundEngine.playTap();
                  setActiveTab('predictions');
                }}
                className={`px-4 py-2 rounded-2xl font-fredoka font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  activeTab === 'predictions'
                    ? 'bg-[#D4A84B] text-[#2D1B00] shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-amber-50'
                }`}
              >
                <span>🔮 5 Big Predictions</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playTap();
                  setActiveTab('warranty');
                }}
                className={`px-4 py-2 rounded-2xl font-fredoka font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  activeTab === 'warranty'
                    ? 'bg-[#D4A84B] text-[#2D1B00] shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-amber-50'
                }`}
              >
                <span>📜 Lifetime Warranty</span>
              </button>

              <button
                onClick={() => {
                  soundEngine.playTap();
                  setActiveTab('emergency');
                }}
                className={`px-4 py-2 rounded-2xl font-fredoka font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  activeTab === 'emergency'
                    ? 'bg-[#D4A84B] text-[#2D1B00] shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-amber-50'
                }`}
              >
                <span>🧯 3 Emergency Letters</span>
              </button>
            </div>

            {/* TAB 1: PREDICTIONS */}
            {activeTab === 'predictions' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-space font-bold uppercase tracking-widest text-[#D4A84B]">
                    PROPHECIES FOR HER 22ND YEAR 🌟
                  </span>
                  <h4 className="text-2xl font-fredoka font-bold text-gray-800">
                    What The Universe Holds For Shree
                  </h4>
                </div>

                {PREDICTIONS.map((p, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-center gap-4 hover:border-[#D4A84B] transition-all"
                  >
                    <span className="text-3xl shrink-0">{p.icon}</span>
                    <p className="font-quicksand text-sm sm:text-base font-semibold text-gray-700">
                      {p.text}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* TAB 2: LIFETIME WARRANTY */}
            {activeTab === 'warranty' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#D4A84B] shadow-lg text-center"
              >
                <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-[#D4A84B] text-[#D4A84B] flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <Award className="w-7 h-7" />
                </div>

                <span className="text-[10px] font-space font-bold uppercase tracking-widest text-[#D4A84B]">
                  OFFICIAL SIBLING PROTECTION CERTIFICATE
                </span>

                <h4 className="font-playfair text-2xl sm:text-3xl font-bold text-gray-800 mt-1">
                  Lifetime Brotherly Warranty
                </h4>

                <div className="my-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm font-quicksand text-gray-700 space-y-2 text-left">
                  <p><strong>SERIAL NO:</strong> HYD-DEL-0306-INFINITY</p>
                  <p><strong>BENEFICIARY:</strong> Shree 🌸</p>
                  <p><strong>GUARANTOR:</strong> Her Brother in Hyderabad 🛡️</p>
                  <p><strong>VALIDITY:</strong> Permanent & Unconditional (No Expiry Date)</p>
                  <p><strong>COVERAGE:</strong> 100% defense against bad days, unlimited emergency chai talks, unconditional celebration of every win, and lifelong backing.</p>
                </div>

                <span className="font-caveat text-xl sm:text-2xl text-[#8C6D23] block">
                  "Signed with unwavering sibling loyalty & proudest heart 🌸🛡️"
                </span>
              </motion.div>
            )}

            {/* TAB 3: EMERGENCY ENVELOPES */}
            {activeTab === 'emergency' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4 max-w-3xl mx-auto"
              >
                <div className="text-center mb-6">
                  <span className="text-xs font-space font-bold uppercase tracking-widest text-[#D4A84B]">
                    THE FIRST-AID HAPPINESS KIT 🧯
                  </span>
                  <h4 className="text-2xl font-fredoka font-bold text-gray-800">
                    3 Letters to Open When You Need Them
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {EMERGENCY_LETTERS.map((letter) => {
                    const isOpened = openedLetters[letter.id];

                    return (
                      <button
                        key={letter.id}
                        type="button"
                        onClick={() => handleOpenLetter(letter)}
                        className={`p-5 rounded-3xl border-2 text-left flex flex-col justify-between transition-all hover:scale-105 shadow-sm ${
                          isOpened
                            ? 'bg-amber-50/80 border-[#D4A84B]'
                            : 'bg-white border-amber-200 hover:border-pink-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-3xl">{letter.emoji}</span>
                            {isOpened && (
                              <span className="text-[9px] font-space font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                READ ✓
                              </span>
                            )}
                          </div>
                          <span className="text-[9px] font-space font-bold uppercase text-[#D4A84B] block">
                            LETTER 0{letter.id}
                          </span>
                          <h5 className="font-fredoka font-bold text-sm text-gray-800 mt-1 leading-snug">
                            {letter.label}
                          </h5>
                        </div>

                        <span className="mt-4 text-xs font-fredoka font-bold text-[#FF4D8D] flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" />
                          <span>Tap to Read Envelope 📜</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Emergency Letter Modal */}
      <AnimatePresence>
        {selectedLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedLetter(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#D4A84B] text-left overflow-hidden"
            >
              <button
                onClick={() => setSelectedLetter(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{selectedLetter.emoji}</span>
                <div>
                  <span className="text-[10px] font-space font-bold uppercase tracking-widest text-[#D4A84B]">
                    {selectedLetter.theme}
                  </span>
                  <h4 className="font-fredoka font-bold text-lg text-gray-800">
                    {selectedLetter.label}
                  </h4>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 my-4">
                <p className="font-quicksand text-sm sm:text-base text-gray-800 leading-relaxed">
                  "{selectedLetter.content}"
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
                <p className="font-caveat text-xl text-[#8C6D23]">
                  {selectedLetter.brotherSignature}
                </p>

                <button
                  onClick={() => setSelectedLetter(null)}
                  className="px-4 py-1.5 rounded-full bg-[#D4A84B] text-[#2D1B00] font-fredoka font-bold text-xs shadow-sm hover:scale-105 transition-all"
                >
                  Close Letter 🌸
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
