import React, { useState } from 'react';
import { Volume2, VolumeX, Music, Disc, Sparkles, X, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { soundEngine } from '../../utils/soundEffects';

interface AudioControllerProps {
  isPlaying: boolean;
  onToggle: () => void;
  mode?: 'countdown' | 'party' | 'devotional';
}

interface SoundscapeTrack {
  id: number;
  title: string;
  artist: string;
  vibe: string;
  icon: string;
  src: string;
}

const SOUNDSCAPE_TRACKS: SoundscapeTrack[] = [
  { id: 1, title: 'Radha Rani 432Hz Sanctuary', artist: 'Devotional Sacred Chants', vibe: 'Peace & Prayer 🪷', icon: '🪷', src: '/assets/audio/ambient.mp3' },
  { id: 2, title: 'Shree’s Birthday Dream Melody', artist: 'Celebratory Acoustic Joy', vibe: 'Festive Smiles 🎂', icon: '🎂', src: '/assets/audio/background.mp3' },
  { id: 3, title: 'Phoolon Ka Taaron Ka', artist: 'Sibling Anthem / Lata Mangeshkar', vibe: 'Best Sister 🌸', icon: '🌸', src: '/assets/audio/track3.mp3' },
  { id: 4, title: 'Evening Chai Talks', artist: 'Cozy Lo-Fi Acoustic Guitar', vibe: 'Late Night Chats ☕', icon: '☕', src: '/assets/audio/track4.mp3' },
  { id: 5, title: 'Counting Stars', artist: 'OneRepublic / Acoustic Vibe', vibe: 'Creator Milestones 🚀', icon: '🚀', src: '/assets/audio/track5.mp3' },
  { id: 6, title: 'Tera Yaar Hoon Main', artist: 'Arijit Singh / Brother Tribute', vibe: 'Lifelong Shield 🛡️', icon: '🛡️', src: '/assets/audio/track6.mp3' },
  { id: 7, title: 'Sacred Vrindavan Flute', artist: 'Divine Temple Resonance', vibe: 'Serenity & Grace 🪈', icon: '🪈', src: '/assets/audio/track7.mp3' }
];

export const AudioController: React.FC<AudioControllerProps> = ({
  isPlaying,
  onToggle,
  mode = 'party'
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentTrackId, setCurrentTrackId] = useState(1);

  const handleSelectTrack = (track: SoundscapeTrack) => {
    setCurrentTrackId(track.id);
    soundEngine.playTrack(track.src);
    soundEngine.playSparkle(1.2);
  };

  const currentTrack = SOUNDSCAPE_TRACKS.find((t) => t.id === currentTrackId) || SOUNDSCAPE_TRACKS[0];

  return (
    <>
      <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center gap-3 select-none">
        {/* Main Floating Audio Pill */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`flex items-center gap-3 px-4 py-2.5 rounded-full shadow-pop border-2 backdrop-blur-md transition-all ${
            isPlaying
              ? 'bg-white/95 border-[#FF4D8D] text-[#FF4D8D] shadow-pink-300/50'
              : 'bg-white/80 border-pink-200 text-gray-600 hover:text-[#FF4D8D]'
          }`}
        >
          <div className="relative">
            {isPlaying ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                className="w-5 h-5 rounded-full border border-[#FF4D8D] flex items-center justify-center text-[10px]"
              >
                <Disc className="w-4 h-4 text-[#FF4D8D]" />
              </motion.div>
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[11px] font-fredoka uppercase tracking-wider font-semibold">
              {isPlaying ? 'Now Playing' : 'Sound Muted'}
            </span>
            <span className="text-[10px] font-quicksand text-gray-500 max-w-[130px] truncate">
              {isPlaying ? currentTrack.title : 'Tap to open Soundscape'}
            </span>
          </div>

          {isPlaying && (
            <div className="flex items-center gap-0.5 ml-1">
              {[1, 2, 3, 4].map((bar) => (
                <motion.div
                  key={bar}
                  animate={{ height: ['4px', '16px', '6px', '14px'] }}
                  transition={{
                    duration: 0.7,
                    repeat: Infinity,
                    delay: bar * 0.12,
                    ease: 'easeInOut'
                  }}
                  className="w-1 bg-[#FF4D8D] rounded-full"
                />
              ))}
            </div>
          )}
        </motion.button>
      </div>

      {/* Floating Soundscape Jukebox Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-16 sm:bottom-20 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-md bg-white/95 backdrop-blur-xl rounded-3xl p-4 sm:p-5 shadow-2xl border-2 border-pink-200 select-none overflow-hidden"
          >
            <div className="flex items-center justify-between pb-3 border-b border-pink-100">
              <div className="flex items-center gap-2">
                <Music className="w-4 h-4 text-[#FF4D8D]" />
                <h4 className="font-fredoka font-bold text-sm text-gray-800">
                  Sibling Soundscape Jukebox 🎶
                </h4>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                className="p-1 rounded-full hover:bg-pink-100 text-gray-400 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Track List */}
            <div className="mt-3 space-y-2 max-h-64 overflow-y-auto pr-1">
              {SOUNDSCAPE_TRACKS.map((t) => {
                const isThisTrack = isPlaying && currentTrackId === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => handleSelectTrack(t)}
                    className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all border ${
                      isThisTrack
                        ? 'bg-pink-50 border-[#FF4D8D] shadow-sm'
                        : 'hover:bg-gray-50 border-transparent text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      <span className="text-xl">{t.icon}</span>
                      <div className="overflow-hidden">
                        <span className={`text-xs font-fredoka font-bold block truncate ${isThisTrack ? 'text-[#FF4D8D]' : 'text-gray-800'}`}>
                          {t.title}
                        </span>
                        <span className="text-[10px] font-quicksand text-gray-400 block truncate">
                          {t.artist}
                        </span>
                      </div>
                    </div>

                    <span className="text-[10px] font-space font-semibold px-2 py-0.5 rounded-full bg-white/80 border border-pink-100 whitespace-nowrap text-gray-500">
                      {isThisTrack ? '▶ PLAYING' : t.vibe}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Toggle Mute Button */}
            <div className="mt-4 pt-3 border-t border-pink-100 flex items-center justify-between">
              <span className="text-[11px] font-quicksand text-gray-400">
                Tap any track to play
              </span>
              <button
                onClick={onToggle}
                className="px-4 py-1.5 rounded-full bg-[#FF4D8D] text-white font-fredoka font-bold text-xs shadow-sm hover:scale-105 transition-all"
              >
                {isPlaying ? 'Mute Audio 🔇' : 'Play Audio 🔊'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
