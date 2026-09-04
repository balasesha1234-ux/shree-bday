import React from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { Music, Image, Sparkles, Heart, BookOpen, ChevronLeft } from 'lucide-react';

interface MobileTabletOverviewProps {
  onBack: () => void;
  onSelectScreen: (screenId: string) => void;
}

export const MobileTabletOverview: React.FC<MobileTabletOverviewProps> = ({ onBack, onSelectScreen }) => {
  const cards = [
    { id: 'music', label: 'Music', image: '/assets/serial/1s.jpg', icon: Music, desc: 'Her Voice' },
    { id: 'memories', label: 'Memories', image: '/assets/serial/6s.jpg', icon: Image, desc: 'Moments' },
    { id: 'faith', label: 'Faith', image: '/assets/serial/11s.jpg', icon: Sparkles, desc: 'Krishna' },
    { id: 'wishes', label: 'Wishes', image: '/assets/serial/13s.jpg', icon: Heart, desc: 'From Everyone' },
    { id: 'letter-open', label: 'Letter', image: '/assets/serial/15s.jpg', icon: BookOpen, desc: 'A Personal Note' }
  ];

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#1e1324] text-white flex flex-col justify-between overflow-hidden select-none p-4 sm:p-6">
      <div className="absolute inset-0 z-0">
        <img src="/assets/serial/1s.jpg" alt="Hero" className="w-full h-full object-cover opacity-25 blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1324] via-[#1e1324]/80 to-black/50" />
      </div>

      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
        <button onClick={onBack} className="flex items-center gap-1.5 text-xs font-fredoka text-pink-200 hover:text-white">
          <ChevronLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs font-space font-bold text-pink-300">TABLET OVERVIEW (14)</span>
      </div>

      {/* Main Title Banner matching Screen 14 in reference */}
      <div className="relative z-10 text-center my-auto">
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="font-script text-5xl sm:text-7xl text-white drop-shadow-[0_4px_25px_rgba(255,105,180,0.6)]"
        >
          Shree ♡
        </motion.h1>
        <p className="text-xs sm:text-sm font-space tracking-widest text-pink-200 uppercase mt-1">
          A Brighter Kinder Tomorrow
        </p>

        {/* Carousel of Cards from Screen 14 */}
        <div className="grid grid-cols-5 gap-3 max-w-2xl mx-auto mt-8">
          {cards.map((c) => {
            const Icon = c.icon;
            return (
              <button
                key={c.id}
                onClick={() => onSelectScreen(c.id)}
                className="group flex flex-col items-center bg-black/40 backdrop-blur-md rounded-xl p-2 border border-white/15 hover:border-pink-300 hover:scale-105 transition-all cursor-pointer"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden mb-1.5">
                  <img src={c.image} alt={c.label} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                </div>
                <Icon className="w-3.5 h-3.5 text-pink-300 mb-0.5" />
                <span className="text-[10px] font-fredoka font-semibold text-white">{c.label}</span>
                <span className="text-[8px] font-quicksand text-gray-400">{c.desc}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 text-center text-xs font-caveat text-pink-200/80">
        "Same soul. New journey. ♡"
      </div>
    </div>
  );
};
