import React from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { MobileBottomNav, MobileTab } from '../shared/MobileBottomNav';
import { Music, Image, Heart, Sparkles, BookOpen, Menu, Flame } from 'lucide-react';

interface MobileHomeProps {
  onNavigateScreen: (screenId: string) => void;
  onOpenMenu: () => void;
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
}

export const MobileHome: React.FC<MobileHomeProps> = ({
  onNavigateScreen,
  onOpenMenu,
  activeTab,
  onChangeTab
}) => {
  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#1e1322] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Sunset Temple Scenic Background from Reference */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/serial/11s.jpg"
          alt="Temple Dusk"
          className="w-full h-full object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1b0e1e] via-[#201026]/60 to-black/40" />
      </div>

      <div>
        <MobileTopBar light />

        {/* Top Bar with Calligraphic Brand & Menu */}
        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <div>
            <h1 className="font-script text-4xl text-white tracking-wide drop-shadow-md">
              Shree ♡
            </h1>
            <p className="font-script text-base text-pink-200 tracking-wide drop-shadow-sm">
              A Brighter Kinder Tomorrow
            </p>
          </div>

          <button
            onClick={onOpenMenu}
            className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all shadow-md"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Visual Space: Calligraphic Devotion Music Faith Emblem */}
      <div className="relative z-10 px-6 my-auto text-center flex flex-col items-center">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="inline-flex flex-col items-center gap-1 px-6 py-2.5 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D4A84B]/50 shadow-[0_0_25px_rgba(212,168,75,0.3)]"
        >
          <span className="text-xl">🪷</span>
          <span className="font-script text-2xl text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-pink-200 to-[#FFD93D] drop-shadow-[0_0_12px_rgba(255,217,61,0.6)]">
            Devotion • Music • Faith
          </span>
          <span className="text-[9px] font-space tracking-widest uppercase text-pink-200/80">
            A World of Grace & Radiance
          </span>
        </motion.div>
      </div>

      {/* 5 Circular Frosted Action Icons matching Screen 04 */}
      <div className="relative z-10 px-6 pb-4">
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
          {/* 1. Music (Spotify Connector) */}
          <button
            onClick={() => onNavigateScreen('music')}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#1DB954] transition-all">
              <Music className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-quicksand font-semibold text-pink-100">Music</span>
          </button>

          {/* 2. Memories */}
          <button
            onClick={() => onNavigateScreen('memories')}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#FF4D8D] transition-all">
              <Image className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-quicksand font-semibold text-pink-100">Memories</span>
          </button>

          {/* 3. Faith (Krishna) */}
          <button
            onClick={() => onNavigateScreen('faith')}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-[#FFD93D] shadow-xl group-hover:scale-110 group-hover:bg-[#D4A84B] group-hover:text-white transition-all">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-quicksand font-semibold text-pink-100">Faith</span>
          </button>

          {/* 4. Wishes */}
          <button
            onClick={() => onNavigateScreen('wishes')}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-[#FF4D8D] shadow-xl group-hover:scale-110 group-hover:bg-[#FF4D8D] group-hover:text-white transition-all">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[10px] font-quicksand font-semibold text-pink-100">Wishes</span>
          </button>

          {/* 5. Letter (Developer Letter & Secret Sequence) */}
          <button
            onClick={() => onNavigateScreen('letter-lock')}
            className="flex flex-col items-center gap-1.5 group cursor-pointer"
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-xl border border-white/40 flex items-center justify-center text-white shadow-xl group-hover:scale-110 group-hover:bg-[#3D2040] transition-all">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-quicksand font-semibold text-pink-100">Letter</span>
          </button>
        </div>

        {/* Bottom Note */}
        <div className="text-center mb-1">
          <p className="font-caveat text-sm text-pink-200/90 italic">
            "A little world for a very special soul."
          </p>
        </div>
      </div>

      {/* Persistent Bottom Nav Bar */}
      <MobileBottomNav activeTab={activeTab} onChangeTab={onChangeTab} dark />
    </div>
  );
};
