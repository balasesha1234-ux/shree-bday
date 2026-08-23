import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Volume1, Sparkles, Sliders } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';

interface AudioControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
  mode?: 'countdown' | 'party' | 'devotional';
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isPlaying,
  onToggle
}) => {
  const [volume, setVolumeState] = useState<number>(() => soundEngine.getVolume());
  const [showVolumeSlider, setShowVolumeSlider] = useState<boolean>(false);

  useEffect(() => {
    soundEngine.setVolume(volume);
  }, [volume]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolumeState(newVol);
    soundEngine.setVolume(newVol);
    if (!isPlaying && newVol > 0) {
      onToggle();
    }
  };

  const isMuted = !isPlaying || volume === 0;

  return (
    <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 select-none">
      {/* Expandable Volume Slider Popout */}
      <AnimatePresence>
        {showVolumeSlider && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 px-4 py-2 rounded-full bg-black/80 sm:bg-white/95 border border-pink-400/40 sm:border-pink-200 shadow-2xl backdrop-blur-xl"
          >
            <span className="text-[11px] font-space font-bold text-pink-300 sm:text-pink-600 whitespace-nowrap">
              {Math.round(volume * 100)}%
            </span>

            {/* Range Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20 sm:w-28 h-1.5 bg-gray-600 sm:bg-pink-100 rounded-lg appearance-none cursor-pointer accent-[#FF4D8D]"
              aria-label="Volume Slider"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Unified Flute Sound Controller Pill */}
      <div className="flex items-center bg-black/80 sm:bg-white/95 border-2 border-pink-400/50 sm:border-pink-200 shadow-2xl backdrop-blur-xl rounded-full p-1.5 pl-3.5 pr-2 gap-3 transition-all duration-300 hover:border-[#FF4D8D]">
        {/* Track Info & Animated Wave Bars */}
        <div
          onClick={onToggle}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          {/* Animated Equalizer Wave Bars when playing */}
          <div className="flex items-center gap-0.5 h-4">
            {isPlaying && volume > 0 ? (
              [1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  animate={{ height: ['4px', '16px', '6px', '14px'] }}
                  transition={{
                    duration: 0.65,
                    repeat: Infinity,
                    delay: bar * 0.12,
                    ease: 'easeInOut'
                  }}
                  className="w-1 bg-[#FF4D8D] rounded-full"
                />
              ))
            ) : (
              <div className="flex items-center gap-0.5 h-4 opacity-40">
                <div className="w-1 h-1.5 bg-gray-400 rounded-full" />
                <div className="w-1 h-3 bg-gray-400 rounded-full" />
                <div className="w-1 h-1.5 bg-gray-400 rounded-full" />
              </div>
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-fredoka font-bold text-white sm:text-gray-800 tracking-wide flex items-center gap-1">
              <span>Sacred Flute Melody</span>
              <span className="text-[10px]">🪈</span>
            </span>
            <span className="text-[9px] font-quicksand text-pink-300 sm:text-gray-500 font-semibold">
              {isMuted ? 'Muted (Tap to Play)' : 'Continuous Serenity'}
            </span>
          </div>
        </div>

        {/* Volume Slider Trigger Button */}
        <button
          onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          className="p-1.5 rounded-full hover:bg-white/20 sm:hover:bg-pink-50 text-pink-300 sm:text-gray-600 hover:text-[#FF4D8D] transition-colors"
          title="Adjust Volume"
        >
          <Sliders className="w-4 h-4" />
        </button>

        {/* Master Mute / Unmute Toggle Button */}
        <button
          onClick={onToggle}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
            !isMuted
              ? 'bg-[#FF4D8D] text-white hover:scale-105'
              : 'bg-gray-700 sm:bg-gray-100 text-gray-300 sm:text-gray-500 hover:text-[#FF4D8D]'
          }`}
          title={isMuted ? 'Unmute Flute' : 'Mute Flute'}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4" />
          ) : volume < 0.4 ? (
            <Volume1 className="w-4 h-4" />
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
};
