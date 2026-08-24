import React, { useEffect, useRef } from 'react';

interface LotusPetalsProps {
  count?: number;
  devotional?: boolean;
  isCountdown?: boolean;
}

export const LotusPetals: React.FC<LotusPetalsProps> = ({ count = 20, devotional = false, isCountdown = false }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dynamic Storytelling Density Modulator based on Scroll Depth
    let scrollProgress = 0;
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress = totalScroll > 0 ? window.scrollY / totalScroll : 0;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Particle definitions
    const totalPetals = count;
    const petals = Array.from({ length: totalPetals }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 8,
      speedX: Math.random() * 1.2 - 0.6,
      speedY: Math.random() * 1.0 + 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.025,
      opacity: Math.random() * 0.4 + 0.25,
      color: devotional ? (Math.random() > 0.4 ? '#FFB3C6' : '#FFD93D') : '#FFB3C6'
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Story-driven dynamic active count
      let activePetalCount = totalPetals;
      let globalSpeedMultiplier = 1;

      if (isCountdown) {
        // Opening / Anticipation: 2-3 slow solitary petals
        activePetalCount = 3;
        globalSpeedMultiplier = 0.55;
      } else if (scrollProgress > 0.88) {
        // Finale / Heart: 1 solitary quiet petal
        activePetalCount = 1;
        globalSpeedMultiplier = 0.4;
      } else if (scrollProgress > 0.65) {
        // Play / Mini-game: Playful medium drift
        activePetalCount = Math.floor(totalPetals * 0.75);
        globalSpeedMultiplier = 0.9;
      } else if (scrollProgress > 0.3) {
        // Discovery & Journey: Soft, gentle drifting
        activePetalCount = Math.floor(totalPetals * 0.5);
        globalSpeedMultiplier = 0.65;
      } else {
        // Celebration / Hero: Full festive energy
        activePetalCount = totalPetals;
        globalSpeedMultiplier = 1.0;
      }

      for (let i = 0; i < activePetalCount; i++) {
        const p = petals[i];
        p.y += p.speedY * globalSpeedMultiplier;
        p.x += Math.sin(p.y * 0.008) * 0.7 + p.speedX * globalSpeedMultiplier;
        p.rotation += p.rotationSpeed * globalSpeedMultiplier;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // Draw curved organic lotus petal
        ctx.beginPath();
        ctx.moveTo(0, -p.size);
        ctx.bezierCurveTo(p.size * 0.6, -p.size * 0.3, p.size * 0.6, p.size * 0.6, 0, p.size);
        ctx.bezierCurveTo(-p.size * 0.6, p.size * 0.6, -p.size * 0.6, -p.size * 0.3, 0, -p.size);
        ctx.fillStyle = p.color;
        ctx.fill();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, devotional, isCountdown]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-10 opacity-80"
    />
  );
};
