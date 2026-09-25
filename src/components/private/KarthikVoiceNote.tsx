import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Mic,
  Headphones,
  Heart,
  ChevronDown,
  ChevronUp,
  FastForward,
  Disc3
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface KarthikVoiceNoteProps {
  audioSrc?: string;
}

export const KarthikVoiceNote: React.FC<KarthikVoiceNoteProps> = ({
  audioSrc = '/assets/audio/karthik_voice_note.wav'
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [hasCustomFile, setHasCustomFile] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>(audioSrc);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);
  const [loveCount, setLoveCount] = useState<number>(() => {
    return Number(localStorage.getItem('shree_voice_note_love_count') || 1);
  });
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [hoverSeekTime, setHoverSeekTime] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Check if custom recording/upload was saved in localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedAudio = localStorage.getItem('karthik_voice_note_custom_url');
      if (savedAudio) {
        setAudioUrl(savedAudio);
        setHasCustomFile(true);
      }
    }
  }, []);

  // Duck background music during voice note playback
  useEffect(() => {
    soundEngine.duckBgm(isPlaying);
    return () => {
      soundEngine.duckBgm(false);
    };
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      soundEngine.duckBgm(false);
    };

    const handleError = () => {
      if (audioUrl === '/assets/audio/karthik_voice_note.wav') {
        console.info('karthik_voice_note.wav not found, trying .mp3 fallback...');
        setAudioUrl('/assets/audio/karthik_voice_note.mp3');
      } else {
        console.info('Voice note standing by for audio placement or upload.');
      }
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    soundEngine.playPop();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.playbackRate = playbackSpeed;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback interrupted:', e);
      });
    }
  };

  const cyclePlaybackSpeed = () => {
    soundEngine.playTap();
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextSpeed;
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSeekHover = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    setHoverSeekTime(Math.max(0, Math.min(duration, pos * duration)));
  };

  const toggleMute = () => {
    soundEngine.playTap();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartAudio = () => {
    soundEngine.playPop();
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    audio.playbackRate = playbackSpeed;
    audio.play();
    setIsPlaying(true);
  };

  const handleSendLove = (e: React.MouseEvent) => {
    soundEngine.playSparkle(1.6);
    triggerCustomConfetti(e.clientX, e.clientY);
    const newCount = loveCount + 1;
    setLoveCount(newCount);
    localStorage.setItem('shree_voice_note_love_count', String(newCount));

    // Spawn floating heart
    const newHeart = { id: Date.now(), x: Math.random() * 60 + 20 };
    setFloatingHearts((prev) => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setHasCustomFile(true);
      if (typeof window !== 'undefined') {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            localStorage.setItem('karthik_voice_note_custom_url', reader.result as string);
          } catch (_) {}
        };
        reader.readAsDataURL(file);
      }
      soundEngine.playSparkle(1.5);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || !isFinite(time)) return '0:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 32 Frequency Bars with natural contour
  const waveformHeights = [
    30, 50, 75, 40, 85, 60, 45, 90, 100, 65,
    35, 70, 95, 80, 50, 65, 85, 40, 75, 95,
    45, 60, 85, 90, 70, 55, 80, 65, 45, 35,
    55, 30
  ];

  return (
    <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1A0E24] via-[#251330] to-[#140A1D] text-white shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(212,168,75,0.15)] border-2 border-[#D4A84B]/40 overflow-hidden select-none">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full blur-[100px] bg-[#FF4D8D]/20 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full blur-[100px] bg-[#D4A84B]/20 pointer-events-none" />

      {/* Floating Hearts Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, y: 150, scale: 0.6 }}
            animate={{ opacity: 0, y: -60, scale: 1.4 }}
            transition={{ duration: 1.8, ease: 'easeOut' }}
            style={{ left: `${h.x}%` }}
            className="absolute bottom-4 text-2xl"
          >
            💖
          </motion.div>
        ))}
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* ========================================================================= */}
      {/* 1. HEADER BAR: Title, Headphone Badge & Controls */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-[#D4A84B] flex items-center justify-center text-white shadow-md">
              <Mic className="w-5 h-5 text-white" />
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#1A0E24] animate-ping" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-fredoka text-base sm:text-lg font-bold text-white tracking-wide">
                A Voice Note from Karthik
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-[#FF4D8D]/20 text-[#FF4D8D] text-[10px] font-space font-bold uppercase border border-[#FF4D8D]/30">
                Personal
              </span>
            </div>
            <p className="text-xs font-quicksand text-gray-300 flex items-center gap-1.5 mt-0.5">
              <Headphones className="w-3.5 h-3.5 text-[#D4A84B]" />
              <span>Put on your headphones for this one 🎧</span>
              {isPlaying && (
                <span className="text-[10px] font-space text-amber-300 animate-pulse ml-1">
                  • Ambient BGM dimmed for clarity
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Speed Multiplier & Attach File Option */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {/* Speed Toggle (1x, 1.25x, 1.5x) */}
          <button
            onClick={cyclePlaybackSpeed}
            className="px-2.5 py-1 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-amber-300 border border-amber-300/30 transition-all cursor-pointer flex items-center gap-1"
            title="Toggle playback speed"
          >
            <FastForward className="w-3 h-3" />
            <span>{playbackSpeed}x</span>
          </button>

          {/* Discreet Local Upload Option */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-[10px] font-space text-gray-400 hover:text-[#D4A84B] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            title="Upload audio file"
          >
            {hasCustomFile ? '✓ Loaded' : 'Attach'}
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. VINTAGE CASSETTE REELS & FREQUENCY WAVEFORM */}
      {/* ========================================================================= */}
      <div className="relative z-10 p-3 sm:p-4 rounded-2xl bg-black/50 border border-white/10 shadow-inner my-3">
        {/* Cassette Tape Header with Dual Spinning Reels */}
        <div className="flex items-center justify-between px-2 mb-2 pb-2 border-b border-white/5 text-[10px] font-space text-gray-400">
          <div className="flex items-center gap-2">
            <motion.div
              animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 3 / playbackSpeed, repeat: Infinity, ease: 'linear' }}
              className="text-[#D4A84B]"
            >
              <Disc3 className="w-4 h-4" />
            </motion.div>
            <span className="tracking-wider">REEL-A // SIBLING SANCTUARY</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-emerald-400">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-gray-600'}`} />
            <span>{isPlaying ? 'ACTIVE REC' : 'READY'}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="tracking-wider">24-BIT LOSSLESS</span>
            <motion.div
              animate={isPlaying ? { rotate: -360 } : { rotate: 0 }}
              transition={{ duration: 3 / playbackSpeed, repeat: Infinity, ease: 'linear' }}
              className="text-[#FF4D8D]"
            >
              <Disc3 className="w-4 h-4" />
            </motion.div>
          </div>
        </div>

        {/* Dynamic Waveform Visualizer */}
        <div className="flex items-center justify-between gap-1 sm:gap-1.5 h-16 sm:h-20 px-1 py-1">
          {waveformHeights.map((h, i) => {
            const progress = duration > 0 ? currentTime / duration : 0;
            const barProgress = i / waveformHeights.length;
            const isPlayed = barProgress <= progress;

            return (
              <motion.div
                key={i}
                className={`flex-1 rounded-full transition-colors duration-150 ${
                  isPlayed
                    ? 'bg-gradient-to-t from-[#D4A84B] to-[#FF4D8D]'
                    : 'bg-white/15'
                }`}
                style={{ height: `${h}%` }}
                animate={
                  isPlaying
                    ? {
                        scaleY: [1, 1.45, 0.6, 1.3, 1],
                        transition: {
                          duration: (0.45 + (i % 6) * 0.08) / playbackSpeed,
                          repeat: Infinity,
                          repeatType: 'reverse'
                        }
                      }
                    : { scaleY: 1 }
                }
              />
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SCRUB BAR SLIDER WITH TIME TOOLTIP */}
      {/* ========================================================================= */}
      <div className="relative z-10 mt-3">
        {hoverSeekTime !== null && (
          <div
            className="absolute -top-6 text-[10px] font-mono px-2 py-0.5 rounded bg-black/90 text-amber-300 border border-white/10 pointer-events-none transform -translate-x-1/2"
            style={{
              left: `${(hoverSeekTime / (duration || 1)) * 100}%`
            }}
          >
            {formatTime(hoverSeekTime)}
          </div>
        )}

        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          onMouseMove={handleSeekHover}
          onMouseLeave={() => setHoverSeekTime(null)}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF4D8D]"
        />

        <div className="flex items-center justify-between text-[11px] font-space text-gray-400 mt-1.5">
          <span className="font-mono text-white">{formatTime(currentTime)}</span>
          <span className="text-[#D4A84B] font-semibold font-mono">
            {duration > 0 ? formatTime(duration) : 'Recorded with Devotion'}
          </span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CONTROLS, REACTIONS & TRANSCRIPT TOGGLE */}
      {/* ========================================================================= */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-3">
          {/* Main Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-13 h-13 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#D4A84B] text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,77,141,0.5)] cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play Voice Note'}
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current text-white" />
            ) : (
              <Play className="w-6 h-6 fill-current text-white ml-0.5" />
            )}
          </motion.button>

          {/* Restart Button */}
          <button
            onClick={restartAudio}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
            title="Replay from start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mute Button */}
          <button
            onClick={toggleMute}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Interactive Love / Reaction Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendLove}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 hover:to-rose-500/30 border border-pink-400/40 text-pink-300 text-xs font-fredoka font-bold transition-all cursor-pointer shadow-sm"
            title="Send love back to Karthik"
          >
            <Heart className="w-4 h-4 fill-pink-400 text-pink-400" />
            <span>Felt this</span>
            <span className="px-1.5 py-0.2 rounded-full bg-pink-500/30 text-[10px] font-mono">
              {loveCount}
            </span>
          </motion.button>
        </div>

        {/* Transcript Toggle */}
        <button
          onClick={() => {
            soundEngine.playTap();
            setShowTranscript(!showTranscript);
          }}
          className="flex items-center gap-1.5 text-xs font-fredoka text-[#D4A84B] hover:text-amber-200 transition-colors cursor-pointer"
        >
          <span>{showTranscript ? 'Hide Highlights' : '📜 Read Along'}</span>
          {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 5. COLLAPSIBLE READ-ALONG TRANSCRIPT HIGHLIGHTS */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-4 pt-4 border-t border-white/10"
          >
            <div className="p-4 sm:p-5 rounded-2xl bg-black/40 border border-amber-400/20 text-xs sm:text-sm font-quicksand text-gray-200 leading-relaxed space-y-3">
              <p className="font-caveat text-xl sm:text-2xl text-[#FF4D8D] font-bold">
                "Hare Krishna Didiii... Happy Birthday."
              </p>
              <p>
                "If you’re listening to this right now, it means you tapped the secret sequence and found this corner. When I look back at these last three years — from that day on the train on July 16th, 2024, when my mom was sick and everything in my life felt like it was breaking down, to the day you messaged me... so much has changed."
              </p>
              <p>
                "You helped me mentally more than you will ever realize. Your presence, the way you tease me about my studies, our stupid banter... you brought light into my life when I needed it the most."
              </p>
              <p>
                "About five or six months ago, I made a quiet decision. A simple birthday text was never enough. So I sat in front of my laptop night after night, wrote thousands of lines of code, fought through bugs at 3 AM, and built this entire digital universe from scratch — just for you."
              </p>
              <p className="font-playfair text-[#D4A84B] italic">
                "May Sri Sri Radha-Govinda always protect your voice. Happy 22nd Birthday, Didiii."
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
