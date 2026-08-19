import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, Radio, Sun, CloudSun, Clock, Heart } from 'lucide-react';

export const DistanceTracker: React.FC = () => {
  const [timeString, setTimeString] = useState<string>('');

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

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-20 select-none">
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
            <span className="text-xl sm:text-2xl font-space font-bold text-[#FF4D8D]">1,250 KM</span>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-center">
            <span className="text-[10px] font-space font-bold text-gray-500 uppercase block">BROTHERLY SUPPORT</span>
            <span className="text-xl sm:text-2xl font-space font-bold text-[#7CEBC6] drop-shadow-sm">0.00 MS</span>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-center">
            <span className="text-[10px] font-space font-bold text-gray-500 uppercase block">SIBLING BOND</span>
            <span className="text-xl sm:text-2xl font-space font-bold text-[#FFD93D]">100% LIFELONG</span>
          </div>

          <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100 text-center">
            <span className="text-[10px] font-space font-bold text-gray-500 uppercase block">DIVINE BLESSINGS</span>
            <span className="text-xl sm:text-2xl font-space font-bold text-purple-400">RADHARANI 🪷</span>
          </div>
        </div>

        {/* Animated Connecting Radar Map */}
        <div className="relative w-full h-44 sm:h-52 bg-gradient-to-r from-[#FFF0F3] via-white to-[#FFE5EC] rounded-2xl border border-pink-200/80 p-6 flex items-center justify-between overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,77,141,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,77,141,0.05)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Hyderabad Pin (Brother) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-[#D4A84B] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Shield className="w-6 h-6" />
            </div>
            <span className="mt-2 font-fredoka font-bold text-gray-800 text-sm">Hyderabad Base</span>
            <span className="text-[11px] font-caveat font-bold text-[#D4A84B]">Brother's Shield 🛡️</span>
          </div>

          {/* Animated Connecting Line */}
          <div className="flex-1 relative mx-6 h-12 flex items-center">
            <div className="w-full h-0.5 border-t-2 border-dashed border-[#D4A84B]/40" />

            <motion.div
              animate={{
                x: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute left-0 -ml-4 flex flex-col items-center"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A84B] to-[#FF4D8D] text-white flex items-center justify-center shadow-pop">
                <span className="text-xs">🛡️</span>
              </div>
              <span className="text-[9px] font-space font-bold text-[#D4A84B] whitespace-nowrap mt-0.5">
                Always In Your Corner ✈️
              </span>
            </motion.div>
          </div>

          {/* Delhi Pin (Sister) */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-[#FF2D78] text-white flex items-center justify-center shadow-lg border-2 border-white">
              <Sparkles className="w-6 h-6 fill-current" />
            </div>
            <span className="mt-2 font-fredoka font-bold text-gray-800 text-sm">Delhi Realm</span>
            <span className="text-[11px] font-caveat font-bold text-[#FF4D8D]">Where You Shine 🌸</span>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-pink-100 text-center">
          <p className="font-caveat text-xl sm:text-2xl text-gray-700 leading-relaxed">
            "No matter how far Delhi is from Hyderabad, whenever you need advice, cheering up, or a protective shield — your brother is always right here."
          </p>
        </div>
      </div>
    </section>
  );
};
