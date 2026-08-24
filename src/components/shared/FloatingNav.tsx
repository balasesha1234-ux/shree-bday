import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface FloatingNavProps {
  appMode: 'countdown' | 'public' | 'private';
}

interface Chapter {
  id: string;
  num: string;
  name: string;
  targetId: string;
}

const PUBLIC_CHAPTERS: Chapter[] = [
  { id: 'celebrate', num: '01', name: 'CELEBRATE', targetId: 'make-a-wish' },
  { id: 'discover', num: '02', name: 'DISCOVER', targetId: 'public-moments' },
  { id: 'remember', num: '03', name: 'REMEMBER', targetId: 'diya-pond' },
  { id: 'play', num: '04', name: 'PLAY', targetId: 'arcade-game' },
  { id: 'heart', num: '05', name: 'HEART', targetId: 'wish-wall' }
];

export const FloatingNav: React.FC<FloatingNavProps> = ({ appMode }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeChapter, setActiveChapter] = useState('celebrate');
  const [isIdle, setIsIdle] = useState(false);

  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const handleScroll = () => {
      setScrolled(window.scrollY > 120);

      // Determine active chapter from scroll position
      const scrollPos = window.scrollY + 300;
      for (const ch of PUBLIC_CHAPTERS) {
        const el = document.getElementById(ch.targetId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveChapter(ch.id);
            break;
          }
        }
      }

      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 3500);
    };

    const handleMouseMove = () => {
      setIsIdle(false);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => setIsIdle(true), 3500);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimer);
    };
  }, []);

  if (appMode === 'countdown') return null;

  const scrollTo = (id: string) => {
    soundEngine.playPop();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: isIdle ? 0.45 : 1
          }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 sm:gap-2 p-1.5 rounded-full bg-white/90 backdrop-blur-xl shadow-pop border border-pink-200/80 text-[11px] sm:text-xs font-space select-none transition-opacity hover:opacity-100"
        >
          {appMode === 'public' ? (
            PUBLIC_CHAPTERS.map((ch) => (
              <button
                key={ch.id}
                onClick={() => scrollTo(ch.targetId)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-full transition-all flex items-center gap-1 sm:gap-1.5 ${
                  activeChapter === ch.id
                    ? 'bg-[#FF4D8D] text-white font-bold shadow-sm scale-105'
                    : 'text-gray-600 hover:text-[#FF4D8D] hover:bg-pink-50/80 font-medium'
                }`}
              >
                <span className="text-[9px] sm:text-[10px] opacity-75 font-mono">{ch.num}</span>
                <span>{ch.name}</span>
              </button>
            ))
          ) : (
            <div className="px-5 py-1.5 text-xs font-fredoka font-bold text-[#FF4D8D] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#D4A84B]" />
              <span>Private Sanctuary • Sibling Alliance 💗</span>
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
