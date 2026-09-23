import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Crown, Palette, Code, Compass, MessageSquareQuote } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface InnerCircleMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  image?: string;
  avatarIcon: string;
  badgeColor: string;
  borderGlow: string;
  message: string;
  isKarthik?: boolean;
}

const INNER_CIRCLE_DATA: InnerCircleMember[] = [
  {
    id: 'arun',
    name: 'Arun',
    role: 'Visual Artist & Creative Partner',
    tagline: 'Crafted the Visual Soul & Assets 🎨',
    image: '/assets/team/arun.jpg',
    avatarIcon: '🎨',
    badgeColor: 'bg-pink-100 text-[#FF4D8D] border-pink-200',
    borderGlow: 'hover:border-pink-300 hover:shadow-pink-100/60',
    message: 'Happy Birthday, Shree ✨💗 May life bless you with good health, endless happiness, and may you truly deserve every good thing in the world.🌸 I hope you’re always surrounded by love, positivity, laughter, and wonderful people, and I’m grateful that I was one of them. Once again, Happiest Birthday, Devotional Queen @shreenavalkishori ✨🤍🫠'
  },
  {
    id: 'karthik',
    name: 'Karthik',
    role: 'Website Architect & Brother',
    tagline: 'Architected & Coded this Website 💻🛡️',
    avatarIcon: '👑',
    badgeColor: 'bg-amber-100 text-[#D4A84B] border-amber-200',
    borderGlow: 'hover:border-amber-300 hover:shadow-amber-100/60',
    isKarthik: true,
    message: 'Architected and built with endless pride, devotion, and gratitude for the kindest sister. I wanted to build something that could truly hold our memories and tell the story properly. May your voice continue to touch souls across the world, and may your devotion shine brighter every single day. Happy Birthday, Shree! 🪷✨'
  },
  {
    id: 'vardhan',
    name: 'Vardhan Prabhu ji',
    role: 'Spiritual Guide & Mentor',
    tagline: 'Spiritual Guidance & Devotional Path 🪷',
    avatarIcon: '🪷',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    borderGlow: 'hover:border-purple-300 hover:shadow-purple-100/60',
    message: 'May the divine blessings of Sri Sri Radha Govinda always surround Shree Naval Kishori. May your voice remain a sacred offering of devotion and grace to the Lord. Hare Krishna! 🌸🪔'
  },
  {
    id: 'dhrubayan',
    name: 'Dhrubayan Ji',
    role: 'Special Blessings & Inner Circle',
    tagline: 'Special Blessings & Support ✨',
    image: '/assets/team/dhrubayan.jpg',
    avatarIcon: '✨',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    borderGlow: 'hover:border-blue-300 hover:shadow-blue-100/60',
    message: 'Wishing Shree a joyous, blissful, and fulfilling birthday! Keep illuminating every space you enter with your pure heart and spiritual positivity. 🌟'
  },
  {
    id: 'prasanya',
    name: 'Prasanya',
    role: 'Beloved Friend & Inner Circle',
    tagline: 'Karthik’s Favorite & Sister Circle 🌸',
    image: '/assets/team/prasanya.jpg',
    avatarIcon: '🌸',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    borderGlow: 'hover:border-rose-300 hover:shadow-rose-100/60',
    message: 'Happiest Birthday to the sweetest, most graceful soul, Shree! 🌸✨ May your special year be overflowing with endless happiness, good health, divine blessings, and radiant smiles. You inspire so many with your warmth! Keep shining bright, gorgeous! 💖🪷'
  }
];

export const InnerCircleBlessings: React.FC = () => {
  const [likedIds, setLikedIds] = useState<{ [id: string]: number }>({
    arun: 24,
    karthik: 31,
    vardhan: 19,
    dhrubayan: 16,
    prasanya: 28
  });
  const [activeHeart, setActiveHeart] = useState<string | null>(null);

  const handleLike = (id: string, e: React.MouseEvent) => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti(e.clientX, e.clientY);
    setLikedIds((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setActiveHeart(id);
    setTimeout(() => setActiveHeart(null), 800);
  };

  return (
    <section id="inner-circle" className="w-full max-w-6xl mx-auto px-4 py-20 select-none relative">
      {/* Decorative Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-pink-200/20 via-amber-200/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
          <span>THE INNER CIRCLE 🕊️</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Blessings from Her Inner Circle
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
          Special birthday letters and heartfelt tributes from the core team, creators, and mentors who stand in Shree's corner.
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {INNER_CIRCLE_DATA.map((member, idx) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className={`bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-8 border-2 border-pink-100 shadow-lg ${member.borderGlow} transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
              idx === 4 ? 'md:col-span-2 md:max-w-2xl md:mx-auto w-full' : ''
            }`}
          >
            {/* Top Row: Avatar & Identity */}
            <div>
              <div className="flex items-center gap-4 mb-5">
                {/* Photo or Icon Avatar */}
                <div className="relative">
                  {member.image ? (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-pink-300 shadow-md">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-pink-50 to-amber-50 border-2 border-pink-200 flex items-center justify-center text-3xl sm:text-4xl shadow-md">
                      {member.avatarIcon}
                    </div>
                  )}

                  {/* Corner Mini Badge */}
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow flex items-center justify-center text-xs">
                    {member.id === 'karthik' ? '💻' : member.id === 'arun' ? '🎨' : '🪷'}
                  </div>
                </div>

                {/* Name & Titles */}
                <div>
                  <h3 className="text-2xl font-fredoka font-bold text-gray-900 flex items-center gap-2">
                    {member.name}
                    {member.isKarthik && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#D4A84B]/15 text-[#D4A84B] font-space font-bold border border-[#D4A84B]/30">
                        ARCHITECT
                      </span>
                    )}
                  </h3>
                  <span className={`inline-block text-[11px] font-space font-semibold px-2.5 py-0.5 rounded-full border mt-1 ${member.badgeColor}`}>
                    {member.role}
                  </span>
                  <p className="text-xs font-quicksand text-gray-500 mt-0.5">
                    {member.tagline}
                  </p>
                </div>
              </div>

              {/* Message Box */}
              <div className="relative bg-gradient-to-br from-pink-50/50 via-white to-amber-50/30 rounded-2xl p-5 sm:p-6 border border-pink-100 shadow-inner">
                <MessageSquareQuote className="w-6 h-6 text-[#FF4D8D]/20 absolute top-3 right-3" />
                <p className="font-quicksand text-sm sm:text-base text-gray-800 leading-relaxed italic">
                  "{member.message}"
                </p>
              </div>
            </div>

            {/* Bottom Action Strip */}
            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-space text-gray-400 font-medium">
                Verified Inner Circle Tribute ✨
              </span>

              <button
                onClick={(e) => handleLike(member.id, e)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-[#FF4D8D] font-fredoka text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
              >
                <Heart className={`w-4 h-4 fill-[#FF4D8D] transition-transform ${activeHeart === member.id ? 'scale-125' : ''}`} />
                <span>{likedIds[member.id]}</span>
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
