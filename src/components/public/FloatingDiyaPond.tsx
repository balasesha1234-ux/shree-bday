import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Flame, Plus, Heart, X, Camera, Sun, Sunset, Moon, Sunrise } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { getSacredOfferings, submitSacredOffering, supabase } from '../../utils/supabaseClient';
import confetti from 'canvas-confetti';

type LightingMode = 'sunrise' | 'sunset' | 'midnight';

interface FloatingOffering {
  id: string;
  name: string;
  type: 'diya' | 'lotus';
  blessing: string;
  x: number; // 0-100%
  y: number; // 0-100%
  speedX: number;
  speedY: number;
  rotation: number;
  size: number;
}

interface KoiFish {
  id: number;
  name: string;
  x: number;
  y: number;
  angle: number;
  speed: number;
  baseSpeed: number;
  primaryColor: string;
  secondaryColor: string;
  sizeScale: number;
  tailPhase: number;
  targetX: number;
  targetY: number;
  isScared: boolean;
  scaredUntil: number;
  isCurious: boolean;
}

interface WaterSplash {
  id: number;
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

interface SkyStrokePoint {
  x: number;
  y: number;
  time: number;
  size: number;
}

const DEFAULT_OFFERINGS: FloatingOffering[] = [
  {
    id: '1',
    name: 'Her Brother in Hyderabad',
    type: 'lotus',
    blessing: 'May Radha Rani forever illuminate your path with boundless joy, safety, and extraordinary achievements. Proud of you always, little sister! 🪷🌸',
    x: 25,
    y: 35,
    speedX: 0.015,
    speedY: -0.01,
    rotation: 4,
    size: 54
  },
  {
    id: '2',
    name: 'Ananya (Delhi)',
    type: 'diya',
    blessing: 'Wishing our kindest creator a lifetime of genuine smiles and pure happiness! 🪔✨',
    x: 70,
    y: 45,
    speedX: -0.02,
    speedY: 0.012,
    rotation: -3,
    size: 46
  },
  {
    id: '3',
    name: 'Whiskered Haven Rescue',
    type: 'lotus',
    blessing: 'For the girl who never walks past a stray kitten without offering love and headpats. 🐱🌸',
    x: 48,
    y: 65,
    speedX: 0.01,
    speedY: -0.015,
    rotation: 6,
    size: 52
  }
];

export const FloatingDiyaPond: React.FC = () => {
  const [offerings, setOfferings] = useState<FloatingOffering[]>(() => {
    const saved = localStorage.getItem('shree_handdrawn_offerings');
    return saved ? JSON.parse(saved) : DEFAULT_OFFERINGS;
  });

  // Sync with live Supabase database on mount
  useEffect(() => {
    getSacredOfferings().then((data) => {
      if (data && data.length > 0) {
        setOfferings(data as FloatingOffering[]);
      }
    });

    if (supabase) {
      const channel = supabase
        .channel('public:sacred_offerings')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'sacred_offerings' },
          (payload) => {
            const newOffering = payload.new as FloatingOffering;
            setOfferings((prev) => [newOffering, ...prev.filter((o) => o.id !== newOffering.id)]);
          }
        )
        .subscribe();

      return () => {
        if (supabase) supabase.removeChannel(channel);
      };
    }
  }, []);
  const [totalDiyasLit, setTotalDiyasLit] = useState<number>(() => {
    const savedCount = localStorage.getItem('shree_handdrawn_diya_count');
    return savedCount ? parseInt(savedCount, 10) : 5840;
  });

  const [activeOffering, setActiveOffering] = useState<FloatingOffering | null>(null);
  const [selectedType, setSelectedType] = useState<'diya' | 'lotus'>('lotus');
  const [userName, setUserName] = useState('');
  const [userBlessing, setUserBlessing] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [lightingMode, setLightingMode] = useState<LightingMode>('sunset');
  const [isShutterFlashing, setIsShutterFlashing] = useState(false);
  const [snapshotTaken, setSnapshotTaken] = useState(false);

  // 3D Parallax Tracking with Decoupled Static Hit-Box & Smooth Springs
  const outerWrapperRef = useRef<HTMLDivElement | null>(null);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rawRotateX, { damping: 28, stiffness: 140 });
  const smoothRotateY = useSpring(rawRotateY, { damping: 28, stiffness: 140 });

  const rawReticleX = useMotionValue(50);
  const rawReticleY = useMotionValue(50);
  const smoothReticleX = useSpring(rawReticleX, { damping: 24, stiffness: 180 });
  const smoothReticleY = useSpring(rawReticleY, { damping: 24, stiffness: 180 });

  const reticleLeft = useTransform(smoothReticleX, (v: number) => `${v}%`);
  const reticleTop = useTransform(smoothReticleY, (v: number) => `${v}%`);

  const [isCursorInside, setIsCursorInside] = useState(false);

  // Canvas Refs
  const skyCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const waterCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingSky = useRef(false);
  const skyPoints = useRef<SkyStrokePoint[]>([]);
  const waterSplashes = useRef<WaterSplash[]>([]);
  const lastChimeTime = useRef(0);

  // 7 Hand-Painted Japanese/Indian Kinematic Koi Fish
  const koiRef = useRef<KoiFish[]>([
    { id: 1, name: 'Kohaku (Ruby)', x: 200, y: 150, angle: 0.5, speed: 1.4, baseSpeed: 1.4, primaryColor: '#FF4D4D', secondaryColor: '#FFFFFF', sizeScale: 1.1, tailPhase: 0, targetX: 350, targetY: 200, isScared: false, scaredUntil: 0, isCurious: false },
    { id: 2, name: 'Yamabuki (Gold)', x: 500, y: 300, angle: 2.2, speed: 1.6, baseSpeed: 1.6, primaryColor: '#FFD700', secondaryColor: '#FFA500', sizeScale: 1.25, tailPhase: 1.2, targetX: 650, targetY: 220, isScared: false, scaredUntil: 0, isCurious: false },
    { id: 3, name: 'Tancho (Crown)', x: 750, y: 180, angle: 3.8, speed: 1.3, baseSpeed: 1.3, primaryColor: '#FFFFFF', secondaryColor: '#FF2E63', sizeScale: 1.0, tailPhase: 2.4, targetX: 400, targetY: 340, isScared: false, scaredUntil: 0, isCurious: false },
    { id: 4, name: 'Asagi (Indigo)', x: 300, y: 380, angle: 1.1, speed: 1.5, baseSpeed: 1.5, primaryColor: '#4A90E2', secondaryColor: '#FF7F50', sizeScale: 1.05, tailPhase: 3.6, targetX: 550, targetY: 150, isScared: false, scaredUntil: 0, isCurious: false },
    { id: 5, name: 'Sakura (Rose)', x: 600, y: 100, angle: 4.5, speed: 1.2, baseSpeed: 1.2, primaryColor: '#FF9EAA', secondaryColor: '#FFF0F5', sizeScale: 0.95, tailPhase: 4.8, targetX: 250, targetY: 320, isScared: false, scaredUntil: 0, isCurious: false },
    { id: 6, name: 'Sanke (Calico)', x: 150, y: 280, angle: 5.8, speed: 1.4, baseSpeed: 1.4, primaryColor: '#FF6B6B', secondaryColor: '#2B2B2B', sizeScale: 1.15, tailPhase: 0.8, targetX: 700, targetY: 280, isScared: false, scaredUntil: 0, isCurious: false },
    { id: 7, name: 'Showa (Midnight Flame)', x: 820, y: 360, angle: 2.9, speed: 1.5, baseSpeed: 1.5, primaryColor: '#FF8C00', secondaryColor: '#1A1A1A', sizeScale: 1.2, tailPhase: 2.0, targetX: 480, targetY: 180, isScared: false, scaredUntil: 0, isCurious: false }
  ]);

  // Smooth 3D Tilt & Reticle Tracking (Decoupled from rotating element to prevent edge jitter)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!outerWrapperRef.current) return;
    const rect = outerWrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Guard against out of bounds
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
      handlePointerLeave();
      return;
    }

    setIsCursorInside(true);

    const xPct = Math.max(2, Math.min(98, (x / rect.width) * 100));
    const yPct = Math.max(2, Math.min(98, (y / rect.height) * 100));

    // Update smooth motion values
    rawRotateY.set(((x / rect.width) - 0.5) * 12);
    rawRotateX.set(-((y / rect.height) - 0.5) * 12);

    rawReticleX.set(xPct);
    rawReticleY.set(yPct);

    // Water canvas coordinate mapping
    const waterX = (x / rect.width) * 1100;
    const waterY = Math.max(30, Math.min(410, ((y - 240) / (rect.height - 240)) * 440));

    // Hover Interaction: If reticle is near fish (< 85px) and not scared, they become curious & slow down to nibble
    const now = Date.now();
    koiRef.current.forEach((koi) => {
      if (now < koi.scaredUntil) return;

      const dist = Math.hypot(waterX - koi.x, waterY - koi.y);
      if (dist < 85) {
        koi.isCurious = true;
        koi.speed = koi.baseSpeed * 0.7;
        koi.targetX = waterX;
        koi.targetY = waterY;
      } else {
        koi.isCurious = false;
        koi.speed = koi.baseSpeed;
      }
    });
  };

  const handlePointerLeave = () => {
    setIsCursorInside(false);
    // Smoothly return 3D tilt to 0 without snapping
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  // Water Click: Tap to Scare Fish (Sudden Fear Burst) + Create Liquid Splash Ring
  const handleWaterClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!outerWrapperRef.current) return;
    const rect = outerWrapperRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const waterX = (clickX / rect.width) * 1100;
    const waterY = Math.max(30, Math.min(410, ((clickY - 240) / (rect.height - 240)) * 440));

    soundEngine.playPop();

    // Create Water Ripple Splash
    waterSplashes.current.push({
      id: Date.now(),
      x: waterX,
      y: waterY,
      radius: 5,
      maxRadius: 75,
      alpha: 0.8
    });

    // Sudden Fear Reaction on nearby fish (< 140px)
    const now = Date.now();
    koiRef.current.forEach((koi) => {
      const dist = Math.hypot(waterX - koi.x, waterY - koi.y);

      if (dist < 140) {
        // Sudden Fear! Dart away in opposite direction
        const awayAngle = Math.atan2(koi.y - waterY, koi.x - waterX) + (Math.random() * 0.8 - 0.4);
        koi.angle = awayAngle;
        koi.isScared = true;
        koi.scaredUntil = now + 1800; // Scared for 1.8 seconds
        koi.speed = koi.baseSpeed * 3.8; // High speed panic dart!
        koi.targetX = koi.x + Math.cos(awayAngle) * 350;
        koi.targetY = Math.max(40, Math.min(400, koi.y + Math.sin(awayAngle) * 350));

        // Create fish splash trail
        waterSplashes.current.push({
          id: Date.now() + koi.id,
          x: koi.x,
          y: koi.y,
          radius: 4,
          maxRadius: 40,
          alpha: 0.6
        });
      }
    });
  };

  // Shutter Snapshot Trigger
  const handleSnapPhoto = () => {
    soundEngine.playCameraShutter();
    setIsShutterFlashing(true);
    setSnapshotTaken(true);

    confetti({
      particleCount: 65,
      spread: 110,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#FFD93D', '#FF4D8D', '#FFA07A', '#FFFFFF']
    });

    setTimeout(() => setIsShutterFlashing(false), 180);
    setTimeout(() => setSnapshotTaken(false), 3500);
  };

  // Drift Animation of Offerings
  useEffect(() => {
    const interval = setInterval(() => {
      setOfferings((prev) =>
        prev.map((item) => {
          let nextX = item.x + item.speedX;
          let nextY = item.y + item.speedY;
          let nextRot = item.rotation + item.speedX * 2;

          if (nextX < 8 || nextX > 90) item.speedX *= -1;
          if (nextY < 12 || nextY > 84) item.speedY *= -1;

          return {
            ...item,
            x: Math.max(8, Math.min(90, nextX)),
            y: Math.max(12, Math.min(84, nextY)),
            rotation: nextRot
          };
        })
      );
    }, 80);

    return () => clearInterval(interval);
  }, []);

  // Sky Canvas Loop
  useEffect(() => {
    const canvas = skyCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const renderSky = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();
      skyPoints.current = skyPoints.current.filter((pt) => now - pt.time < 1800);

      if (skyPoints.current.length > 1) {
        ctx.save();
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        for (let i = 1; i < skyPoints.current.length; i++) {
          const p1 = skyPoints.current[i - 1];
          const p2 = skyPoints.current[i];
          const age = now - p2.time;
          const life = Math.max(0, 1 - age / 1800);

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 217, 61, ${life * 0.95})`;
          ctx.lineWidth = p2.size * life;
          ctx.shadowColor = '#FFD93D';
          ctx.shadowBlur = 16;
          ctx.stroke();

          if (Math.random() < 0.25) {
            ctx.beginPath();
            ctx.arc(p2.x + (Math.random() * 16 - 8), p2.y + (Math.random() * 16 - 8), 1.5 * life, 0, Math.PI * 2);
            ctx.fillStyle = '#FFFFFF';
            ctx.fill();
          }
        }
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(renderSky);
    };

    renderSky();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Water, Splashes & 7 Kinematic Koi Canvas Loop
  useEffect(() => {
    const canvas = waterCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const renderWater = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = Date.now();

      // 1. Render & Update Water Splash Ripples
      waterSplashes.current.forEach((splash) => {
        splash.radius += 1.6;
        splash.alpha = Math.max(0, 1 - splash.radius / splash.maxRadius);

        ctx.save();
        ctx.beginPath();
        ctx.arc(splash.x, splash.y, splash.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${splash.alpha * 0.7})`;
        ctx.lineWidth = 2;
        ctx.shadowColor = '#FFD93D';
        ctx.shadowBlur = 8;
        ctx.stroke();
        ctx.restore();
      });

      waterSplashes.current = waterSplashes.current.filter((s) => s.alpha > 0.02);

      // 2. Render 7 Swimming Kinematic Koi Fish with Panic/Calm Behavior
      koiRef.current.forEach((koi) => {
        // Calm down after fear duration
        if (koi.isScared && now > koi.scaredUntil) {
          koi.isScared = false;
          koi.speed = koi.baseSpeed;
        }

        const dx = koi.targetX - koi.x;
        const dy = koi.targetY - koi.y;
        const dist = Math.hypot(dx, dy);

        if (dist < 45) {
          koi.targetX = Math.random() * (canvas.width - 120) + 60;
          koi.targetY = Math.random() * (canvas.height - 120) + 60;
        }

        const targetAngle = Math.atan2(dy, dx);
        let diff = targetAngle - koi.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;

        const turnRate = koi.isScared ? 0.12 : 0.045;
        koi.angle += diff * turnRate;

        koi.x += Math.cos(koi.angle) * koi.speed;
        koi.y += Math.sin(koi.angle) * koi.speed;

        // Tail oscillation speed increases with fear!
        const tailSpeed = koi.isScared ? 0.38 : 0.14;
        koi.tailPhase += tailSpeed;

        // Draw Multi-Layered Watercolor Koi Fish
        ctx.save();
        ctx.translate(koi.x, koi.y);
        ctx.rotate(koi.angle);
        ctx.scale(koi.sizeScale, koi.sizeScale);

        // Soft Liquid Shadow
        ctx.beginPath();
        ctx.ellipse(0, 10, 26, 8, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.fill();

        // Main Torpedo Body
        ctx.beginPath();
        ctx.ellipse(0, 0, 24, 9, 0, 0, Math.PI * 2);
        ctx.fillStyle = koi.primaryColor;
        ctx.globalAlpha = 0.9;
        ctx.shadowColor = koi.primaryColor;
        ctx.shadowBlur = koi.isScared ? 20 : 12;
        ctx.fill();

        // Secondary Watercolor Scales / Patch
        ctx.beginPath();
        ctx.ellipse(-4, -1, 15, 6, 0.2, 0, Math.PI * 2);
        ctx.fillStyle = koi.secondaryColor;
        ctx.globalAlpha = 0.85;
        ctx.fill();

        // White Pearlescent Belly Wash
        ctx.beginPath();
        ctx.ellipse(-2, 0, 16, 4.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
        ctx.fill();

        // Multi-Segment Kinetic Tail Fin (Rapid flutter on fear!)
        const tailAmp = koi.isScared ? 12 : 8;
        const tailOffset = Math.sin(koi.tailPhase) * tailAmp;
        ctx.beginPath();
        ctx.moveTo(-18, 0);
        ctx.quadraticCurveTo(-30, tailOffset, -42, tailOffset * 1.8);
        ctx.quadraticCurveTo(-32, tailOffset * 0.6, -18, 0);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.fill();

        // Translucent Pectoral Side Fins
        const finWave = Math.cos(koi.tailPhase) * (koi.isScared ? 0.4 : 0.2);
        ctx.beginPath();
        ctx.ellipse(6, -9, 10, 4, Math.PI / 4 + finWave, 0, Math.PI * 2);
        ctx.ellipse(6, 9, 10, 4, -Math.PI / 4 - finWave, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.fill();

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(renderWater);
    };

    renderWater();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Sky Pointer Handlers (Pure Harmonic Pentatonic Melodies)
  const handleSkyPointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    isDrawingSky.current = true;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();

    skyPoints.current.push({ x, y, time: now, size: 5 });
    lastChimeTime.current = now;

    // Harmonic pentatonic note index based on horizontal position
    const noteIndex = Math.floor((x / rect.width) * 6);
    soundEngine.playHarmonicPop(noteIndex);
  };

  const handleSkyPointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingSky.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const now = Date.now();

    skyPoints.current.push({ x, y, time: now, size: 4 + Math.random() * 3 });

    // Smooth musical chime cadence
    if (now - lastChimeTime.current > 110) {
      const noteIndex = Math.floor((x / rect.width) * 6);
      soundEngine.playHarmonicPop(noteIndex);
      lastChimeTime.current = now;
    }
  };

  const handleSkyPointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingSky.current) return;
    isDrawingSky.current = false;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    soundEngine.playSparkle(1.5);
    confetti({
      particleCount: 45,
      spread: 90,
      origin: { x, y: y * 0.5 },
      colors: ['#FFD93D', '#FF4D8D', '#FFA07A', '#FFFFFF'],
      ticks: 240,
      gravity: 0.7,
      scalar: 1.2,
      shapes: ['star', 'circle']
    });
  };

  const handleLightOffering = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    soundEngine.playTempleBell();
    soundEngine.playSparkle(1.4);
    confetti({
      particleCount: 70,
      spread: 120,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#FFD93D', '#FF4D8D', '#FFFFFF', '#D4A84B']
    });

    const blessingText = userBlessing.trim() ||
      (selectedType === 'diya'
        ? 'May your year be illuminated with divine grace and boundless success! 🪔✨'
        : 'For our purest sister: peace, strength, and joy forever! 🪷🌸');

    const newOfferingData = {
      name: userName.trim(),
      type: selectedType,
      blessing: blessingText,
      x: 35 + Math.random() * 30,
      y: 40 + Math.random() * 25,
      speedX: (Math.random() - 0.5) * 0.03,
      speedY: (Math.random() - 0.5) * 0.02,
      rotation: Math.random() * 12 - 6,
      size: selectedType === 'lotus' ? 52 : 46
    };

    submitSacredOffering(newOfferingData).then((saved) => {
      setOfferings((prev) => [saved as FloatingOffering, ...prev.filter((o) => o.id !== saved.id)]);
    });

    const tempOffering: FloatingOffering = { id: String(Date.now()), ...newOfferingData };
    setTotalDiyasLit((prev) => prev + 1);
    localStorage.setItem('shree_handdrawn_diya_count', String(totalDiyasLit + 1));

    setUserName('');
    setUserBlessing('');
    setIsFormOpen(false);
    setActiveOffering(tempOffering);
  };

  return (
    <section id="celestial-sanctuary" className="relative w-full max-w-6xl mx-auto px-4 py-20 select-none overflow-hidden">
      {/* Top Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-amber-200 mb-2">
          <Camera className="w-3.5 h-3.5" />
          <span>3D CAMERA VIEWPORT & INTERACTIVE 7 KOI POND 📸🪷</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          The 3D Celestial Viewfinder
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Hover near the Koi to attract them, tap/click the water to scare them into a rapid dart, or draw across the sky to play soothing chimes!
        </p>

        {/* Atmospheric Lighting Switcher */}
        <div className="mt-4 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              soundEngine.playTap();
              setLightingMode('sunrise');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-space font-semibold flex items-center gap-1.5 transition-all ${
              lightingMode === 'sunrise'
                ? 'bg-gradient-to-r from-[#FFB3C6] to-[#FFE5EC] text-[#5C2434] shadow-sm border border-pink-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Sunrise className="w-3.5 h-3.5" />
            <span>🌅 Golden Sunrise</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playTap();
              setLightingMode('sunset');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-space font-semibold flex items-center gap-1.5 transition-all ${
              lightingMode === 'sunset'
                ? 'bg-gradient-to-r from-[#FF7A59] to-[#FFD166] text-[#3D1400] shadow-sm border border-orange-300'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Sunset className="w-3.5 h-3.5" />
            <span>🌇 Sunset Golden Hour</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundEngine.playTap();
              setLightingMode('midnight');
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-space font-semibold flex items-center gap-1.5 transition-all ${
              lightingMode === 'midnight'
                ? 'bg-[#120F2B] text-[#FFD93D] shadow-sm border border-amber-300/40'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Moon className="w-3.5 h-3.5" />
            <span>🌌 Cosmic Midnight</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3D PERSPECTIVE CAMERA VIEWPORT */}
      {/* ========================================================================= */}
      <div
        ref={outerWrapperRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={{ perspective: '1200px' }}
        className="w-full flex justify-center items-center py-2"
      >
        <motion.div
          style={{
            transformStyle: 'preserve-3d',
            rotateX: smoothRotateX,
            rotateY: smoothRotateY
          }}
          className="relative w-full max-w-5xl rounded-[2.5rem] p-3 sm:p-5 bg-[#12121E] shadow-[0_30px_90px_rgba(0,0,0,0.6)] border-[10px] border-[#2A2A3C] overflow-hidden group select-none"
        >
          {/* Shutter White Flash Effect */}
          {isShutterFlashing && (
            <div className="absolute inset-0 bg-white z-50 pointer-events-none animate-ping" />
          )}

          {/* ========================================================================= */}
          {/* CAMERA VIEWFINDER HUD OVERLAY */}
          {/* ========================================================================= */}
          <div className="absolute inset-0 pointer-events-none z-30 p-4 sm:p-6 flex flex-col justify-between">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-space font-bold text-white/90">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span>● REC 4K 60FPS</span>
                <span className="text-amber-300 ml-2 hidden sm:inline uppercase">
                  {lightingMode === 'sunset' ? 'SUNSET GOLDEN HOUR' : lightingMode === 'sunrise' ? 'SUNRISE DEW' : 'MIDNIGHT GALAXY'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[#FFD93D]">7 KOI LIVE (TAP TO SCARE)</span>
                <span className="hidden sm:inline">1/250s • f/1.4</span>
                <span>ISO 100</span>
                <span className="text-emerald-400">100% 🔋</span>
              </div>
            </div>

            {/* Corner Framing Brackets */}
            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-white/60" />
            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-white/60" />
            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-white/60" />
            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-white/60" />

            {/* Dynamic Autofocus Reticle with Smooth Fade & Zero Edge Snapping */}
            <motion.div
              style={{
                left: reticleLeft,
                top: reticleTop,
                transform: 'translate(-50%, -50%)',
                opacity: isCursorInside ? 1 : 0
              }}
              className="absolute w-12 h-12 rounded-full border border-[#FFD93D]/80 flex items-center justify-center pointer-events-none shadow-[0_0_15px_rgba(255,217,61,0.6)] transition-opacity duration-300"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#FFD93D] animate-ping" />
              <div className="absolute -top-4 text-[8px] font-space text-[#FFD93D] uppercase tracking-widest font-bold">
                AF-TRACK
              </div>
            </motion.div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between text-[10px] font-space text-white/70">
              <span>SHREE 2027 // CELESTIAL CAMERA 📸</span>
              <span className="text-amber-300 font-bold hidden sm:inline">TOUCH POND TO SCARE KOI FISH 🐟</span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* UPPER SKY: ATMOSPHERIC SUN & SKY DRAWING */}
          {/* ========================================================================= */}
          <div
            className={`relative w-full h-[220px] sm:h-[260px] rounded-t-3xl overflow-hidden transition-all duration-700 ${
              lightingMode === 'sunset'
                ? 'bg-gradient-to-b from-[#2B1038] via-[#8B3A4F] to-[#E27D60]'
                : lightingMode === 'sunrise'
                ? 'bg-gradient-to-b from-[#3D2545] via-[#A85876] to-[#E8A598]'
                : 'bg-gradient-to-b from-[#080616] via-[#120D2C] to-[#1A133D]'
            }`}
          >
            {/* Glowing Sun / Moon Disc on the Horizon */}
            <div
              className={`absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full transition-all duration-700 pointer-events-none ${
                lightingMode === 'sunset'
                  ? 'w-24 h-24 bg-gradient-to-t from-[#FFD166] via-[#FF6B6B] to-[#FF4500] blur-sm shadow-[0_0_80px_#FF7A59]'
                  : lightingMode === 'sunrise'
                  ? 'w-20 h-20 bg-gradient-to-t from-[#FFF0F5] via-[#FFB3C6] to-[#FFA8C5] blur-sm shadow-[0_0_70px_#FFA8C5]'
                  : 'w-16 h-16 bg-gradient-to-t from-[#FFF] to-[#E0D4F0] blur-sm shadow-[0_0_60px_#FFD93D]'
              }`}
            />

            {/* Volumetric Horizon God Rays */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,217,61,0.25)_0%,transparent_70%)] pointer-events-none" />

            {/* Sky Drawing Canvas */}
            <canvas
              ref={skyCanvasRef}
              width={1100}
              height={260}
              onPointerDown={handleSkyPointerDown}
              onPointerMove={handleSkyPointerMove}
              onPointerUp={handleSkyPointerUp}
              onPointerLeave={handleSkyPointerUp}
              onPointerCancel={handleSkyPointerUp}
              className="absolute inset-0 w-full h-full cursor-crosshair z-10 touch-none"
            />
          </div>

          {/* Horizon Radiant Splitter Line */}
          <div className="relative h-1.5 w-full bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent shadow-[0_0_20px_rgba(255,217,61,0.9)] z-20" />

          {/* ========================================================================= */}
          {/* LOWER WATER POND: INTERACTIVE 7 KOI FISH (HOVER & TAP TO SCARE) */}
          {/* ========================================================================= */}
          <div
            onClick={handleWaterClick}
            className={`relative w-full h-[360px] sm:h-[440px] rounded-b-3xl overflow-hidden cursor-pointer transition-all duration-700 ${
              lightingMode === 'sunset'
                ? 'bg-gradient-to-b from-[#4A2535] via-[#2A1828] to-[#150B17]'
                : lightingMode === 'sunrise'
                ? 'bg-gradient-to-b from-[#4E3D52] via-[#2D2433] to-[#14101A]'
                : 'bg-gradient-to-b from-[#0B152E] via-[#081024] to-[#040814]'
            }`}
          >
            {/* Water, Splashes & 7 Koi Fish Canvas */}
            <canvas
              ref={waterCanvasRef}
              width={1100}
              height={440}
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
            />

            {/* Offerings in 3D Parallax */}
            {offerings.map((item) => (
              <motion.div
                key={item.id}
                style={{
                  left: `${item.x}%`,
                  top: `${item.y}%`,
                  transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`
                }}
                animate={{
                  y: [0, -6, 0],
                  rotate: [item.rotation - 3, item.rotation + 3, item.rotation - 3]
                }}
                transition={{
                  y: { repeat: Infinity, duration: 4 + (parseInt(item.id, 10) % 3), ease: 'easeInOut' },
                  rotate: { repeat: Infinity, duration: 6, ease: 'easeInOut' }
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  soundEngine.playTap();
                  setActiveOffering(item);
                }}
                className="absolute z-10 cursor-pointer group select-none"
              >
                {item.type === 'lotus' ? (
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-16 h-16 rounded-full bg-pink-400/20 blur-md animate-pulse" />
                    <div
                      className="relative transition-transform duration-300 group-hover:scale-125"
                      style={{ width: item.size, height: item.size }}
                    >
                      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                        <div
                          key={i}
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ transform: `rotate(${angle}deg)` }}
                        >
                          <div className="w-3.5 h-6 rounded-full bg-gradient-to-t from-[#FF4D8D] via-[#FFA8C5] to-[#FFFFFF] opacity-90 shadow-sm origin-bottom" />
                        </div>
                      ))}
                      <div className="absolute inset-0 m-auto w-4 h-4 rounded-full bg-[#FFD93D] shadow-[0_0_12px_#FFD93D] border border-amber-300 animate-pulse" />
                    </div>
                    <span className="absolute -bottom-5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-pink-300/40 text-[9px] font-fredoka font-semibold text-pink-200 whitespace-nowrap shadow-sm">
                      {item.name}
                    </span>
                  </div>
                ) : (
                  <div className="relative flex flex-col items-center justify-center">
                    <div className="absolute -top-4 w-10 h-10 rounded-full bg-amber-400/30 blur-md animate-ping opacity-60" />
                    <div
                      className="relative transition-transform duration-300 group-hover:scale-125 flex flex-col items-center"
                      style={{ width: item.size, height: item.size * 0.7 }}
                    >
                      <div className="w-3.5 h-5 rounded-full bg-gradient-to-t from-[#FF4500] via-[#FFD700] to-[#FFFFFF] shadow-[0_0_14px_#FFD700] animate-bounce" />
                      <div className="w-full h-4 rounded-b-full bg-gradient-to-b from-[#8B4513] to-[#5C2900] border-t-2 border-[#D2691E] shadow-md" />
                    </div>
                    <span className="mt-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-amber-300/40 text-[9px] font-fredoka font-semibold text-amber-200 whitespace-nowrap shadow-sm">
                      {item.name}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Bottom Camera Control Bar */}
            <div className="absolute bottom-4 inset-x-4 z-40 flex items-center justify-between gap-3 p-3 rounded-2xl bg-black/75 backdrop-blur-md border border-white/20">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-[#FFD93D] animate-pulse" />
                <span className="text-xs font-space text-amber-100 hidden sm:inline">
                  <strong className="text-[#FFD93D]">{totalDiyasLit.toLocaleString()}</strong> Offerings Floating • 7 Koi Swimming
                </span>
              </div>

              {/* Big Golden Camera Shutter Snap Button */}
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSnapPhoto();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD93D] via-[#FF7A59] to-[#FF4D8D] text-[#1A0B1A] font-fredoka font-bold text-xs sm:text-sm shadow-[0_0_25px_rgba(255,217,61,0.7)] hover:scale-105 active:scale-95 transition-all"
                >
                  <Camera className="w-4 h-4 fill-[#1A0B1A]" />
                  <span>{snapshotTaken ? 'Keepsake Captured! 📸' : 'Snap Keepsake 📸'}</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundEngine.playTap();
                    setIsFormOpen(true);
                  }}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-fredoka font-bold text-xs border border-white/20 transition-all"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Light Offering 🪷</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: BLESSING REVEAL CARD */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activeOffering && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveOffering(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#FDFBF7] rounded-3xl p-6 sm:p-8 shadow-2xl border-4 border-[#D4A84B] text-center overflow-hidden"
            >
              <button
                onClick={() => setActiveOffering(null)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-16 h-16 rounded-full bg-amber-50 border-2 border-[#D4A84B] flex items-center justify-center text-3xl mx-auto shadow-sm mb-3">
                {activeOffering.type === 'lotus' ? '🪷' : '🪔'}
              </div>

              <span className="text-[10px] font-space font-bold uppercase tracking-widest text-[#D4A84B]">
                SACRED BLESSING OFFERING
              </span>

              <h4 className="font-playfair text-2xl font-bold text-gray-800 mt-1">
                From: {activeOffering.name}
              </h4>

              <div className="my-5 p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-left">
                <p className="font-caveat text-2xl text-gray-800 leading-relaxed italic">
                  "{activeOffering.blessing}"
                </p>
              </div>

              <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
                <span className="text-[10px] font-space text-gray-400">
                  MARCH 6 • SHREE’S SANCTUARY
                </span>

                <button
                  onClick={() => {
                    soundEngine.playSparkle(1.5);
                    confetti({
                      particleCount: 50,
                      spread: 80,
                      colors: ['#FFD93D', '#FF4D8D', '#FFFFFF']
                    });
                    setActiveOffering(null);
                  }}
                  className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-[#FF4D8D] text-white font-fredoka font-bold text-xs shadow-sm hover:scale-105 active:scale-95 transition-all"
                >
                  <Heart className="w-3.5 h-3.5 fill-white" />
                  <span>Bless Her 🌸</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL: LIGHT OFFERING FORM */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFormOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none"
          >
            <motion.div
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-pink-200 text-left overflow-hidden"
            >
              <button
                onClick={() => setIsFormOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="font-fredoka font-bold text-2xl text-gray-800">
                Light an Offering for Shree 🪷
              </h3>
              <p className="font-quicksand text-xs text-gray-500 mt-1">
                Your hand-drawn offering will float across the 3D celestial pond for Shree to see!
              </p>

              <form onSubmit={handleLightOffering} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Select Offering Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedType('lotus')}
                      className={`py-2.5 px-3 rounded-2xl border-2 font-fredoka font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                        selectedType === 'lotus'
                          ? 'bg-pink-50 border-[#FF4D8D] text-[#FF4D8D]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <span className="text-xl">🪷</span>
                      <span>Kinetic Lotus</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedType('diya')}
                      className={`py-2.5 px-3 rounded-2xl border-2 font-fredoka font-semibold text-xs flex items-center justify-center gap-2 transition-all ${
                        selectedType === 'diya'
                          ? 'bg-amber-50 border-[#D4A84B] text-[#5C4410]'
                          : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <span className="text-xl">🪔</span>
                      <span>Clay Diya</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={30}
                    placeholder="E.g., Priya (Bengaluru)"
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm font-fredoka"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Wish / Prayer</label>
                  <textarea
                    rows={3}
                    value={userBlessing}
                    onChange={(e) => setUserBlessing(e.target.value)}
                    maxLength={140}
                    placeholder="Write a sweet prayer or wish for Shree..."
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm resize-none font-quicksand"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#FF2D78] text-white font-fredoka font-bold text-sm shadow-pop hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Release Offering into the 3D Pond 🪷</span>
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
