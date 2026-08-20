import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Compass, Sparkles, Orbit, Zap } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

interface OrbitalAstrolabeProps {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export const OrbitalAstrolabe: React.FC<OrbitalAstrolabeProps> = ({
  days,
  hours,
  minutes,
  seconds
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeRing, setActiveRing] = useState<string | null>(null);

  // 3D Gyro / Drag Motion Values with Damped Spring Physics
  const rawRotateX = useMotionValue(-15);
  const rawRotateY = useMotionValue(25);
  const smoothRotateX = useSpring(rawRotateX, { damping: 25, stiffness: 120 });
  const smoothRotateY = useSpring(rawRotateY, { damping: 25, stiffness: 120 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotY = ((x / rect.width) - 0.5) * 60;
    const rotX = -((y / rect.height) - 0.5) * 60;

    rawRotateY.set(rotY);
    rawRotateX.set(rotX);
  };

  const handlePointerLeave = () => {
    rawRotateX.set(-15);
    rawRotateY.set(25);
  };

  const handleRingClick = (ringName: string, soundIndex: number) => {
    soundEngine.playHarmonicPop(soundIndex);
    setActiveRing(ringName);

    confetti({
      particleCount: 35,
      spread: 75,
      origin: { x: 0.5, y: 0.65 },
      colors: ['#FFD93D', '#FF4D8D', '#7CEBC6', '#FFFFFF']
    });

    setTimeout(() => setActiveRing(null), 1500);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-8 select-none flex flex-col items-center">
      {/* Astrolabe Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-amber-300/30 text-[#FFD93D] text-xs font-space font-semibold tracking-widest uppercase mb-3 backdrop-blur-md shadow-sm">
        <Orbit className="w-3.5 h-3.5 animate-spin" />
        <span>3D CELESTIAL ASTROLABE // ORBITAL TIME VAULT 🪐</span>
      </div>

      <p className="text-xs font-quicksand text-pink-200/70 text-center max-w-md mb-6">
        Drag to rotate the 3D celestial sphere in 360° space. Tap any orbital ring to trigger a resonant harmonic chime!
      </p>

      {/* 3D Celestial Armillary Sphere Viewport */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ perspective: '1100px' }}
        className="relative w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center cursor-grab active:cursor-grabbing"
      >
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX: smoothRotateX,
            rotateY: smoothRotateY
          }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* ========================================================================= */}
          {/* RING 1: DAYS OUTER GOLDEN MERIDIAN (Rotates on 3D Incline) */}
          {/* ========================================================================= */}
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
            onClick={() => handleRingClick('DAYS', 0)}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-64 h-64 sm:w-84 sm:h-84 rounded-full border-2 border-[#FFD93D]/70 shadow-[0_0_25px_rgba(255,217,61,0.5)] flex items-center justify-center hover:border-white transition-colors cursor-pointer group"
          >
            {/* Celestial Days Marker */}
            <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-[#1A142E]/90 border border-[#FFD93D] text-[10px] font-space font-bold text-[#FFD93D] shadow-md flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>{days} DAYS ORBIT</span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RING 2: HOURS EQUINOCTIAL ROSE-GOLD ORBIT (Rotates on Y-Axis) */}
          {/* ========================================================================= */}
          <motion.div
            animate={{ rotateY: 360, rotateX: 65 }}
            transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
            onClick={() => handleRingClick('HOURS', 2)}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-52 h-52 sm:w-68 sm:h-68 rounded-full border-2 border-[#FF4D8D]/70 shadow-[0_0_20px_rgba(255,77,141,0.5)] flex items-center justify-center hover:border-white transition-colors cursor-pointer"
          >
            {/* Celestial Hours Marker */}
            <div className="absolute -top-2.5 px-2.5 py-0.5 rounded-full bg-[#1A142E]/90 border border-pink-400 text-[9px] font-space font-bold text-pink-300 shadow-md">
              <span>{hours} HOURS</span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* RING 3: MINUTES CELESTIAL ECLIPTIC BAND (Rotates on X-Axis) */}
          {/* ========================================================================= */}
          <motion.div
            animate={{ rotateX: 360, rotateZ: 45 }}
            transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
            onClick={() => handleRingClick('MINUTES', 4)}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border-2 border-[#7CEBC6]/70 shadow-[0_0_20px_rgba(124,235,198,0.5)] flex items-center justify-center hover:border-white transition-colors cursor-pointer"
          >
            {/* Celestial Minutes Marker */}
            <div className="absolute -bottom-2.5 px-2 py-0.5 rounded-full bg-[#1A142E]/90 border border-emerald-400 text-[9px] font-space font-bold text-emerald-300 shadow-md">
              <span>{minutes} MINS</span>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* CORE: SECONDS QUANTUM STARLIGHT NUCLEUS */}
          {/* ========================================================================= */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              boxShadow: [
                '0 0 30px rgba(255,217,61,0.6)',
                '0 0 60px rgba(255,77,141,0.8)',
                '0 0 30px rgba(255,217,61,0.6)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            onClick={() => handleRingClick('SECONDS', 5)}
            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#FFF] via-[#FFD93D] to-[#FF4D8D] flex flex-col items-center justify-center text-center cursor-pointer shadow-2xl z-20 border-2 border-white"
          >
            <span className="font-space font-bold text-xl sm:text-2xl text-[#1A0B1A] leading-none">
              {seconds}
            </span>
            <span className="text-[8px] font-space font-bold text-[#3D1400] uppercase tracking-wider">
              SECS LIVE
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Interactive Active Ring Status Banner */}
      {activeRing && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 px-4 py-1 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] text-[#1A0B1A] font-fredoka font-bold text-xs shadow-lg flex items-center gap-1.5"
        >
          <Zap className="w-3.5 h-3.5 fill-current" />
          <span>{activeRing} Orbital Harmonic Harmonic Pulse Synced! 🪐✨</span>
        </motion.div>
      )}
    </section>
  );
};
