import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Heart, Sparkles, Pin, ZoomIn } from 'lucide-react';
import { MEMORIES_DATA, PolaroidMemory } from '../../data/memories';
import { soundEngine } from '../../utils/soundEffects';

interface FloatingPolaroidCardProps {
  item: PolaroidMemory;
  index: number;
  onSelect: (item: PolaroidMemory) => void;
}

const FloatingPolaroidCard: React.FC<FloatingPolaroidCardProps> = ({ item, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D mouse parallax hover effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Randomized gentle floating duration & delay per card
  const floatDuration = 4 + (index % 5) * 0.7;
  const floatDelay = (index % 4) * 0.4;
  const yOffset = (index % 3) === 0 ? -10 : (index % 3) === 1 ? 12 : -4;
  const xOffset = (index % 2) === 0 ? 6 : -8;

  const tapeColors = [
    'bg-[#FFB3C6]/80',
    'bg-[#FFD93D]/80',
    'bg-[#6BC5F8]/80',
    'bg-[#E0D4F0]/80',
    'bg-[#7CEBC6]/80'
  ];
  const tapeColor = tapeColors[index % tapeColors.length];

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.85, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      animate={{
        y: [yOffset, yOffset - 12, yOffset + 4, yOffset],
        x: [xOffset, xOffset + 6, xOffset - 6, xOffset],
        rotate: [item.rotation - 1.5, item.rotation + 2, item.rotation - 1, item.rotation - 1.5]
      }}
      transition={{
        y: { repeat: Infinity, duration: floatDuration, ease: 'easeInOut', delay: floatDelay },
        x: { repeat: Infinity, duration: floatDuration * 1.2, ease: 'easeInOut', delay: floatDelay },
        rotate: { repeat: Infinity, duration: floatDuration * 1.5, ease: 'easeInOut', delay: floatDelay }
      }}
      whileHover={{
        scale: 1.12,
        zIndex: 40,
        transition: { type: 'spring', stiffness: 400, damping: 25 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundEngine.playSparkle(1.2);
        onSelect(item);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="cursor-pointer relative bg-white rounded-2xl p-3.5 pb-6 shadow-md hover:shadow-2xl border border-pink-100/80 transition-shadow duration-300 group select-none"
    >
      {/* 3D Depth Elevation Wrapper */}
      <div style={{ transform: 'translateZ(25px)' }} className="relative">
        {/* Washi Tape / Pin with realistic tilt */}
        <div
          className={`absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-5 ${tapeColor} rounded-sm shadow-sm opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all -rotate-2 z-20`}
        />

        {/* Polaroid Photo Frame */}
        <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-gray-100 mb-3 shadow-inner">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          />

          {/* Tag & Sticker Badges */}
          <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/45 backdrop-blur-md text-[10px] font-space text-white font-semibold">
            {item.tag}
          </div>

          <div className="absolute bottom-2 left-2 text-xl filter drop-shadow group-hover:scale-125 transition-transform">
            {item.sticker === 'cat'
              ? '🐱'
              : item.sticker === 'lotus'
              ? '🪷'
              : item.sticker === 'heart'
              ? '💗'
              : item.sticker === 'star'
              ? '⭐'
              : '✨'}
          </div>

          {/* Quick Hover Zoom Icon */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="p-2.5 rounded-full bg-white/90 text-[#FF4D8D] shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
              <ZoomIn className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Handwritten Label */}
        <div className="px-1 text-center">
          <span className="text-[10px] font-space text-pink-400 uppercase tracking-widest block font-bold">
            {item.date}
          </span>
          <h4 className="font-fredoka font-bold text-gray-800 text-base mt-0.5 group-hover:text-[#FF4D8D] transition-colors">
            {item.title}
          </h4>
          <p className="font-caveat text-xl text-gray-600 mt-1 leading-tight line-clamp-2">
            "{item.caption}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const MemoryLane: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PolaroidMemory | null>(null);

  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-24 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-pink-100/40 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTER 02 // 15 FLOATING POLAROIDS</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl font-fredoka font-bold text-gray-800 tracking-tight">
          Our Memory Lane 📸
        </h2>
        <p className="text-base sm:text-lg font-quicksand text-gray-600 mt-3 max-w-xl mx-auto">
          Scattered like sweet thoughts across the sky. Hover to bring them closer, and tap any photo to relive the full memory.
        </p>
      </div>

      {/* Scattered Organic Floating Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 relative z-10 px-2 sm:px-6">
        {MEMORIES_DATA.map((item, idx) => (
          <FloatingPolaroidCard
            key={item.id}
            item={item}
            index={idx}
            onSelect={(photo) => setSelectedPhoto(photo)}
          />
        ))}
      </div>

      {/* High-Res Modal Zoom */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-lg w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-200 text-center"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-all hover:scale-110 active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 shadow-md bg-gray-50">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-space text-white font-semibold">
                  {selectedPhoto.tag}
                </div>
              </div>

              <span className="text-xs font-space text-pink-500 uppercase tracking-widest font-bold">
                {selectedPhoto.date}
              </span>
              <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-gray-800 mt-1">
                {selectedPhoto.title}
              </h3>
              <p className="font-caveat text-2xl sm:text-3xl text-gray-700 mt-3 leading-relaxed">
                "{selectedPhoto.caption}"
              </p>

              <div className="mt-6 pt-4 border-t border-pink-100 flex items-center justify-center gap-2 text-sm text-[#FF4D8D] font-fredoka font-semibold">
                <Heart className="w-4 h-4 fill-current" />
                <span>Captured Forever in My Heart</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
