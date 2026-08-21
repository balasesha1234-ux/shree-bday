import React, { useEffect, useRef } from 'react';

interface StardustMote {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
}

const COSMIC_COLORS = [
  'rgba(255, 217, 61, 0.75)',  // Supernova Gold
  'rgba(255, 77, 141, 0.65)',  // Rose Nebula
  'rgba(124, 235, 198, 0.70)', // Cyan Aurora
  'rgba(255, 255, 255, 0.85)'  // Pure Diamond Star
];

export const CosmicStardustFloating: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Spawn 35 zero-gravity floating stardust photon motes
    const count = 14;
    const motes: StardustMote[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 3 + 1.5,
      speedY: -(Math.random() * 0.4 + 0.15), // Floating upwards in zero-gravity
      speedX: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.6 + 0.3,
      color: COSMIC_COLORS[Math.floor(Math.random() * COSMIC_COLORS.length)],
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.04 + 0.02
    }));

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      motes.forEach((mote) => {
        mote.x += mote.speedX;
        mote.y += mote.speedY;
        mote.pulsePhase += mote.pulseSpeed;

        if (mote.y < -20) {
          mote.y = height + 20;
          mote.x = Math.random() * width;
        }
        if (mote.x < -20) mote.x = width + 20;
        if (mote.x > width + 20) mote.x = -20;

        const currentAlpha = Math.max(0.1, mote.alpha + Math.sin(mote.pulsePhase) * 0.25);

        ctx.save();
        ctx.beginPath();
        ctx.arc(mote.x, mote.y, mote.size, 0, Math.PI * 2);
        ctx.fillStyle = mote.color;
        ctx.globalAlpha = currentAlpha;
        ctx.shadowColor = mote.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Cross sparkle for larger crystals
        if (mote.size > 3) {
          ctx.beginPath();
          ctx.moveTo(mote.x - mote.size * 2, mote.y);
          ctx.lineTo(mote.x + mote.size * 2, mote.y);
          ctx.moveTo(mote.x, mote.y - mote.size * 2);
          ctx.lineTo(mote.x, mote.y + mote.size * 2);
          ctx.strokeStyle = mote.color;
          ctx.lineWidth = 1;
          ctx.globalAlpha = currentAlpha * 0.5;
          ctx.stroke();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full select-none"
    />
  );
};
