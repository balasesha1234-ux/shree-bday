import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, X, Sparkles, Share2, Film, Check, ExternalLink } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

interface TeaserTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSrc?: string;
  externalLink?: string;
}

export const TeaserTrailerModal: React.FC<TeaserTrailerModalProps> = ({
  isOpen,
  onClose,
  videoSrc = '/assets/intro/montage.mp4',
  externalLink,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [hasEnded, setHasEnded] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      soundEngine.playSparkle(1.5);
      setIsPlaying(true);
      setHasEnded(false);
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {
          // Browser autoplay policy might require muted start
          setIsMuted(true);
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ' && isOpen) {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

  const togglePlay = () => {
    soundEngine.playTap();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    soundEngine.playTap();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const duration = videoRef.current.duration || 1;
    setProgress((current / duration) * 100);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setHasEnded(true);
  };

  const handleShare = (e: React.MouseEvent) => {
    soundEngine.playPop();
    triggerCustomConfetti(e.clientX, e.clientY);
    const shareText = `Watch the official teaser trailer for Shree's Birthday Celebration 🎂✨ Synchronizing worldwide on March 6: ${window.location.origin}`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
          {/* Backdrop Click to Close */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-4xl bg-gradient-to-b from-[#160B24] to-[#0A0412] rounded-3xl border border-pink-500/30 shadow-[0_0_60px_rgba(255,77,141,0.25)] overflow-hidden z-10 flex flex-col"
          >
            {/* Header Filmstrip Bar */}
            <div className="px-5 py-3.5 bg-black/40 border-b border-pink-500/20 flex items-center justify-between">
              <div className="flex items-center gap-2 text-pink-300 font-space text-xs font-bold tracking-wider">
                <Film className="w-4 h-4 text-[#FFD93D]" />
                <span className="uppercase">Official Teaser Trailer // Shree 4.0</span>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-[#FF4D8D]/20 text-[#FF4D8D] text-[10px]">
                  4K PREVIEW
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-pink-200 text-xs font-space font-medium flex items-center gap-1.5 transition-all"
                  title="Share Teaser"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center transition-all"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Video Player Display Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
              <video
                ref={videoRef}
                src={videoSrc}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleEnded}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Center Play Overlay on Pause / End */}
              {(!isPlaying || hasEnded) && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center cursor-pointer transition-opacity"
                >
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#FF4D8D] via-[#FF80AC] to-[#FFD93D] flex items-center justify-center shadow-2xl border-2 border-white/60 text-white"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 fill-white ml-1" />
                  </motion.div>
                </div>
              )}

              {/* Progress Bar Line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-gradient-to-r from-[#FFD93D] via-[#FF4D8D] to-[#FF2D78] transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Video Bottom Control Bar */}
            <div className="px-5 py-4 bg-[#0E061A]/95 border-t border-pink-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-space text-gray-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                </button>

                <button
                  onClick={toggleMute}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-[11px] text-pink-200/70 font-quicksand">
                  {isPlaying ? 'Playing Official Teaser Trailer' : 'Paused'}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {externalLink && (
                  <a
                    href={externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 transition-all font-space text-xs"
                  >
                    <span>Watch on Social</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                <button
                  onClick={handleFullscreen}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                  title="Fullscreen"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Footer Tagline */}
            <div className="px-5 py-2.5 bg-black/60 border-t border-white/5 flex items-center justify-between text-[11px] font-quicksand text-pink-200/60">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#FFD93D]" />
                Produced & Handcrafted by Karthik 💻🛡️
              </span>
              <span>March 6 • Synchronizing Worldwide</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
