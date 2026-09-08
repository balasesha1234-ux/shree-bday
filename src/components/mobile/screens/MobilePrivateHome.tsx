import React from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Mail, Star, Image, Moon, Shield, MessageSquare, PenTool, BookOpen } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';

interface MobilePrivateHomeProps {
  onBack: () => void;
  onSelectSubscreen: (screenId: string) => void;
}

export const MobilePrivateHome: React.FC<MobilePrivateHomeProps> = ({ onBack, onSelectSubscreen }) => {
  const storyBooks = [
    {
      id: 'letter-open',
      title: "A Brother’s Shield",
      subtitle: '12 Letters of Unconditional Faith & Protection',
      badge: '12 Chapters',
      paletteName: 'Rose Gold',
      icon: Mail,
      accentColor: 'text-[#FF4D8D]',
      borderColor: 'border-pink-300/40',
      badgeBg: 'bg-pink-500/20 text-pink-200'
    },
    {
      id: 'why-you-matter',
      title: 'Why You Matter',
      subtitle: 'A Tribute to Your Incomparable Light & Grace',
      badge: '6 Reflections',
      paletteName: 'Amethyst',
      icon: Star,
      accentColor: 'text-[#C084FC]',
      borderColor: 'border-purple-300/40',
      badgeBg: 'bg-purple-500/20 text-purple-200'
    },
    {
      id: 'memories-we-share',
      title: 'Memories We Share',
      subtitle: 'Shared Milestones, Distances Bridged & Laughter',
      badge: '6 Memories',
      paletteName: 'Sunset Peach',
      icon: Image,
      accentColor: 'text-[#F97316]',
      borderColor: 'border-amber-300/40',
      badgeBg: 'bg-amber-500/20 text-amber-200'
    },
    {
      id: 'gratitude',
      title: 'Gratitude & Sibling Alliance',
      subtitle: 'Sacred Trust, Lifelong Protection & The Sibling Pact',
      badge: '6 Chapters',
      paletteName: 'Vrindavan Sage',
      icon: Shield,
      accentColor: 'text-[#10B981]',
      borderColor: 'border-emerald-300/40',
      badgeBg: 'bg-emerald-500/20 text-emerald-200'
    },
    {
      id: 'things-i-never-said',
      title: 'Things I Never Said',
      subtitle: 'Quiet Truths, Silent Prayers & Unspoken Brotherly Pride',
      badge: '6 Truths',
      paletteName: 'Midnight Stardust',
      icon: MessageSquare,
      accentColor: 'text-[#FFD93D]',
      borderColor: 'border-yellow-300/40',
      badgeBg: 'bg-yellow-500/20 text-yellow-200'
    }
  ];

  const handleOpenItem = (id: string) => {
    soundEngine.playSparkle(1.2);
    onSelectSubscreen(id);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#120A1A] text-white flex flex-col justify-between overflow-y-auto select-none no-scrollbar">
      {/* Devotional Dark Atmosphere */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <img
          src="/assets/serial/11s.jpg"
          alt="Diyas"
          className="w-full h-full object-cover opacity-20 blur-sm scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#120A1A]/95 via-[#1A0E26]/90 to-[#0F0716]" />
      </div>

      <div className="relative z-10 flex flex-col flex-1 pb-8">
        <MobileTopBar light />

        <div className="px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#FFD93D] uppercase">
            PRIVATE SANCTUARY
          </span>
          <div className="w-9" />
        </div>

        {/* Header */}
        <div className="px-6 pt-3 pb-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-script text-4xl sm:text-5xl text-pink-200"
          >
            The Story Books
          </motion.h2>

          <p className="font-quicksand text-xs text-pink-300/80 mt-1 max-w-xs mx-auto">
            Five distinct books written from the heart, each wrapped in its own aesthetic palette.
          </p>
        </div>

        {/* Dedicated Brother Letterbox Feature Card */}
        <div className="px-5 mb-3 max-w-sm mx-auto w-full">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => handleOpenItem('brother-letterbox')}
            className="w-full text-left p-3.5 rounded-2xl bg-gradient-to-r from-[#FFD93D]/25 via-[#FF4D8D]/25 to-[#9333EA]/20 border-2 border-[#FFD93D]/70 backdrop-blur-md shadow-lg group hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FFD93D] to-[#FF4D8D] flex items-center justify-center text-[#3D2040] shadow-sm">
                <PenTool className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-fredoka text-sm font-bold text-white group-hover:text-[#FFD93D] transition-colors">
                    A Note for My Brother ♡
                  </span>
                  <span className="text-[9px] font-space font-bold uppercase px-2 py-0.5 rounded-full bg-[#FFD93D]/30 text-[#FFD93D]">
                    Write to Karthik
                  </span>
                </div>
                <p className="font-quicksand text-[11px] text-pink-200/80 mt-0.5">
                  Write your note, pick your wax seal, and save it in the sibling vault.
                </p>
              </div>
            </div>
            <span className="text-[#FFD93D] text-lg font-bold pl-2 group-hover:translate-x-0.5 transition-transform">›</span>
          </motion.button>
        </div>

        {/* 5 Distinct Story Books */}
        <div className="px-5 space-y-2.5 max-w-sm mx-auto w-full">
          {storyBooks.map((book, idx) => {
            const Icon = book.icon;
            return (
              <motion.button
                key={book.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => handleOpenItem(book.id)}
                className={`w-full text-left p-3.5 rounded-2xl bg-white/[0.08] hover:bg-white/[0.14] border ${book.borderColor} backdrop-blur-md shadow-md group hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-between`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10 group-hover:scale-110 transition-transform">
                    <Icon className={`w-5 h-5 ${book.accentColor}`} />
                  </div>
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-fredoka text-sm font-bold text-white group-hover:text-pink-200 transition-colors truncate">
                        {book.title}
                      </span>
                      <span className={`text-[9px] font-space font-bold uppercase px-1.5 py-0.2 rounded ${book.badgeBg}`}>
                        {book.badge}
                      </span>
                    </div>
                    <p className="font-quicksand text-[11px] text-gray-300/80 mt-0.5 truncate">
                      {book.subtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-[10px] font-space text-gray-400 group-hover:text-pink-300 transition-colors hidden min-[360px]:inline">
                    Read
                  </span>
                  <span className="text-gray-400 group-hover:text-pink-300 transition-colors text-lg">›</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* 11:11 Sanctuary Link */}
        <div className="px-5 mt-3 max-w-sm mx-auto w-full">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={() => handleOpenItem('eleven-eleven')}
            className="w-full text-left p-3 rounded-2xl bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-400/30 backdrop-blur-md flex items-center justify-between group hover:border-purple-400/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-300">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <span className="font-fredoka text-xs font-bold text-purple-200 group-hover:text-white transition-colors">
                  11:11 Wish Star Sanctuary 🌙
                </span>
                <p className="font-quicksand text-[10px] text-purple-300/70">
                  Make a wish and cast it into your personal constellation.
                </p>
              </div>
            </div>
            <span className="text-purple-400 text-base">›</span>
          </motion.button>
        </div>

        {/* Bottom Devotional Seal */}
        <div className="px-6 pt-6 text-center mt-auto">
          <p className="font-caveat text-xs text-gray-400">
            "Protected by brotherly devotion • Sibling Alliance"
          </p>
        </div>
      </div>
    </div>
  );
};
