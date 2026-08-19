import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface StarTrail {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
  duration: number;
}

export const ShootingStars: React.FC = () => {
  const [stars, setStars] = useState<StarTrail[]>([]);

  useEffect(() => {
    const spawnStar = () => {
      const id = Date.now() + Math.random();
      const startX = Math.random() * (window.innerWidth * 0.8) + window.innerWidth * 0.1;
      const startY = Math.random() * (window.innerHeight * 0.4);
      const angle = 35 + (Math.random() - 0.5) * 15; // diagonal
      const length = Math.random() * 150 + 120;
      const duration = Math.random() * 0.6 + 0.8;

      setStars((prev) => [...prev, { id, startX, startY, angle, length, duration }]);

      setTimeout(() => {
        setStars((prev) => prev.filter((s) => s.id !== id));
      }, duration * 1000 + 400);
    };

    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        spawnStar();
      }
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      <AnimatePresence>
        {stars.map((s) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, x: s.startX, y: s.startY, scale: 0.2 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: s.startX + Math.cos((s.angle * Math.PI) / 180) * s.length * 2,
              y: s.startY + Math.sin((s.angle * Math.PI) / 180) * s.length * 2,
              scale: [0.2, 1, 0.8, 0.2]
            }}
            transition={{ duration: s.duration, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              width: `${s.length}px`,
              height: '2px',
              background: 'linear-gradient(90deg, #FFFFFF 0%, #FFD93D 30%, rgba(212,168,75,0.4) 70%, transparent 100%)',
              transform: `rotate(${s.angle}deg)`,
              transformOrigin: 'left center',
              boxShadow: '0 0 12px 2px rgba(255, 217, 61, 0.6)'
            }}
          >
            {/* Glowing head of shooting star */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#FFFFFF]" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
