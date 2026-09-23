import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, MessageCircle, Fish, Hand, Volume2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from './Confetti';

interface FloatingReaction {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const BILLI_QUIPS: string[] = [
  "Psst... Karthik wrote thousands of lines of code just to see you smile today! 😸",
  "Headpats first, classical riyaaz next! 🪷",
  "Radhe Radhe! Did you drink enough water today, Didiii? 🌸",
  "A stray kitten somewhere in Vrindavan is sending you birthday blessings right now! 🐱✨",
  "Treat is strictly pending in Delhi! Don't let Karthik get away without paying! 🍕",
  "Warning: High concentrations of brotherly pride detected! 🛡️",
  "Your singing makes this whole world feel a little lighter. Never stop singing! 🎵",
  "Fun fact: You are officially declared the greatest Didi in the entire universe! 👑",
  "Meow meow! That is ancient cat language for 'Happy 22nd Birthday Shree!' 🎂",
  "Karthik gave me strict orders: Guard her smile all day long! 🐾",
  "Did you know? Cats purr at the frequency of healing — just like your voice! 🌸",
  "Brother's official decree: You must smile right now! 😊"
];

export const BilliCompanion: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [currentQuipIndex, setCurrentQuipIndex] = useState<number>(0);
  const [isBubbleOpen, setIsBubbleOpen] = useState<boolean>(true);
  const [petCount, setPetCount] = useState<number>(() => {
    const saved = localStorage.getItem('shree_billi_companion_pets');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [reactions, setReactions] = useState<FloatingReaction[]>([]);
  const [isPurring, setIsPurring] = useState<boolean>(false);
  const [comboCount, setComboCount] = useState<number>(0);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);

  // Auto-hide bubble after a while if untouched, but allow user to reopen
  useEffect(() => {
    const timer = setTimeout(() => {
      // Keep it open initially for 12 seconds so she notices it
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const spawnReaction = (emoji: string, clientX?: number, clientY?: number) => {
    const id = Date.now() + Math.random();
    const x = clientX ? clientX - 20 : (Math.random() * 40 - 20);
    const y = clientY ? clientY - 40 : -30;
    setReactions((prev) => [...prev, { id, emoji, x, y }]);
    setTimeout(() => {
      setReactions((prev) => prev.filter((r) => r.id !== id));
    }, 1000);
  };

  const handlePet = (e?: React.MouseEvent) => {
    soundEngine.playCatPurr();
    setIsPurring(true);
    setTimeout(() => setIsPurring(false), 600);

    const nextPet = petCount + 1;
    setPetCount(nextPet);
    localStorage.setItem('shree_billi_companion_pets', String(nextPet));

    spawnReaction('💗', e?.clientX, e?.clientY);
    spawnReaction('🐾');

    const nextCombo = comboCount + 1;
    setComboCount(nextCombo);

    if (nextCombo >= 5) {
      soundEngine.playSparkle(1.8);
      triggerCustomConfetti();
      setIsFlipping(true);
      setTimeout(() => setIsFlipping(false), 900);
      setComboCount(0);
      setCurrentQuipIndex((prev) => (prev + 1) % BILLI_QUIPS.length);
      setIsBubbleOpen(true);
    } else {
      // Pick random next quip
      if (Math.random() > 0.4) {
        setCurrentQuipIndex((prev) => (prev + 1) % BILLI_QUIPS.length);
        setIsBubbleOpen(true);
      }
    }
  };

  const handleFeedFish = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playTreatMunch();
    soundEngine.playMeow();
    spawnReaction('🐟');
    spawnReaction('✨');
    triggerCustomConfetti(e.clientX, e.clientY);
    setCurrentQuipIndex(4); // Treat pending quip or special
    setIsBubbleOpen(true);
  };

  const handleNextQuip = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playTap();
    setCurrentQuipIndex((prev) => (prev + 1) % BILLI_QUIPS.length);
    setIsBubbleOpen(true);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 select-none">
        <motion.button
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            soundEngine.playMeow();
            setIsMinimized(false);
            setIsBubbleOpen(true);
          }}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/95 border-2 border-pink-300 shadow-xl text-gray-800 text-xs font-fredoka font-semibold backdrop-blur-md hover:bg-pink-50 transition-colors"
        >
          <span className="text-lg">🐱</span>
          <span className="text-[11px] text-[#FF4D8D]">Wake Billi 🌸</span>
        </motion.button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-40 select-none flex flex-col items-start pointer-events-none">
      {/* Speech Bubble */}
      <AnimatePresence>
        {isBubbleOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto mb-3 max-w-[280px] sm:max-w-[320px] bg-white/95 backdrop-blur-md rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-pink-200 text-gray-800 relative"
          >
            {/* Close / Minimize Speech Bubble Button */}
            <button
              onClick={() => setIsBubbleOpen(false)}
              className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-600 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Bubble Header */}
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="text-xs font-space font-bold uppercase tracking-wider text-[#FF4D8D]">
                Billi Whispers 🐾
              </span>
              <span className="text-[10px] text-gray-400">• Brother’s Mascot</span>
            </div>

            {/* Quip Content */}
            <p className="font-quicksand text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
              "{BILLI_QUIPS[currentQuipIndex]}"
            </p>

            {/* Micro Action Buttons */}
            <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-pink-100 text-[11px] font-fredoka">
              <button
                onClick={handleFeedFish}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-pink-50 hover:bg-pink-100 text-[#FF4D8D] font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <Fish className="w-3 h-3" />
                <span>Feed 🐟</span>
              </button>

              <button
                onClick={handleNextQuip}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold transition-all hover:scale-105 active:scale-95"
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>Next Quip ✨</span>
              </button>

              {petCount > 0 && (
                <span className="text-[10px] font-space text-pink-400 font-bold">
                  {petCount} pets ❤️
                </span>
              )}
            </div>

            {/* Speech Bubble Arrow pointing to the cat below */}
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-white border-b-2 border-r-2 border-pink-200 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Interactive Cat & Cushion */}
      <div className="pointer-events-auto relative flex items-center gap-2">
        {/* Cat Card / Mascot Button */}
        <motion.div
          animate={
            isFlipping
              ? { rotate: 360, scale: [1, 1.3, 1] }
              : isPurring
              ? { y: [0, -6, 0], scale: [1, 1.08, 1] }
              : { y: [0, -4, 0] }
          }
          transition={{
            duration: isFlipping ? 0.8 : isPurring ? 0.4 : 2.5,
            repeat: isPurring ? 2 : isFlipping ? 0 : Infinity,
            ease: 'easeInOut'
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          onClick={handlePet}
          className="relative cursor-pointer group flex items-center justify-center"
        >
          {/* Soft Golden Aura */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-300/40 via-amber-200/40 to-pink-300/40 rounded-full blur-md group-hover:blur-lg transition-all" />

          {/* Fluffy Round Pillow */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/95 border-2 border-pink-300 shadow-xl flex flex-col items-center justify-center backdrop-blur-md">
            {/* The Cat Avatar */}
            <span className="text-3xl sm:text-4xl filter drop-shadow-sm transition-transform group-hover:scale-110">
              🐱
            </span>

            {/* Lotus or Party Hat Accessory */}
            <span className="absolute -top-2.5 -right-1 text-sm filter drop-shadow">
              🪷
            </span>

            {/* Sound / Purr indicator badge */}
            {isPurring && (
              <span className="absolute -top-3 -left-2 text-[10px] font-fredoka bg-[#FF4D8D] text-white px-2 py-0.5 rounded-full shadow-sm">
                purr~
              </span>
            )}
          </div>

          {/* Floating Reactions on tap */}
          <AnimatePresence>
            {reactions.map((r) => (
              <motion.span
                key={r.id}
                initial={{ opacity: 1, scale: 0.6, y: 0 }}
                animate={{ opacity: 0, scale: 1.6, y: -60 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.9 }}
                className="absolute text-xl pointer-events-none"
              >
                {r.emoji}
              </motion.span>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action / Reopen Bubble Pill Button */}
        <div className="flex flex-col gap-1">
          {!isBubbleOpen && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                soundEngine.playTap();
                setIsBubbleOpen(true);
              }}
              className="px-2.5 py-1 rounded-full bg-white/90 border border-pink-200 shadow-md text-[11px] font-fredoka font-semibold text-[#FF4D8D] hover:bg-pink-50 flex items-center gap-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>Whisper 🐾</span>
            </motion.button>
          )}

          {/* Minimize Mascot Button */}
          <button
            onClick={() => {
              soundEngine.playTap();
              setIsMinimized(true);
            }}
            title="Minimize Billi"
            className="w-5 h-5 rounded-full bg-white/80 border border-pink-200 hover:bg-pink-100 text-gray-400 hover:text-gray-600 flex items-center justify-center text-[10px] transition-colors"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};
