import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Heart, Crown, Palette, Code, Compass, MessageSquareQuote, Shield, X, ZoomIn } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface InnerCircleMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bondBadge: string;
  image?: string;
  avatarIcon: string;
  badgeColor: string;
  borderGlow: string;
  message: string;
  signature: string;
  avatarSpeech: string;
  particles: string[];
  isKarthik?: boolean;
}

const INNER_CIRCLE_DATA: InnerCircleMember[] = [
  {
    id: 'arun',
    name: 'Arun',
    role: 'Visual Artist & Creative Partner',
    tagline: 'Crafted the Visual Soul & Assets 🎨',
    bondBadge: 'Visual Co-Creator • Creative Soul',
    image: '/assets/team/arun.jpg',
    avatarIcon: '🎨',
    badgeColor: 'bg-pink-100 text-[#FF4D8D] border-pink-200',
    borderGlow: 'hover:border-pink-300 hover:shadow-pink-100/70',
    message: 'Happy Birthday, Shree ✨💗 May life bless you with good health, endless happiness, and may you truly deserve every good thing in the world.🌸 I hope you’re always surrounded by love, positivity, laughter, and wonderful people, and I’m grateful that I was one of them. Once again, Happiest Birthday, Devotional Queen @shreenavalkishori ✨🤍🫠',
    signature: 'With endless love & creative blessings, Arun 🎨✨',
    avatarSpeech: 'Crafted every frame with pure joy for you, Shree! 🎨✨',
    particles: ['🎨', '✨', '🖌️', '🌈', '💖', '⭐']
  },
  {
    id: 'karthik',
    name: 'Karthik',
    role: 'Website Architect & Brother',
    tagline: 'Architected & Coded this Website 💻🛡️',
    bondBadge: 'Lifetime Guardian • Website Architect • Brother',
    avatarIcon: '👑',
    badgeColor: 'bg-amber-100 text-[#D4A84B] border-amber-200',
    borderGlow: 'hover:border-amber-300 hover:shadow-amber-100/70',
    isKarthik: true,
    message: 'Architected and built with endless pride, devotion, and gratitude for the kindest sister. I wanted to build something that could truly hold our memories and tell the story properly. May your voice continue to touch souls across the world, and may your devotion shine brighter every single day. Happy Birthday, Shree! 🪷✨',
    signature: 'Your brother & guardian always, Karthik 🛡️💻',
    avatarSpeech: 'Wrote thousands of lines of code just to see your smile today! 💻🛡️',
    particles: ['👑', '🛡️', '💻', '✨', '💛', '🪷']
  },
  {
    id: 'vardhan',
    name: 'Vardhan Prabhu ji',
    role: 'Spiritual Guide & Mentor',
    tagline: 'Spiritual Guidance & Devotional Path 🪷',
    bondBadge: 'Spiritual Beacon • Bhakti & Gita Guidance',
    avatarIcon: '🪷',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
    borderGlow: 'hover:border-purple-300 hover:shadow-purple-100/70',
    message: 'May the divine blessings of Sri Sri Radha Govinda always surround Shree Naval Kishori. May your voice remain a sacred offering of devotion, humility, and grace to the Lord. Hare Krishna! 🌸🪔',
    signature: 'In the divine service of Sri Sri Radha-Govinda, Vardhan Prabhu ji 🪷',
    avatarSpeech: 'May Radha Rani always shower her eternal grace on your riyaaz! 🪷🌸',
    particles: ['🪷', '🪔', '✨', '🌸', '🕉️', '💛']
  },
  {
    id: 'dhrubayan',
    name: 'Dhrubayan Ji',
    role: 'Special Blessings & Inner Circle',
    tagline: 'Special Blessings & Support ✨',
    bondBadge: 'Inner Circle Guide • Guiding Light',
    image: '/assets/team/dhrubayan.jpg',
    avatarIcon: '✨',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
    borderGlow: 'hover:border-blue-300 hover:shadow-blue-100/70',
    message: 'Wishing Shree a joyous, blissful, and fulfilling birthday! Keep illuminating every space you enter with your pure heart, gentle strength, and spiritual positivity. 🌟',
    signature: 'With warmest wishes & infinite positivity, Dhrubayan ✨',
    avatarSpeech: 'Keep spreading cosmic positive vibes everywhere you go! ⭐✨',
    particles: ['⭐', '✨', '⚡', '💫', '💙', '🌟']
  },
  {
    id: 'prasanya',
    name: 'Prasanya',
    role: 'Beloved Friend & Inner Circle',
    tagline: 'Karthik’s Favorite & Sister Circle 🌸',
    bondBadge: 'Soul Sister • Constant Sunshine & Cheerleader',
    image: '/assets/team/prasanya.jpg',
    avatarIcon: '🌸',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-200',
    borderGlow: 'hover:border-rose-300 hover:shadow-rose-100/70',
    message: 'Happiest Birthday to the sweetest, most graceful soul, Shree! 🌸✨ May your special year be overflowing with endless happiness, good health, divine blessings, and radiant smiles. You inspire so many with your warmth! Keep shining bright, gorgeous! 💖🪷',
    signature: 'Forever cheering for you with all my love, Prasanya 🌸💖',
    avatarSpeech: 'You are so cherished and loved, Shree! Keep shining! 🌸💕',
    particles: ['🌸', '💖', '🎀', '✨', '🌷', '🎂']
  }
];

// Interactive 3D Tilt Card Wrapper Component
interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const InnerCircleBlessings: React.FC = () => {
  const [likedIds, setLikedIds] = useState<{ [id: string]: number }>({
    arun: 24,
    karthik: 31,
    vardhan: 19,
    dhrubayan: 16,
    prasanya: 28
  });
  const [avatarSpeechActive, setAvatarSpeechActive] = useState<{ [id: string]: boolean }>({});
  const [avatarParticles, setAvatarParticles] = useState<{ id: string; emoji: string; x: number; y: number }[]>([]);
  const [selectedInspectMember, setSelectedInspectMember] = useState<InnerCircleMember | null>(null);
  const [siblingSealUnlocked, setSiblingSealUnlocked] = useState<boolean>(false);

  // Trigger Person-Specific Floating Particle Bursts
  const triggerPersonParticles = (member: InnerCircleMember, clientX?: number, clientY?: number) => {
    soundEngine.playHarmonicPop(Math.floor(Math.random() * 5));

    // Spawn 5 random particles from person's specific collection
    const newItems = Array.from({ length: 6 }).map((_, i) => ({
      id: `${member.id}-${Date.now()}-${i}-${Math.random()}`,
      emoji: member.particles[i % member.particles.length],
      x: (clientX || window.innerWidth / 2) + (Math.random() * 80 - 40),
      y: (clientY || window.innerHeight / 2) + (Math.random() * 60 - 30)
    }));

    setAvatarParticles((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setAvatarParticles((prev) => prev.filter((p) => !newItems.some((n) => n.id === p.id)));
    }, 1200);
  };

  const handleLike = (member: InnerCircleMember, e: React.MouseEvent) => {
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti(e.clientX, e.clientY);
    triggerPersonParticles(member, e.clientX, e.clientY);
    setLikedIds((prev) => ({ ...prev, [member.id]: (prev[member.id] || 0) + 1 }));
  };

  // Profile Picture Interactive Tap / Click Effect
  const handleAvatarClick = (member: InnerCircleMember, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playSparkle(1.6);
    triggerPersonParticles(member, e.clientX, e.clientY);

    // Toggle speech bubble over profile picture
    setAvatarSpeechActive((prev) => ({ ...prev, [member.id]: true }));
    setTimeout(() => {
      setAvatarSpeechActive((prev) => ({ ...prev, [member.id]: false }));
    }, 3200);
  };

  // Royal Sibling Seal Interaction
  const handleSiblingSealClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playWaxSealCrack();
    soundEngine.playTempleBell();
    triggerCustomConfetti(e.clientX, e.clientY);
    setSiblingSealUnlocked(true);
  };

  return (
    <section id="inner-circle" className="w-full max-w-6xl mx-auto px-4 py-24 select-none relative">
      {/* Decorative Warm Celestial Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-pink-200/25 via-amber-200/20 to-purple-200/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Floating Personal Particles Layer */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {avatarParticles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, scale: 0.5, x: p.x, y: p.y }}
              animate={{
                opacity: 0,
                scale: 1.8,
                y: p.y - 120,
                x: p.x + (Math.random() * 60 - 30)
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="absolute text-2xl filter drop-shadow-md select-none"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>

      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-space text-xs font-bold shadow-sm border border-[#D4A84B]/30 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4A84B]" />
          <span>CONFIDENTIAL // SIBLING SANCTUARY INNER CIRCLE 🕊️</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-playfair font-bold text-[#3D2040] tracking-tight">
          Blessings from Her Inner Circle 🪷
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2 leading-relaxed">
          Sacred keepsake letters and authentic birthday tributes from the core team, creators, and mentors who stand in Shree's corner. Tap anyone's profile picture for special interactive reactions! 🌸
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
        {INNER_CIRCLE_DATA.map((member, idx) => (
          <TiltCard
            key={member.id}
            className={`${idx === 4 ? 'md:col-span-2 md:max-w-2xl md:mx-auto w-full' : ''}`}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={`h-full bg-white/95 backdrop-blur-xl rounded-3xl p-7 sm:p-9 border-2 ${
                member.isKarthik ? 'gold-foil-border' : 'border-pink-100 hover:border-amber-300/60'
              } glass-3d-festive shadow-xl ${member.borderGlow} transition-all duration-300 flex flex-col justify-between relative overflow-hidden group`}
            >
              {/* Holographic Iridescent Sheen on Card Hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-pink-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div>
                {/* Top Row: Bond Relationship Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-space uppercase tracking-widest text-[#FF4D8D] font-bold bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                    {member.bondBadge}
                  </span>

                  {member.isKarthik && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#D4A84B]/20 text-[#B88728] font-space font-bold border border-[#D4A84B]/40 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-[#D4A84B]" />
                      WEBSITE ARCHITECT
                    </span>
                  )}
                </div>

                {/* Identity Header: Avatar + Title */}
                <div className="flex items-center gap-4 mb-5">
                  {/* Interactive Profile Picture Container */}
                  <div className="relative group/avatar cursor-pointer" onClick={(e) => handleAvatarClick(member, e)}>
                    {/* Pulsing Animated Aura Halo */}
                    <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-tr from-pink-400 via-amber-300 to-purple-400 opacity-60 blur-sm group-hover/avatar:opacity-100 group-hover/avatar:blur-md transition-all duration-300 animate-pulse" />

                    {member.image ? (
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
                        whileTap={{ scale: 0.94 }}
                        className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white shadow-lg bg-gray-100"
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/avatar:scale-110"
                        />
                        {/* Tap hint overlay on hover */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/avatar:opacity-100 transition-opacity flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-white drop-shadow" />
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-pink-50 to-amber-50 border-2 border-white flex items-center justify-center text-4xl shadow-lg"
                      >
                        {member.avatarIcon}
                      </motion.div>
                    )}

                    {/* Corner Mini Badge */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-white shadow-md border border-gray-100 flex items-center justify-center text-xs">
                      {member.id === 'karthik' ? '💻' : member.id === 'arun' ? '🎨' : member.id === 'prasanya' ? '🌸' : member.id === 'dhrubayan' ? '⭐' : '🪷'}
                    </div>

                    {/* Speech Bubble popping from Avatar on Click */}
                    <AnimatePresence>
                      {avatarSpeechActive[member.id] && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.8 }}
                          animate={{ opacity: 1, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.8 }}
                          className="absolute -top-16 left-0 z-50 whitespace-nowrap bg-gray-900 text-white text-[11px] font-fredoka px-3.5 py-1.5 rounded-2xl shadow-2xl border border-pink-400/50 flex items-center gap-1.5"
                        >
                          <span>{member.avatarSpeech}</span>
                          <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-gray-900 rotate-45 border-r border-b border-pink-400/50" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Name & Role */}
                  <div>
                    <h3 className="text-2xl font-fredoka font-bold text-gray-900 flex items-center gap-2">
                      {member.name}
                    </h3>
                    <span className={`inline-block text-[11px] font-space font-semibold px-2.5 py-0.5 rounded-full border mt-1 ${member.badgeColor}`}>
                      {member.role}
                    </span>
                    <p className="text-xs font-quicksand text-gray-500 mt-0.5">
                      {member.tagline}
                    </p>
                  </div>
                </div>

                {/* Message Box Styled as Elegant Parchment Card */}
                <div className="relative rounded-2xl p-6 border shadow-inner inner-circle-message-box transition-all duration-300">
                  <MessageSquareQuote className="w-7 h-7 text-[#FF4D8D]/25 absolute top-3 right-3" />
                  
                  <p className="font-quicksand text-sm sm:text-base leading-relaxed italic pr-4">
                    "{member.message}"
                  </p>

                  {/* Calligraphy Signature Line */}
                  <div className="mt-4 pt-3 border-t border-pink-100/60 flex items-center justify-between">
                    <span className="text-xs font-space text-gray-400 uppercase tracking-widest font-semibold">
                      Signed:
                    </span>
                    <p className="font-caveat text-lg sm:text-xl text-[#FF4D8D] font-bold tracking-wide">
                      {member.signature}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Action Strip: Reactions & Royal Seal */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                {/* Left Side: Sibling Seal (Karthik) or Photo Inspection */}
                <div className="flex items-center gap-2">
                  {member.isKarthik && (
                    <motion.button
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.94 }}
                      onClick={handleSiblingSealClick}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-[#D4A84B] text-white text-[11px] font-fredoka font-bold shadow-md hover:shadow-lg transition-all"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>{siblingSealUnlocked ? 'SEAL VERIFIED 🪷' : 'K ♡ S SIBLING SEAL'}</span>
                    </motion.button>
                  )}

                  {member.image && (
                    <button
                      onClick={() => setSelectedInspectMember(member)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-50 hover:bg-pink-50 text-gray-500 hover:text-[#FF4D8D] text-[11px] font-fredoka transition-colors border border-gray-200/60"
                    >
                      <ZoomIn className="w-3 h-3" />
                      <span>View Photo</span>
                    </button>
                  )}
                </div>

                {/* Right Side: Interactive Love Heart Button */}
                <button
                  onClick={(e) => handleLike(member, e)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-50 hover:bg-pink-100 text-[#FF4D8D] font-fredoka text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-sm"
                >
                  <Heart className="w-4 h-4 fill-[#FF4D8D]" />
                  <span>{likedIds[member.id]}</span>
                </button>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Sibling Seal Modal Popup */}
      <AnimatePresence>
        {siblingSealUnlocked && (
          <div
            onClick={() => setSiblingSealUnlocked(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#FFFDF8] rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-[#D4A84B] text-center"
            >
              <button
                onClick={() => setSiblingSealUnlocked(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-amber-400 via-[#D4A84B] to-yellow-600 flex items-center justify-center shadow-xl border-4 border-white mb-4">
                <span className="font-playfair text-2xl font-bold text-white tracking-widest">
                  K ♡ S
                </span>
              </div>

              <span className="text-[10px] font-space tracking-[0.3em] uppercase text-[#D4A84B] font-bold block mb-1">
                ROYAL SIBLING WARRANTY // OFFICIAL
              </span>
              <h3 className="text-2xl font-playfair font-bold text-[#3D2040]">
                Brother's Lifetime Guarantee
              </h3>

              <div className="my-5 p-5 rounded-2xl bg-amber-50/60 border border-amber-200/60 text-sm font-quicksand text-gray-800 leading-relaxed text-left space-y-2">
                <p className="font-bold text-[#3D2040]">
                  🛡️ Certified by Karthik for Shree Naval Kishori:
                </p>
                <p>• <strong>100% Unconditional Support:</strong> Whenever you need guidance, a listening ear, or someone in your corner.</p>
                <p>• <strong>Unlimited Study Banter:</strong> Valid for lifetime teasing about exams and studies.</p>
                <p>• <strong>Endless Pride:</strong> Forever in your audience, cheering on your music and devotion.</p>
              </div>

              <button
                onClick={() => setSiblingSealUnlocked(false)}
                className="px-8 py-2.5 rounded-full bg-gradient-to-r from-[#D4A84B] to-amber-500 text-white font-fredoka font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
              >
                Sealed With Love 🪷
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Enlarged Photo Inspection Modal */}
      <AnimatePresence>
        {selectedInspectMember && selectedInspectMember.image && (
          <div
            onClick={() => setSelectedInspectMember(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm sm:max-w-md w-full bg-white rounded-3xl p-6 shadow-2xl border border-pink-200 text-center overflow-hidden"
            >
              <button
                onClick={() => setSelectedInspectMember(null)}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-full aspect-square rounded-2xl overflow-hidden border-2 border-pink-200 shadow-md mb-4 bg-gray-50">
                <img
                  src={selectedInspectMember.image}
                  alt={selectedInspectMember.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h4 className="text-2xl font-fredoka font-bold text-gray-900">
                {selectedInspectMember.name}
              </h4>
              <p className="text-xs font-space text-[#FF4D8D] font-semibold mt-0.5">
                {selectedInspectMember.role}
              </p>
              <p className="text-xs font-quicksand text-gray-500 italic mt-2 px-4">
                "{selectedInspectMember.avatarSpeech}"
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
