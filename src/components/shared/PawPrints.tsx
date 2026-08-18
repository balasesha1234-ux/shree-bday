import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const PawPrints: React.FC = () => {
  const [paws, setPaws] = useState<{ id: number; x: number; y: number; rotate: number }[]>([]);

  useEffect(() => {
    // Generate walking kitten paw footprints across screen
    let currentY = window.innerHeight * 0.85;
    let currentX = -50;
    let step = 0;
    const totalSteps = 12;

    const interval = setInterval(() => {
      if (step >= totalSteps) {
        clearInterval(interval);
        setTimeout(() => setPaws([]), 4000);
        return;
      }

      const isRightFoot = step % 2 === 0;
      currentX += 70;
      currentY += (Math.random() - 0.5) * 30;

      setPaws((prev) => [
        ...prev,
        {
          id: Date.now() + step,
          x: currentX,
          y: currentY + (isRightFoot ? 18 : -18),
          rotate: isRightFoot ? 15 : -15
        }
      ]);

      step++;
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
      <AnimatePresence>
        {paws.map((paw) => (
          <motion.div
            key={paw.id}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{ opacity: 0.45, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              left: `${paw.x}px`,
              top: `${paw.y}px`,
              transform: `rotate(${paw.rotate}deg)`
            }}
            className="text-pink-400 select-none"
          >
            🐾
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
