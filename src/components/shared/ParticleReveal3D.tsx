import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export type RevealDirection = 'left' | 'right' | 'depth' | 'top' | 'bottom';

interface ParticleReveal3DProps {
  children: React.ReactNode;
  direction?: RevealDirection;
  delay?: number;
  duration?: number;
  className?: string;
  stardust?: boolean;
  stardustColor?: 'gold' | 'pink' | 'celestial';
}

const STARDUST_PARTICLES = [
  { x: -25, y: -20, size: 10, delay: 0.08, char: '✦' },
  { x: 30, y: -22, size: 12, delay: 0.14, char: '✨' },
  { x: -30, y: 25, size: 8, delay: 0.2, char: '⭐' },
  { x: 35, y: 20, size: 11, delay: 0.24, char: '🌸' },
  { x: 0, y: -30, size: 9, delay: 0.05, char: '✦' },
  { x: -15, y: 35, size: 10, delay: 0.28, char: '💫' }
];

export const ParticleReveal3D: React.FC<ParticleReveal3DProps> = ({
  children,
  direction = 'depth',
  delay = 0,
  duration = 0.8,
  className = '',
  stardust = true,
  stardustColor = 'gold'
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getInitialVariants = () => {
    // Mobile-safe smooth elevation without horizontal screen clipping
    if (isMobile) {
      return {
        opacity: 0,
        x: 0,
        y: 24,
        scale: 0.96,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        filter: 'blur(4px)'
      };
    }

    switch (direction) {
      case 'left':
        return {
          opacity: 0,
          x: -60,
          y: 0,
          rotateY: -22,
          rotateZ: -1,
          scale: 0.9,
          filter: 'blur(8px)'
        };
      case 'right':
        return {
          opacity: 0,
          x: 60,
          y: 0,
          rotateY: 22,
          rotateZ: 1,
          scale: 0.9,
          filter: 'blur(8px)'
        };
      case 'top':
        return {
          opacity: 0,
          x: 0,
          y: -50,
          rotateX: -20,
          scale: 0.92,
          filter: 'blur(8px)'
        };
      case 'bottom':
        return {
          opacity: 0,
          x: 0,
          y: 50,
          rotateX: 20,
          scale: 0.92,
          filter: 'blur(8px)'
        };
      case 'depth':
      default:
        return {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.76,
          rotateX: 16,
          filter: 'blur(10px)'
        };
    }
  };

  const getTextColorClass = () => {
    if (stardustColor === 'pink') return 'text-[#FF4D8D]';
    if (stardustColor === 'celestial') return 'text-[#7CEBC6]';
    return 'text-[#FFD93D]';
  };

  return (
    <div
      style={{ perspective: isMobile ? 'none' : '1200px' }}
      className={`relative w-full max-w-full overflow-hidden transform-gpu ${className}`}
    >
      {/* Floating Stardust Assembly Particles on Entrance */}
      {stardust && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {STARDUST_PARTICLES.map((p, idx) => (
            <motion.span
              key={idx}
              initial={{
                opacity: 0,
                scale: 0,
                x: p.x * (isMobile ? 1 : 1.5),
                y: p.y * (isMobile ? 1 : 1.5)
              }}
              whileInView={{
                opacity: [0, 1, 0.9, 0],
                scale: [0, 1.4, 1, 0],
                x: [p.x * 1.5, p.x * 0.3, 0],
                y: [p.y * 1.5, p.y * 0.3, 0]
              }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{
                duration: duration * 1.2,
                delay: delay + p.delay,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: `${isMobile ? p.size * 0.85 : p.size}px`
              }}
              className={`select-none filter drop-shadow-[0_0_8px_currentColor] ${getTextColorClass()}`}
            >
              {p.char}
            </motion.span>
          ))}
        </div>
      )}

      {/* Main 3D Kinetic Content Assembly */}
      <motion.div
        initial={getInitialVariants()}
        whileInView={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          filter: 'blur(0px)'
        }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ transformStyle: isMobile ? 'flat' : 'preserve-3d' }}
        className="w-full max-w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
