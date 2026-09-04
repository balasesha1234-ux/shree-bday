import React from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Mail, Star, Image, Moon, Heart, MessageSquare, PenTool } from 'lucide-react';

interface MobilePrivateHomeProps {
  onBack: () => void;
  onSelectSubscreen: (screenId: string) => void;
}

export const MobilePrivateHome: React.FC<MobilePrivateHomeProps> = ({ onBack, onSelectSubscreen }) => {
  const privateNavItems = [
    { id: 'letter-open', label: 'My Letter to You (12 Pages)', icon: Mail, highlight: true },
    { id: 'brother-letterbox', label: 'A Note for My Brother ♡', icon: PenTool, special: true },
    { id: 'why-you-matter', label: 'Why You Matter', icon: Star },
    { id: 'memories-we-share', label: 'Memories We Share', icon: Image },
    { id: 'eleven-eleven', label: '11:11 Sanctuary', icon: Moon },
    { id: 'gratitude', label: 'Gratitude & Sibling Alliance', icon: Heart },
    { id: 'things-i-never-said', label: 'Things I Never Said', icon: MessageSquare }
  ];

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#140b17] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Devotional Dark Atmosphere */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/serial/11s.jpg"
          alt="Diyas"
          className="w-full h-full object-cover opacity-20 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#140b17]/90 via-[#180a1c] to-[#120716]" />
      </div>

      <div>
        <MobileTopBar light />

        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#D4A84B] uppercase">
            PRIVATE SANCTUARY
          </span>
          <div className="w-9" />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-8 pt-2 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-script text-5xl text-pink-200"
        >
          Just for You
        </motion.h2>

        <p className="font-quicksand text-xs text-pink-300/80 mt-0.5">
          A closer space. A deeper conversation.
        </p>
      </div>

      {/* Menu List Items with Shree's Letterbox */}
      <div className="relative z-10 px-6 my-auto space-y-2 max-w-xs mx-auto w-full">
        {privateNavItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectSubscreen(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl backdrop-blur-md transition-all shadow-md group ${
                item.special
                  ? 'bg-gradient-to-r from-[#FFD93D]/25 to-[#FF4D8D]/25 border-2 border-[#FFD93D]/60 text-white'
                  : item.highlight
                  ? 'bg-white/15 border border-pink-300/40 text-pink-100'
                  : 'bg-white/10 border border-white/10 text-gray-200 hover:bg-white/15'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${item.special ? 'text-[#FFD93D]' : 'text-pink-300'} group-hover:scale-110 transition-transform`} />
                <span className="font-fredoka text-sm font-semibold">{item.label}</span>
              </div>
              <span className="text-gray-400 group-hover:text-pink-300 transition-colors">›</span>
            </motion.button>
          );
        })}
      </div>

      {/* Bottom Devotional Seal */}
      <div className="relative z-10 px-8 pb-8 text-center">
        <p className="font-caveat text-xs text-gray-400">
          "Protected by brotherly devotion • Sibling Alliance"
        </p>
      </div>
    </div>
  );
};
