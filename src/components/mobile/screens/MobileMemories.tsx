import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { WashiTape } from '../shared/WashiTape';
import { ChevronLeft, X, Heart, Sparkles } from 'lucide-react';
import { MOBILE_GALLERY, GalleryPhoto } from '../../../data/mobileExperienceData';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileMemoriesProps {
  onBack: () => void;
}

export const MobileMemories: React.FC<MobileMemoriesProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Candid' | 'Performances' | 'Special'>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [galleryItems, setGalleryItems] = useState(MOBILE_GALLERY);
  const [floatingReaction, setFloatingReaction] = useState<{ id: number; emoji: string; x: number; y: number } | null>(null);

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((p) => p.category === activeCategory);

  const handleReact = (id: number, type: 'hearts' | 'stars' | 'flowers', emoji: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle(1.3);

    const rect = e.currentTarget.getBoundingClientRect();
    setFloatingReaction({
      id: Date.now(),
      emoji,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
    setTimeout(() => setFloatingReaction(null), 1200);

    setGalleryItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, reactions: { ...item.reactions, [type]: item.reactions[type] + 1 } }
          : item
      )
    );
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#FFF2F4] text-[#3D2040] flex flex-col justify-between overflow-hidden select-none">
      <div>
        <MobileTopBar light={false} />

        {/* Header */}
        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm hover:bg-pink-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="font-script text-3xl text-[#FF4D8D]">
            Memories ♡
          </h2>
          <div className="w-9" />
        </div>

        {/* Filter Tabs */}
        <div className="relative z-10 px-6 pt-3 flex items-center justify-center gap-1.5">
          {(['All', 'Candid', 'Performances', 'Special'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveCategory(tab)}
              className={`px-3 py-1 rounded-full text-[11px] font-fredoka font-semibold transition-all ${
                activeCategory === tab
                  ? 'bg-[#FF4D8D] text-white shadow-sm scale-105'
                  : 'bg-white text-gray-600 hover:bg-pink-100/70 border border-pink-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry / Grid of Photos with Washi Tape & Reaction Buttons */}
      <div className="relative z-10 px-5 py-4 flex-1 overflow-y-auto no-scrollbar">
        <div className="grid grid-cols-2 gap-3 pb-8">
          {filtered.map((item) => (
            <motion.div
              key={item.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedPhoto(item)}
              style={{ transform: `rotate(${item.rotation}deg)` }}
              className="relative bg-white p-2 pb-3 rounded-2xl shadow-md border border-pink-100 cursor-pointer group hover:shadow-xl transition-all"
            >
              <WashiTape
                color={item.tapeColor}
                rotation={item.rotation > 0 ? -3 : 3}
                className="absolute -top-2 left-1/2 -translate-x-1/2"
              />

              <div className="w-full aspect-square rounded-xl overflow-hidden bg-pink-50 relative">
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="mt-2 text-center">
                <p className="font-caveat text-xs text-gray-700 leading-tight">
                  {item.caption}
                </p>
              </div>

              {/* Fan Reaction Buttons on each Card */}
              <div className="mt-2 pt-2 border-t border-pink-50 flex items-center justify-around text-[10px] font-space font-bold text-gray-500">
                <button
                  onClick={(e) => handleReact(item.id, 'hearts', '💖', e)}
                  className="hover:scale-125 active:scale-90 transition-transform flex items-center gap-0.5"
                >
                  <span>💖</span>
                  <span>{item.reactions.hearts}</span>
                </button>
                <button
                  onClick={(e) => handleReact(item.id, 'flowers', '🌸', e)}
                  className="hover:scale-125 active:scale-90 transition-transform flex items-center gap-0.5"
                >
                  <span>🌸</span>
                  <span>{item.reactions.flowers}</span>
                </button>
                <button
                  onClick={(e) => handleReact(item.id, 'stars', '✨', e)}
                  className="hover:scale-125 active:scale-90 transition-transform flex items-center gap-0.5"
                >
                  <span>✨</span>
                  <span>{item.reactions.stars}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Reaction Animation */}
      {floatingReaction && (
        <motion.div
          key={floatingReaction.id}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -70, scale: 1.6 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          style={{ position: 'fixed', left: floatingReaction.x - 12, top: floatingReaction.y - 12 }}
          className="text-2xl z-50 pointer-events-none"
        >
          {floatingReaction.emoji}
        </motion.div>
      )}

      {/* Photo Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xs w-full bg-white p-4 pb-6 rounded-2xl shadow-2xl border-2 border-pink-200"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
              <img src={selectedPhoto.image} alt={selectedPhoto.caption} className="w-full aspect-[4/3] object-cover rounded-xl mt-4" />
              <p className="font-caveat text-lg text-center text-[#FF4D8D] font-bold mt-3">
                "{selectedPhoto.caption}"
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
