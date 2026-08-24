import React from 'react';
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
  { x: -45, y: -30, size: 10, delay: 0.08, char: '✦' },
  { x: 50, y: -35, size: 14, delay: 0.14, char: '✨' },
  { x: -55, y: 40, size: 8, delay: 0.2, char: '⭐' },
  { x: 60, y: 35, size: 12, delay: 0.24, char: '🌸' },
  { x: 0, y: -50, size: 9, delay: 0.05, char: '✦' },
  { x: -25, y: 55, size: 11, delay: 0.28, char: '💫' }
];

export const ParticleReveal3D: React.FC<ParticleReveal3DProps> = ({
  children,
  direction = 'depth',
  delay = 0,
  duration = 0.85,
  className = '',
  stardust = true,
  stardustColor = 'gold'
}) => {
  const getInitialVariants = () => {
    switch (direction) {
      case 'left':
        return {
          opacity: 0,
          x: -80,
          y: 0,
          rotateY: -28,
          rotateZ: -2,
          scale: 0.86,
          filter: 'blur(10px)'
        };
      case 'right':
        return {
          opacity: 0,
          x: 80,
          y: 0,
          rotateY: 28,
          rotateZ: 2,
          scale: 0.86,
          filter: 'blur(10px)'
        };
      case 'top':
        return {
          opacity: 0,
          x: 0,
          y: -70,
          rotateX: -26,
          scale: 0.88,
          filter: 'blur(10px)'
        };
      case 'bottom':
        return {
          opacity: 0,
          x: 0,
          y: 70,
          rotateX: 26,
          scale: 0.88,
          filter: 'blur(10px)'
        };
      case 'depth':
      default:
        return {
          opacity: 0,
          x: 0,
          y: 0,
          scale: 0.68,
          rotateX: 20,
          filter: 'blur(14px)'
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
      style={{ perspective: '1200px' }}
      className={`relative transform-gpu ${className}`}
    >
      {/* Floating Stardust Assembly Particles on Entrance */}
      {stardust && (
        <div className="absolute inset-0 pointer-events-none overflow-visible z-20">
          {STARDUST_PARTICLES.map((p, idx) => (
            <motion.span
              key={idx}
              initial={{
                opacity: 0,
                scale: 0,
                x: p.x * 2,
                y: p.y * 2
              }}
              whileInView={{
                opacity: [0, 1, 0.9, 0],
                scale: [0, 1.5, 1, 0],
                x: [p.x * 2, p.x * 0.4, 0],
                y: [p.y * 2, p.y * 0.4, 0]
              }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: duration * 1.3,
                delay: delay + p.delay,
                ease: [0.22, 1, 0.36, 1]
              }}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                fontSize: `${p.size}px`
              }}
              className={`select-none filter drop-shadow-[0_0_10px_currentColor] ${getTextColorClass()}`}
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
        viewport={{ once: true, margin: '-40px' }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};
