import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface StoryLine {
  text: string;
  stepIndex?: number;
  highlight?: boolean;
  glow?: boolean;
  underlineWord?: string;
  circleWord?: string;
}

const STORY_LINES: StoryLine[] = [
  { text: "Some souls walk into this world quietly.", stepIndex: 0 },
  { text: "And some turn everyday moments into sacred music.", stepIndex: 1 },
  { text: "" }, // spacer
  { text: "Through quiet mornings and classical riyaaz,", stepIndex: 2 },
  { text: "you gave thousands a gentle reason to pause.", stepIndex: 3 },
  { text: "A reason to listen, to breathe, and to smile.", stepIndex: 4, underlineWord: "smile" },
  { text: "" }, // spacer
  { text: "A playful heart that talks to every stray cat,", stepIndex: 5 },
  { text: "a spirit deeply anchored in Vrindavan's devotion,", stepIndex: 6 },
  { text: "and an unspoken bond that never breaks.", stepIndex: 7, circleWord: "never breaks" },
  { text: "" }, // spacer
  { text: "Others measure time in years that fade away.", stepIndex: 8 },
  { text: "We measure it in the warmth and joy you bring.", stepIndex: 9 },
  { text: "" }, // spacer
  { text: "Today isn't just another birthday milestone.", stepIndex: 10 },
  {
    text: "It is the dawn of your most radiant chapter yet.",
    stepIndex: 11,
    glow: true,
    highlight: true,
    underlineWord: "radiant chapter",
  },
];

export const ScrollScrubStory: React.FC = () => {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Progressive scroll tracking with comfortable offset
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 0.85', 'end 0.65'],
  });

  const [activeIndices, setActiveIndices] = useState<Set<number>>(() => new Set([0]));

  // Total numbered steps
  const totalSteps = useMemo(
    () => STORY_LINES.filter((line) => line.stepIndex !== undefined).length,
    []
  );

  // Progressively reveal sentences and trigger animations as user scrolls
  const updateActiveLines = useCallback(
    (progress: number) => {
      setActiveIndices((prev) => {
        let changed = false;
        const next = new Set<number>();
        for (let i = 0; i < totalSteps; i++) {
          const threshold = i / totalSteps;
          if (progress >= threshold) {
            next.add(i);
            if (!prev.has(i)) changed = true;
          }
        }
        if (next.size !== prev.size) changed = true;
        return changed ? next : prev;
      });
    },
    [totalSteps]
  );

  // 1. Framer motion scroll event listener
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    updateActiveLines(latest);
  });

  // 2. High-precision Lenis & native window scroll listener
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.65;
      const totalDist = rect.height - (start - end);
      const currentDist = start - rect.top;
      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      updateActiveLines(progress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    // Also connect to window.lenis if active
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (lenis) {
        lenis.off('scroll', handleScroll);
      }
    };
  }, [updateActiveLines]);

  return (
    <section
      id="retrospective"
      aria-label="A Living Retrospective"
      className="relative bg-gradient-to-b from-[#FFF0F3] via-[#FFEBF0] to-[#FFF0F3] select-none"
    >
      {/* Soft Ambient Radial Warm Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#FFD93D]/12 via-[#FF4D8D]/15 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#FF4D8D]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Introductory Header (Scrolls naturally into the sticky track) */}
      <div className="container relative z-10 px-6 max-w-4xl mx-auto pt-20 md:pt-28 pb-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-200/80 shadow-sm text-xs font-space font-semibold text-[#FF4D8D] mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158] fill-[#E5C158]" />
            <span>THE RETROSPECTIVE • SCROLL JOURNEY</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold text-[#3D2040] leading-tight max-w-2xl">
            Every quiet melody,{' '}
            <span className="bg-gradient-to-r from-[#FF4D8D] via-[#FF75A0] to-[#E5C158] bg-clip-text text-transparent">
              leading to this sacred dawn.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* The Scroll Track: Pinned Sticky Retrospective */}
      <div ref={trackRef} className="relative z-10 min-h-[220vh] py-12 md:py-20">
        <div className="sticky top-[15vh] sm:top-[18vh] md:top-[22vh] container px-6 max-w-3xl mx-auto">
          <div className="space-y-3.5 sm:space-y-4 md:space-y-5">
            {STORY_LINES.map((line, idx) => {
              if (line.text === '') {
                return <div key={`spacer-${idx}`} className="h-4 sm:h-6" />;
              }

              const isActive = line.stepIndex !== undefined && activeIndices.has(line.stepIndex);

              return (
                <p
                  key={`line-${idx}`}
                  className={`text-lg sm:text-xl md:text-2xl lg:text-[28px] font-playfair leading-relaxed text-center transition-all duration-500 ease-out ${
                    line.glow && isActive
                      ? 'font-bold opacity-100'
                      : line.highlight && isActive
                      ? 'text-[#FF4D8D] font-bold opacity-100'
                      : isActive
                      ? 'text-[#3D2040] font-semibold opacity-100 drop-shadow-[0_1px_1px_rgba(255,255,255,0.7)]'
                      : 'text-[#3D2040]/25 font-normal opacity-25'
                  }`}
                >
                  {/* Underline Word Reveal (Direct Hardware-Accelerated scaleX) */}
                  {line.underlineWord ? (
                    (() => {
                      const parts = line.text.split(line.underlineWord);
                      return (
                        <span className={line.glow && isActive ? 'bg-gradient-to-r from-[#FF4D8D] via-[#FF75A0] to-[#E5C158] bg-clip-text text-transparent font-bold' : ''}>
                          {parts[0]}
                          <span className="relative inline-block font-semibold">
                            <span className={line.glow && isActive ? 'bg-gradient-to-r from-[#FF4D8D] via-[#FF75A0] to-[#E5C158] bg-clip-text text-transparent font-bold' : ''}>
                              {line.underlineWord}
                            </span>
                            <span
                              style={{
                                transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                                transformOrigin: 'left center',
                                transition: 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
                              }}
                              className="absolute inset-x-0 -bottom-0.5 sm:-bottom-1 h-[2.5px] rounded-full bg-gradient-to-r from-[#FF4D8D] via-[#FF75A0] to-[#E5C158] pointer-events-none"
                            />
                          </span>
                          {parts[1]}
                        </span>
                      );
                    })()
                  ) : line.circleWord ? (
                    /* Circle Word Reveal (Direct SVG strokeDashoffset animation) */
                    (() => {
                      const parts = line.text.split(line.circleWord);
                      return (
                        <>
                          {parts[0].replace(/ $/, '\u00a0')}
                          <span className="relative inline-block px-1.5 font-semibold text-[#3D2040]">
                            {line.circleWord}
                            <span className="absolute -inset-x-2.5 -inset-y-1 w-[calc(100%+20px)] h-[calc(100%+8px)] pointer-events-none">
                              <svg
                                className="w-full h-full overflow-visible"
                                viewBox="0 0 100 40"
                                preserveAspectRatio="none"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <ellipse
                                  cx="50"
                                  cy="20"
                                  rx="47"
                                  ry="17"
                                  stroke="#E5C158"
                                  strokeWidth="2.5"
                                  strokeDasharray="200"
                                  strokeDashoffset={isActive ? 0 : 200}
                                  style={{
                                    opacity: isActive ? 1 : 0,
                                    transition:
                                      'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease-out',
                                  }}
                                />
                              </svg>
                            </span>
                          </span>
                          {parts[1]}
                        </>
                      );
                    })()
                  ) : line.glow && isActive ? (
                    <span className="bg-gradient-to-r from-[#FF4D8D] via-[#FF75A0] to-[#E5C158] bg-clip-text text-transparent font-bold">
                      {line.text}
                    </span>
                  ) : (
                    line.text
                  )}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
