import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Laptop, Shield, Instagram, Linkedin, Sparkles, Check, Heart } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';
import { triggerCustomConfetti } from '../../shared/Confetti';
import { DEVELOPER_CONTACTS } from '../../../data/developerContacts';

interface MobileDeveloperLetterProps {
  onBack: () => void;
  onEnterPrivate?: () => void;
}

export const MobileDeveloperLetter: React.FC<MobileDeveloperLetterProps> = ({ onBack, onEnterPrivate }) => {
  const [hasStamped, setHasStamped] = useState<boolean>(false);
  const [tapStep, setTapStep] = useState<number>(0);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [showPortal, setShowPortal] = useState<boolean>(false);

  const holdIntervalRef = useRef<number | null>(null);
  const holdStartTimeRef = useRef<number | null>(null);
  const inactivityTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  const resetInactivity = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = window.setTimeout(() => {
      setTapStep(0);
      setIsHolding(false);
      setHoldProgress(0);
    }, 20000);
  };

  // 1. Cat Mascot Tap
  const handleTapCat = (e: React.MouseEvent) => {
    soundEngine.playMeow();
    soundEngine.playSparkle(1.2);
    triggerCustomConfetti(e.clientX, e.clientY);
    setTapStep(1);
    resetInactivity();
  };

  // 2. Star Badge Tap
  const handleTapStar = (e: React.MouseEvent) => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti(e.clientX, e.clientY);
    if (tapStep === 1) {
      setTapStep(2);
      resetInactivity();
    } else {
      setTapStep(0);
    }
  };

  // 3. Pointer Down on Wax Seal (K♡S)
  const handleSealPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    if (tapStep !== 2) return;

    setIsHolding(true);
    setHoldProgress(0);
    holdStartTimeRef.current = Date.now();

    const HOLD_MS = 3000;
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = window.setInterval(() => {
      if (!holdStartTimeRef.current) return;
      const elapsed = Date.now() - holdStartTimeRef.current;
      const progress = Math.min(100, (elapsed / HOLD_MS) * 100);
      setHoldProgress(progress);

      if (elapsed >= 1000 && elapsed < 1050) {
        if ('vibrate' in navigator) {
          try { navigator.vibrate(30); } catch (_) {}
        }
      }
      if (elapsed >= 2000 && elapsed < 2050) {
        if ('vibrate' in navigator) {
          try { navigator.vibrate(40); } catch (_) {}
        }
      }

      if (elapsed >= HOLD_MS) {
        if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
        holdIntervalRef.current = null;
        setIsHolding(false);
        setHoldProgress(100);
        setTapStep(3);

        soundEngine.playSparkle(2.0);
        soundEngine.playTempleBell();
        triggerCustomConfetti();

        if ('vibrate' in navigator) {
          try { navigator.vibrate([100, 50, 200]); } catch (_) {}
        }

        setShowPortal(true);
        setTimeout(() => {
          onEnterPrivate?.();
        }, 1500);
      }
    }, 25);
  };

  // Pointer Up on Wax Seal
  const handleSealPointerUp = (e: React.PointerEvent) => {
    e.preventDefault();

    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }

    if (isHolding && holdProgress < 100) {
      setIsHolding(false);
      setHoldProgress(0);
    }

    // Normal Click action: Stamp Verified for regular visitors
    soundEngine.playSparkle(1.5);
    soundEngine.playTempleBell();
    triggerCustomConfetti(e.clientX, e.clientY);
    setHasStamped(true);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#FFF5F7] text-[#3D2040] flex flex-col justify-between overflow-hidden select-none font-quicksand">
      <div>
        <MobileTopBar light={false} />

        {/* Top Header */}
        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm hover:bg-pink-50 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#D4A84B] uppercase">
            ARCHITECT'S NOTE 💻
          </span>
          <div className="w-9" />
        </div>
      </div>

      {/* Main Letter Scrollable Body */}
      <div className="relative z-10 px-5 flex-1 overflow-y-auto no-scrollbar py-3 space-y-4">
        {/* Parchment Container */}
        <div className="p-5 rounded-3xl bg-white/95 border-2 border-[#D4A84B]/40 shadow-xl space-y-4 text-left">
          {/* Letterhead */}
          <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FFD93D] via-[#D4A84B] to-amber-600 text-white flex items-center justify-center text-xl shadow-md">
                👑
              </div>
              <div>
                <h3 className="font-fredoka text-base font-bold text-gray-900 leading-tight">
                  Karthik
                </h3>
                <p className="text-[10px] font-space text-[#B88728] font-bold">
                  WEBSITE ARCHITECT & BROTHER
                </p>
                <p className="text-[9px] font-space text-gray-400">
                  Handcrafted with React & Devotion
                </p>
              </div>
            </div>

            {/* Secret Charm 1: Innocent Cat Mascot Button */}
            <motion.button
              whileHover={{ scale: 1.15, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              type="button"
              onClick={handleTapCat}
              className="w-8 h-8 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200/80 flex items-center justify-center text-sm shadow-xs cursor-pointer transition-colors"
              title="Billi Mascot"
            >
              🐱
            </motion.button>
          </div>

          {/* Letter Content */}
          <div className="text-xs sm:text-sm text-gray-800 space-y-3 leading-relaxed">
            <div className="flex items-center justify-between">
              <p className="font-playfair text-base font-bold text-[#3D2040]">
                To Shree, and to every soul celebrating today:
              </p>

              {/* Secret Charm 2: Innocent Starlight Badge */}
              <button
                type="button"
                onClick={handleTapStar}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-[10px] font-space text-[#B88728] font-bold transition-all cursor-pointer active:scale-95"
                title="Starlight Blessing"
              >
                <span>⭐</span>
                <span>March 2026</span>
              </button>
            </div>

            <p>
              When someone’s voice and presence touch as many lives as Shree’s does, a simple one-line birthday wish or a fleeting social media story never felt like enough. I wanted to build something that could actually hold her story — a living digital universe that reflects her devotion, her music, and her warmth.
            </p>

            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 via-pink-50 to-amber-50 border-l-3 border-[#D4A84B]">
              <p className="font-playfair text-xs sm:text-sm italic font-bold text-[#3D2040]">
                "A small message would never do justice to what she means to her listeners, her friends, and to me as a sister. So I built an entire digital universe instead."
              </p>
            </div>

            <p>
              Every single screen was hand-crafted line by line late into the night. It was engineered not just with code, but with deep respect, genuine pride, and heartfelt prayer.
            </p>

            <p className="font-semibold text-[#3D2040]">
              Happy Birthday, Devotional Queen! 🪷 May Sri Sri Radha-Govinda always bless your voice, and may this year bring you infinite joy.
            </p>

            {/* Signature & Interactive Sibling Wax Seal (Secret Charm 3: Hold 3s) */}
            <div className="pt-3 border-t border-amber-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-space text-gray-400 block uppercase">
                  With endless love & pride,
                </span>
                <p className="font-caveat text-2xl text-[#FF4D8D] font-bold">
                  Karthik 🛡️💻
                </p>
              </div>

              {/* Interactive Sibling Seal with Secret 3-Second Hold */}
              <div className="relative flex items-center justify-center">
                {/* Circular Progress Ring when Holding */}
                {isHolding && tapStep === 2 && (
                  <svg className="absolute -inset-1.5 w-11 h-11 -rotate-90 pointer-events-none z-20">
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="rgba(212, 168, 75, 0.3)"
                      strokeWidth="3"
                    />
                    <circle
                      cx="22"
                      cy="22"
                      r="18"
                      fill="none"
                      stroke="#D4A84B"
                      strokeWidth="3"
                      strokeDasharray={2 * Math.PI * 18}
                      strokeDashoffset={2 * Math.PI * 18 * (1 - holdProgress / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-75"
                    />
                  </svg>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onPointerDown={handleSealPointerDown}
                  onPointerUp={handleSealPointerUp}
                  onPointerLeave={handleSealPointerUp}
                  onPointerCancel={handleSealPointerUp}
                  className={`relative z-10 flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-space font-bold transition-all select-none cursor-pointer ${
                    isHolding
                      ? 'bg-amber-100 border-[#D4A84B] shadow-[0_0_15px_rgba(212,168,75,0.6)] scale-105'
                      : hasStamped
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-amber-50 hover:bg-amber-100 border-[#D4A84B] text-gray-800 shadow-xs'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#D4A84B] to-amber-600 text-white flex items-center justify-center text-[10px]">
                    {hasStamped ? <Check className="w-3.5 h-3.5" /> : 'K♡S'}
                  </div>
                  <span>{isHolding ? 'HOLDING...' : hasStamped ? 'SEAL VERIFIED' : 'STAMP SEAL'}</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Developer's Contacts Card */}
        <div className="p-4 rounded-3xl bg-white border border-[#D4A84B]/30 shadow-md space-y-3 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D4A84B] to-amber-600 text-white flex items-center justify-center shadow-sm">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-[9px] font-space uppercase tracking-widest text-[#B88728] font-bold block">
                DEVELOPER'S CONTACTS [OFFICIAL]
              </span>
              <p className="font-fredoka text-sm font-bold text-gray-900 flex items-center gap-1.5">
                <span>{DEVELOPER_CONTACTS.name}</span>
                <Shield className="w-3.5 h-3.5 text-blue-600 fill-blue-100" />
              </p>
              <p className="text-[10px] font-quicksand text-gray-500">
                {DEVELOPER_CONTACTS.headline} • {DEVELOPER_CONTACTS.location}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <a
              href={DEVELOPER_CONTACTS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs font-space font-bold flex items-center justify-center gap-1.5 shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span className="truncate">{DEVELOPER_CONTACTS.instagram.handle}</span>
            </a>

            <a
              href={DEVELOPER_CONTACTS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-[#0077B5] text-white text-xs font-space font-bold flex items-center justify-center gap-1.5 shadow-xs hover:scale-105 active:scale-95 transition-all"
            >
              <Linkedin className="w-3.5 h-3.5" />
              <span className="truncate">{DEVELOPER_CONTACTS.linkedin.name}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Golden Lotus Portal Overlay on Unlock */}
      {showPortal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col items-center justify-center text-white text-center p-6"
        >
          <motion.div
            initial={{ scale: 0.5, rotate: -20 }}
            animate={{ scale: [1, 1.25, 1], rotate: 0 }}
            transition={{ duration: 1.2 }}
            className="text-6xl mb-3"
          >
            🪷✨
          </motion.div>
          <h2 className="font-script text-5xl text-[#FFD93D] mb-2">
            Welcome, Shree ♡
          </h2>
          <p className="font-caveat text-xl text-pink-200">
            Entering the Private Sanctuary...
          </p>
        </motion.div>
      )}
    </div>
  );
};
