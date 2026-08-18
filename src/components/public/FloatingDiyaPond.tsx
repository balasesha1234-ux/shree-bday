import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface FloatingOffering {
  id: string;
  name: string;
  type: 'diya' | 'lotus';
  blessing: string;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  opacity: number;
}

const INITIAL_OFFERINGS: FloatingOffering[] = [
  { id: '1', name: 'Aarav (Mumbai)', type: 'diya', blessing: 'May Mahadev bless you always 🪔', x: 20, y: 35, speedX: 0.02, speedY: -0.01, size: 38, opacity: 0.9 },
  { id: '2', name: 'Sneha (Delhi)', type: 'lotus', blessing: 'Endless peace and joy Shree 🪷', x: 65, y: 45, speedX: -0.015, speedY: 0.02, size: 42, opacity: 0.95 },
  { id: '3', name: 'Rohan (Bengaluru)', type: 'diya', blessing: 'Radiance and good health ✨', x: 40, y: 70, speedX: 0.01, speedY: -0.015, size: 36, opacity: 0.85 },
  { id: '4', name: 'Kavya (Varanasi)', type: 'lotus', blessing: 'Radharani’s eternal grace 🌸', x: 80, y: 25, speedX: -0.02, speedY: -0.01, size: 40, opacity: 0.9 }
];

export const FloatingDiyaPond: React.FC = () => {
  const [offerings, setOfferings] = useState<FloatingOffering[]>(() => {
    const saved = localStorage.getItem('shree_diya_offerings');
    return saved ? JSON.parse(saved) : INITIAL_OFFERINGS;
  });
  const [totalDiyasLit, setTotalDiyasLit] = useState<number>(() => {
    const savedCount = localStorage.getItem('shree_diya_count');
    return savedCount ? parseInt(savedCount, 10) : 4820;
  });

  const [selectedType, setSelectedType] = useState<'diya' | 'lotus'>('diya');
  const [userName, setUserName] = useState('');
  const [userBlessing, setUserBlessing] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [hoveredOffering, setHoveredOffering] = useState<FloatingOffering | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setOfferings((prev) =>
        prev.map((item) => {
          let nextX = item.x + item.speedX;
          let nextY = item.y + item.speedY;

          if (nextX < 5 || nextX > 92) item.speedX *= -1;
          if (nextY < 10 || nextY > 85) item.speedY *= -1;

          return {
            ...item,
            x: Math.max(5, Math.min(92, nextX)),
            y: Math.max(10, Math.min(85, nextY))
          };
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const handleLightOffering = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) return;

    soundEngine.playTempleBell();
    triggerCustomConfetti();

    const newOffering: FloatingOffering = {
      id: String(Date.now()),
      name: userName.trim(),
      type: selectedType,
      blessing: userBlessing.trim() || (selectedType === 'diya' ? 'May your life be filled with divine light 🪔' : 'Pure devotion and happiness 🪷'),
      x: Math.random() * 60 + 20,
      y: Math.random() * 50 + 25,
      speedX: (Math.random() - 0.5) * 0.04,
      speedY: (Math.random() - 0.5) * 0.04,
      size: Math.random() * 8 + 36,
      opacity: 1
    };

    const updated = [newOffering, ...offerings];
    setOfferings(updated);
    setTotalDiyasLit((c) => {
      const next = c + 1;
      localStorage.setItem('shree_diya_count', String(next));
      return next;
    });

    localStorage.setItem('shree_diya_offerings', JSON.stringify(updated.slice(0, 30)));
    setUserName('');
    setUserBlessing('');
    setIsFormOpen(false);
  };

  return (
    <section id="diya-pond" className="relative w-full max-w-6xl mx-auto px-4 py-20 overflow-hidden select-none">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-[#D4A84B]/30 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>SACRED DEVOTIONAL OFFERING 🪷</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Light a Sacred Diya for Shree
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Float a glowing diya or sacred lotus onto the sacred reflection waters with your heartfelt blessing.
        </p>

        <div className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#12122B] text-white text-xs font-space font-semibold shadow-md border border-[#D4A84B]/40">
          <Flame className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D] animate-pulse" />
          <span>SACRED OFFERINGS LIT:</span>
          <span className="text-[#FFD93D] font-bold text-sm tracking-wider">
            {totalDiyasLit.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4A84B]/40 bg-gradient-to-b from-[#080816] via-[#0E0E2A] to-[#060614]">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(212,168,75,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#D4A84B]/15 blur-[80px] pointer-events-none" />

        {offerings.map((item) => (
          <motion.div
            key={item.id}
            style={{
              position: 'absolute',
              left: item.x + '%',
              top: item.y + '%',
              transform: 'translate(-50%, -50%)'
            }}
            whileHover={{ scale: 1.3, zIndex: 30 }}
            onMouseEnter={() => setHoveredOffering(item)}
            onMouseLeave={() => setHoveredOffering(null)}
            className="cursor-pointer group flex flex-col items-center select-none"
          >
            <div className="absolute inset-0 -m-3 rounded-full border border-[#D4A84B]/20 animate-ping pointer-events-none opacity-40" />
            <div
              className={'absolute inset-0 rounded-full blur-md ' + (item.type === 'diya' ? 'bg-[#FFD93D]/50' : 'bg-[#FF4D8D]/50')}
            />
            <div className="relative z-10 filter drop-shadow-[0_0_12px_rgba(255,217,61,0.8)] text-3xl sm:text-4xl">
              {item.type === 'diya' ? '🪔' : '🪷'}
            </div>
            <span className="relative z-10 mt-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[9px] font-quicksand text-white/90 border border-white/10 max-w-[90px] truncate">
              {item.name}
            </span>
          </motion.div>
        ))}

        <AnimatePresence>
          {hoveredOffering && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{
                position: 'absolute',
                left: Math.min(75, Math.max(25, hoveredOffering.x)) + '%',
                top: Math.max(15, hoveredOffering.y - 18) + '%',
                transform: 'translate(-50%, -100%)'
              }}
              className="z-40 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-[#D4A84B] text-center max-w-xs pointer-events-none"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-fredoka font-bold text-[#D4A84B]">
                <span>{hoveredOffering.type === 'diya' ? '🪔' : '🪷'}</span>
                <span>Offered by {hoveredOffering.name}</span>
              </div>
              <p className="font-caveat text-lg text-gray-800 mt-1 italic">
                "{hoveredOffering.blessing}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <button
            onClick={() => setIsFormOpen(true)}
            className="flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-[#D4A84B] via-[#F3D78A] to-[#D4A84B] text-[#3D2040] font-fredoka font-bold text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all border border-white/60"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>Light Your Sacred Offering 🪔</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-md w-full bg-[#FFFDF8] rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#D4A84B]/60 text-left"
            >
              <h3 className="text-2xl font-fredoka font-bold text-[#3D2040] flex items-center gap-2">
                <span>Light a Sacred Offering 🪷</span>
              </h3>
              <p className="text-xs font-quicksand text-gray-600 mt-1">
                Choose your offering and send your divine blessing to Shree.
              </p>

              <form onSubmit={handleLightOffering} className="mt-5 space-y-4 font-quicksand">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">Choose Offering</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedType('diya')}
                      className={'p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-fredoka text-sm transition-all ' + (selectedType === 'diya' ? 'bg-[#FFF4D6] border-[#D4A84B] text-[#5C4410] font-bold shadow-sm' : 'bg-white border-gray-200 text-gray-600')}
                    >
                      <span className="text-2xl">🪔</span>
                      <span>Golden Diya</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedType('lotus')}
                      className={'p-3 rounded-2xl border-2 flex items-center justify-center gap-2 font-fredoka text-sm transition-all ' + (selectedType === 'lotus' ? 'bg-[#FFE5EC] border-[#FF4D8D] text-[#FF4D8D] font-bold shadow-sm' : 'bg-white border-gray-200 text-gray-600')}
                    >
                      <span className="text-2xl">🪷</span>
                      <span>Pink Lotus</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Radhika Sharma"
                    maxLength={35}
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A84B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A84B] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Sacred Blessing / Prayer</label>
                  <input
                    type="text"
                    placeholder="e.g. May Radharani shower boundless joy and grace upon you!"
                    maxLength={120}
                    value={userBlessing}
                    onChange={(e) => setUserBlessing(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D4A84B]/40 focus:outline-none focus:ring-2 focus:ring-[#D4A84B] text-sm"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-fredoka font-semibold text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4A84B] hover:bg-[#B88F35] text-white text-xs font-fredoka font-semibold shadow-md transition-all"
                  >
                    <span>Float on Waters 🪷</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
