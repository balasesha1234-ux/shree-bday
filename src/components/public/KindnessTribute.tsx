import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Cat, Smile, Star } from 'lucide-react';
import { KINDNESS_CARDS_DATA } from '../../data/kindnessCards';

export const KindnessTribute: React.FC = () => {
  return (
    <section id="kindness-tribute" className="w-full max-w-6xl mx-auto px-4 py-20 select-none">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
          <span>WHY WE CELEBRATE HER 🪷</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          The Grace of Kindness
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
          Beyond the aesthetics and numbers, here is why Shree’s genuine warmth and gentle nature touch so many hearts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {KINDNESS_CARDS_DATA.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
            className={`relative rounded-3xl p-6 border-2 border-pink-100/80 bg-gradient-to-br ${card.bgGradient} shadow-md hover:shadow-pop transition-all overflow-hidden flex flex-col justify-between group`}
          >
            <div>
              {/* Photo Thumbnail */}
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden bg-white/60 mb-5 shadow-sm border border-white">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: '50% 18%' }}
                />
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

              <p className="text-xs sm:text-sm font-quicksand text-gray-700 leading-relaxed">
                {card.description}
              </p>
            </div>

            <div className="mt-6 pt-3 border-t border-pink-200/50 flex items-center justify-between text-xs text-gray-500 font-caveat text-base">
              <span>Pure Heart & Devotion</span>
              <span>March 6, 2027</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
