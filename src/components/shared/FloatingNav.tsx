import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Trophy, Image, Flame, MessageCircleHeart, Lock } from 'lucide-react';

interface FloatingNavProps {
  appMode: 'countdown' | 'public' | 'private';
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ appMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (appMode === 'countdown') return null;

  const scrollTo = (id: string) => {
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
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-40 hidden sm:flex items-center gap-1.5 p-1.5 rounded-full bg-white/90 backdrop-blur-xl shadow-pop border border-pink-200/80 text-xs font-fredoka font-semibold text-gray-700"
        >
          {appMode === 'public' ? (
            <>
              <button
                onClick={() => scrollTo('wish-wall')}
                className="px-3.5 py-1.5 rounded-full hover:bg-pink-50 hover:text-[#FF4D8D] transition-colors flex items-center gap-1.5"
              >
                <MessageCircleHeart className="w-3.5 h-3.5 text-[#FF4D8D]" />
                <span>Wish Wall</span>
              </button>

              <button
                onClick={() => scrollTo('diya-pond')}
                className="px-3.5 py-1.5 rounded-full hover:bg-pink-50 hover:text-[#D4A84B] transition-colors flex items-center gap-1.5"
              >
                <Flame className="w-3.5 h-3.5 text-[#D4A84B]" />
                <span>Diya Pond</span>
              </button>

              <button
                onClick={() => scrollTo('story-generator')}
                className="px-3.5 py-1.5 rounded-full hover:bg-pink-50 hover:text-[#FF4D8D] transition-colors flex items-center gap-1.5"
              >
                <Image className="w-3.5 h-3.5 text-[#FF4D8D]" />
                <span>Story Card</span>
              </button>

              <button
                onClick={() => scrollTo('arcade-game')}
                className="px-3.5 py-1.5 rounded-full hover:bg-pink-50 hover:text-[#FF2D78] transition-colors flex items-center gap-1.5"
              >
                <Trophy className="w-3.5 h-3.5 text-[#FF2D78]" />
                <span>Arcade</span>
              </button>

              <button
                onClick={() => scrollTo('kindness-tribute')}
                className="px-3.5 py-1.5 rounded-full hover:bg-pink-50 hover:text-[#FF4D8D] transition-colors flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 text-[#FF4D8D]" />
                <span>Tribute</span>
              </button>
            </>
          ) : (
            <div className="px-5 py-1.5 text-xs font-fredoka font-bold text-[#FF4D8D] flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-[#D4A84B]" />
              <span>Private Sanctuary • For Shree’s Eyes Only 💗</span>
            </div>
          )}
        </motion.nav>
      )}
    </AnimatePresence>
  );
};
