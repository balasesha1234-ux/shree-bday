import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, ChevronRight, Palette, Sparkles, BookOpen } from 'lucide-react';
import { STORY_BOOKS, BOOK_LETTER_TO_SHREE, BOOK_PALETTES, PaletteKey } from '../../../data/mobileExperienceData';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileLetterOpenProps {
  bookId?: string;
  onBack: () => void;
}

export const MobileLetterOpen: React.FC<MobileLetterOpenProps> = ({ bookId = 'letter-open', onBack }) => {
  const currentBook = STORY_BOOKS[bookId] || BOOK_LETTER_TO_SHREE;
  const [pageIndex, setPageIndex] = useState(0);
  const [activePalette, setActivePalette] = useState<PaletteKey>(currentBook.defaultPalette);
  const [showPaletteMenu, setShowPaletteMenu] = useState(false);

  // Update palette if book changes
  useEffect(() => {
    setPageIndex(0);
    setActivePalette(currentBook.defaultPalette);
  }, [bookId]);

  const palette = BOOK_PALETTES[activePalette] || BOOK_PALETTES.rose;
  const page = currentBook.pages[pageIndex] || currentBook.pages[0];

  const handleNext = () => {
    soundEngine.playPop();
    setPageIndex((prev) => (prev + 1) % currentBook.pages.length);
  };

  const handlePrev = () => {
    soundEngine.playPop();
    setPageIndex((prev) => (prev - 1 + currentBook.pages.length) % currentBook.pages.length);
  };

  const handleSelectPalette = (key: PaletteKey) => {
    soundEngine.playSparkle(1.3);
    setActivePalette(key);
  };

  // Generate 8 floating petals ("pattles") for gentle drift
  const floatingPetals = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: (i * 13) % 100,
    delay: i * 0.7,
    duration: 6 + (i % 4) * 2,
    size: 14 + (i % 3) * 6
  }));

  return (
    <div className={`relative w-full h-full min-h-[720px] ${palette.bgGradient} flex flex-col justify-between overflow-hidden select-none transition-colors duration-500`}>
      {/* Floating Animated Color Petals ("Pattles") */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {floatingPetals.map((petal) => (
          <motion.div
            key={petal.id}
            initial={{ y: -30, x: `${petal.x}vw`, opacity: 0, rotate: 0 }}
            animate={{
              y: '105vh',
              x: [`${petal.x}vw`, `${(petal.x + 6) % 100}vw`, `${petal.x}vw`],
              opacity: [0, 0.75, 0.75, 0],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            style={{ fontSize: `${petal.size}px` }}
            className="absolute select-none"
          >
            {palette.petalEmoji}
          </motion.div>
        ))}
      </div>

      {/* Top Header with Book Details & Palette Switcher */}
      <div className="relative z-20">
        <MobileTopBar light={activePalette === 'midnight'} />

        <div className="px-5 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-center px-2">
            <span className={`text-[10px] font-space font-bold tracking-widest uppercase ${palette.titleColor}`}>
              {currentBook.badge} • {currentBook.title}
            </span>
          </div>

          {/* Palette toggle button */}
          <button
            onClick={() => setShowPaletteMenu(!showPaletteMenu)}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 shadow-sm hover:scale-105 active:scale-95 transition-all"
            title="Choose Color Palette"
          >
            <Palette className="w-4 h-4 text-[#FF4D8D]" />
          </button>
        </div>

        {/* Interactive Color Palettes Ribbon */}
        <AnimatePresence>
          {showPaletteMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              className="px-5 pt-2"
            >
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 shadow-lg border border-pink-100 flex items-center justify-around gap-1">
                {(Object.keys(BOOK_PALETTES) as PaletteKey[]).map((key) => {
                  const p = BOOK_PALETTES[key];
                  const isSelected = activePalette === key;
                  return (
                    <button
                      key={key}
                      onClick={() => handleSelectPalette(key)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-fredoka transition-all ${
                        isSelected
                          ? 'bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] text-[#3D2040] shadow-sm font-bold scale-105'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <span>{p.icon}</span>
                      <span className="hidden min-[380px]:inline text-[11px]">{p.name.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Book Parchment Card */}
      <div className="relative z-10 px-5 my-auto flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentBook.id}-${page.pageNumber}`}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.22 }}
            className={`relative ${palette.cardBg} border-2 ${palette.cardBorder} rounded-3xl p-6 sm:p-7 flex flex-col justify-between min-h-[440px] max-w-sm mx-auto w-full transition-all duration-300`}
          >
            {/* Thematic dried botanical icon in top corner */}
            <div className="absolute top-3 right-3 text-2xl opacity-75 select-none animate-pulse">
              {palette.accentIcon}
            </div>

            {/* Chapter Pill Badge */}
            <div className="mb-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-space font-bold uppercase tracking-wider bg-black/5 dark:bg-white/10 ${palette.titleColor}`}>
                <BookOpen className="w-3 h-3" />
                <span>Chapter {page.pageNumber} • {page.title}</span>
              </span>
            </div>

            {/* Salutation and Handwritten Content */}
            <div className="my-auto py-2">
              <p className={`font-script text-3xl sm:text-4xl ${palette.salutationColor} mb-3 leading-snug`}>
                {page.salutation}
              </p>

              <p className={`font-caveat text-xl sm:text-2xl ${palette.bodyColor} leading-relaxed`}>
                {page.body}
              </p>
            </div>

            {/* Footer with Closing, Date & Wax Stamp Emblem */}
            <div className="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
              <div>
                <p className={`font-caveat text-lg font-bold ${palette.closingColor}`}>
                  {page.closing}
                </p>
                <p className={`font-space text-[10px] ${palette.dateColor} mt-0.5`}>
                  {page.date}
                </p>
              </div>

              {/* Ornamental Lotus / Shield Wax Seal */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFD93D] to-[#D4A84B] flex items-center justify-center text-[#3D2040] font-bold shadow-md border border-white/50 text-base">
                🪷
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Controls with Page Dots */}
      <div className="relative z-20 px-6 pb-6 flex flex-col items-center gap-2">
        <div className="flex items-center justify-center gap-5 w-full">
          <button
            onClick={handlePrev}
            className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${palette.paginationBg}`}
            title="Previous Page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md">
            <span className={`font-space text-xs font-bold ${palette.paginationActive}`}>
              {page.pageNumber}
            </span>
            <span className="text-gray-400 text-xs font-space">/</span>
            <span className="text-gray-400 text-xs font-space">
              {currentBook.pages.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className={`w-10 h-10 rounded-full shadow-sm flex items-center justify-center transition-all hover:scale-110 active:scale-90 ${palette.paginationBg}`}
            title="Next Page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Progress Dot Indicators */}
        <div className="flex items-center gap-1.5 mt-1 overflow-x-auto max-w-[240px] px-2 py-0.5">
          {currentBook.pages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                soundEngine.playPop();
                setPageIndex(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                pageIndex === idx ? `w-5 ${palette.dotColor}` : 'w-1.5 bg-gray-300/60 hover:bg-gray-400'
              }`}
              title={`Jump to Chapter ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
