import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Heart, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';
import { KarthikVoiceNote } from './KarthikVoiceNote';

export const TheLetter: React.FC = () => {
  const [sealStamped, setSealStamped] = useState(false);

  const handleSealClick = () => {
    soundEngine.playSparkle(1.5);
    soundEngine.playTempleBell();
    triggerCustomConfetti();
    setSealStamped(true);
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-24 select-none">
      {/* Background Soft Warm Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[#D4A84B]/15 via-[#FF4D8D]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <div className="text-center max-w-xl mx-auto mb-14 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-space text-xs font-bold shadow-sm border border-[#D4A84B]/30 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4A84B]" />
          <span>CONFIDENTIAL // SIBLING SANCTUARY ONLY</span>
        </motion.div>

        <h2 className="text-4xl sm:text-6xl font-playfair font-bold text-[#3D2040]">
          From Your Brother’s Heart 💌
        </h2>
        <p className="text-sm sm:text-base font-quicksand text-gray-600 mt-2">
          Why I built this entire website for you, and what our bond means to me.
        </p>
      </div>

      {/* Parchment Antique Paper Display */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-[#FFFDF8] rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl border-2 border-[#D4A84B]/40 text-[#2D2D2D] overflow-hidden"
      >
        {/* Decorative Lotus Motifs in Corners */}
        <div className="absolute top-4 left-4 text-3xl select-none opacity-30">🪷</div>
        <div className="absolute top-4 right-4 text-3xl select-none opacity-30">🪷</div>
        <div className="absolute bottom-4 left-4 text-3xl select-none opacity-30">🪷</div>
        <div className="absolute bottom-4 right-4 text-3xl select-none opacity-30">🪷</div>

        {/* Letter Heading Strip */}
        <div className="border-b border-[#D4A84B]/30 pb-6 mb-8 text-center">
          <span className="text-[10px] font-space tracking-[0.3em] text-[#D4A84B] uppercase font-bold block mb-1">
            PERSONAL & CONFIDENTIAL // FOR SHREE’S EYES ONLY
          </span>
          <h3 className="text-3xl sm:text-5xl font-playfair font-bold text-[#3D2040] mt-2">
            Hare Krishna Didiii,
          </h3>
          <p className="text-sm font-space text-[#FF4D8D] font-semibold mt-1">
            Written with love by Karthik • March 6, 2027
          </p>
        </div>

        {/* Letter Body (Karthik's Exact Authentic Words) */}
        <div className="font-quicksand text-base sm:text-lg text-gray-800 leading-relaxed space-y-6">
          <p className="font-caveat text-2xl sm:text-3xl text-[#FF4D8D] font-bold">
            Hope your doing well,
          </p>

          <p>
            I genuinely don't know how to explain all of this.
          </p>

          <p>
            You mean so much to me that sometimes I don't even know where to begin. There are so many things I want to say, so many memories that stay in my head, and somehow putting all of it into words feels impossible.
          </p>

          {/* Highlight Callout: Why I Built This Website */}
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
            I still remember around my birthday, July 16th, 2024. When I look back at that day, everything feels so strangely canonical, almost like I was meant to meet you.
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

          {/* Highlight Callout: The Hostel Celebration */}
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

          {/* Sacred Golden Highlight Box */}
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
            Looking back now across these three years — from July 2024 to today — so much has happened, and so much has changed. The confusion, the emotional battles, the way I saw life back then, and how Vardhanji and the Bhagavad Gita slowly helped me mature and see clearly. Those three years shaped who I am, and through all of it, our connection grew into this sacred, unbreakable sisterly bond that I thank Krishna for every day.
          </p>

          <p>
            And about five or six months ago, I made a quiet promise to myself. I told myself that a casual birthday text, an Instagram story, or a generic gift was never going to be enough. I fought for months to build this website. Night after night, sitting in front of my screen until the early hours of the morning, writing thousands of lines of code, solving bugs at 3 AM, and building every single little piece — the Vrindavan dawn, the flute melodies, the candle blowout, your Spotify stotrams, the memory lane — because you deserved something that took real sacrifice, real time, and real devotion.
          </p>

          <p className="font-bold text-[#FF4D8D]">
            Not because a website is somehow more meaningful than words. But because I had too many words, too many memories, too much gratitude, and too many things I wanted you to know to fit into one tiny birthday message. So I made an entire universe where I could put them all — a permanent sanctuary made specifically for you.
          </p>

          {/* Dedicated Intimate Voice Note Player */}
          <KarthikVoiceNote />

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

          {/* Signature & Interactive Wax Seal */}
          <div className="pt-8 border-t border-[#D4A84B]/30 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* 3D Crimson & Gold Sibling Wax Seal */}
            <motion.div
              whileHover={{ scale: 1.08, rotate: 3 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSealClick}
              className="cursor-pointer flex items-center gap-3 bg-gradient-to-r from-[#8B1E2F] via-[#A8283D] to-[#8B1E2F] p-3.5 pr-6 rounded-full shadow-xl border-2 border-[#D4A84B] text-white"
              title="Click to stamp the Sibling Seal"
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4A84B] to-[#F5C642] flex items-center justify-center text-xl shadow-inner border border-amber-200">
                <Shield className="w-6 h-6 text-[#3D2040]" />
              </div>
              <div className="text-left">
                <span className="text-[10px] font-space tracking-widest uppercase text-amber-200 block">
                  {sealStamped ? 'PACT SEALED 🌸' : 'K ♡ S SIBLING SEAL'}
                </span>
                <span className="text-xs font-fredoka font-bold text-white block">
                  {sealStamped ? 'Guardian Bond of Lifetime Protection' : 'Tap to Stamp Sibling Pact'}
                </span>
              </div>
            </motion.div>

            {/* Handwritten Signature Block */}
            <div className="text-right">
              <p className="font-quicksand text-sm text-gray-500 uppercase tracking-wider">
                With all my love and respect,
              </p>
              <p className="font-caveat text-4xl sm:text-5xl text-[#FF4D8D] font-bold mt-0.5">
                Karthik
              </p>
              <p className="font-space text-xs text-[#D4A84B] font-bold mt-1">
                Your Brother & Architect of This Realm
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
