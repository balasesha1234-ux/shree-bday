import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Heart, Music, Shield } from 'lucide-react';

interface ScrubSentenceProps {
  children: React.ReactNode;
  range: [number, number];
  progress: any;
  highlightWord?: string;
}

const ScrubSentence: React.FC<ScrubSentenceProps> = ({
  children,
  range,
  progress,
}) => {
  const opacity = useTransform(progress, [range[0] - 0.08, range[0], range[1], range[1] + 0.08], [0.2, 1, 1, 0.35]);
  const y = useTransform(progress, [range[0] - 0.08, range[0], range[1], range[1] + 0.08], [15, 0, 0, -8]);
  const scale = useTransform(progress, [range[0] - 0.08, range[0], range[1], range[1] + 0.08], [0.97, 1, 1, 0.99]);

  return (
    <motion.p
      style={{ opacity, y, scale }}
      className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-[#3D2040] leading-snug sm:leading-tight transition-colors duration-200"
    >
      {children}
    </motion.p>
  );
};

export const ScrollScrubStory: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section
      ref={containerRef}
      className="relative min-h-[220vh] bg-gradient-to-b from-[#FFF0F3] via-[#FFEBF0] to-[#FFF0F3] select-none"
    >
      {/* Sticky Viewport Container that stays pinned as you scroll */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-8 text-center max-w-5xl mx-auto overflow-hidden">
        
        {/* Subtle Ambient Radial Glow */}
        <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#FFD93D]/15 via-[#FF4D8D]/20 to-transparent blur-3xl pointer-events-none" />

        {/* Small Section Pill Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-pink-200 shadow-sm text-xs font-space font-semibold text-[#FF4D8D] mb-8 sm:mb-12 backdrop-blur-md"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
          <span>A LIVING RETROSPECTIVE • SCROLL TO READ</span>
        </motion.div>

        {/* The Scrubbed Sentences Sequence */}
        <div className="flex flex-col items-center justify-center space-y-6 sm:space-y-10 min-h-[320px]">
          <ScrubSentence range={[0.05, 0.22]} progress={scrollYProgress}>
            Some people simply exist. <br />
            <span className="text-[#FF4D8D] font-caveat text-3xl sm:text-5xl md:text-6xl inline-block mt-1">
              And some turn everyday moments into sacred music.
            </span>
          </ScrubSentence>

          <ScrubSentence range={[0.26, 0.45]} progress={scrollYProgress}>
            Through quiet mornings and classical melodies, <br />
            <span className="bg-gradient-to-r from-[#FF4D8D] via-[#FF80AC] to-[#E5C158] bg-clip-text text-transparent">
              you gave thousands a reason to pause and smile.
            </span>
          </ScrubSentence>

          <ScrubSentence range={[0.49, 0.68]} progress={scrollYProgress}>
            A heart that talks to cats, <br />
            <span className="text-[#3D2040] font-normal italic">
              a soul anchored in Vrindavan, and a bond that never breaks.
            </span>
          </ScrubSentence>

          <ScrubSentence range={[0.72, 0.92]} progress={scrollYProgress}>
            Today isn't just another birthday. <br />
            <span className="text-[#FF4D8D] font-bold">
              It is the dawn of your most magnificent chapter yet. 🪷✨
            </span>
          </ScrubSentence>
        </div>

        {/* Scroll Progress Indicator Line at Bottom of Viewport */}
        <div className="absolute bottom-10 inset-x-8 sm:inset-x-24 flex flex-col items-center gap-2 pointer-events-none">
          <div className="w-full max-w-md h-1 bg-pink-200/60 rounded-full overflow-hidden">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
              className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF4D8D] to-[#FF2D78] rounded-full"
            />
          </div>
          <span className="font-space text-[10px] text-gray-500 uppercase tracking-widest">
            Scroll Journey • 2027 Chapter
          </span>
        </div>

      </div>
    </section>
  );
};
