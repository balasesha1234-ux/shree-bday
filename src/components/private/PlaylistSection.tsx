import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Disc3, Heart, Play, Pause, Music, Sparkles } from 'lucide-react';
import { PLAYLIST_DATA, PlaylistItem } from '../../data/playlist';
import { soundEngine } from '../../utils/soundEffects';

export const PlaylistSection: React.FC = () => {
  const [activeSongId, setActiveSongId] = useState<number | null>(1);
  const [isPlayingSong, setIsPlayingSong] = useState<boolean>(false);

  const handleToggleSong = (song: PlaylistItem) => {
    if (activeSongId === song.id && isPlayingSong) {
      soundEngine.stopAmbientMusic();
      setIsPlayingSong(false);
    } else {
      setActiveSongId(song.id);
      soundEngine.playTrack(song.audioUrl);
      setIsPlayingSong(true);
      soundEngine.playSparkle(1.2);
    }
  };

  return (
    <section className="w-full max-w-5xl mx-auto px-4 py-20 select-none">
      <div className="text-center max-w-xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-2">
          <Music className="w-3.5 h-3.5" />
          <span>CHAPTER 01 // 7 SIBLING MELODIES 🎵</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Songs That Sound Like You
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Each vinyl holds a memory of late-night calls, Delhi laughter, and your brother’s pride. Tap to play!
        </p>
      </div>

      <div className="space-y-6">
        {PLAYLIST_DATA.map((song, idx) => {
          const isSelected = activeSongId === song.id;
          const isCurrentPlaying = isSelected && isPlayingSong;

          return (
            <motion.div
              key={song.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              onClick={() => handleToggleSong(song)}
              className={`cursor-pointer rounded-3xl p-6 border-2 transition-all duration-300 ${
                isSelected
                  ? 'bg-white border-[#FF4D8D] shadow-pop'
                  : 'bg-white/80 border-pink-100 hover:border-pink-300 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Song info & Vinyl art */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shrink-0 shadow-md">
                    <img
                      src={song.albumArt}
                      alt={song.title}
                      className="w-full h-full object-cover object-[center_20%]"
                    />
                    <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                      <Disc3
                        className={`w-8 h-8 text-white ${
                          isCurrentPlaying ? 'animate-spin' : ''
                        }`}
                        style={{ animationDuration: '3s' }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-space font-bold px-2 py-0.5 rounded-full bg-pink-100 text-[#FF4D8D]">
                        VINYL TRACK 0${song.id}
                      </span>
                      <span className="text-xs font-quicksand text-gray-400">
                        {song.duration}
                      </span>
                    </div>

                    <h3 className="text-xl font-fredoka font-bold text-gray-800 mt-1">
                      {song.title}
                    </h3>
                    <p className="text-xs font-quicksand text-gray-500 font-medium">
                      {song.artist}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-fredoka text-pink-500 bg-pink-50 px-3 py-1.5 rounded-full border border-pink-100">
                    ✨ {song.vibe}
                  </span>

                  <div className="w-10 h-10 rounded-full bg-[#FF4D8D] text-white flex items-center justify-center shadow-md">
                    {isCurrentPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                  </div>
                </div>
              </div>

              {/* Handwritten Note for the Song */}
              <div className="mt-4 pt-4 border-t border-pink-100 flex items-start gap-2 text-gray-700">
                <Heart className="w-4 h-4 text-[#FF4D8D] shrink-0 mt-1 fill-[#FF4D8D]" />
                <p className="font-caveat text-xl text-gray-800 leading-snug">
                  "{song.personalNote}"
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
