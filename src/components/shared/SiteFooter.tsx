import React from 'react';
import { Heart, Sparkles, Instagram, Linkedin } from 'lucide-react';
import { DEVELOPER_CONTACTS } from '../../data/developerContacts';

interface SiteFooterProps {
  dark?: boolean;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ dark = false }) => {
  return (
    <footer
      className={`relative w-full py-10 px-4 select-none border-t transition-colors duration-300 ${
        dark
          ? 'bg-[#060412] text-gray-400 border-white/10'
          : 'bg-gradient-to-b from-[#FFF0F3] to-[#FFE4E8] text-gray-600 border-pink-200/60'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-4">
        {/* Lotus & Devotional Symbol */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🪷</span>
          <span className={`font-script text-2xl ${dark ? 'text-pink-300' : 'text-[#FF4D8D]'}`}>
            Shree Naval Kishori
          </span>
          <span className="text-xl">🪷</span>
        </div>

        {/* Primary Credits Line */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs sm:text-sm font-quicksand font-semibold">
          <span className="flex items-center gap-1.5">
            <span>Created with</span>
            <Heart className="w-3.5 h-3.5 fill-[#FF4D8D] text-[#FF4D8D] inline" />
            <span>by</span>
            <strong className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Karthik</strong>
          </span>

          <span className="opacity-40">•</span>

          <span>
            Assets by <strong className={`font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>Arun</strong>
          </span>
        </div>

        {/* Developer's Contacts */}
        <div className="pt-1 flex flex-wrap items-center justify-center gap-2.5 text-xs font-space">
          <span className={`text-[11px] font-bold uppercase tracking-wider ${dark ? 'text-gray-400' : 'text-gray-500'}`}>
            Developer's Contacts:
          </span>
          <a
            href={DEVELOPER_CONTACTS.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all hover:scale-105 active:scale-95 ${
              dark
                ? 'bg-white/5 border-pink-400/30 text-pink-300 hover:bg-pink-500/20'
                : 'bg-white border-pink-200 text-[#FF4D8D] hover:bg-pink-50 shadow-xs'
            }`}
          >
            <Instagram className="w-3.5 h-3.5" />
            <span className="font-semibold">{DEVELOPER_CONTACTS.instagram.handle}</span>
          </a>

          <a
            href={DEVELOPER_CONTACTS.linkedin.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all hover:scale-105 active:scale-95 ${
              dark
                ? 'bg-white/5 border-blue-400/30 text-blue-300 hover:bg-blue-500/20'
                : 'bg-white border-blue-200 text-[#0077B5] hover:bg-blue-50 shadow-xs'
            }`}
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span className="font-semibold">{DEVELOPER_CONTACTS.linkedin.name}</span>
          </a>
        </div>

        {/* Special Thanks Line */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-space tracking-wide border backdrop-blur-md ${
          dark
            ? 'bg-white/5 border-pink-400/20 text-pink-200'
            : 'bg-white/80 border-pink-200 text-[#3D2040] shadow-sm'
        }`}>
          <Sparkles className="w-3 h-3 text-[#FFD93D] fill-[#FFD93D]" />
          <span>
            Special thanks to <strong className="font-bold">Vardhan Prabhu ji</strong> & <strong className="font-bold">Dhrubayan Ji</strong>
          </span>
        </div>

        {/* Sibling Alliance Stamp */}
        <p className={`text-[10px] font-space tracking-widest uppercase opacity-60 pt-1 ${
          dark ? 'text-gray-500' : 'text-gray-500'
        }`}>
          A Worldwide Birthday Celebration • March 6, 2027
        </p>
      </div>
    </footer>
  );
};
