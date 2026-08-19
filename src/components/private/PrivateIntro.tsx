import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Shield, ChevronDown, Lock } from 'lucide-react';

interface PrivateIntroProps {
  onStartScroll: () => void;
}

interface PrivateBgPolaroidProps {
  image: string;
  rotation: number;
  className: string;
  mouseXSpring: any;
  mouseYSpring: any;
  parallaxFactor: number;
  caption: string;
  floatDelay?: number;
}

const PrivateBgPolaroid: React.FC<PrivateBgPolaroidProps> = ({
  image,
  rotation,
  className,
  mouseXSpring,
  mouseYSpring,
  parallaxFactor,
  caption,
  floatDelay = 0
}) => {
  const x = useTransform(mouseXSpring, [-0.5, 0.5], [`${-60 * parallaxFactor}px`, `${60 * parallaxFactor}px`]);
  const y = useTransform(mouseYSpring, [-0.5, 0.5], [`${-45 * parallaxFactor}px`, `${45 * parallaxFactor}px`]);

  return (
    <motion.div
      style={{ x, y }}
      className={`absolute ${className} pointer-events-auto cursor-pointer z-10 select-none`}
    >
      <motion.div
        animate={{
          y: [0, -16, 0],
          rotate: [rotation - 2, rotation + 2, rotation - 2]
        }}
        transition={{
          duration: 6 + floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: floatDelay
        }}
        whileHover={{
          scale: 1.16,
          rotate: 0,
          zIndex: 40,
          boxShadow: '0 25px 50px -12px rgba(212, 168, 75, 0.45)',
          transition: { type: 'spring', stiffness: 300, damping: 18 }
        }}
        className="p-2.5 pb-4 bg-white/95 hover:bg-white rounded-2xl shadow-xl border-2 border-[#D4A84B]/40 backdrop-blur-md transition-shadow duration-300 group"
      >
        <div className="w-24 sm:w-32 md:w-36 aspect-square rounded-xl overflow-hidden bg-amber-50 shadow-inner">
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

export const PrivateIntro: React.FC<PrivateIntroProps> = ({ onStartScroll }) => {
  const containerRef = useRef<HTMLElement>(null);

  // Smooth mouse parallax physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseXSpring = useSpring(mouseX, { stiffness: 75, damping: 24, mass: 0.7 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 75, damping: 24, mass: 0.7 });

  const textRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const textRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg']);

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
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden select-none"
    >
      {/* Floating Background Polaroids */}
      <PrivateBgPolaroid
        image="/assets/serial/4s.jpg"
        rotation={-6}
        className="top-12 left-4 sm:left-14 opacity-85 sm:opacity-95 hidden sm:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={1.3}
        caption="Sibling Banter 😂"
        floatDelay={0}
      />

      <PrivateBgPolaroid
        image="/assets/serial/6s.jpg"
        rotation={7}
        className="top-14 right-4 sm:right-16 opacity-85 sm:opacity-95 hidden sm:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={-1.2}
        caption="Delhi Royalty ✨"
        floatDelay={0.7}
      />

      <PrivateBgPolaroid
        image="/assets/serial/8s.jpg"
        rotation={-5}
        className="bottom-12 left-6 sm:left-20 opacity-80 sm:opacity-95 hidden md:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={1.1}
        caption="Kindness Queen 💖"
        floatDelay={1.2}
      />

      <PrivateBgPolaroid
        image="/assets/serial/12s.jpg"
        rotation={8}
        className="bottom-14 right-6 sm:right-24 opacity-80 sm:opacity-95 hidden md:block"
        mouseXSpring={mouseXSpring}
        mouseYSpring={mouseYSpring}
        parallaxFactor={-1.4}
        caption="Proud Moments 🍦"
        floatDelay={0.5}
      />

      {/* Main Sanctuary Title */}
      <motion.div
        style={{
          rotateX: textRotateX,
          rotateY: textRotateY,
          transformStyle: 'preserve-3d'
        }}
        className="relative z-20 max-w-3xl mx-auto space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#D4A84B] font-fredoka text-xs font-bold shadow-sm border border-[#D4A84B]/40"
        >
          <Lock className="w-3.5 h-3.5 text-[#D4A84B]" />
          <span>CONFIDENTIAL SIBLING SANCTUARY 🌸</span>
        </motion.div>

        {/* Real Age 22 Proudly Revealed in Private Sanctuary */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-7xl font-playfair font-bold text-[#3D2040] leading-tight"
        >
          Happy 22nd Birthday, <br />
          <span className="text-gradient-pink font-fredoka">My Dearest Sister Shree!</span> 🎂✨
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-base sm:text-xl font-quicksand text-gray-700 max-w-xl mx-auto leading-relaxed"
        >
          Beyond the fans and public wishes, here is a personal space crafted by your brother in Hyderabad 
          to celebrate your journey, your laughter, and the pure lifelong bond we share.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-6"
        >
          <button
            onClick={onStartScroll}
            className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-base shadow-pop hover:scale-105 active:scale-95 transition-all mx-auto"
          >
            <span>Explore Your Brother’s Sanctuary 🌸</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};
