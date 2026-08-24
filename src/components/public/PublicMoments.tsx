import { ParticleReveal3D } from '../shared/ParticleReveal3D';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { X, Heart, Sparkles, ZoomIn, Camera } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export interface PublicMoment {
  id: number;
  title: string;
  image: string;
  caption: string;
  tag: string;
  sticker: string;
  tapeColor: string;
  rotation: number;
}

const PUBLIC_MOMENTS_DATA: PublicMoment[] = [
  { id: 1, title: 'Radiant Sunshine 🌸', image: '/assets/serial/1s.jpg', caption: 'The smile that lights up millions of hearts across the world!', tag: 'Pure Joy', sticker: '🌸', tapeColor: 'bg-[#FFB3C6]/80', rotation: -2.5 },
  { id: 2, title: 'Cat Whisperer 🐱', image: '/assets/serial/2s.jpg', caption: 'Never passing by a stray kitten without stopping for headpats and love.', tag: 'Animal Lover', sticker: '🐱', tapeColor: 'bg-[#7CEBC6]/80', rotation: 3.2 },
  { id: 3, title: 'Sacred Devotion 🪷', image: '/assets/serial/3s.jpg', caption: 'Her grounded humility and deep spiritual reverence for Radha Rani.', tag: 'Bhakti Grace', sticker: '🪷', tapeColor: 'bg-[#FFD93D]/80', rotation: -1.8 },
  { id: 4, title: 'Creator Milestones 🚀', image: '/assets/serial/5s.jpg', caption: 'Reaching extraordinary heights through dedication, creativity, and grit.', tag: 'Milestone', sticker: '🚀', tapeColor: 'bg-[#6BC5F8]/80', rotation: 2.1 },
  { id: 5, title: 'Grace & Elegance ✨', image: '/assets/serial/6s.jpg', caption: 'Stepping out with royal grace, effortless style, and radiant charm.', tag: 'Elegance', sticker: '✨', tapeColor: 'bg-[#E0D4F0]/80', rotation: -3.0 },
  { id: 6, title: 'Warmest Energy ☕', image: '/assets/serial/7s.jpg', caption: 'Turning simple moments into unforgettable memories with her warm spirit.', tag: 'Warmth', sticker: '☕', tapeColor: 'bg-[#FFB3C6]/80', rotation: 1.7 },
  { id: 7, title: 'Kindness Queen 💖', image: '/assets/serial/8s.jpg', caption: 'Making everyone around her feel safe, valued, and genuinely appreciated.', tag: 'Kindness', sticker: '💖', tapeColor: 'bg-[#7CEBC6]/80', rotation: -2.4 },
  { id: 8, title: 'Peaceful Reflections 🌊', image: '/assets/serial/9s.jpg', caption: 'Quiet serenity by the waters — calm, composed, and true to herself.', tag: 'Serenity', sticker: '🌊', tapeColor: 'bg-[#6BC5F8]/80', rotation: 2.8 },
  { id: 9, title: 'Iconic Expressions 🎭', image: '/assets/serial/10s.jpg', caption: 'Those priceless candid expressions that make everybody smile with joy.', tag: 'Laughter', sticker: '🎭', tapeColor: 'bg-[#FFD93D]/80', rotation: -1.5 },
  { id: 10, title: 'Temple Prayers 🪔', image: '/assets/serial/11s.jpg', caption: 'A soul deeply connected to her roots, traditions, and divine light.', tag: 'Devotion', sticker: '🪔', tapeColor: 'bg-[#E0D4F0]/80', rotation: 2.6 },
  { id: 11, title: 'Pure Positivity 🌟', image: '/assets/serial/21s.jpg', caption: 'A constant beacon of hope, encouragement, and uplifting energy.', tag: 'Sunshine', sticker: '🌟', tapeColor: 'bg-[#FFB3C6]/80', rotation: -2.2 },
  { id: 12, title: 'Special Chapter Ahead 🎂', image: '/assets/serial/23s.jpg', caption: 'Embracing the future with the biggest heart and the sweetest dreams!', tag: 'Celebration', sticker: '🎂', tapeColor: 'bg-[#7CEBC6]/80', rotation: 1.9 }
];

interface PublicCardProps {
  item: PublicMoment;
  index: number;
  onSelect: (item: PublicMoment) => void;
}

const PublicPolaroidCard: React.FC<PublicCardProps> = ({ item, index, onSelect }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const floatDuration = 4.5 + (index % 4) * 0.8;
  const floatDelay = (index % 3) * 0.5;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9, y: 25 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      animate={{
        y: [0, -12, 0],
        rotate: [item.rotation - 1.5, item.rotation + 1.5, item.rotation - 1.5]
      }}
      transition={{
        y: { repeat: Infinity, duration: floatDuration, ease: 'easeInOut', delay: floatDelay },
        rotate: { repeat: Infinity, duration: floatDuration * 1.3, ease: 'easeInOut', delay: floatDelay }
      }}
      whileHover={{
        scale: 1.1,
        zIndex: 35,
        boxShadow: '0 20px 40px -10px rgba(255, 77, 141, 0.4)',
        transition: { type: 'spring', stiffness: 350, damping: 20 }
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        soundEngine.playSparkle(1.3);
        onSelect(item);
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className="cursor-pointer relative bg-white rounded-3xl p-3.5 pb-6 shadow-md hover:shadow-2xl border border-pink-100 transition-shadow duration-300 group select-none"
    >
      <div style={{ transform: 'translateZ(20px)' }} className="relative">
        {/* Washi Tape */}
        <div
          className={`absolute -top-6 left-1/2 -translate-x-1/2 w-14 h-5 ${item.tapeColor} rounded-sm shadow-sm opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all -rotate-2 z-20`}
        />

        {/* Polaroid Photo Frame - Face Perfectly Framed at Center 20% */}
        <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 mb-3 shadow-inner">
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover object-[center_20%] group-hover:scale-105 transition-transform duration-700 ease-out"
          />

          {/* Tag Badge */}
          <div className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-[10px] font-space text-white font-semibold shadow-sm">
            {item.tag}
          </div>

          {/* Sticker Emoji */}
          <div className="absolute bottom-2.5 left-2.5 text-2xl filter drop-shadow group-hover:scale-125 transition-transform">
            {item.sticker}
          </div>

          {/* Hover Zoom Icon */}
          <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="p-3 rounded-full bg-white/95 text-[#FF4D8D] shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
              <ZoomIn className="w-5 h-5" />
            </span>
          </div>
        </div>

        {/* Polaroid Handwritten Caption */}
        <div className="px-1 text-center">
          <h4 className="font-caveat text-xl sm:text-2xl font-bold text-gray-800 truncate">
            {item.title}
          </h4>
          <p className="text-[11px] font-quicksand text-gray-500 line-clamp-2 mt-0.5 leading-snug">
            {item.caption}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export const PublicMoments: React.FC = () => {
  const [selectedMoment, setSelectedMoment] = useState<PublicMoment | null>(null);
  const [likes, setLikes] = useState<{ [id: number]: number }>({});

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();
    setLikes((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="public-moments" className="relative w-full max-w-7xl mx-auto px-4 py-24 select-none">
                          <ParticleReveal3D direction="left" stardustColor="pink">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>CELEBRATING HER JOURNEY & SMILES 🌸</span>
        </div>
        <h2 className="text-3xl sm:text-6xl font-fredoka font-bold text-gray-800">
          Shree’s Radiant Moments
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
          A floating polaroid collection capturing the kindness, elegance, and infectious joy she shares with the world.
        </p>
      </div>
      </ParticleReveal3D>
            
      {/* Grid of Floating Polaroids */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 sm:gap-8 max-w-6xl mx-auto">
        {PUBLIC_MOMENTS_DATA.map((moment, idx) => (
          <PublicPolaroidCard
            key={moment.id}
            item={moment}
            index={idx}
            onSelect={setSelectedMoment}
          />
        ))}
      </div>

      {/* Full-Screen Zoom Modal */}
      <AnimatePresence>
        {selectedMoment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMoment(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.85, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border-4 border-pink-200 text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMoment(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-pink-100 text-gray-700 hover:text-[#FF4D8D] transition-all"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image - Centered on Face */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-pink-50 mb-4 shadow-inner">
                <img
                  src={selectedMoment.image}
                  alt={selectedMoment.title}
                  className="w-full h-full object-cover object-[center_20%]"
                />
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-space text-white font-bold">
                  {selectedMoment.tag}
                </span>
                <span className="absolute bottom-3 right-3 text-4xl filter drop-shadow">
                  {selectedMoment.sticker}
                </span>
              </div>

              {/* Caption */}
              <h3 className="font-caveat text-3xl font-bold text-gray-800">
                {selectedMoment.title}
              </h3>
              <p className="text-sm font-quicksand text-gray-600 mt-2 leading-relaxed">
                {selectedMoment.caption}
              </p>

              {/* Like Heart Button */}
              <div className="mt-5 pt-4 border-t border-pink-100 flex items-center justify-between">
                <span className="text-xs font-space text-pink-400 font-bold">
                  MARCH 6 • CELEBRATING SHREE
                </span>

                <button
                  onClick={(e) => handleLike(selectedMoment.id, e)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-[#FF4D8D] font-fredoka font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 fill-[#FF4D8D]" />
                  <span>{128 + (likes[selectedMoment.id] || 0)} Loves</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
