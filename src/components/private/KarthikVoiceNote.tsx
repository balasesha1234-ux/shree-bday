import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sparkles, Mic, Headphones } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

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
  const [hasCustomFile, setHasCustomFile] = useState<boolean>(false);
  const [audioUrl, setAudioUrl] = useState<string>(audioSrc);

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
    };

    const handleError = () => {
      // If default .wav is not found, automatically try .mp3
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
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Playback interrupted:', e);
      });
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = parseFloat(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const restartAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
    audio.play();
    setIsPlaying(true);
  };

  // Optional local file upload so Karthik can test his voice note immediately
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setHasCustomFile(true);
      if (typeof window !== 'undefined') {
        // Also save base64 if small or keep object URL
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

  // Waveform heights for visual animation
  const waveformHeights = [
    25, 45, 75, 30, 90, 60, 40, 85, 95, 50,
    30, 70, 100, 80, 45, 65, 85, 35, 75, 90,
    40, 60, 80, 95, 70, 50, 85, 60, 40, 30
  ];

  return (
    <div className="relative my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1E112A] via-[#2A1635] to-[#1A0F24] text-white shadow-2xl border-2 border-[#D4A84B]/50 overflow-hidden select-none">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full blur-[90px] bg-[#FF4D8D]/20 pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full blur-[90px] bg-[#D4A84B]/20 pointer-events-none" />

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={audioUrl} preload="metadata" />

      {/* Header Bar */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-[#D4A84B] flex items-center justify-center text-white shadow-md">
            <Mic className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-fredoka text-base sm:text-lg font-bold text-white tracking-wide">
                A Voice Note from Karthik
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 text-[10px] font-space font-bold uppercase border border-pink-400/30">
                Personal
              </span>
            </div>
            <p className="text-xs font-quicksand text-gray-300 flex items-center gap-1.5 mt-0.5">
              <Headphones className="w-3.5 h-3.5 text-[#D4A84B]" />
              <span>Put on your headphones for this one 🎧</span>
            </p>
          </div>
        </div>

        {/* Upload / Replace Trigger for Karthik (discreet) */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
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
            title="Upload audio file (karthik_voice_note.mp3)"
          >
            {hasCustomFile ? '✓ Audio Loaded' : '+ Attach Voice Note'}
          </button>
        </div>
      </div>

      {/* Waveform Visualizer */}
      <div className="relative z-10 flex items-center justify-between gap-1 sm:gap-1.5 h-16 sm:h-20 px-2 py-2 my-2 bg-black/40 rounded-2xl border border-white/5 overflow-hidden">
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
              style={{
                height: `${h}%`
              }}
              animate={
                isPlaying
                  ? {
                      scaleY: [1, 1.4, 0.7, 1.2, 1],
                      transition: {
                        duration: 0.5 + (i % 5) * 0.1,
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

      {/* Scrub Bar Slider */}
      <div className="relative z-10 mt-3">
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#FF4D8D]"
        />
        <div className="flex items-center justify-between text-[11px] font-space text-gray-400 mt-1.5">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[#D4A84B] font-semibold">
            {duration > 0 ? formatTime(duration) : 'Recorded with Love'}
          </span>
        </div>
      </div>

      {/* Playback Controls & Caption */}
      <div className="relative z-10 mt-4 flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          {/* Main Play/Pause Button */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            className="w-13 h-13 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#D4A84B] text-white flex items-center justify-center shadow-[0_0_20px_rgba(255,77,141,0.5)] cursor-pointer"
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
        </div>

        <div className="text-right">
          <p className="font-playfair text-xs sm:text-sm italic text-pink-200">
            "Because some things can only be felt through a voice."
          </p>
          <p className="text-[10px] font-space text-[#D4A84B]">
            From Karthik to Shree
          </p>
        </div>
      </div>
    </div>
  );
};
