import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Shield, Mail, Award, Quote, ChevronDown, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface InnerCircleMentor {
  id: string;
  name: string;
  role: string;
  emblem: string;
  tagline: string;
  accentColor: string;
  message: string;
  isKarthik?: boolean;
}

const INNER_CIRCLE_MENTORS: InnerCircleMentor[] = [
  {
    id: 'vardhan',
    name: 'Vardhan Prabhu ji',
    role: 'Spiritual Guide & Devotional Anchor',
    emblem: '🪷',
    tagline: 'Grace of Vrindavan & The Bhagavad Gita',
    accentColor: 'from-[#FFD93D] to-[#E5C158]',
    message: 'May Srimati Radharani always shower Her causeless mercy and divine protection upon you. May your devotional singing and classical melodies continue to be an offering of love and a source of peace for all souls.',
  },
  {
    id: 'dhrubayan',
    name: 'Dhrubayan Ji',
    role: 'Artistic Resonance & Harmony',
    emblem: '🎶',
    tagline: 'Classical Melodies & Sacred Ragas',
    accentColor: 'from-[#FF4D8D] to-[#FF80AC]',
    message: 'Wishing you a magnificent birthday! May your swaras and flute melodies blossom with even greater depth, purity, and sacred resonance in the golden chapter ahead.',
  },
  {
    id: 'arun',
    name: 'Arun',
    role: 'Visual Assets & Creative Support',
    emblem: '🎨',
    tagline: 'Illustrations & Visual Tribute',
    accentColor: 'from-[#6BC5F8] to-[#7CEBC6]',
    message: 'Happiest birthday Shree! It was an absolute joy bringing visual warmth and creative touches to celebrate the radiant smiles and positivity you share with the world.',
  },
];

export const BrothersLetter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sealCracked, setSealCracked] = useState(false);

  const handleOpenLetter = () => {
    if (!isOpen) {
      setSealCracked(true);
      soundEngine.playSparkle(1.4);
      triggerCustomConfetti();
      setTimeout(() => {
        setIsOpen(true);
      }, 400);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <section id="brothers-letter" className="relative w-full py-20 sm:py-28 px-4 bg-gradient-to-b from-[#FFF0F3] via-[#FFEBF0] to-[#FFF0F3] select-none overflow-hidden">
      
      {/* Background Soft Radiance */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-[#FFD93D]/12 via-[#FF4D8D]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ========================================================================= */}
        {/* BOLD CREATOR ATTRIBUTION BANNER */}
        {/* ========================================================================= */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2.5 px-6 py-2 rounded-full bg-gradient-to-r from-amber-500 via-[#FF4D8D] to-amber-500 text-white shadow-lg text-xs sm:text-sm font-space font-bold tracking-wider uppercase"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>ARCHITECTED & HAND-CODED WITH ❤️ BY KARTHIK FOR HIS DIDIII</span>
            <Sparkles className="w-4 h-4 fill-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-playfair text-3xl sm:text-5xl md:text-6xl font-bold text-[#3D2040] mt-5 leading-tight"
          >
            A Brother’s Sacred Letter.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-quicksand text-base sm:text-lg text-gray-700 max-w-2xl mx-auto mt-3 leading-relaxed"
          >
            Why a single birthday message was never enough, and why this entire website was built for you.
          </motion.p>
        </div>

        {/* ========================================================================= */}
        {/* THE ROYAL WAX-SEALED LETTER ENVELOPE */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl bg-gradient-to-b from-[#FFFDFD] via-white to-[#FFF5F7] border-2 border-pink-200/90 shadow-2xl overflow-hidden p-6 sm:p-10 md:p-14"
        >
          {/* Subtle Corner Florals */}
          <div className="absolute top-4 left-4 text-pink-200/60 text-2xl select-none">🪷</div>
          <div className="absolute top-4 right-4 text-pink-200/60 text-2xl select-none">🪷</div>

          {/* Envelope Header Strip */}
          <div className="flex flex-col sm:flex-row items-center justify-between pb-6 mb-8 border-b border-pink-100 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-[#FF2D78] flex items-center justify-center text-white shadow-md">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <span className="font-space text-xs font-bold text-[#FF4D8D] uppercase tracking-wider block">
                  PERSONAL CORRESPONDENCE • JULY 2026 — MARCH 2027
                </span>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#3D2040]">
                  From: Karthik • To: Shree Didiii
                </h3>
              </div>
            </div>

            {/* Tap To Open / Close Toggle Button */}
            <button
              onClick={handleOpenLetter}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF2D78] text-white font-space text-xs font-bold shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <span>{isOpen ? 'Fold Letter' : 'Break Seal & Unfold Letter'}</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Sealed Teaser Banner when closed */}
          {!isOpen && (
            <div className="py-12 flex flex-col items-center justify-center text-center cursor-pointer group" onClick={handleOpenLetter}>
              {/* Interactive Wax Seal Button */}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-[#990022] via-[#C9184A] to-[#FF4D8D] border-4 border-[#FFD93D] shadow-[0_0_35px_rgba(201,24,74,0.6)] flex items-center justify-center transition-all ${
                  sealCracked ? 'scale-110 opacity-75' : ''
                }`}
              >
                <div className="absolute inset-1.5 rounded-full border border-amber-300/40 border-dashed" />
                <div className="flex flex-col items-center">
                  <span className="font-playfair text-xl sm:text-2xl font-bold text-white tracking-widest drop-shadow-md">
                    K ♡ S
                  </span>
                  <span className="text-[9px] font-space text-amber-200 uppercase tracking-widest mt-0.5">
                    SACRED BOND
                  </span>
                </div>
              </motion.div>

              <p className="font-playfair text-xl sm:text-2xl font-bold text-[#3D2040] mt-6 group-hover:text-[#FF4D8D] transition-colors">
                Tap the wax seal to unfold Karthik's letter
              </p>
              <p className="font-quicksand text-xs sm:text-sm text-gray-500 mt-1 max-w-md">
                A heartfelt tribute written straight from his memories and gratitude for his Didiii.
              </p>
            </div>
          )}

          {/* ========================================================================= */}
          {/* THE AUTHENTIC LETTER CONTENT (KARTHIK'S EXACT WORDS) */}
          {/* ========================================================================= */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="pt-4 pb-8 space-y-6 text-[#3D2040] font-quicksand text-base sm:text-lg leading-relaxed border-t border-pink-100">
                  
                  {/* Salutation */}
                  <p className="font-playfair text-2xl sm:text-3xl font-bold text-[#FF4D8D]">
                    Hare Krishna Didiii, Hope your doing well,
                  </p>

                  <p>
                    I genuinely don't know how to explain all of this.
                  </p>

                  <p>
                    You mean so much to me that sometimes I don't even know where to begin. There are so many things I want to say, so many memories that stay in my head, and somehow putting all of it into words feels impossible.
                  </p>

                  {/* Highlight Callout 1: Why I Made This Website */}
                  <div className="p-5 sm:p-7 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50/50 to-amber-50 border-l-4 border-[#FF4D8D] shadow-sm my-6">
                    <p className="font-playfair text-lg sm:text-xl font-bold text-[#3D2040] italic">
                      "And honestly, that's one of the reasons I made this entire website. I didn't want to just send you a small birthday wish and say, 'Happy Birthday, Shree,' and leave it at that."
                    </p>
                  </div>

                  <p>
                    A small birthday message doesn't feel like enough to express the gratitude I have for you, the memories we've made, the things you've done for me, and what you have come to mean in my life.
                  </p>

                  <p className="font-semibold text-[#3D2040]">
                    I wanted to make something that could actually hold all of that. Something that could tell the story properly.
                  </p>

                  <p>
                    I still remember around my birthday, July 16th, 2026. When I look back at that day, everything feels so strangely canonical, almost like I was meant to meet you.
                  </p>

                  <p>
                    At that time, everything in my life felt like it was falling apart. My mother's health suddenly became serious and she had to undergo surgery. I was staying in the hostel, and somehow my dad contacted the warden and got permission for us to go home.
                  </p>

                  <p className="font-medium text-[#2C182E]">
                    And then, while travelling home, on my birthday, I saw you on the train for the first time.
                  </p>

                  <p>
                    I don't know how to explain what that moment meant to me. My mother's health, everything happening at home, and the mental state I was in had been weighing on me so heavily. And then, somehow, there you were. Just seeing you in that moment became one of those memories that stays with me.
                  </p>

                  <p>
                    And then came the day you messaged me.
                  </p>

                  {/* Highlight Callout 2: The Hostel Moment */}
                  <div className="p-5 sm:p-7 rounded-2xl bg-white border border-pink-200 shadow-md my-6">
                    <p className="font-caveat text-2xl sm:text-3xl text-[#FF4D8D] font-bold leading-snug">
                      "I swear, I was literally jumping around my entire hostel. I was climbing floors, running around, laughing, crying, playing with my friends, and I genuinely didn't care about anything else at that moment. That message meant that much to me."
                    </p>
                  </div>

                  <p>
                    You helped me mentally more than you probably realize. Sometimes you probably don't even know how much your presence, your words, your conversations, and even your stupid banter about my studies affected me.
                  </p>

                  <p className="font-caveat text-2xl sm:text-3xl text-[#E5C158] font-bold">
                    And honestly, I love that part of us.
                  </p>

                  <p>
                    The way you tease me about my studies, the way we talk, the random conversations, all of it. Those little things became some of the most meaningful parts of my life.
                  </p>

                  {/* Vulnerable Honesty */}
                  <p>
                    And I want to be honest about something that I'm honestly embarrassed to say.
                  </p>

                  <p>
                    At one point, I loved you in a different way. I genuinely thought I should try to make you my girlfriend. That's something I don't think I've ever properly explained.
                  </p>

                  <p>
                    But then Vardhanji and the Bhagavad Gita came into my life, and somehow both of those things came into my life through the path that began with you.
                  </p>

                  <p className="font-semibold text-[#FF4D8D]">
                    And slowly, I understood that love doesn't always have to mean wanting someone as your girlfriend or boyfriend. Sometimes love can become something much more beautiful.
                  </p>

                  <p>
                    That's what happened with me.
                  </p>

                  <p>
                    My feelings changed into something that feels much more like a sisterly bond, and I'm genuinely grateful that they did. Because instead of losing what I felt for you, I feel like I found a completely different kind of love and connection.
                  </p>

                  <p className="font-caveat text-3xl sm:text-4xl text-[#3D2040] font-bold">
                    A bond that I genuinely treasure.
                  </p>

                  <p>
                    You became someone I can look up to, someone I can laugh with, someone who can bully me about my studies, someone whose presence can make a terrible day feel lighter, and someone I genuinely consider family.
                  </p>

                  <p>
                    I don't know whether I will ever be able to properly explain what you mean to me. But I want you to know this:
                  </p>

                  {/* Golden Anchor Statement */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-400/20 via-pink-400/20 to-amber-400/20 border-2 border-amber-300 text-center my-8 shadow-inner">
                    <p className="font-playfair text-2xl sm:text-4xl font-bold text-[#3D2040]">
                      I'm genuinely grateful that I met you.
                    </p>
                    <p className="font-quicksand text-sm sm:text-base text-gray-700 mt-2">
                      If everything that happened around my birthday had gone differently, maybe our paths would never have crossed in the way they did. But they did. And I'm grateful for that every single time I think about it.
                    </p>
                  </div>

                  <p>
                    That's why I made this.
                  </p>

                  <p>
                    Not because a website is somehow more meaningful than words. But because I had too many words, too many memories, too much gratitude, and too many things I wanted you to know to fit into one tiny birthday message.
                  </p>

                  <p className="font-bold text-[#FF4D8D]">
                    So I made a place where I could put them all. A small piece of my world, made specifically for you.
                  </p>

                  <p>
                    Thank you for being a part of my life, Shree.
                  </p>

                  <p>
                    Thank you for the conversations, the banter, the support, the memories, and even the moments where you probably had no idea you were helping me. You became a beautiful part of my story without even knowing how important that chapter would become.
                  </p>

                  <p>
                    And no matter where life takes us, I hope you always know that there is someone out here who genuinely wishes the best for you, is proud of you, and will always be grateful that his birthday somehow led him to meeting you.
                  </p>

                  <p className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D2040] pt-4">
                    Happy birthday, Shree.
                  </p>

                  {/* Closing Signature Block */}
                  <div className="pt-8 border-t border-pink-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                    <div>
                      <p className="font-quicksand text-sm text-gray-500 uppercase tracking-wider">
                        With all my love and respect,
                      </p>
                      <h4 className="font-caveat text-4xl sm:text-5xl font-bold text-[#FF4D8D] mt-1">
                        Karthik
                      </h4>
                      <p className="font-space text-xs text-amber-700 font-semibold mt-1">
                        Your Brother & Lifelong Well-Wisher
                      </p>
                    </div>

                    {/* Official Creator Stamp */}
                    <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-right">
                      <div className="flex items-center gap-1.5 text-xs font-space font-bold text-amber-800 uppercase">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Created & Coded by Karthik</span>
                      </div>
                      <span className="text-[11px] font-quicksand text-gray-500 block mt-0.5">
                        Built for Shree Navalkishori • March 6, 2027
                      </span>
                    </div>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

        {/* ========================================================================= */}
        {/* COMPANION GUARDIAN BLESSINGS: INNER CIRCLE (VARDHANJI, DHRUBAYANJI, ARUN) */}
        {/* ========================================================================= */}
        <div className="mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-space text-xs font-bold text-[#FF4D8D] uppercase tracking-widest inline-block px-4 py-1.5 rounded-full bg-pink-100/80 mb-2">
              ✨ BLESSINGS FROM THE INNER CIRCLE ✨
            </span>
            <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#3D2040]">
              The People Cheering For Her
            </h3>
            <p className="font-quicksand text-sm text-gray-600 mt-1">
              Honoring the spiritual guidance, musical harmony, and artistic support in her journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INNER_CIRCLE_MENTORS.map((mentor, i) => (
              <motion.div
                key={mentor.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="p-6 rounded-3xl bg-white/80 border border-pink-200 shadow-md backdrop-blur-md flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl">{mentor.emblem}</span>
                    <span className={`text-[10px] font-space font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r ${mentor.accentColor} text-white`}>
                      {mentor.role.split('&')[0]}
                    </span>
                  </div>

                  <h4 className="font-playfair text-xl font-bold text-[#3D2040]">
                    {mentor.name}
                  </h4>
                  <p className="font-space text-xs text-[#FF4D8D] font-medium mt-0.5 mb-3">
                    {mentor.tagline}
                  </p>

                  <p className="font-quicksand text-sm text-gray-600 leading-relaxed italic">
                    "{mentor.message}"
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-pink-100 flex items-center justify-between text-xs text-gray-400 font-space">
                  <span>Birthday Blessing</span>
                  <span>March 2027</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
