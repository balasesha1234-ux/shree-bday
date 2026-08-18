import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiProps {
  trigger?: boolean;
  type?: 'burst' | 'continuous' | 'fireworks';
}

export const ConfettiEffect: React.FC<ConfettiProps> = ({ trigger = true, type = 'burst' }) => {
  useEffect(() => {
    if (!trigger) return;

    const colors = ['#FF4D8D', '#FF6B9D', '#FFB3C6', '#FFD93D', '#6BC5F8', '#7CEBC6', '#E0D4F0'];

    if (type === 'burst') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors
      });
    } else if (type === 'fireworks') {
      const duration = 3.5 * 1000;
      const end = Date.now() + duration;

      const interval: any = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }

        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2
          },
          colors
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [trigger, type]);

  return null;
};

export const triggerCustomConfetti = (x?: number, y?: number) => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: {
      x: x !== undefined ? x / window.innerWidth : 0.5,
      y: y !== undefined ? y / window.innerHeight : 0.5
    },
    colors: ['#FF4D8D', '#FF6B9D', '#FFD93D', '#E0D4F0', '#7CEBC6']
  });
};
