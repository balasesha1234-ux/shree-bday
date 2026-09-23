import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Music, Sparkles, Heart, Shield, Star, Award, ArrowDown } from 'lucide-react';

interface MilestoneItem {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tag: string;
  side: 'left' | 'right';
}

const MILESTONES: MilestoneItem[] = [
  {
    step: '01',
    title: 'The First Resonance',
    subtitle: 'Classical Roots & Sacred Melodies',
    description: 'From early morning riyaaz to the sacred flute melodies that resonated across hearts, every note was planted with care.',
    icon: <Music className="w-5 h-5 text-[#FF4D8D]" />,
    tag: 'Chapter I • Genesis',
    side: 'left',
  },
  {
    step: '02',
    title: 'Vrindavan Calling',
    subtitle: 'Sacred Hymns & Deepening Faith',
    description: 'Immersed in devotion, chanting the Vishnu Stotram and sacred bhajans that brought solace, peace, and spiritual light to thousands.',
    icon: <Sparkles className="w-5 h-5 text-[#E5C158]" />,
    tag: 'Chapter II • Devotion',
    side: 'right',
  },
  {
    step: '03',
    title: 'The Worldwide Alliance',
    subtitle: '1,420+ Hearts Across The Globe',
    description: 'A growing family of listeners, well-wishers, and kindred spirits who find peace and genuine smiles in every shared creation.',
    icon: <Heart className="w-5 h-5 text-[#FF4D8D]" />,
    tag: 'Chapter III • Community',
    side: 'left',
  },
  {
    step: '04',
    title: 'The Sibling Shield',
    subtitle: 'Unspoken Bond & Guardian Pride',
    description: 'Through every season, inside jokes, and quiet trials—an unbreakable foundation of sibling respect, loyalty, and fierce support.',
    icon: <Shield className="w-5 h-5 text-[#3D2040]" />,
    tag: 'Chapter IV • Kinship',
    side: 'right',
  },
  {
    step: '05',
    title: 'The Golden Chapter',
    subtitle: 'March 6, 2027 & Beyond',
    description: 'Stepping forward into her most radiant year yet—with new devotional creations, boundless grace, and an entire universe cheering her on.',
    icon: <Star className="w-5 h-5 text-[#FFD93D]" />,
    tag: 'Chapter V • The Future',
    side: 'left',
  },
];

export const ConnectedMilestoneRoadmap: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dynamic scroll scrub for the central connecting laser line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.75', 'end 0.85'],
  });

  return (
    <section
      ref={containerRef}
      className="relative w-full py-24 sm:py-32 px-4 bg-gradient-to-b from-[#FFF0F3] via-[#FFF5F7] to-[#FFF0F3] select-none overflow-hidden"
    >
      {/* Background Soft Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-gradient-to-br from-[#FFD93D]/10 via-[#FF4D8D]/15 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header (replays on scroll) */}
        <div className="text-center max-w-2xl mx-auto mb-20 sm:mb-28 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 text-[#FF4D8D] font-space text-xs font-semibold shadow-sm backdrop-blur-md"
          >
            <Award className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
            <span>THE SACRED RETROSPECTIVE • 01 TO 05</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-fredoka font-bold text-[#3D2040] tracking-tight"
          >
            A Journey of <span className="text-gradient-pink">Grace & Light.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-quicksand text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            Five defining chapters connecting her classical melodies, devotional heart, and the people who cherish her journey.
          </motion.p>
        </div>

        {/* Connected Vertical Timeline */}
        <div className="relative">
          {/* Background Track Guide Line */}
          <div className="absolute top-6 bottom-44 left-6 md:left-1/2 -translate-x-1/2 w-1 bg-pink-200/50 rounded-full" />

          {/* Dynamic Laser Line that grows as you scroll down and wraps back when you scroll up */}
          <motion.div
            style={{ scaleY: scrollYProgress, originY: 0 }}
            className="absolute top-6 bottom-44 left-6 md:left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-[#FFD93D] via-[#FF4D8D] to-[#E5C158] rounded-full shadow-[0_0_16px_rgba(255,77,141,0.65)] z-10"
          />

          {/* Timeline Nodes & Cards */}
          <div className="space-y-12 sm:space-y-16">
            {MILESTONES.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.step}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Central Node Badge (replays on scroll) */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, margin: '-70px' }}
                    transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 w-12 h-12 rounded-full bg-white border-4 border-[#FF4D8D] shadow-[0_0_20px_rgba(255,77,141,0.5)] flex items-center justify-center group cursor-pointer hover:scale-115 transition-transform"
                  >
                    <span className="font-space text-xs font-bold text-[#FF4D8D] group-hover:text-[#FF2D78]">
                      {item.step}
                    </span>
                  </motion.div>

                  {/* Card Content Container (replays on scroll) */}
                  <div className="w-full pl-16 md:pl-0 md:w-[46%]">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -45 : 45, y: 20, scale: 0.96 }}
                      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                      viewport={{ once: false, margin: '-70px' }}
                      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                      className={`p-6 sm:p-8 rounded-3xl bg-white/85 hover:bg-white border-2 border-pink-200/80 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:border-pink-300 group ${
                        isEven ? 'md:text-right' : 'md:text-left'
                      }`}
                    >
                      {/* Tag & Icon Row */}
                      <div
                        className={`flex items-center gap-2 mb-3 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-pink-50 flex items-center justify-center border border-pink-200">
                          {item.icon}
                        </div>
                        <span className="font-space text-xs font-semibold text-[#FF4D8D] uppercase tracking-wider">
                          {item.tag}
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="font-fredoka text-xl sm:text-2xl font-bold text-[#3D2040] group-hover:text-[#FF4D8D] transition-colors">
                        {item.title}
                      </h3>
                      <h4 className="font-caveat text-lg sm:text-xl text-[#E5C158] font-bold mt-0.5 mb-3">
                        {item.subtitle}
                      </h4>

                      {/* Description */}
                      <p className="font-quicksand text-sm sm:text-base text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Grand Terminus Bridge (Fixes abrupt ending below Chapter 05) */}
          <div className="relative pt-20 pb-4 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0, opacity: 0, y: 25 }}
              whileInView={{ scale: 1, opacity: 1, y: 0 }}
              viewport={{ once: false, margin: '-70px' }}
              transition={{ type: 'spring', stiffness: 240, damping: 20 }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Central Glowing Lotus Medallion */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-white via-[#FFF5F7] to-[#FFE5EC] border-4 border-[#E5C158] shadow-[0_0_35px_rgba(229,193,88,0.5)] flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform">
                <div className="absolute inset-0 rounded-full border border-pink-300 animate-ping opacity-25 pointer-events-none" />
                <span className="text-2xl sm:text-3xl filter drop-shadow">🪷</span>
              </div>

              {/* Terminus Narrative & Flow Guide */}
              <div className="mt-6 max-w-lg px-4 space-y-2">
                <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-100 via-pink-100 to-amber-100 border border-amber-300/80 text-[#3D2040] font-space text-xs font-bold tracking-wider uppercase shadow-sm">
                  ✨ THE UNWRITTEN CHAPTERS AHEAD ✨
                </span>
                <h3 className="font-playfair text-2xl sm:text-4xl font-bold text-[#3D2040] pt-1">
                  Her Sacred Journey Continues...
                </h3>
                <p className="font-quicksand text-sm sm:text-base text-gray-600 leading-relaxed max-w-md mx-auto">
                  Every note played, every prayer chanted, and every kind smile shared has led to this moment.
                </p>

                {/* Transition Bridge downward into Moments Gallery */}
                <div className="flex flex-col items-center pt-6">
                  <div className="w-[2px] h-14 bg-gradient-to-b from-[#E5C158] via-[#FF4D8D]/60 to-transparent rounded-full" />
                  <div className="text-[#FF4D8D] -mt-1 animate-bounce">
                    <ArrowDown className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
