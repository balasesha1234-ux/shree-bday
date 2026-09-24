import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Sparkles, Heart, Terminal, Send, Crown, Shield, Laptop, ChevronDown, Check, Layers, Cpu, Instagram, Linkedin } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';
import { DEVELOPER_CONTACTS } from '../../data/developerContacts';

export const DeveloperLetter: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [showTechStack, setShowTechStack] = useState<boolean>(false);
  const [hasStamped, setHasStamped] = useState<boolean>(false);

  const handleStamp = (e: React.MouseEvent) => {
    soundEngine.playSparkle(1.5);
    soundEngine.playTempleBell();
    triggerCustomConfetti(e.clientX, e.clientY);
    setHasStamped(true);
  };

  const scrollToWishWall = () => {
    soundEngine.playPop();
    const wall = document.getElementById('wish-wall');
    if (wall) {
      wall.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="developer-letter" className="relative w-full max-w-5xl mx-auto px-4 py-20 select-none">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-br from-[#D4A84B]/15 via-[#FF4D8D]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Header Pill & Title */}
      <div className="text-center max-w-2xl mx-auto mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-space text-xs font-bold shadow-sm border border-[#D4A84B]/30 mb-3"
        >
          <Code2 className="w-3.5 h-3.5 text-[#D4A84B]" />
          <span>FROM THE DEVELOPER’S DESK // ARCHITECT’S NOTE 💻</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800 tracking-tight">
          A Letter from the Developer
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2 leading-relaxed">
          Why this entire website was built from scratch, how it was created, and an open welcome to everyone celebrating Shree today.
        </p>
      </div>

      {/* Main Letter Scroll Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative bg-white/95 backdrop-blur-2xl rounded-3xl p-7 sm:p-12 md:p-14 border-2 border-[#D4A84B]/40 shadow-2xl gold-foil-border glass-3d-festive overflow-hidden text-gray-800"
      >
        {/* Decorative Corner Lotus Motifs */}
        <div className="absolute top-4 left-4 text-2xl sm:text-3xl opacity-25 pointer-events-none">🪷</div>
        <div className="absolute top-4 right-4 text-2xl sm:text-3xl opacity-25 pointer-events-none">🪷</div>

        {/* Letterhead Bar */}
        <div className="border-b border-amber-200/60 pb-6 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFD93D] via-[#D4A84B] to-amber-600 text-white flex items-center justify-center text-xl shadow-lg border border-white">
              👑
            </div>
            <div className="text-left">
              <h3 className="text-lg sm:text-xl font-fredoka font-bold text-gray-900 flex items-center gap-2">
                Karthik
                <span className="text-[10px] font-space font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-[#B88728] border border-amber-200">
                  WEBSITE ARCHITECT & BROTHER
                </span>
              </h3>
              <p className="text-xs font-space text-gray-500 mt-0.5">
                Handcrafted with React, TypeScript & Devotion • March 6, 2027
              </p>
            </div>
          </div>

          {/* Quick Action Badges */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playTap();
                setShowTechStack(!showTechStack);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-space font-medium transition-all"
              title="View Architecture Specs"
            >
              <Cpu className="w-3.5 h-3.5 text-[#D4A84B]" />
              <span>{showTechStack ? 'Hide Specs' : 'Tech Stack'}</span>
            </button>

            <div className="px-3 py-1.5 rounded-full bg-pink-50 border border-pink-200/80 text-[#FF4D8D] text-xs font-space font-bold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FF4D8D]" />
              <span>100% Custom Coded</span>
            </div>
          </div>
        </div>

        {/* Expandable Tech Stack Spec Drawer */}
        <AnimatePresence>
          {showTechStack && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-6"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-gray-900 text-emerald-400 font-mono text-xs shadow-inner border border-gray-800 space-y-2">
                <div className="flex items-center justify-between text-gray-400 border-b border-gray-800 pb-2 mb-2 font-space">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>shree-bday-platform // system architecture</span>
                  </span>
                  <span className="text-[10px] text-amber-400 font-bold">STATUS: OPERATIONAL 🟢</span>
                </div>
                <p>• <span className="text-gray-400">Framework:</span> React 18 + Vite (Ultralight SSR-ready bundle)</p>
                <p>• <span className="text-gray-400">Physics & Ambiance:</span> 2D Canvas Particle Engine (Lotus, Marigolds, Stardust, Kitty Paws)</p>
                <p>• <span className="text-gray-400">Motion & 3D:</span> Framer Motion + CSS 3D Tilt + Lenis Smooth Scroll</p>
                <p>• <span className="text-gray-400">Audio Engine:</span> Web Audio API synthesized flute harmonics & multi-track controller</p>
                <p>• <span className="text-gray-400">Security Architecture:</span> PrivateSecurityShield (Anti-capture, anti-drag, watermarked sanctuary)</p>
                <p>• <span className="text-gray-400">Lines of Code:</span> Hand-crafted thousands of lines with pride and love</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Letter Body Parchment */}
        <div className="relative rounded-2xl p-6 sm:p-8 border border-pink-100/80 inner-circle-message-box leading-relaxed font-quicksand text-base sm:text-lg space-y-5">
          <p className="font-playfair text-xl sm:text-2xl font-bold text-[#3D2040]">
            To Shree, and to every wonderful soul visiting this celebration:
          </p>

          <p>
            When someone’s voice and presence touch as many lives as Shree’s does, a simple one-line birthday wish or a fleeting social media story never felt like enough. I wanted to build something that could actually hold her story — a living, breathing digital world that reflects her devotion, her radiant kindness, her music, and her playful love for cats.
          </p>

          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-50/80 via-pink-50/50 to-amber-50/80 border-l-4 border-[#D4A84B] shadow-sm my-4">
            <p className="font-playfair text-lg sm:text-xl font-bold text-[#3D2040] italic leading-snug">
              "A small message would never do justice to what she means to her listeners, her friends, and to me as a sister. So I built an entire universe instead — where every diya can be lit, every milestone remembered, and every wish preserved forever."
            </p>
          </div>

          <p>
            Every single screen you see on this website — the <strong>Candle Blowout</strong>, the <strong>Spotify Realm</strong>, the <strong>Interactive Floating Diya Pond</strong>, the <strong>Celestial Ambiance Switcher</strong>, and the <strong>Wish Wall</strong> — was hand-crafted line by line late into the night. It was engineered not just with code, but with deep respect, genuine pride, and heartfelt prayer.
          </p>

          <p>
            To all of Shree’s listeners and friends: thank you for being here. Take your time exploring every corner of this platform. Light a diya for her on the water, listen to her spiritual melodies, challenge her high score in the arcade game, and leave your own blessings on the Wish Wall below.
          </p>

          <p className="font-semibold text-[#3D2040]">
            And to Shree: Happy Birthday, Devotional Queen! 🪷 May Sri Sri Radha-Govinda always bless your voice, may your smile remain as contagious as ever, and may this year bring you the infinite joy, peace, and love you so effortlessly give to the world.
          </p>

          {/* Calligraphy Signature & Seal Strip */}
          <div className="pt-6 mt-6 border-t border-amber-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-space text-gray-400 uppercase tracking-widest font-semibold block">
                With endless love, respect & pride,
              </span>
              <p className="font-caveat text-2xl sm:text-3xl text-[#FF4D8D] font-bold tracking-wide mt-0.5">
                Karthik 🛡️💻
              </p>
              <p className="text-xs font-space text-gray-500">
                Brother & Website Architect
              </p>
            </div>

            {/* Interactive Royal Sibling Wax Seal */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStamp}
              className={`flex items-center gap-2.5 px-4 py-2 rounded-2xl border-2 transition-all ${
                hasStamped
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-sm'
                  : 'bg-gradient-to-r from-amber-50 to-pink-50 border-[#D4A84B] text-gray-800 hover:shadow-md'
              }`}
              title="Click to stamp royal seal"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#D4A84B] to-amber-600 text-white flex items-center justify-center text-xs font-bold shadow-md">
                {hasStamped ? <Check className="w-4 h-4 text-white" /> : 'K♡S'}
              </div>
              <div className="text-left">
                <span className="text-[10px] font-space font-bold uppercase tracking-wider text-[#D4A84B] block leading-none">
                  {hasStamped ? 'SEAL VERIFIED' : 'STAMP SIBLING SEAL'}
                </span>
                <span className="text-xs font-fredoka font-bold text-gray-900">
                  {hasStamped ? 'Blessed by Karthik ✨' : 'Click to Bless 🪷'}
                </span>
              </div>
            </motion.button>
          </div>
        </div>

        {/* Developer's Contacts Section */}
        <div className="mt-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-50/70 via-pink-50/50 to-amber-50/70 border border-[#D4A84B]/30 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#D4A84B] to-amber-600 text-white flex items-center justify-center shadow-md border border-white">
              <Laptop className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-space uppercase tracking-widest text-[#B88728] font-bold">
                  DEVELOPER'S CONTACTS
                </span>
                <span className="text-[10px] font-space px-2 py-0.5 rounded-full bg-amber-200/60 text-amber-900 font-semibold">
                  OFFICIAL
                </span>
              </div>
              <p className="font-fredoka text-base font-bold text-gray-900 mt-0.5 flex items-center gap-1.5">
                <span>{DEVELOPER_CONTACTS.name}</span>
                <Shield className="w-3.5 h-3.5 text-blue-600 fill-blue-100" />
              </p>
              <p className="text-[11px] font-quicksand text-gray-600 max-w-sm">
                {DEVELOPER_CONTACTS.headline} • {DEVELOPER_CONTACTS.location}
              </p>
            </div>
          </div>

          {/* Social Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <a
              href={DEVELOPER_CONTACTS.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] text-white text-xs font-space font-bold shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>{DEVELOPER_CONTACTS.instagram.handle}</span>
            </a>

            <a
              href={DEVELOPER_CONTACTS.linkedin.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0077B5] text-white text-xs font-space font-bold shadow-sm hover:shadow-md hover:scale-105 active:scale-95 transition-all"
            >
              <Linkedin className="w-4 h-4" />
              <span>{DEVELOPER_CONTACTS.linkedin.name}</span>
            </a>
          </div>
        </div>

        {/* Footer Quick Links */}
        <div className="mt-8 pt-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-space text-gray-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Worldwide Birthday Realm // Shree 4.0</span>
          </div>

          <button
            onClick={scrollToWishWall}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF2D78] text-white font-fredoka font-semibold shadow-md hover:shadow-pop transition-all hover:scale-105 active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Your Birthday Wish for Shree 💌</span>
          </button>
        </div>
      </motion.div>
    </section>
  );
};
