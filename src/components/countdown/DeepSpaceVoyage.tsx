import React, { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  prevZ: number;
  color: string;
  size: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  color: string;
}

export const DeepSpaceVoyage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mousePos = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

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

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.targetX = (e.clientX - width / 2) * 0.05;
      mousePos.current.targetY = (e.clientY - height / 2) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 3D Stars
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const STAR_COUNT = isMobile ? 120 : 280;
    const STAR_COLORS = ['#FFFFFF', '#FFE6AA', '#FFB3C6', '#7CEBC6', '#FFD93D'];
    const stars: Star[] = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        prevZ: width,
        color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        size: Math.random() * 1.6 + 0.6
      });
    }

    // Active Meteors
    const meteors: Meteor[] = [];
    let lastMeteorTime = 0;

    let animationFrameId: number;
    let nebulaAngle = 0;

    const render = (time: number) => {
      // Smooth mouse follow
      mousePos.current.x += (mousePos.current.targetX - mousePos.current.x) * 0.05;
      mousePos.current.y += (mousePos.current.targetY - mousePos.current.y) * 0.05;

      // 1. Deep Space Void Background
      ctx.fillStyle = '#060412';
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Glowing Nebula Dust Clouds
      nebulaAngle += 0.0008;
      const nebulaX = width * 0.5 + Math.sin(nebulaAngle) * 40;
      const nebulaY = height * 0.45 + Math.cos(nebulaAngle * 0.8) * 30;

      // Magenta Nebula Core
      const grad1 = ctx.createRadialGradient(nebulaX, nebulaY, 10, nebulaX, nebulaY, width * 0.65);
      grad1.addColorStop(0, 'rgba(255, 45, 120, 0.16)');
      grad1.addColorStop(0.4, 'rgba(138, 43, 226, 0.10)');
      grad1.addColorStop(0.8, 'rgba(20, 10, 45, 0.05)');
      grad1.addColorStop(1, 'transparent');
      ctx.fillStyle = grad1;
      ctx.fillRect(0, 0, width, height);

      // Golden Stardust Nebula Pocket
      const goldX = width * 0.75 + Math.cos(nebulaAngle * 1.2) * 50;
      const goldY = height * 0.65 + Math.sin(nebulaAngle) * 40;
      const grad2 = ctx.createRadialGradient(goldX, goldY, 5, goldX, goldY, width * 0.45);
      grad2.addColorStop(0, 'rgba(255, 217, 61, 0.12)');
      grad2.addColorStop(0.5, 'rgba(255, 122, 89, 0.06)');
      grad2.addColorStop(1, 'transparent');
      ctx.fillStyle = grad2;
      ctx.fillRect(0, 0, width, height);

      // Cyan Polar Aurora Pocket
      const cyanX = width * 0.25 - Math.sin(nebulaAngle) * 40;
      const cyanY = height * 0.3 + Math.cos(nebulaAngle) * 30;
      const grad3 = ctx.createRadialGradient(cyanX, cyanY, 5, cyanX, cyanY, width * 0.4);
      grad3.addColorStop(0, 'rgba(124, 235, 198, 0.10)');
      grad3.addColorStop(0.6, 'rgba(30, 60, 114, 0.05)');
      grad3.addColorStop(1, 'transparent');
      ctx.fillStyle = grad3;
      ctx.fillRect(0, 0, width, height);

      // 3. Render 3D Starfield Warp
      const cx = width / 2 + mousePos.current.x;
      const cy = height / 2 + mousePos.current.y;
      const warpSpeed = 1.1;

      ctx.save();
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.prevZ = star.z;
        star.z -= warpSpeed;

        if (star.z <= 0) {
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
          star.z = width;
          star.prevZ = width;
        }

        const k = 250 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const prevK = 250 / star.prevZ;
          const prevPx = star.x * prevK + cx;
          const prevPy = star.y * prevK + cy;

          const size = (1 - star.z / width) * star.size * 1.8;
          const alpha = Math.min(1, (1 - star.z / width) * 1.2);

          // Star streak velocity line
          ctx.beginPath();
          ctx.moveTo(prevPx, prevPy);
          ctx.lineTo(px, py);
          ctx.strokeStyle = star.color;
          ctx.globalAlpha = alpha * 0.7;
          ctx.lineWidth = size * 0.8;
          ctx.stroke();

          // Star glow dot
          ctx.beginPath();
          ctx.arc(px, py, size * 0.7, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = alpha;
          ctx.fill();
        }
      }
      ctx.restore();

      // 4. Random Cosmic Meteors / Shooting Stars
      if (time - lastMeteorTime > 3500 && Math.random() < 0.4) {
        meteors.push({
          x: Math.random() * width * 0.8 + width * 0.1,
          y: Math.random() * height * 0.3,
          length: Math.random() * 120 + 80,
          speed: Math.random() * 8 + 12,
          angle: Math.PI / 4 + (Math.random() * 0.2 - 0.1),
          opacity: 1,
          color: Math.random() > 0.5 ? '#FFD93D' : '#FF4D8D'
        });
        lastMeteorTime = time;
      }

      // Render Meteors
      ctx.save();
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        m.opacity -= 0.016;

        if (m.opacity <= 0 || m.x > width || m.y > height) {
          meteors.splice(i, 1);
          continue;
        }

        const tailX = m.x - Math.cos(m.angle) * m.length;
        const tailY = m.y - Math.sin(m.angle) * m.length;

        const mGrad = ctx.createLinearGradient(tailX, tailY, m.x, m.y);
        mGrad.addColorStop(0, 'transparent');
        mGrad.addColorStop(0.7, m.color);
        mGrad.addColorStop(1, '#FFFFFF');

        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = mGrad;
        ctx.lineWidth = 2.5;
        ctx.globalAlpha = m.opacity;
        ctx.shadowColor = m.color;
        ctx.shadowBlur = 12;
        ctx.stroke();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* Dark Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(6,4,18,0.75)_100%)] pointer-events-none" />
    </div>
  );
};
