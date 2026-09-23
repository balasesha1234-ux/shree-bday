import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';

interface StoryQuoteProps {
  primary: string;
  secondary: string;
  secondaryStyle?: string;
  badge?: string;
  delay?: number;
}

const StoryQuote: React.FC<StoryQuoteProps> = ({
  primary,
  secondary,
  secondaryStyle = 'font-caveat text-[#FF4D8D]',
  badge,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="text-center max-w-3xl mx-auto px-4 py-8"
    >
      {badge && (
        <span className="inline-block px-3 py-1 mb-4 rounded-full bg-pink-100/70 text-xs font-space font-semibold text-[#FF4D8D] uppercase tracking-wider">
          {badge}
        </span>
      )}

      {/* Main Classical Statement */}
      <h3 className="text-3xl sm:text-5xl md:text-6xl font-playfair font-bold text-[#3D2040] leading-snug sm:leading-tight">
        {primary}
      </h3>

      {/* Accented Devotional Response */}
      <p className={`text-2xl sm:text-4xl md:text-5xl font-bold mt-4 leading-relaxed ${secondaryStyle}`}>
        {secondary}
      </p>

      {/* Elegant Lotus Separator Underline (Never collides with text) */}
      <div className="flex items-center justify-center gap-2 mt-8 opacity-70">
        <div className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#FF4D8D]/40 to-pink-300" />
        <span className="text-xs">🪷</span>
        <div className="w-12 sm:w-20 h-[1.5px] bg-gradient-to-l from-transparent via-[#FF4D8D]/40 to-pink-300" />
      </div>
    </motion.div>
  );
};

export const ScrollScrubStory: React.FC = () => {
  return (
    <section className="relative w-full py-28 sm:py-36 px-4 bg-gradient-to-b from-[#FFF0F3] via-[#FFEBF0] to-[#FFF0F3] select-none overflow-hidden">
      
      {/* Soft Ambient Radial Warm Light */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-br from-[#FFD93D]/10 via-[#FF4D8D]/12 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-28 sm:space-y-36">
        
        {/* Section Header */}
        <div className="text-center pt-2">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/90 border border-pink-200/90 shadow-sm text-xs font-space font-semibold text-[#FF4D8D] backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
            <span>A LIVING RETROSPECTIVE • CHAPTER 2027</span>
          </motion.div>
        </div>

        {/* Quote 1 */}
        <StoryQuote
          badge="Movement I"
          primary="Some people simply exist."
          secondary="And some turn everyday moments into sacred music. 🪷"
          secondaryStyle="font-caveat text-[#FF4D8D]"
        />

        {/* Quote 2 */}
        <StoryQuote
          badge="Movement II"
          primary="Through quiet mornings and classical riyaaz,"
          secondary="you gave thousands a reason to pause, reflect, and smile. 🌸"
          secondaryStyle="font-quicksand text-[#FF4D8D]"
        />

        {/* Quote 3 */}
        <StoryQuote
          badge="Movement III"
          primary="A gentle heart that speaks to every stray,"
          secondary="a soul anchored in Vrindavan, and a bond that never breaks. 🐱💛"
          secondaryStyle="font-caveat text-amber-700"
        />

        {/* Quote 4 */}
        <StoryQuote
          badge="Movement IV • March 6, 2027"
          primary="Today isn't just another birthday."
          secondary="It is the dawn of your most radiant chapter yet. ✨🎂"
          secondaryStyle="font-fredoka text-[#FF4D8D]"
        />

      </div>
    </section>
  );
};
