import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Flame, Plus } from 'lucide-react';
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

interface PondRipple {
  id: number;
  x: number;
  y: number;
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
  const [ripples, setRipples] = useState<PondRipple[]>([]);

  const pondRef = useRef<HTMLDivElement | null>(null);

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

  const handlePondClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!pondRef.current) return;
    const rect = pondRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newRipple: PondRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);
    soundEngine.playPop();

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1600);
  };

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
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-amber-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>DEVOTIONAL SACRED OFFERING 🪷</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Sacred Floating Diya Pond
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Light a sacred floating diya or pink lotus on the night pond with a heartfelt prayer for Shree.
        </p>

        <div className="mt-4 flex items-center justify-center gap-2 text-xs font-space text-amber-700 bg-amber-50 border border-amber-200 py-1.5 px-4 rounded-full w-fit mx-auto">
          <Flame className="w-3.5 h-3.5 text-[#D4A84B] animate-pulse" />
          <span>{totalDiyasLit.toLocaleString()} Sacred Diyas Floating Worldwide</span>
        </div>
      </div>

      {/* Floating Pond Basin */}
      <div
        ref={pondRef}
        onClick={handlePondClick}
        className="relative w-full h-[460px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#D4A84B]/40 bg-gradient-to-b from-[#0B0A1A] via-[#15122C] to-[#0A0915] cursor-pointer group"
      >
        {/* Subtle Water Shimmer Texture */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,75,0.12),transparent_70%)] pointer-events-none" />
        
        {/* Interactive Click Water Ripples */}
        {ripples.map((r) => (
          <motion.div
            key={r.id}
            initial={{ scale: 0.1, opacity: 0.8 }}
            animate={{ scale: 3.5, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            style={{ top: `${r.y}%`, left: `${r.x}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full border-2 border-amber-300/60 pointer-events-none shadow-[0_0_20px_rgba(212,168,75,0.4)]"
          />
        ))}

        {/* Floating Offerings */}
        {offerings.map((item) => (
          <motion.div
            key={item.id}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`
            }}
            animate={{
              y: [0, -8, 0],
              rotate: [-3, 3, -3]
            }}
            transition={{
              duration: 4 + (parseInt(item.id.slice(-2) || '0', 10) % 3),
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            onMouseEnter={() => setHoveredOffering(item)}
            onMouseLeave={() => setHoveredOffering(null)}
            className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 transition-transform duration-300 hover:scale-125"
          >
            {/* Concentric Flame Water Ripple */}
            <motion.div
              animate={{ scale: [0.8, 1.6, 0.8], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-4 rounded-full border border-amber-400/40 pointer-events-none"
            />

            {/* Glowing Flame Reflection under Water */}
            <div className="absolute -bottom-2 inset-x-0 h-4 bg-amber-400/30 blur-md rounded-full" />

            {/* Diya / Lotus Emoji Graphic */}
            <div className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_#FFD93D]">
              {item.type === 'diya' ? '🪔' : '🪷'}
            </div>

            {/* Subtly Floating Name Tag */}
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-fredoka font-semibold text-amber-200/90 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-amber-500/30">
              {item.name.split(' ')[0]}
            </span>
          </motion.div>
        ))}

        {/* Hovered Offering Tooltip */}
        <AnimatePresence>
          {hoveredOffering && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 px-5 py-3 rounded-2xl bg-black/85 backdrop-blur-md border border-[#D4A84B] shadow-2xl text-center max-w-sm"
            >
              <div className="flex items-center justify-center gap-1.5 text-xs font-fredoka font-bold text-[#FFD93D]">
                <span>{hoveredOffering.type === 'diya' ? '🪔' : '🪷'}</span>
                <span>{hoveredOffering.name}</span>
              </div>
              <p className="font-caveat text-lg text-white mt-0.5">
                "{hoveredOffering.blessing}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Release Action Button */}
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84B] to-[#F5C642] hover:brightness-110 text-[#2D1B00] font-fredoka font-bold text-xs shadow-lg hover:scale-105 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Light a Diya 🪔</span>
          </button>
        </div>
      </div>

      {/* Light Offering Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-200 space-y-5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🪔</span>
                  <h3 className="text-xl font-fredoka font-bold text-gray-800">
                    Release a Sacred Prayer
                  </h3>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-gray-400 hover:text-gray-700 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleLightOffering} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Choose Offering</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedType('diya')}
                      className={`py-2.5 rounded-xl border-2 font-fredoka text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        selectedType === 'diya' ? 'bg-amber-50 border-[#D4A84B] text-[#5C4410]' : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <span>🪔 Sacred Diya</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedType('lotus')}
                      className={`py-2.5 rounded-xl border-2 font-fredoka text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        selectedType === 'lotus' ? 'bg-pink-50 border-[#FF4D8D] text-[#FF4D8D]' : 'border-gray-200 text-gray-600'
                      }`}
                    >
                      <span>🪷 Pink Lotus</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name & City</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    maxLength={30}
                    placeholder="e.g. Ananya (Delhi)"
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#D4A84B] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Prayer / Blessing Note</label>
                  <textarea
                    rows={3}
                    value={userBlessing}
                    onChange={(e) => setUserBlessing(e.target.value)}
                    maxLength={120}
                    placeholder="May Radha Rani bless Shree with endless smiles..."
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#D4A84B] text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#D4A84B] to-[#F5C642] hover:brightness-110 text-[#2D1B00] font-fredoka font-bold text-sm shadow-pop hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Float Offering Onto Pond ✨
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
