import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, EyeOff } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface PrivateSecurityShieldProps {
  children: React.ReactNode;
}

export const PrivateSecurityShield: React.FC<PrivateSecurityShieldProps> = ({ children }) => {
  const [isShieldActive, setIsShieldActive] = useState<boolean>(false);
  const [captureBlockedNotice, setCaptureBlockedNotice] = useState<boolean>(false);

  useEffect(() => {
    // 1. Detect Window Blur (Fires when Snipping Tool, Screen Capture, or another window takes focus)
    const handleBlur = () => {
      if (import.meta.env.DEV) return;
      setIsShieldActive(true);
    };

    const handleFocus = () => {
      setIsShieldActive(false);
    };

    const handleVisibilityChange = () => {
      if (import.meta.env.DEV) return;
      if (document.hidden) {
        setIsShieldActive(true);
      } else {
        setIsShieldActive(false);
      }
    };

    // 2. Intercept Screen Capture & Inspection Keyboard Shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen Key
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        e.preventDefault();
        soundEngine.playPop();
        setCaptureBlockedNotice(true);
        setIsShieldActive(true);
        setTimeout(() => {
          setCaptureBlockedNotice(false);
          setIsShieldActive(false);
        }, 2500);
        return false;
      }

      // Ctrl + S (Save Page) / Cmd + S
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) {
        e.preventDefault();
        return false;
      }

      // Ctrl + P (Print / Save as PDF) / Cmd + P
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        return false;
      }

      // Ctrl + U (View Page Source)
      if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
      }

      // Ctrl + Shift + I / F12 (DevTools)
      if (
        e.key === 'F12' ||
        ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c'))
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 3. Block Dragging of images and text selection
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // 4. Block Right-Click Context Menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('dragstart', handleDragStart);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div
      className="relative w-full private-sanctuary-protected select-none"
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
      {/* Subtle Security Diagonal Watermark Layer */}
      <div className="fixed inset-0 pointer-events-none z-30 opacity-[0.03] select-none flex items-center justify-center overflow-hidden">
        <div className="rotate-[-25deg] text-xs font-space tracking-[0.5em] text-black whitespace-nowrap leading-[4rem] text-center">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i}>
              CONFIDENTIAL // SHREE NAVAL KISHORI & KARTHIK // SIBLING SANCTUARY ONLY // DO NOT CAPTURE
            </div>
          ))}
        </div>
      </div>

      {/* Main Confidential Content */}
      <div className={`${isShieldActive ? 'filter blur-[30px] opacity-10 transition-all duration-200' : 'transition-all duration-300'}`}>
        {children}
      </div>

      {/* Security Privacy Veil (Triggered when window is unfocused / Snipping Tool active) */}
      <AnimatePresence>
        {isShieldActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setIsShieldActive(false)}
            className="fixed inset-0 z-[999999] bg-[#0A0718]/95 backdrop-blur-2xl flex flex-col items-center justify-center text-center p-6 select-none cursor-pointer"
          >
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-[#D4A84B]/20 border-2 border-[#D4A84B] flex items-center justify-center shadow-2xl mb-5 animate-pulse">
                <Shield className="w-10 h-10 text-[#D4A84B]" />
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#FF4D8D] flex items-center justify-center text-white shadow">
                <Lock className="w-3.5 h-3.5" />
              </div>
            </div>

            <span className="text-[10px] font-space tracking-[0.3em] uppercase text-[#D4A84B] font-bold mb-2">
              CONFIDENTIAL SIBLING REALM // ANTI-CAPTURE ACTIVE
            </span>
            <h3 className="text-2xl sm:text-3xl font-playfair font-bold text-white mb-3">
              Screen Protected
            </h3>
            <p className="text-sm font-quicksand text-gray-300 max-w-md leading-relaxed">
              Window focus lost. Viewing is temporarily veiled to protect private letters and memories from screen captures or background recording.
            </p>

            <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-[#D4A84B]/40 text-[#FF4D8D] font-fredoka font-semibold text-xs animate-bounce shadow-lg">
              <EyeOff className="w-4 h-4" />
              <span>Tap anywhere inside this window to resume viewing 🌸</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Capture Shortcut Blocked Toast */}
      <AnimatePresence>
        {captureBlockedNotice && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[1000000] px-6 py-3 rounded-full bg-red-600/95 text-white font-fredoka font-bold text-sm shadow-2xl border-2 border-white flex items-center gap-2.5 backdrop-blur-md"
          >
            <Shield className="w-4 h-4 text-yellow-300 animate-spin" />
            <span>Screenshot blocked! This sanctuary is confidential. 🔒</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
