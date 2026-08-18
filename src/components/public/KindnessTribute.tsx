import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Cat, Smile, Star } from 'lucide-react';
import { KINDNESS_CARDS_DATA } from '../../data/kindnessCards';

export const KindnessTribute: React.FC = () => {
  return (
    <section id="kindness-tribute" className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-fredoka uppercase tracking-widest text-[#FF4D8D] font-bold">
          WHY WE ADORE HER 🪷
        </span>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800 mt-1">
          The Grace of Kindness
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
          Beyond the aesthetics and numbers, here is why Shree’s genuine warmth and gentle nature touch so many hearts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {KINDNESS_CARDS_DATA.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={`relative rounded-3xl p-7 border border-pink-100 bg-gradient-to-br ${card.bgGradient} shadow-sm hover:shadow-pop transition-all overflow-hidden flex flex-col justify-between`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-space font-bold tracking-widest uppercase text-[#FF4D8D] px-2.5 py-1 rounded-full bg-white/80 border border-pink-200">
                  {card.badge}
                </span>
                <span className="text-2xl">
                  {card.icon === 'cat' ? '🐱' : card.icon === 'lotus' ? '🪷' : card.icon === 'smile' ? '✨' : '💖'}
                </span>
              </div>

              <h3 className="text-xl font-fredoka font-bold text-gray-800 mb-2">
                {card.title}
              </h3>

              <p className="text-xs font-quicksand font-bold text-[#FF4D8D] mb-3 italic">
                "{card.quote}"
              </p>

              <p className="text-xs sm:text-sm font-quicksand text-gray-700 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-pink-200/50 flex items-center justify-between text-[11px] text-gray-500 font-caveat text-base">
              <span>Devotion & Grace</span>
              <span>March 6, 2027</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
