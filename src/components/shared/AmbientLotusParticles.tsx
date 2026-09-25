import React, { useEffect, useRef } from 'react';
import { SacredRainType, AmbianceTheme } from '../../hooks/useCelestialTheme';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  secondaryColor?: string;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  type: SacredRainType;
}

const LOTUS_COLORS = [
  'rgba(255, 179, 198, 0.45)', // Soft Rose Pink
  'rgba(255, 209, 220, 0.55)', // Light Pink
  'rgba(255, 217, 61, 0.35)',  // Golden Amber Dust
  'rgba(212, 168, 75, 0.30)',  // Sacred Gold
  'rgba(255, 253, 240, 0.50)'  // White Lotus
];

const MARIGOLD_COLORS = [
  { primary: '#FF8A00', secondary: '#FFD000' }, // Saffron Gold
  { primary: '#FF5E00', secondary: '#FFB800' }, // Vibrant Orange
  { primary: '#FFC107', secondary: '#FF8F00' }, // Golden Yellow
  { primary: '#FF4500', secondary: '#FFD700' }  // Deep Sunset Flame
];

const STARDUST_COLORS = [
  '#FFD700', // Gold
  '#FFF8DC', // Cornsilk
  '#60A5FA', // Celestial Blue
  '#F472B6', // Starlight Pink
  '#FFFFFF'  // Pure Stardust
];

const PAW_COLORS = [
  'rgba(255, 182, 193, 0.5)',  // Light Pink
  'rgba(255, 228, 225, 0.55)', // Misty Rose
  'rgba(212, 168, 75, 0.4)',   // Golden Kitty
  'rgba(255, 240, 245, 0.5)'   // Lavender Blush
];

export const AmbientLotusParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const currentRainRef = useRef<SacredRainType>('lotus');
  const currentThemeRef = useRef<AmbianceTheme>('dawn');

  useEffect(() => {
    // Read initial theme and rain type from localStorage or attributes
    const savedRain = (localStorage.getItem('shree_sacred_rain') as SacredRainType) || 'lotus';
    const savedTheme = (localStorage.getItem('shree_ambiance_theme') as AmbianceTheme) || 'dawn';
    currentRainRef.current = savedRain;
    currentThemeRef.current = savedTheme;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Interactive Cursor Stardust Sparkle Trail
    interface CursorSparkle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      color: string;
    }
    const cursorSparkles: CursorSparkle[] = [];
    const sparklePalette = ['#FFD700', '#FF4D8D', '#FFF', '#FFD1DC'];

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0]?.clientX : (e as MouseEvent).clientX;
      const clientY = 'touches' in e ? e.touches[0]?.clientY : (e as MouseEvent).clientY;
      if (clientX === undefined || clientY === undefined) return;

      // Add 2 subtle sparkler particles
      for (let i = 0; i < 2; i++) {
        cursorSparkles.push({
          x: clientX + (Math.random() - 0.5) * 8,
          y: clientY + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 1.2,
          vy: Math.random() * -1.2 - 0.3,
          size: Math.random() * 3.5 + 2,
          opacity: 0.85,
          color: sparklePalette[Math.floor(Math.random() * sparklePalette.length)]
        });
      }
      if (cursorSparkles.length > 50) cursorSparkles.shift();
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    const initParticles = (rain: SacredRainType) => {
      const count = Math.min(26, Math.floor(window.innerWidth / 38));
      particlesRef.current = Array.from({ length: count }, () => {
        const size = rain === 'stardust' ? Math.random() * 8 + 4 : Math.random() * 12 + 9;
        const marigoldColor = MARIGOLD_COLORS[Math.floor(Math.random() * MARIGOLD_COLORS.length)];

        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedY: rain === 'stardust' ? Math.random() * 0.5 + 0.3 : Math.random() * 0.8 + 0.4,
          speedX: (Math.random() - 0.5) * 0.6,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          color:
            rain === 'marigold'
              ? marigoldColor.primary
              : rain === 'stardust'
              ? STARDUST_COLORS[Math.floor(Math.random() * STARDUST_COLORS.length)]
              : rain === 'paws'
              ? PAW_COLORS[Math.floor(Math.random() * PAW_COLORS.length)]
              : LOTUS_COLORS[Math.floor(Math.random() * LOTUS_COLORS.length)],
          secondaryColor: rain === 'marigold' ? marigoldColor.secondary : undefined,
          opacity: rain === 'stardust' ? Math.random() * 0.6 + 0.4 : Math.random() * 0.5 + 0.35,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: Math.random() * 0.03 + 0.01,
          type: rain
        };
      });
    };

    initParticles(currentRainRef.current);

    // Listen to live theme/rain changes from useCelestialTheme
    const handleThemeChange = (e: any) => {
      if (e.detail?.rainType) {
        currentRainRef.current = e.detail.rainType;
        currentThemeRef.current = e.detail.theme;
        initParticles(e.detail.rainType);
      }
    };
    window.addEventListener('celestial-theme-change', handleThemeChange);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.x += Math.sin(p.wobble) * 0.8 + p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 25) {
          p.y = -25;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -25) p.x = canvas.width + 25;
        if (p.x > canvas.width + 25) p.x = -25;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        // 1. LOTUS PETAL
        if (p.type === 'lotus') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.5, p.size * 0.8, p.size * 0.5, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.8, p.size * 0.5, -p.size * 0.8, -p.size * 0.5, 0, -p.size);
          ctx.closePath();
          ctx.fill();
        }
        // 2. TEMPLE MARIGOLD FLOWER (GENDA PHOOL)
        else if (p.type === 'marigold') {
          const petalLayers = 6;
          for (let i = 0; i < petalLayers; i++) {
            ctx.save();
            ctx.rotate((i * Math.PI) / 3);
            ctx.fillStyle = i % 2 === 0 ? p.color : (p.secondaryColor || '#FFD700');
            ctx.beginPath();
            ctx.ellipse(0, p.size * 0.5, p.size * 0.35, p.size * 0.55, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
          }
          // Center core of flower
          ctx.fillStyle = '#D9531E';
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.35, 0, Math.PI * 2);
          ctx.fill();
        }
        // 3. TWINKLING COSMIC STARDUST
        else if (p.type === 'stardust') {
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.color;

          // 4-point twinkling diamond star
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.quadraticCurveTo(p.size * 0.15, -p.size * 0.15, p.size, 0);
          ctx.quadraticCurveTo(p.size * 0.15, p.size * 0.15, 0, p.size);
          ctx.quadraticCurveTo(-p.size * 0.15, p.size * 0.15, -p.size, 0);
          ctx.quadraticCurveTo(-p.size * 0.15, -p.size * 0.15, 0, -p.size);
          ctx.closePath();
          ctx.fill();

          ctx.shadowBlur = 0;
        }
        // 4. KITTY PAWPRINT
        else if (p.type === 'paws') {
          ctx.fillStyle = p.color;
          // Main palm pad
          ctx.beginPath();
          ctx.ellipse(0, p.size * 0.2, p.size * 0.45, p.size * 0.38, 0, 0, Math.PI * 2);
          ctx.fill();

          // 4 small toe pads
          const toes = [
            { x: -p.size * 0.4, y: -p.size * 0.35, r: p.size * 0.16 },
            { x: -p.size * 0.14, y: -p.size * 0.55, r: p.size * 0.17 },
            { x: p.size * 0.14, y: -p.size * 0.55, r: p.size * 0.17 },
            { x: p.size * 0.4, y: -p.size * 0.35, r: p.size * 0.16 }
          ];
          for (const toe of toes) {
            ctx.beginPath();
            ctx.arc(toe.x, toe.y, toe.r, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        ctx.restore();
      }

      // Render Interactive Cursor Stardust Trail
      for (let i = cursorSparkles.length - 1; i >= 0; i--) {
        const s = cursorSparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= 0.028;
        if (s.opacity <= 0) {
          cursorSparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = Math.max(0, s.opacity);
        ctx.fillStyle = s.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('celestial-theme-change', handleThemeChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 select-none opacity-85 transition-opacity duration-700"
    />
  );
};
