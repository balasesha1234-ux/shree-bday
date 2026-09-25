import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Heart, Play, Pause, SkipBack, SkipForward, ExternalLink, Sparkles, Disc, Radio, Shuffle, Repeat, Repeat1 } from 'lucide-react';
import { MOBILE_TRACKS, MobileTrack } from '../../../data/mobileExperienceData';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileMusicPlayerProps {
  onBack: () => void;
}

export const MobileMusicPlayer: React.FC<MobileMusicPlayerProps> = ({ onBack }) => {
  const [viewMode, setViewMode] = useState<'vinyl' | 'spotify'>('vinyl');
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [isLiked, setIsLiked] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('all');

  const track = MOBILE_TRACKS[currentTrackIndex];
  const SPOTIFY_ARTIST_URL = 'https://open.spotify.com/artist/3LjhIPXyU2IECCPJ0SZj8C';

  const togglePlay = () => {
    soundEngine.playPop();
    setIsPlaying(!isPlaying);
  };

  const cycleRepeatMode = () => {
    soundEngine.playTap();
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all';
      if (prev === 'all') return 'one';
      return 'off';
    });
  };

  const toggleShuffle = () => {
    soundEngine.playTap();
    setIsShuffle(!isShuffle);
  };

  const handleNext = () => {
    soundEngine.playTap();
    if (isShuffle) {
      const nextIdx = Math.floor(Math.random() * MOBILE_TRACKS.length);
      setCurrentTrackIndex(nextIdx);
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % MOBILE_TRACKS.length);
    }
    setProgress(0);
  };

  const handlePrev = () => {
    soundEngine.playTap();
    setCurrentTrackIndex((prev) => (prev - 1 + MOBILE_TRACKS.length) % MOBILE_TRACKS.length);
    setProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && viewMode === 'vinyl') {
      interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            if (repeatMode === 'one') {
              return 0;
            } else if (repeatMode === 'all') {
              handleNext();
              return 0;
            } else {
              if (currentTrackIndex < MOBILE_TRACKS.length - 1) {
                handleNext();
                return 0;
              } else {
                setIsPlaying(false);
                return 100;
              }
            }
          }
          return p + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, viewMode, repeatMode, currentTrackIndex, isShuffle]);

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#0c140e] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Spotify & Music Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src={track.coverImage}
          alt="Album Art"
          className="w-full h-full object-cover blur-3xl opacity-20 scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a110c]/85 via-[#0e1811]/95 to-[#080d09]" />
      </div>

      <div>
        <MobileTopBar light />

        {/* Navigation Header with Quick Spotify Badge */}
        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Mode Switcher Pill */}
          <div className="p-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 flex items-center gap-1 text-[11px] font-space">
            <button
              onClick={() => {
                soundEngine.playTap();
                setViewMode('vinyl');
              }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'vinyl'
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Disc className="w-3.5 h-3.5" />
              <span>Vinyl</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playSparkle(1.5);
                setViewMode('spotify');
              }}
              className={`px-3 py-1 rounded-full transition-all flex items-center gap-1.5 ${
                viewMode === 'spotify'
                  ? 'bg-[#1DB954] text-black font-bold shadow-sm'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.217.356-.677.469-1.033.252-2.828-1.728-6.388-2.119-10.58-1.162-.406.092-.812-.163-.905-.568-.092-.406.163-.812.568-.905 4.595-1.05 8.528-.609 11.698 1.35.356.217.469.677.252 1.033zm1.472-3.267c-.273.444-.856.586-1.3.313-3.238-1.99-8.175-2.566-12.004-1.403-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.381-1.33 9.813-.687 13.537 1.602.444.273.586.856.313 1.294zm.126-3.411c-3.882-2.305-10.292-2.518-14.004-1.391-.597.181-1.23-.162-1.411-.759-.181-.597.162-1.23.759-1.411 4.267-1.296 11.336-1.047 15.807 1.608.536.318.712 1.012.394 1.548-.318.536-1.012.712-1.545.405z"/>
              </svg>
              <span>Spotify</span>
            </button>
          </div>

          <a
            href={SPOTIFY_ARTIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#1DB954]/20 hover:bg-[#1DB954] hover:text-black flex items-center justify-center text-[#1DB954] transition-all"
            title="Open in Spotify"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* VIEW MODE 1: VINYL RECORD PLAYER */}
      {viewMode === 'vinyl' && (
        <>
          <div className="relative z-10 px-6 my-auto flex flex-col items-center">
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
              className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-3 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(29,185,84,0.25)] border-4 border-[#1DB954]/40 flex items-center justify-center"
            >
              {/* Vinyl Grooves */}
              <div className="absolute inset-4 rounded-full border border-neutral-700/40 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-neutral-700/30 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-neutral-700/20 pointer-events-none" />

              {/* Center Label / Album Artwork */}
              <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full overflow-hidden border-2 border-[#1DB954]/80 shadow-inner">
                <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover" />
              </div>

              {/* Center Spindle */}
              <div className="absolute w-4 h-4 rounded-full bg-[#0f1912] border border-[#1DB954]" />
            </motion.div>

            {/* Track Metadata & Heart */}
            <div className="w-full max-w-xs mt-5 flex items-center justify-between">
              <div>
                <h3 className="font-fredoka text-lg font-bold text-white tracking-wide leading-tight">
                  {track.title}
                </h3>
                <p className="font-quicksand text-xs text-[#1DB954] flex items-center gap-1.5 mt-0.5">
                  <span>{track.artist}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-500" />
                  <span className="text-gray-400">{track.album}</span>
                </p>
              </div>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'text-[#1DB954] fill-[#1DB954]' : 'text-gray-400'}`} />
              </button>
            </div>

            {/* Audio Scrubber */}
            <div className="w-full max-w-xs mt-3">
              <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden relative cursor-pointer">
                <div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#1DB954] to-[#1ed760] rounded-full"
                />
              </div>
              <div className="flex justify-between text-[10px] font-space text-gray-400 mt-1.5">
                <span>{Math.floor((progress * track.durationSeconds) / 100 / 60)}:{String(Math.floor(((progress * track.durationSeconds) / 100) % 60)).padStart(2, '0')}</span>
                <span>{track.duration}</span>
              </div>
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-between w-full max-w-xs mt-3 px-2">
              {/* Shuffle */}
              <button
                onClick={toggleShuffle}
                className={`relative p-2 rounded-full transition-all ${
                  isShuffle ? 'text-[#1DB954]' : 'text-gray-400 hover:text-white'
                }`}
                title={isShuffle ? 'Disable Shuffle' : 'Enable Shuffle'}
              >
                <Shuffle className="w-4 h-4" />
                {isShuffle && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
                )}
              </button>

              <button onClick={handlePrev} className="text-gray-300 hover:text-white transition-colors p-2">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>

              <button
                onClick={togglePlay}
                className="w-13 h-13 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-[0_0_25px_rgba(29,185,84,0.6)] hover:scale-105 active:scale-95 transition-all"
              >
                {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
              </button>

              <button onClick={handleNext} className="text-gray-300 hover:text-white transition-colors p-2">
                <SkipForward className="w-5 h-5 fill-current" />
              </button>

              {/* Repeat */}
              <button
                onClick={cycleRepeatMode}
                className={`relative p-2 rounded-full transition-all ${
                  repeatMode !== 'off' ? 'text-[#1DB954]' : 'text-gray-400 hover:text-white'
                }`}
                title={`Repeat: ${repeatMode.toUpperCase()}`}
              >
                {repeatMode === 'one' ? <Repeat1 className="w-4 h-4" /> : <Repeat className="w-4 h-4" />}
                {repeatMode !== 'off' && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#1DB954]" />
                )}
              </button>
            </div>
          </div>

          {/* Tracklist Drawer Bottom */}
          <div className="relative z-10 px-6 pb-6 border-t border-white/10 pt-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-space font-bold uppercase text-gray-400 flex items-center gap-1.5">
                <span>Synthesized Melodies</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#1DB954]" />
              </p>
              <button
                onClick={() => setViewMode('spotify')}
                className="text-[10px] font-fredoka font-semibold text-[#1DB954] hover:underline flex items-center gap-1"
              >
                <span>Switch to Spotify Hub</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-1.5">
              {MOBILE_TRACKS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setCurrentTrackIndex(idx);
                    setIsPlaying(true);
                  }}
                  className={`w-full flex items-center justify-between p-2 rounded-xl text-left transition-all ${
                    currentTrackIndex === idx ? 'bg-[#1DB954]/20 border border-[#1DB954]/50 text-[#1ed760]' : 'text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-[11px] font-mono opacity-60">0{idx + 1}</span>
                    <div>
                      <p className="font-fredoka text-xs font-semibold">{t.title}</p>
                      <p className="text-[9px] text-gray-400">{t.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-space text-gray-400">{t.duration}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* VIEW MODE 2: OFFICIAL SPOTIFY ARTIST HUB (PC FEATURE EMBEDDED IN MOBILE) */}
      {viewMode === 'spotify' && (
        <div className="relative z-10 px-5 flex-1 overflow-y-auto no-scrollbar py-3 space-y-4">
          {/* Official Artist Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-neutral-900/90 via-[#1DB954]/15 to-neutral-900/90 border border-[#1DB954]/30 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1DB954] text-black flex items-center justify-center font-bold shadow-md">
                <svg className="w-5 h-5 fill-black" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.217.356-.677.469-1.033.252-2.828-1.728-6.388-2.119-10.58-1.162-.406.092-.812-.163-.905-.568-.092-.406.163-.812.568-.905 4.595-1.05 8.528-.609 11.698 1.35.356.217.469.677.252 1.033zm1.472-3.267c-.273.444-.856.586-1.3.313-3.238-1.99-8.175-2.566-12.004-1.403-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.381-1.33 9.813-.687 13.537 1.602.444.273.586.856.313 1.294zm.126-3.411c-3.882-2.305-10.292-2.518-14.004-1.391-.597.181-1.23-.162-1.411-.759-.181-.597.162-1.23.759-1.411 4.267-1.296 11.336-1.047 15.807 1.608.536.318.712 1.012.394 1.548-.318.536-1.012.712-1.545.405z"/>
                </svg>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-fredoka text-sm font-bold text-white">
                    Shree Naval Kishori
                  </h4>
                  <span className="px-1.5 py-0.5 rounded-full bg-[#1DB954]/25 text-[#1DB954] text-[9px] font-space font-bold">
                    VERIFIED
                  </span>
                </div>
                <p className="text-[11px] font-quicksand text-gray-400">
                  Official Devotional Discography
                </p>
              </div>
            </div>

            <a
              href={SPOTIFY_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-[#1DB954] text-black font-fredoka font-bold text-xs flex items-center gap-1 shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <span>Follow</span>
            </a>
          </div>

          {/* Embedded Spotify Artist Player from PC */}
          <div className="w-full rounded-2xl overflow-hidden bg-black/60 shadow-2xl border border-white/10">
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

          {/* Spotify Direct Action Button */}
          <a
            href={SPOTIFY_ARTIST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-2xl bg-[#1DB954] hover:bg-[#1ed760] text-black font-fredoka font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(29,185,84,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.508 17.308c-.217.356-.677.469-1.033.252-2.828-1.728-6.388-2.119-10.58-1.162-.406.092-.812-.163-.905-.568-.092-.406.163-.812.568-.905 4.595-1.05 8.528-.609 11.698 1.35.356.217.469.677.252 1.033zm1.472-3.267c-.273.444-.856.586-1.3.313-3.238-1.99-8.175-2.566-12.004-1.403-.497.151-1.025-.133-1.176-.63-.151-.497.133-1.025.63-1.176 4.381-1.33 9.813-.687 13.537 1.602.444.273.586.856.313 1.294zm.126-3.411c-3.882-2.305-10.292-2.518-14.004-1.391-.597.181-1.23-.162-1.411-.759-.181-.597.162-1.23.759-1.411 4.267-1.296 11.336-1.047 15.807 1.608.536.318.712 1.012.394 1.548-.318.536-1.012.712-1.545.405z"/>
            </svg>
            <span>Open Full Discography in Spotify App</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Bhakti Quote */}
          <div className="p-3 text-center">
            <p className="font-caveat text-sm text-pink-200/90 italic">
              "Singing her heart out to Radha-Govinda."
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
