import { ParticleReveal3D } from '../shared/ParticleReveal3D';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Radio, Sun, CloudSun, Clock, Heart, Zap, Send } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import confetti from 'canvas-confetti';

export const DistanceTracker: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');
  const [isPulseActive, setIsPulseActive] = useState<boolean>(false);
  const [pulseCount, setPulseCount] = useState<number>(1420);
  const [pulseDelivered, setPulseDelivered] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSendProtectionPulse = () => {
    if (isPulseActive) return;

    soundEngine.playLaserPulse();
    soundEngine.playTap();
    setIsPulseActive(true);
    setPulseDelivered(false);
    setPulseCount((prev) => prev + 1);

    // Laser traverses along arc, then arrives in Delhi after 1.2s
    setTimeout(() => {
      soundEngine.playSparkle(1.6);
      setPulseDelivered(true);

      confetti({
        particleCount: 50,
        spread: 90,
        origin: { x: 0.75, y: 0.6 },
        colors: ['#FFD93D', '#FF4D8D', '#FFFFFF', '#7CEBC6']
      });

      setTimeout(() => {
        setIsPulseActive(false);
        setPulseDelivered(false);
      }, 2000);
    }, 1200);
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-20 select-none">
      {/* Header */}
            <ParticleReveal3D direction="left" stardustColor="pink">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-[#D4A84B]/30 mb-2">
          <Radio className="w-3.5 h-3.5 animate-pulse text-[#D4A84B]" />
          <span>SIBLING CONNECTION TELEMETRY RADAR 📍</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Hyderabad ➔ Delhi Connection
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          1,250 km between brother & sister — zero latency in lifelong support, protection, and love.
        </p>
      </div>
      </ParticleReveal3D>

      <div className="relative bg-white rounded-3xl p-6 sm:p-10 shadow-pop border border-pink-100 overflow-hidden">
        {/* Real-Time Live Telemetry Clocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {/* Hyderabad Live Telemetry */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-50/80 to-amber-100/40 border-2 border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#D4A84B] text-white flex items-center justify-center shadow-md">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <span className="font-fredoka font-bold text-sm text-gray-800 block">HYDERABAD (BROTHER)</span>
                <span className="text-xs font-quicksand text-gray-500 flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>31°C Sunny • 17.3850° N</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-xs font-space font-bold text-[#5C4410]">
                <Clock className="w-3.5 h-3.5 text-[#D4A84B]" />
                <span>{timeString || '12:00:00 PM'} IST</span>
              </div>
              <span className="text-[10px] font-space font-semibold text-emerald-600 uppercase">
                SHIELD STATUS: ACTIVE 🛡️
              </span>
            </div>
          </div>

          {/* Delhi Live Telemetry */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-50/80 to-rose-100/40 border-2 border-pink-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-[#FF2D78] text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6 fill-current" />
              </div>
              <div>
                <span className="font-fredoka font-bold text-sm text-gray-800 block">DELHI (SHREE)</span>
                <span className="text-xs font-quicksand text-gray-500 flex items-center gap-1">
                  <CloudSun className="w-3.5 h-3.5 text-pink-400" />
                  <span>28°C Radiant • 28.6139° N</span>
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="flex items-center gap-1 text-xs font-space font-bold text-[#FF4D8D]">
                <Clock className="w-3.5 h-3.5 text-[#FF4D8D]" />
                <span>{timeString || '12:00:00 PM'} IST</span>
              </div>
              <span className="text-[10px] font-space font-semibold text-pink-600 uppercase">
                STATUS: SHINING BRIGHT 🌸
              </span>
            </div>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-center">
            <span className="text-[10px] font-space font-bold text-gray-500 uppercase block">FLIGHT DISTANCE</span>
            <span className="font-space font-bold text-2xl text-[#FF4D8D] block mt-1">1,250 KM</span>
            <span className="text-[11px] font-quicksand text-gray-600">~2h 15m nonstop</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 text-center">
            <span className="text-[10px] font-space font-bold text-gray-500 uppercase block">HEART LATENCY</span>
            <span className="font-space font-bold text-2xl text-[#D4A84B] block mt-1">0.00 MS</span>
            <span className="text-[11px] font-quicksand text-gray-600">Always 1 call away</span>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 text-center">
            <span className="text-[10px] font-space font-bold text-gray-500 uppercase block">BROTHERLY SUPPORT</span>
            <span className="font-space font-bold text-2xl text-emerald-600 block mt-1">100%</span>
            <span className="text-[11px] font-quicksand text-gray-600">Unconditional loyalty</span>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 text-center">
            <span className="text-[10px] font-space font-bold text-gray-500 uppercase block">PROTECTION GUARANTEE</span>
            <span className="font-space font-bold text-2xl text-purple-600 block mt-1">24/7/365</span>
            <span className="text-[11px] font-quicksand text-gray-600">Lifelong Sibling Shield</span>
          </div>
        </div>

        {/* Interactive Laser Radar Map Graphic */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl bg-gradient-to-r from-amber-900/10 via-pink-900/10 to-rose-900/10 border border-pink-200/80 p-6 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between text-xs font-space font-bold text-gray-700 z-10">
            <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D4A84B] animate-ping" />
              <span>HYDERABAD (COMMAND 🛡️)</span>
            </span>

            <span className="flex items-center gap-1.5 bg-white/90 px-3 py-1 rounded-full shadow-sm">
              <span>DELHI (SANCTUARY 🌸)</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D8D] animate-ping" />
            </span>
          </div>

          {/* SVG Laser Arc Telemetry */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="laserGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#D4A84B" />
                <stop offset="50%" stopColor="#FF4D8D" />
                <stop offset="100%" stopColor="#FF2D78" />
              </linearGradient>
            </defs>

            {/* Background Arc */}
            <path
              d="M 60 140 Q 500 20 950 140"
              fill="none"
              stroke="rgba(255, 77, 141, 0.25)"
              strokeWidth="3"
              strokeDasharray="6 6"
            />

            {/* Active Protection Laser Pulse */}
            {isPulseActive && (
              <motion.path
                d="M 60 140 Q 500 20 950 140"
                fill="none"
                stroke="url(#laserGradient)"
                strokeWidth="6"
                initial={{ pathLength: 0, opacity: 1 }}
                animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                transition={{ duration: 1.2, ease: 'easeInOut' }}
                style={{ filter: 'drop-shadow(0 0 12px #FFD93D)' }}
              />
            )}
          </svg>

          {/* Pulse Delivered Celebration Badge in Delhi */}
          {pulseDelivered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              className="absolute top-10 right-10 z-20 px-3 py-1 rounded-full bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] text-white font-fredoka font-bold text-xs shadow-lg"
            >
              <span>Protection Pulse Delivered! 🛡️✨</span>
            </motion.div>
          )}

          {/* Bottom Telemetry & Trigger Button */}
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-space text-gray-500">
              ✨ <strong className="text-[#D4A84B]">{pulseCount}</strong> Protection Pulses Synced
            </span>

            <button
              type="button"
              onClick={handleSendProtectionPulse}
              disabled={isPulseActive}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-[#D4A84B] via-[#F5C642] to-[#FF4D8D] text-[#2D1B00] font-fredoka font-bold text-xs shadow-pop hover:scale-105 active:scale-95 transition-all"
            >
              <Zap className="w-3.5 h-3.5 fill-[#2D1B00]" />
              <span>{isPulseActive ? 'Firing Supersonic Pulse...' : 'Send Protection Pulse 🛡️'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
