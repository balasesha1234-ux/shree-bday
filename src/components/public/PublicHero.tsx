import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Sparkles, MessageCircleHeart, PartyPopper } from 'lucide-react';
import { triggerCustomConfetti } from '../shared/Confetti';
import { soundEngine } from '../../utils/soundEffects';

interface PublicHeroProps {
  onWishClick: () => void;
}

// Background Floating Mini-Polaroid for Hero
interface HeroBgPolaroidProps {
  image: string;
  rotation: number;
  className: string;
  mouseXSpring: any;
  mouseYSpring: any;
  parallaxFactor: number;
  caption: string;
}

const HeroBgPolaroid: React.FC<HeroBgPolaroidProps> = ({
  image,
  rotation,
  className,
  mouseXSpring,
  mouseYSpring,
  parallaxFactor,
  caption
}) => {
  const x = useTransform(mouseXSpring, [-0.5, 0.5], [`${-40 * parallaxFactor}px`, `${40 * parallaxFactor}px`]);
  const y = useTransform(mouseYSpring, [-0.5, 0.5], [`${-30 * parallaxFactor}px`, `${30 * parallaxFactor}px`]);

  return (
    <motion.div
      style={{ x, y, rotate: rotation }}
      whileHover={{
        scale: 1.15,
        rotate: 0,
        opacity: 1,
        zIndex: 30,
        transition: { type: 'spring', stiffness: 350, damping: 20 }
      }}
      className={`absolute ${className} pointer-events-auto cursor-pointer p-2.5 pb-4 bg-white/80 hover:bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-pink-200/80 backdrop-blur-md transition-all duration-300 select-none group`}
    >
      <div className="w-24 sm:w-28 md:w-32 aspect-square rounded-xl overflow-hidden bg-pink-50">
        <img
          src={image}
          alt="Shree"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          style={{ objectPosition: '50% 18%' }}
        />
      </div>
      <div className="mt-2 text-center">
        <span className="font-caveat text-sm font-bold text-gray-700 block truncate">
          {caption}
        </span>
      </div>
    </motion.div>
  );
};

export const PublicHero: React.FC<PublicHeroProps> = ({ onWishClick }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Mouse Parallax Physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 200, damping: 25 });

  // 3D Headline Tilt based on cursor
  const textRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg']);
  const textRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);
  const textTranslateX = useTransform(mouseXSpring, [-0.5, 0.5], ['-18px', '18px']);
  const textTranslateY = useTransform(mouseYSpring, [-0.5, 0.5], ['-14px', '14px']);

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

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-20 overflow-hidden perspective-1000"
    >
      {/* Soft Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-200/40 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-100/50 rounded-full blur-[140px] pointer-events-none" />

      {/* ========================================================================= */}
      {/* BACKGROUND FLOATING REAL POLAROIDS OF SHREE (With Inverse Parallax Drift) */}
      {/* ========================================================================= */}
      <HeroBgPolaroid
        image="/assets/serial/1s.jpg"
        rotation={-8}
        className="top-12 left-4 sm:left-12 opacity-70 sm:opacity-85"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={1.2}
        caption="Pure Sunshine ✨"
      />

      <HeroBgPolaroid
        image="/assets/serial/3s.jpg"
        rotation={6}
        className="top-16 right-4 sm:right-16 opacity-70 sm:opacity-85"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={-1.1}
        caption="Devotional Grace 🪷"
      />

      <HeroBgPolaroid
        image="/assets/serial/5s.jpg"
        rotation={-5}
        className="bottom-14 left-6 sm:left-24 opacity-65 sm:opacity-80 hidden sm:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={0.9}
        caption="Golden Hour 🌅"
      />

      <HeroBgPolaroid
        image="/assets/serial/2s.jpg"
        rotation={8}
        className="bottom-16 right-6 sm:right-28 opacity-65 sm:opacity-80 hidden sm:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={-1.3}
        caption="Cat Lover 🐱"
      />

      {/* ========================================================================= */}
      {/* INTERACTIVE CURSOR-RESPONSIVE 3D HERO CONTENT */}
      {/* ========================================================================= */}
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
        {/* Floating Top Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          style={{ transform: 'translateZ(40px)' }}
          className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-pop border border-pink-200 text-[#FF4D8D] font-fredoka font-semibold text-xs sm:text-sm mb-6"
        >
          <Sparkles className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" />
          <span>MARCH 6 // CELEBRATING 22 YEARS OF SHREE 🎂</span>
        </motion.div>

        {/* Dynamic 3D Cursor Responsive Title */}
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

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{ transform: 'translateZ(30px)' }}
          className="mt-6 text-base sm:text-xl font-quicksand font-semibold text-gray-700 max-w-2xl leading-relaxed"
        >
          Celebrating the sweetest soul, cat whisperer, devotional grace, and the kindest creator on the internet. 
          Move your cursor around and leave a birthday wish! ✨
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ transform: 'translateZ(45px)' }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 pointer-events-auto"
        >
          <button
            onClick={() => {
              soundEngine.playSparkle(1.3);
              triggerCustomConfetti();
              onWishClick();
            }}
            className="flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-semibold text-base shadow-pop hover:scale-105 active:scale-95 transition-all"
          >
            <MessageCircleHeart className="w-5 h-5 fill-white/20" />
            <span>Write a Birthday Wish 💌</span>
          </button>

          <button
            onClick={(e) => {
              soundEngine.playSparkle(1.5);
              triggerCustomConfetti(e.clientX, e.clientY);
            }}
            className="flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/95 hover:bg-pink-50 border border-pink-200 text-[#FF4D8D] font-fredoka font-semibold text-base shadow-sm hover:scale-105 active:scale-95 transition-all"
          >
            <PartyPopper className="w-4 h-4" />
            <span>Shower Confetti 🎉</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
