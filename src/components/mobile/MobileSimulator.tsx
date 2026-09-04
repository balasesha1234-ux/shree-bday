import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MobileApp, ScreenId } from './MobileApp';
import { Smartphone, Tablet, ExternalLink, Sparkles } from 'lucide-react';

interface MobileSimulatorProps {
  onBackToDesktop?: () => void;
}

export const MobileSimulator: React.FC<MobileSimulatorProps> = ({ onBackToDesktop }) => {
  const [deviceModel, setDeviceModel] = useState<'iphone' | 'se' | 'tablet' | 'native'>('iphone');
  const [selectedScreen, setSelectedScreen] = useState<ScreenId>('splash');
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Auto detect if user is on real mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileDevice(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const screenOptions: { id: ScreenId; label: string; num: string }[] = [
    { id: 'splash', num: '01', label: 'Splash (Layered)' },
    { id: 'countdown', num: '02', label: 'Countdown (Gold Pods)' },
    { id: 'unlock', num: '03', label: 'Unlock (Polaroids)' },
    { id: 'home', num: '04', label: 'Home (Interactive)' },
    { id: 'music', num: '06', label: 'Music (Spotify)' },
    { id: 'memories', num: '07', label: 'Memories (Reactions)' },
    { id: 'faith', num: '08', label: 'Faith (Diyas)' },
    { id: 'wishes', num: '09', label: 'Wishes Wall' },
    { id: 'letter-lock', num: '10', label: 'Developer Letter (Secret)' },
    { id: 'private-home', num: '11', label: 'Private Sanctum' },
    { id: 'letter-open', num: '12', label: 'Brother Letters (12 Pages)' },
    { id: 'brother-letterbox', num: '12B', label: "A Note for Brother ♡" },
    { id: 'eleven-eleven', num: '13', label: '11:11 Wish Star' },
    { id: 'overview', num: '14', label: 'Tablet Overview' }
  ];

  // If real mobile phone or native mode selected, render full-bleed without frame
  if (isMobileDevice || deviceModel === 'native') {
    return (
      <div className="relative w-full min-h-screen bg-[#140816]">
        <MobileApp
          currentScreenOverride={selectedScreen}
          onScreenChange={(s) => setSelectedScreen(s)}
        />
      </div>
    );
  }

  // Desktop Simulator View with Titanium iPhone/iPad Frame
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0814] via-[#1a0e22] to-[#0a0610] text-white flex flex-col items-center justify-center p-4 select-none relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Simulator Master Control Header */}
      <header className="relative z-20 w-full max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 mb-5 px-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-pink-400/30 text-pink-200 text-xs font-space font-bold">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
            <span>MOBILE EXPERIENCE FOR SHREE • SIMULATOR V2.2</span>
          </div>
          <h2 className="font-fredoka text-xl font-bold text-white mt-1">
            Interactive Device Lab
          </h2>
        </div>

        <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 text-xs font-fredoka">
          <button
            onClick={() => setDeviceModel('iphone')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              deviceModel === 'iphone' ? 'bg-[#FF4D8D] text-white shadow-pop' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>iPhone 16 Pro</span>
          </button>

          <button
            onClick={() => setDeviceModel('se')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              deviceModel === 'se' ? 'bg-[#FF4D8D] text-white shadow-pop' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Compact (SE)</span>
          </button>

          <button
            onClick={() => setDeviceModel('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all ${
              deviceModel === 'tablet' ? 'bg-[#FF4D8D] text-white shadow-pop' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Tablet className="w-4 h-4" />
            <span>iPad Mini</span>
          </button>

          <button
            onClick={() => setDeviceModel('native')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-gray-400 hover:text-white transition-all"
            title="Full Screen Borderless"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Full-Bleed</span>
          </button>
        </div>

        {onBackToDesktop && (
          <button
            onClick={onBackToDesktop}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-fredoka text-pink-200 transition-all"
          >
            Switch to Desktop Site 🖥️
          </button>
        )}
      </header>

      {/* Screen Quick-Jump Navigation Ribbon */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex items-center gap-1.5 overflow-x-auto pb-3 mb-3 no-scrollbar px-4">
        {screenOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelectedScreen(opt.id)}
            className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-fredoka font-semibold transition-all ${
              selectedScreen === opt.id
                ? 'bg-gradient-to-r from-[#FFD93D] to-[#FF4D8D] text-[#3D2040] shadow-md scale-105'
                : 'bg-white/10 text-gray-300 hover:bg-white/15'
            }`}
          >
            <span className="font-mono text-[10px] opacity-75">{opt.num}</span>
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {/* Device Bezel Simulator Container */}
      <div className="relative z-10 flex items-center justify-center my-auto">
        <motion.div
          layout
          style={{
            width:
              deviceModel === 'tablet'
                ? '680px'
                : deviceModel === 'se'
                ? '375px'
                : '393px',
            height:
              deviceModel === 'tablet'
                ? '880px'
                : deviceModel === 'se'
                ? '740px'
                : '852px'
          }}
          className="relative bg-black rounded-[3.2rem] p-3 shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_50px_rgba(255,77,141,0.2)] border-[10px] border-[#2E2836] transition-all duration-300 flex flex-col justify-between"
        >
          {/* Side Volume Buttons simulation */}
          <div className="absolute -left-[14px] top-28 w-1 h-12 bg-[#2E2836] rounded-l-md" />
          <div className="absolute -left-[14px] top-44 w-1 h-12 bg-[#2E2836] rounded-l-md" />
          <div className="absolute -right-[14px] top-36 w-1 h-16 bg-[#2E2836] rounded-r-md" />

          {/* Inner Screen Bezel */}
          <div className="relative w-full h-full bg-[#1e1424] rounded-[2.5rem] overflow-hidden flex flex-col">
            <MobileApp
              currentScreenOverride={selectedScreen}
              onScreenChange={(s) => setSelectedScreen(s)}
            />

            {/* Bottom iOS Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-white/50 rounded-full z-40 pointer-events-none" />
          </div>
        </motion.div>
      </div>

      {/* Simulator Footer hint */}
      <footer className="relative z-20 mt-5 text-center text-xs font-space text-gray-500">
        <span>Designed for the screens that hold the people we care about. ♡</span>
      </footer>
    </div>
  );
};
