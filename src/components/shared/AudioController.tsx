import React from 'react';
import { Volume2, VolumeX, Music, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
  mode?: 'countdown' | 'party' | 'devotional';
}

export const AudioController: React.FC<AudioControllerProps> = ({
  isPlaying,
  onToggle,
  mode = 'party'
}) => {
  const trackName =
    mode === 'countdown'
      ? 'Doomsday Ambient Pulse'
      : mode === 'devotional'
      ? 'Radha Rani 432Hz Sanctuary'
      : 'Shree’s Birthday Dream Melody';

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full shadow-pop border backdrop-blur-md transition-all ${
          isPlaying
            ? 'bg-white/90 border-[#FF4D8D] text-[#FF4D8D]'
            : 'bg-white/70 border-pink-200 text-gray-600 hover:text-[#FF4D8D]'
        }`}
      >
        <div className="relative">
          {isPlaying ? (
            <Volume2 className="w-5 h-5 animate-pulse text-[#FF4D8D]" />
          ) : (
            <VolumeX className="w-5 h-5 text-gray-400" />
          )}
        </div>

        <div className="flex flex-col text-left">
          <span className="text-[11px] font-fredoka uppercase tracking-wider font-semibold">
            {isPlaying ? 'Music Playing' : 'Sound Muted'}
          </span>
          <span className="text-[10px] font-quicksand text-gray-500 max-w-[140px] truncate">
            {trackName}
          </span>
        </div>

        {isPlaying && (
          <div className="flex items-center gap-0.5 ml-1">
            {[1, 2, 3, 4].map((bar) => (
              <motion.div
                key={bar}
                animate={{ height: ['4px', '16px', '6px', '14px'] }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: bar * 0.15,
                  ease: 'easeInOut'
                }}
                className="w-1 bg-[#FF4D8D] rounded-full"
              />
            ))}
          </div>
        )}
      </motion.button>
    </div>
  );
};
