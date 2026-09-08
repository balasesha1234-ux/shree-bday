import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Sparkles, Heart, Volume2, Film } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface ReelScene {
  id: number;
  image: string;
  badge: string;
  quote: string;
  subquote: string;
  tag: string;
  panDirection: 'zoom-in' | 'zoom-out' | 'pan-left' | 'pan-right';
}

const REEL_SCENES: ReelScene[] = [
  {
    id: 1,
    image: '/assets/serial/1s.jpg',
    badge: 'SCENE 01 // RADIANCE',
    quote: '"In a world of noise, she speaks gentle kindness."',
    subquote: 'A smile that lights up every room and makes the world a little lighter.',
    tag: 'Pure Joy 🌸',
    panDirection: 'zoom-in'
  },
  {
    id: 2,
    image: '/assets/serial/5s.jpg',
    badge: 'SCENE 02 // MELODIES',
    quote: '"Her voice doesn’t just carry music — it carries peace."',
    subquote: 'Singing from the soul, washing away the chaos with sacred kirtans.',
    tag: 'Soulful Bhakti 🎵',
    panDirection: 'pan-left'
  },
  {
    id: 3,
    image: '/assets/serial/2s.jpg',
    badge: 'SCENE 03 // COMPASSION',
    quote: '"A heart of pure gold that stops for every voiceless stray."',
    subquote: 'How you treat the smallest among us reveals the greatness of your spirit.',
    tag: 'Cat Whisperer 🐱',
    panDirection: 'zoom-out'
  },
  {
    id: 4,
    image: '/assets/serial/11s.jpg',
    badge: 'SCENE 04 // DEVOTION',
    quote: '"Walking humbly under the shelter of Radha-Krishna’s grace."',
    subquote: 'Rooted in timeless faith, humble in victory, and steadfast in prayer.',
    tag: 'Radhe Radhe 🪷',
    panDirection: 'pan-right'
  },
  {
    id: 5,
    image: '/assets/serial/6s.jpg',
    badge: 'SCENE 05 // RESILIENCE',
    quote: '"Same soul, bigger purpose. Dignity through every storm."',
    subquote: 'Standing tall, choosing grace over noise, and inspiring everyone around you.',
    tag: 'Sister’s Strength 👑',
    panDirection: 'zoom-in'
  },
  {
    id: 6,
    image: '/assets/serial/15s.jpg',
    badge: 'SCENE 06 // CELEBRATION',
    quote: '"Happy Birthday, Shree — Today, tomorrow, and always."',
    subquote: 'May this year bring limitless health, music, sweet laughter, and blessings.',
    tag: 'Chapter 22 🎂',
    panDirection: 'zoom-out'
  }
];

export const CinematicBirthdayReel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cheerCount, setCheerCount] = useState(1420);

  const scene = REEL_SCENES[currentIndex];

  // Auto-advance timer (6 seconds per slide)
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REEL_SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPlaying, currentIndex]);

  const handleNext = () => {
    soundEngine.playPop();
    setCurrentIndex((prev) => (prev + 1) % REEL_SCENES.length);
  };

  const handlePrev = () => {
    soundEngine.playPop();
    setCurrentIndex((prev) => (prev - 1 + REEL_SCENES.length) % REEL_SCENES.length);
  };

  const handleTogglePlay = () => {
    soundEngine.playPop();
    setIsPlaying(!isPlaying);
  };

  const handleCheer = () => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();
    setCheerCount((c) => c + 1);
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-16 select-none">
      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
          <span>CINEMATIC MEMORIES • LIVING PHOTO REEL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-[#3D2040]">
          Moments in Motion 🎬
        </h2>
        <p className="text-xs sm:text-sm font-quicksand text-gray-600 mt-2">
          An animated story reel crafted from her memories, quotes, and music.
        </p>
      </div>

      {/* Main 16:9 Cinema Reel Frame */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.4)] border-4 border-white/60 bg-[#0c0814] flex flex-col justify-between group">
        {/* Animated Background Photo with Ken Burns Motion */}
        <AnimatePresence mode="wait">
          <motion.div
            key={scene.id}
            initial={{ opacity: 0, scale: 1 }}
            animate={{
              opacity: 1,
              scale: scene.panDirection === 'zoom-in' ? 1.12 : scene.panDirection === 'zoom-out' ? 1 : 1.06,
              x: scene.panDirection === 'pan-left' ? [-15, 15] : scene.panDirection === 'pan-right' ? [15, -15] : 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6, ease: 'linear' }}
            className="absolute inset-0 z-0"
          >
            <img
              src={scene.image}
              alt={scene.quote}
              className="w-full h-full object-cover"
              style={{ objectPosition: 'center 25%' }}
            />
            {/* Cinematic Film Vignette & Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/40" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.7)_90%)]" />
          </motion.div>
        </AnimatePresence>

        {/* Floating Golden Stardust Light Particles */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,217,61,0.15),transparent_50%)]" />
        </div>

        {/* Top Controls & Story Progress Bar (Instagram / Cinema style) */}
        <div className="relative z-20 p-4 sm:p-6 flex flex-col gap-3">
          {/* Progress Segments */}
          <div className="flex items-center gap-1.5 w-full">
            {REEL_SCENES.map((s, idx) => (
              <div
                key={s.id}
                onClick={() => {
                  soundEngine.playPop();
                  setCurrentIndex(idx);
                }}
                className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden cursor-pointer backdrop-blur-sm"
              >
                <div
                  className={`h-full bg-[#FFD93D] transition-all duration-300 ${
                    idx < currentIndex ? 'w-full' : idx === currentIndex ? (isPlaying ? 'w-full animate-pulse' : 'w-1/2') : 'w-0'
                  }`}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="font-space text-[10px] sm:text-xs font-bold uppercase tracking-wider text-pink-200">
                {scene.badge}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-[10px] font-space font-bold text-[#FFD93D] border border-white/10">
                {scene.tag}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Captions & Playback Controls */}
        <div className="relative z-20 p-4 sm:p-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={scene.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="max-w-xl text-left"
            >
              <h3 className="font-script text-2xl sm:text-4xl lg:text-5xl text-white drop-shadow-md leading-tight">
                {scene.quote}
              </h3>
              <p className="font-quicksand text-xs sm:text-sm text-gray-300 mt-1 drop-shadow">
                {scene.subquote}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Player Buttons */}
          <div className="flex items-center gap-2.5 bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/15">
            <button
              onClick={handlePrev}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              title="Previous Scene"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] text-[#3D2040] flex items-center justify-center font-bold shadow-md transition-all hover:scale-105 active:scale-95"
              title={isPlaying ? 'Pause Reel' : 'Play Reel'}
            >
              {isPlaying ? <Pause className="w-4 h-4 fill-[#3D2040]" /> : <Play className="w-4 h-4 fill-[#3D2040] ml-0.5" />}
            </button>

            <button
              onClick={handleNext}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
              title="Next Scene"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-white/20 mx-0.5" />

            <button
              onClick={handleCheer}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FF4D8D] hover:bg-[#FF2D78] text-white text-xs font-fredoka font-bold transition-all hover:scale-105 active:scale-95"
              title="Send Love"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{cheerCount}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
