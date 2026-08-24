import { ParticleReveal3D } from '../shared/ParticleReveal3D';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X } from 'lucide-react';
import { KINDNESS_CARDS_DATA } from '../../data/kindnessCards';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const KindnessTribute: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<any | null>(null);
  const [pledgedCards, setPledgedCards] = useState<Set<number>>(new Set());

  const handleCardClick = (card: any) => {
    soundEngine.playTap();
    setSelectedCard(card);
  };

  const handlePledge = (id: number) => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();
    setPledgedCards((prev) => new Set([...prev, id]));
  };

  return (
    <section id="kindness-tribute" className="w-full max-w-6xl mx-auto px-4 py-20 select-none">
      <ParticleReveal3D direction="depth" stardustColor="gold">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
            <span>WHY WE CELEBRATE HER 🪷</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
            The Grace of Kindness
          </h2>
          <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
            Beyond the aesthetics and numbers, here is why Shree’s genuine warmth and gentle nature touch so many hearts. Tap any card to enter her story!
          </p>
        </div>
      </ParticleReveal3D>

      {/* Grid of Interactive Kindness Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {KINDNESS_CARDS_DATA.map((card, idx) => {
          const isPledged = pledgedCards.has(card.id);

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleCardClick(card)}
              className={`relative rounded-3xl p-6 border-2 border-pink-100/80 bg-gradient-to-br ${card.bgGradient} shadow-md hover:shadow-pop transition-all cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white/60 mb-5 shadow-sm border border-white relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-[#FF4D8D] font-fredoka font-bold text-xs shadow-lg">
                      ✨ Tap to Enter Memory
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-space font-bold tracking-widest uppercase text-[#FF4D8D] px-3 py-1 rounded-full bg-white/90 border border-pink-200 shadow-sm">
                    {card.badge}
                  </span>
                  <span className="text-2xl">
                    {card.icon === 'cat' ? '🐱' : card.icon === 'lotus' ? '🪷' : card.icon === 'smile' ? '✨' : '💖'}
                  </span>
                </div>

                <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-2">
                  {card.title}
                </h3>

                <p className="text-xs font-quicksand font-bold text-[#FF4D8D] mb-2.5 italic">
                  "{card.quote}"
                </p>

                <p className="text-xs sm:text-sm font-quicksand text-gray-700 leading-relaxed line-clamp-3">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-pink-200/50 flex items-center justify-between text-xs text-gray-500 font-caveat text-base">
                <span>{isPledged ? '💛 Pledge Made!' : 'Pure Heart & Devotion'}</span>
                <span className="font-space text-[10px] text-[#FF4D8D] font-bold">ENTER MEMORY ➔</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Entering a Memory Immersive Experience */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 select-none"
          >
            <motion.div
              initial={{ scale: 0.88, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-gradient-to-b from-[#FFF5F7] via-white to-[#FFF0F5] rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(255,77,141,0.2)] border-2 border-pink-200/90 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedCard(null);
                }}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 rounded-full bg-white/90 hover:bg-pink-500 hover:text-white shadow-sm border border-pink-100 flex items-center justify-center text-gray-500 transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4">
                <div className="w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden border-2 border-white shadow-md relative group">
                  <img
                    src={selectedCard.image}
                    alt={selectedCard.title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: 'center 20%' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#FF4D8D]/15 text-[#FF4D8D] text-xs font-space font-bold uppercase tracking-wider">
                    {selectedCard.badge}
                  </span>
                  <span className="text-xs sm:text-sm font-quicksand text-gray-500 font-semibold">
                    The Kindness Chronicles 🌸
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-fredoka font-bold text-gray-800 tracking-tight">
                  {selectedCard.title}
                </h3>

                <p className="text-xl sm:text-2xl font-caveat font-bold text-[#FF2D78] leading-snug">
                  "{selectedCard.quote}"
                </p>

                <p className="text-sm sm:text-base font-quicksand text-gray-700 leading-relaxed">
                  {selectedCard.description}
                </p>

                {/* Kindness Action Button */}
                <div className="pt-4 border-t border-pink-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs font-quicksand text-gray-400">
                    Inspired by Shree's warmth 💛
                  </span>

                  <button
                    onClick={() => handlePledge(selectedCard.id)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF7A59] text-white font-fredoka font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>
                      {pledgedCards.has(selectedCard.id) ? 'Pledge Recorded! 💖' : 'Pledge an Act of Kindness 🪷'}
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
