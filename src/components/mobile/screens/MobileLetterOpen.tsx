import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LETTER_PAGES } from '../../../data/mobileExperienceData';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileLetterOpenProps {
  onBack: () => void;
}

export const MobileLetterOpen: React.FC<MobileLetterOpenProps> = ({ onBack }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const page = LETTER_PAGES[pageIndex];

  const handleNext = () => {
    soundEngine.playPop();
    setPageIndex((prev) => (prev + 1) % LETTER_PAGES.length);
  };

  const handlePrev = () => {
    soundEngine.playPop();
    setPageIndex((prev) => (prev - 1 + LETTER_PAGES.length) % LETTER_PAGES.length);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#FFF5F7] text-[#3D2040] flex flex-col justify-between overflow-hidden select-none">
      <div>
        <MobileTopBar light={false} />

        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#FF4D8D] uppercase">
            A LETTER TO SHREE
          </span>
          <div className="w-9" />
        </div>
      </div>

      {/* Realistic Lined Parchment Letter matching Screen 12 */}
      <div className="relative z-10 px-6 my-auto flex-1 flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={page.pageNumber}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="relative bg-[#FFFDF8] border-2 border-pink-100 rounded-3xl p-6 sm:p-7 shadow-xl flex flex-col justify-between min-h-[420px]"
          >
            {/* Dried flower decoration in top corner */}
            <div className="absolute top-3 right-3 text-xl opacity-70">🌸</div>

            <div>
              <p className="font-script text-3xl sm:text-4xl text-[#FF4D8D] mb-4">
                {page.salutation}
              </p>

              <p className="font-caveat text-xl sm:text-2xl text-gray-700 leading-relaxed">
                {page.body}
              </p>
            </div>

            <div className="pt-4 border-t border-pink-100/70 flex items-center justify-between">
              <div>
                <p className="font-caveat text-lg font-bold text-[#FF2D78]">
                  {page.closing}
                </p>
                <p className="font-space text-[10px] text-gray-400 mt-0.5">
                  {page.date}
                </p>
              </div>

              <div className="text-2xl opacity-80">🪷</div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Controls matching Screen 12: < 1/12 > */}
      <div className="relative z-10 px-8 pb-8 flex items-center justify-center gap-4">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-white shadow-sm border border-pink-100 flex items-center justify-center text-gray-700 hover:bg-pink-50 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="font-space text-xs font-bold text-gray-500">
          {page.pageNumber} / {LETTER_PAGES.length}
        </span>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-white shadow-sm border border-pink-100 flex items-center justify-center text-gray-700 hover:bg-pink-50 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
