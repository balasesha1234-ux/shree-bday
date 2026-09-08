import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles } from 'lucide-react';

export const SpotifyArtistSection: React.FC = () => {
  return (
    <section className="relative w-full max-w-5xl mx-auto px-4 py-8 select-none z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative bg-[#121212] rounded-3xl p-4 sm:p-6 shadow-2xl border border-white/10 overflow-hidden"
      >
        {/* Ambient Spotify Green Glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#1DB954]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Header Bar */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1DB954] flex items-center justify-center text-black font-bold shadow-md">
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.217.356-.677.469-1.033.252-2.828-1.728-6.388-2.119-10.58-1.162-.406.092-.812-.163-.905-.568-.092-.406.163-.812.568-.905 4.595-1.05 8.528-.609 11.698 1.35.356.217.469.677.252 1.033zm1.472-3.267c-.273.444-.856.586-1.3.313-3.238-1.99-8.175-2.566-12.004-1.403-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.381-1.33 9.813-.687 13.537 1.602.444.273.586.856.313 1.294zm.126-3.411c-3.882-2.305-10.292-2.518-14.004-1.391-.597.181-1.23-.162-1.411-.759-.181-.597.162-1.23.759-1.411 4.267-1.296 11.336-1.047 15.807 1.608.536.318.712 1.012.394 1.548-.318.536-1.012.712-1.545.405z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-fredoka text-white text-base font-bold">
                  Shree Naval Kishori
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#1DB954]/20 text-[#1DB954] text-[10px] font-space font-bold uppercase">
                  Official Artist
                </span>
              </div>
              <p className="font-quicksand text-xs text-gray-400">
                Top devotional bhajans & sacred melodies
              </p>
            </div>
          </div>

          <a
            href="https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-fredoka font-semibold text-[#1DB954] transition-all hover:scale-105 active:scale-95"
          >
            <span>Open in Spotify</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Embedded Official Spotify Player Widget */}
        <div className="w-full rounded-2xl overflow-hidden bg-black/40 shadow-inner">
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
