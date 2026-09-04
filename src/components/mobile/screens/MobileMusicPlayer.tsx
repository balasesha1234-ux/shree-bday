import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Heart, Play, Pause, SkipBack, SkipForward, ExternalLink, Sparkles } from 'lucide-react';
import { MOBILE_TRACKS, MobileTrack } from '../../../data/mobileExperienceData';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileMusicPlayerProps {
  onBack: () => void;
}

export const MobileMusicPlayer: React.FC<MobileMusicPlayerProps> = ({ onBack }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(30);
  const [isLiked, setIsLiked] = useState(true);
  const [showSpotifyConnector, setShowSpotifyConnector] = useState(false);

  const track = MOBILE_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    soundEngine.playPop();
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    soundEngine.playTap();
    setCurrentTrackIndex((prev) => (prev + 1) % MOBILE_TRACKS.length);
    setProgress(0);
  };

  const handlePrev = () => {
    soundEngine.playTap();
    setCurrentTrackIndex((prev) => (prev - 1 + MOBILE_TRACKS.length) % MOBILE_TRACKS.length);
    setProgress(0);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((p) => (p >= 100 ? 0 : p + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#0f1912] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Spotify & Music Ambient Glow */}
      <div className="absolute inset-0 z-0">
        <img
          src={track.coverImage}
          alt="Album Art"
          className="w-full h-full object-cover blur-2xl opacity-20 scale-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1711]/85 via-[#111c14]/95 to-[#0b120d]" />
      </div>

      <div>
        <MobileTopBar light />

        {/* Navigation Header with Spotify Mode Switcher */}
        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Spotify Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1DB954]/20 border border-[#1DB954]/40 text-[#1DB954] text-[11px] font-space font-bold shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse" />
            <span>SPOTIFY CONNECTED</span>
          </div>

          <a
            href={track.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[#1DB954]/20 hover:bg-[#1DB954] hover:text-black flex items-center justify-center text-[#1DB954] transition-all"
            title="Open in Spotify"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Center Spinning Vinyl Disc */}
      <div className="relative z-10 px-6 my-auto flex flex-col items-center">
        <motion.div
          animate={{ rotate: isPlaying ? 360 : 0 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-black p-3 shadow-[0_15px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(29,185,84,0.25)] border-4 border-[#1DB954]/40 flex items-center justify-center"
        >
          {/* Vinyl Grooves */}
          <div className="absolute inset-4 rounded-full border border-neutral-700/40 pointer-events-none" />
          <div className="absolute inset-8 rounded-full border border-neutral-700/30 pointer-events-none" />
          <div className="absolute inset-12 rounded-full border border-neutral-700/20 pointer-events-none" />

          {/* Center Label / Album Artwork */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#1DB954]/80 shadow-inner">
            <img src={track.coverImage} alt={track.title} className="w-full h-full object-cover" />
          </div>

          {/* Center Spindle */}
          <div className="absolute w-4 h-4 rounded-full bg-[#0f1912] border border-[#1DB954]" />
        </motion.div>

        {/* Track Metadata & Heart */}
        <div className="w-full max-w-xs mt-6 flex items-center justify-between">
          <div>
            <h3 className="font-fredoka text-lg font-bold text-white tracking-wide leading-tight">
              {track.title}
            </h3>
            <p className="font-quicksand text-xs text-[#1DB954]">
              {track.artist}
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
        <div className="w-full max-w-xs mt-3.5">
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
        <div className="flex items-center gap-6 mt-3.5">
          <button onClick={handlePrev} className="text-gray-300 hover:text-white transition-colors">
            <SkipBack className="w-5 h-5" />
          </button>

          <button
            onClick={togglePlay}
            className="w-13 h-13 rounded-full bg-[#1DB954] hover:bg-[#1ed760] text-black flex items-center justify-center shadow-[0_0_20px_rgba(29,185,84,0.6)] hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
          </button>

          <button onClick={handleNext} className="text-gray-300 hover:text-white transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        <p className="font-caveat text-sm text-pink-200 mt-2.5 italic">
          "Your voice heals."
        </p>
      </div>

      {/* Spotify Direct Link Card & Playlist */}
      <div className="relative z-10 px-6 pb-6 border-t border-white/10 pt-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] font-space font-bold uppercase text-gray-400">
            Spotify Bhakti Playlist
          </p>
          <a
            href="https://open.spotify.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] font-fredoka font-semibold text-[#1DB954] hover:underline flex items-center gap-1"
          >
            <span>Open in App</span>
            <ExternalLink className="w-3 h-3" />
          </a>
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
    </div>
  );
};
