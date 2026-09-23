import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Sparkles, MessageCircleHeart, PartyPopper, Play, X } from 'lucide-react';
import { triggerCustomConfetti } from '../shared/Confetti';
import { GlitchAge } from '../shared/GlitchAge';
import { soundEngine } from '../../utils/soundEffects';

interface PublicHeroProps {
  onWishClick: () => void;
}

interface HeroBgPolaroidProps {
  image: string;
  rotation: number;
  className: string;
  mouseXSpring: any;
  mouseYSpring: any;
  parallaxFactor: number;
  caption: string;
  floatDelay?: number;
}

const HeroBgPolaroid: React.FC<HeroBgPolaroidProps> = ({
  image,
  rotation,
  className,
  mouseXSpring,
  mouseYSpring,
  parallaxFactor,
  caption,
  floatDelay = 0
}) => {
  const x = useTransform(mouseXSpring, [-0.5, 0.5], [`${-55 * parallaxFactor}px`, `${55 * parallaxFactor}px`]);
  const y = useTransform(mouseYSpring, [-0.5, 0.5], [`${-40 * parallaxFactor}px`, `${40 * parallaxFactor}px`]);

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute ${className} pointer-events-auto cursor-pointer z-10 select-none`}
    >
      <motion.div
        animate={{
          y: [0, -14, 0],
          rotate: [rotation - 2, rotation + 2, rotation - 2]
        }}
        transition={{
          duration: 5.5 + floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay
        }}
        whileHover={{
          scale: 1.18,
          rotate: 0,
          zIndex: 40,
          boxShadow: '0 25px 50px -12px rgba(255, 77, 141, 0.45)',
          transition: { type: 'spring', stiffness: 300, damping: 18 }
        }}
        className="p-2.5 pb-4 bg-white/90 hover:bg-white rounded-2xl shadow-xl border-2 border-pink-200/80 backdrop-blur-md transition-shadow duration-300 group"
      >
        <div className="w-24 sm:w-28 md:w-36 aspect-square rounded-xl overflow-hidden bg-pink-50 shadow-inner">
          <img
            src={image}
            alt="Shree"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            style={{ objectPosition: 'center 20%' }}
          />
        </div>
        <div className="mt-2 text-center">
          <span className="font-caveat text-sm font-bold text-gray-800 block truncate">
            {caption}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const PublicHero: React.FC<PublicHeroProps> = ({ onWishClick }) => {
  const containerRef = useRef<HTMLElement>(null);
  const [isCinemaOpen, setIsCinemaOpen] = useState(false);

  // High-inertia fluid spring physics for buttery smooth motion
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 75, damping: 24, mass: 0.7 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 75, damping: 24, mass: 0.7 });

  const textRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const textRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);
  const textTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-15px', '15px']);
  const textTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ['-12px', '12px']);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCelebrationClick = () => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();
  };

  const handleOpenCinema = () => {
    soundEngine.playSparkle(1.8);
    soundEngine.playTempleBell();
    setIsCinemaOpen(true);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-20 overflow-hidden perspective-1000"
    >
      {/* Soft Ambient Warm Light & Sacred Vignette */}
      <div className="absolute inset-0 hero-ambient-vignette pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,217,61,0.12),transparent_70%)] pointer-events-none" />

      {/* Dynamic Cursor-Parallax Floating Polaroids */}
      <HeroBgPolaroid
        image="/assets/serial/1s.jpg"
        rotation={-6}
        className="top-12 left-4 sm:left-14 opacity-80 sm:opacity-95"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={1.3}
        caption="Pure Sunshine 🌸"
        floatDelay={0}
      />

      <HeroBgPolaroid
        image="/assets/serial/3s.jpg"
        rotation={7}
        className="top-14 right-4 sm:right-16 opacity-80 sm:opacity-95"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={-1.2}
        caption="Devotional Grace 🪷"
        floatDelay={0.8}
      />

      <HeroBgPolaroid
        image="/assets/serial/5s.jpg"
        rotation={-5}
        className="bottom-12 left-6 sm:left-20 opacity-75 sm:opacity-90 hidden sm:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={0.95}
        caption="Golden Hour 🌅"
        floatDelay={1.4}
      />

      <HeroBgPolaroid
        image="/assets/serial/2s.jpg"
        rotation={8}
        className="bottom-14 right-6 sm:right-24 opacity-75 sm:opacity-90 hidden sm:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={-1.35}
        caption="Cat Whisperer 🐱"
        floatDelay={0.4}
      />

      {/* 3D Headline Content */}
      <motion.div
        style={{
          rotateX: textRotateX,
          rotateY: textRotateY,
          x: textTranslateX,
          y: textTranslateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative z-20 max-w-4xl mx-auto flex flex-col items-center pointer-events-none"
      >
        {/* Official Signature Calligraphy Header (shreenavalkishori.com brand alignment) */}
        <motion.div
          initial={{ y: -15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          style={{ transform: 'translateZ(50px)' }}
          className="pointer-events-auto mb-3 flex items-center justify-center group cursor-pointer"
          onClick={handleCelebrationClick}
          title="Shree Naval Kishori"
        >
          <img
            src="/assets/images/shree_signature_logo.png"
            alt="Shree Naval Kishori Signature"
            className="h-12 sm:h-16 md:h-20 w-auto object-contain drop-shadow-[0_4px_12px_rgba(255,77,141,0.25)] group-hover:scale-105 transition-transform duration-300"
          />
        </motion.div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14 }}
          style={{ transform: 'translateZ(40px)' }}
          className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-pop border border-pink-200 text-[#FF4D8D] font-fredoka font-semibold text-xs sm:text-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
          <span>MARCH 6 // CELEBRATING <GlitchAge suffix=" CHAPTER" className="mx-1 text-xs sm:text-sm" /> OF SHREE 🎂</span>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          style={{ transform: 'translateZ(60px)' }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-fredoka font-bold tracking-tight text-gradient-pink drop-shadow-[0_8px_30px_rgba(255,77,141,0.25)] leading-[1.05]"
        >
          Happy Birthday <br />
          <span className="relative inline-block">
            Shree! 🌸
            <span className="absolute -top-6 -right-8 text-4xl sm:text-6xl animate-bounce">
              🐱
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ transform: 'translateZ(30px)' }}
          className="mt-6 text-base sm:text-xl font-quicksand text-gray-700 max-w-2xl px-4 leading-relaxed"
        >
          Welcome to the worldwide birthday celebration of our favorite creator, 
          kindest soul, and cat whisperer! Light a diya, make your wish, and celebrate together! 🪷✨
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ transform: 'translateZ(50px)' }}
          className="pointer-events-auto mt-8 flex flex-col sm:flex-row items-center gap-4 flex-wrap justify-center"
        >
          {/* Watch Film Button */}
          <button
            onClick={handleOpenCinema}
            className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FF80AC] to-[#FF4D8D] text-[#3D2040] font-fredoka font-bold text-base shadow-pop hover:scale-105 active:scale-95 transition-all group"
          >
            <div className="w-6 h-6 rounded-full bg-[#3D2040] text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>
            <span>Watch Birthday Film 🎬</span>
          </button>

          <button
            onClick={onWishClick}
            className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-base shadow-pop hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircleHeart className="w-5 h-5" />
            <span>Post Your Birthday Wish 💌</span>
          </button>

          <button
            onClick={handleCelebrationClick}
            className="flex items-center gap-2 px-6 py-4 rounded-full bg-white/90 hover:bg-white text-gray-700 hover:text-[#FF4D8D] font-fredoka font-semibold text-base shadow-md border border-pink-200 hover:scale-105 active:scale-95 transition-all"
          >
            <PartyPopper className="w-5 h-5 text-[#FFD93D]" />
            <span>Throw Confetti! 🎉</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Fullscreen Birthday Cinema Theater Modal */}
      <AnimatePresence>
        {isCinemaOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-8"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-4xl bg-[#181124] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(255,77,141,0.3)] border-2 border-pink-400/40 flex flex-col"
            >
              {/* Modal Header */}
              <div className="px-6 py-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                  <span className="font-space text-xs uppercase tracking-widest text-[#FFD93D] font-bold">
                    SHREE BIRTHDAY MONTAGE • OFFICIAL PREMIERE
                  </span>
                </div>
                <button
                  onClick={() => setIsCinemaOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                  title="Close Theater"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Video Player Box */}
              <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                <video
                  autoPlay
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                  src="/assets/intro/montage.mp4"
                />
              </div>

              {/* Modal Footer with cheering & cheer button */}
              <div className="px-6 py-4 bg-white/5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h4 className="font-fredoka text-white text-sm font-bold">
                    A Brighter, Kinder Tomorrow ♡
                  </h4>
                  <p className="font-quicksand text-xs text-gray-400">
                    Celebrating music, devotion, and kindness.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundEngine.playSparkle(1.5);
                      triggerCustomConfetti();
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white text-xs font-fredoka font-bold shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Send Love & Confetti 🌸</span>
                  </button>

                  <button
                    onClick={() => setIsCinemaOpen(false)}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-200 text-xs font-fredoka transition-all"
                  >
                    Back to Celebration
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
