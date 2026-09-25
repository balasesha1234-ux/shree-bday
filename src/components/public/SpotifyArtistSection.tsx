import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Share2, Check, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const SpotifyArtistSection: React.FC = () => {
  const [isFollowing, setIsFollowing] = useState<boolean>(true);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C';

  const toggleFollow = (e: React.MouseEvent) => {
    soundEngine.playSparkle(2);
    triggerCustomConfetti(e.clientX, e.clientY);
    setIsFollowing(!isFollowing);
  };

  const handleCopyLink = () => {
    soundEngine.playPop();
    navigator.clipboard.writeText(SPOTIFY_ARTIST_URL);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShowerLove = (e: React.MouseEvent) => {
    soundEngine.playSparkle(1.8);
    triggerCustomConfetti(e.clientX, e.clientY);
  };

  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 py-8 select-none z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative rounded-3xl bg-[#121212]/95 backdrop-blur-2xl text-white border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85),0_0_50px_rgba(29,185,84,0.18)] overflow-hidden p-5 sm:p-7"
      >
        {/* Dynamic Spotify Green Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full blur-[110px] bg-[#1DB954]/20 pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-[120px] bg-amber-500/10 pointer-events-none" />

        {/* ========================================================================= */}
        {/* UPPER PART: ARTIST HEADER & STATS (Live Verified 301.6K Listeners) */}
        {/* ========================================================================= */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            {/* Spotify Brand Emblem with Verified Check */}
            <div className="relative group shrink-0">
              <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-2xl bg-[#1DB954] text-black flex items-center justify-center shadow-[0_0_25px_rgba(29,185,84,0.5)] group-hover:scale-105 transition-all">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 fill-black" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.217.356-.677.469-1.033.252-2.828-1.728-6.388-2.119-10.58-1.162-.406.092-.812-.163-.905-.568-.092-.406.163-.812.568-.905 4.595-1.05 8.528-.609 11.698 1.35.356.217.469.677.252 1.033zm1.472-3.267c-.273.444-.856.586-1.3.313-3.238-1.99-8.175-2.566-12.004-1.403-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.381-1.33 9.813-.687 13.537 1.602.444.273.586.856.313 1.294zm.126-3.411c-3.882-2.305-10.292-2.518-14.004-1.391-.597.181-1.23-.162-1.411-.759-.181-.597.162-1.23.759-1.411 4.267-1.296 11.336-1.047 15.807 1.608.536.318.712 1.012.394 1.548-.318.536-1.012.712-1.545.405z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#181818] border-2 border-[#121212] flex items-center justify-center text-[#1DB954]">
                <CheckCircle2 className="w-3.5 h-3.5 fill-[#1DB954] text-black" />
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-fredoka text-xl sm:text-2xl font-bold text-white tracking-wide">
                  Shree Naval Kishori
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1DB954] text-[10px] font-space font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified Spotify Artist</span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 text-xs font-quicksand text-gray-400 mt-1">
                <span className="text-[#FFD700] font-semibold flex items-center gap-1">
                  <span>🪷</span>
                  <span>301.6K Monthly Devotional Listeners</span>
                </span>
                <span className="text-gray-600 hidden sm:inline">•</span>
                <span className="text-gray-300">Official Stotrams & Sacred Invocations</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            {/* Follow Button */}
            <button
              onClick={toggleFollow}
              className={`px-3.5 py-1.5 rounded-full font-fredoka text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer ${
                isFollowing
                  ? 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                  : 'bg-[#1DB954] hover:bg-[#1ed760] text-black'
              }`}
            >
              {isFollowing ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <span>+ Follow</span>
                </>
              )}
            </button>

            {/* Shower Love Button */}
            <button
              onClick={handleShowerLove}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border border-pink-400/40 text-pink-300 font-fredoka text-xs font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
              title="Shower Love to Shree"
            >
              <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-pulse" />
              <span>Shower Love 🌸</span>
            </button>

            {/* Copy Share Link */}
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
              title="Copy Spotify Link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-[#1DB954]" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Open in Spotify App Direct Link */}
            <a
              href={SPOTIFY_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-fredoka text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(29,185,84,0.4)] flex items-center gap-1.5"
            >
              <span>Open in Spotify</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* NORMAL SPOTIFY THING: EXTENDED FULL-WIDTH OFFICIAL EMBEDDED PLAYER */}
        {/* ========================================================================= */}
        <div className="relative z-10 mt-5 w-full rounded-2xl overflow-hidden bg-black/60 shadow-2xl border border-white/10">
          <iframe
            style={{ borderRadius: '16px' }}
            src="https://open.spotify.com/embed/artist/3LjhIPXyU2IECCPJ0SZj8C?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen={false}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Shree Naval Kishori Spotify Player"
          />
        </div>
      </motion.div>
    </section>
  );
};
