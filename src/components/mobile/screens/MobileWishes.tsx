import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { WashiTape } from '../shared/WashiTape';
import { ChevronLeft, Plus, Heart, X, Sparkles } from 'lucide-react';
import { HANGING_WISHES, HangingWish } from '../../../data/mobileExperienceData';
import { FRIEND_WISHES_DATA, FriendWish } from '../../../data/friendWishes';
import { soundEngine } from '../../../utils/soundEffects';
import { triggerCustomConfetti } from '../../shared/Confetti';

interface MobileWishesProps {
  onBack: () => void;
}

export const MobileWishes: React.FC<MobileWishesProps> = ({ onBack }) => {
  const [viewType, setViewType] = useState<'balloons' | 'stream'>('balloons');
  const [activeFilter, setActiveFilter] = useState<'Latest' | 'Popular' | 'Yours'>('Popular');
  const [wishes, setWishes] = useState<HangingWish[]>(HANGING_WISHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorInput, setAuthorInput] = useState('');
  const [msgInput, setMsgInput] = useState('');

  // Balloon pop state
  const [poppedIds, setPoppedIds] = useState<Set<number>>(new Set());
  const [selectedBalloon, setSelectedBalloon] = useState<FriendWish | null>(null);

  const filtered = wishes.filter((w) => w.category === activeFilter);

  const handlePop = (wish: FriendWish, e: React.MouseEvent) => {
    soundEngine.playHarmonicPop(wish.id);
    triggerCustomConfetti(e.clientX, e.clientY);
    setPoppedIds((prev) => new Set([...prev, wish.id]));
    setSelectedBalloon(wish);
  };

  const handleLike = (id: number) => {
    soundEngine.playPop();
    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: w.likes + 1 } : w))
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim()) return;
    soundEngine.playSparkle(1.5);
    const newWish: HangingWish = {
      id: Date.now(),
      author: authorInput.trim() || 'A Warm Well-Wisher',
      message: msgInput.trim(),
      likes: 1,
      tapeColor: 'pink',
      category: activeFilter
    };
    setWishes([newWish, ...wishes]);
    setAuthorInput('');
    setMsgInput('');
    setIsModalOpen(false);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#FFF2F4] text-[#3D2040] flex flex-col justify-between overflow-hidden select-none font-quicksand">
      <div>
        <MobileTopBar light={false} />

        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-gray-700 shadow-sm"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="font-script text-3xl text-[#FF4D8D]">
            Wishes ♡
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-9 h-9 rounded-full bg-[#FF4D8D] text-white flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all"
            title="Leave a Wish"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* View Switcher: Friend Balloons vs Live Stream */}
        <div className="relative z-10 px-6 pt-3 flex justify-center">
          <div className="p-1 rounded-2xl bg-pink-100/80 border border-pink-200 flex items-center gap-1 text-xs font-space font-semibold">
            <button
              onClick={() => {
                soundEngine.playTap();
                setViewType('balloons');
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                viewType === 'balloons'
                  ? 'bg-[#FF4D8D] text-white shadow-xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🎈 Friend Balloons ({FRIEND_WISHES_DATA.length})
            </button>
            <button
              onClick={() => {
                soundEngine.playTap();
                setViewType('stream');
              }}
              className={`px-3 py-1 rounded-xl transition-all ${
                viewType === 'stream'
                  ? 'bg-[#FF4D8D] text-white shadow-xs font-bold'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              💌 Live Stream
            </button>
          </div>
        </div>
      </div>

      {/* VIEW TYPE 1: FRIEND WISH BALLOONS (PC FEATURE BROUGHT TO MOBILE) */}
      {viewType === 'balloons' && (
        <div className="relative z-10 px-4 flex-1 overflow-y-auto no-scrollbar py-4 space-y-4">
          <div className="text-center px-4">
            <p className="text-xs font-space text-[#FF4D8D] font-bold uppercase tracking-wider">
              INNER CIRCLE BLESSINGS
            </p>
            <p className="text-[11px] text-gray-600 mt-0.5">
              Secret messages from the people closest to Shree. Tap a balloon to pop & read!
            </p>
          </div>

          {/* Balloons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 justify-items-center pt-2 pb-6">
            {FRIEND_WISHES_DATA.map((item, idx) => {
              const isPopped = poppedIds.has(item.id);

              return (
                <motion.div
                  key={item.id}
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 2.8 + idx * 0.3, ease: 'easeInOut' }}
                  whileTap={{ scale: 0.92 }}
                  onClick={(e) => handlePop(item, e)}
                  className="cursor-pointer flex flex-col items-center text-center p-2"
                >
                  <div
                    className={`w-20 h-24 rounded-full ${item.balloonColor} text-white flex flex-col items-center justify-center shadow-md border-2 border-white relative overflow-hidden p-2`}
                  >
                    {item.avatarImg ? (
                      <img
                        src={item.avatarImg}
                        alt={item.name}
                        style={{ objectPosition: item.avatarPosition || 'center' }}
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/90 shadow-xs"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-white/25 backdrop-blur-sm border border-white/90 flex items-center justify-center">
                        <span className="text-xl">{item.avatarEmoji}</span>
                      </div>
                    )}
                    <span className="text-[10px] font-fredoka font-bold mt-1 max-w-[70px] truncate text-center text-white drop-shadow-sm">
                      {item.shortName || item.name}
                    </span>

                    {/* Balloon String */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-gray-400" />
                  </div>

                  <span className="mt-5 text-[10px] font-space font-bold text-gray-500">
                    {isPopped ? 'READ 💌' : 'TAP TO POP 🎈'}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW TYPE 2: HANGING WISH CARDS STREAM */}
      {viewType === 'stream' && (
        <div className="relative z-10 px-6 py-2 flex-1 overflow-y-auto no-scrollbar space-y-3 pb-8">
          {/* Pinned Wish Banner */}
          <div className="relative bg-[#FFDFE7] text-[#3D2040] px-4 py-2 rounded-xl shadow-xs border border-pink-200 transform -rotate-1 text-center max-w-xs mx-auto mb-3">
            <WashiTape color="pink" rotation={-3} className="absolute -top-2 left-1/2 -translate-x-1/2" />
            <p className="font-caveat text-sm font-bold text-[#FF2D78]">
              Good People Brighter Days ♡
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex items-center justify-center gap-4 text-xs font-space font-bold text-gray-600 mb-2">
            {(['Latest', 'Popular', 'Yours'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`transition-all ${activeFilter === filter ? 'text-[#FF4D8D] border-b-2 border-[#FF4D8D] pb-0.5' : 'text-gray-400 hover:text-gray-700'}`}
              >
                {filter}
              </button>
            ))}
          </div>

          {filtered.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative bg-white p-3.5 rounded-2xl shadow-xs border border-pink-100 flex flex-col justify-between"
            >
              <p className="font-quicksand text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                "{item.message}"
              </p>

              <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-pink-50">
                <span className="font-caveat text-sm text-[#FF4D8D] font-bold">
                  — {item.author}
                </span>

                <button
                  onClick={() => handleLike(item.id)}
                  className="flex items-center gap-1 text-xs text-pink-500 hover:text-pink-600 font-fredoka font-semibold"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{item.likes}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Pop-up Balloon Modal for Mobile */}
      <AnimatePresence>
        {selectedBalloon && (
          <div
            onClick={() => setSelectedBalloon(null)}
            className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-xs w-full bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-200 text-center space-y-3"
            >
              <button
                onClick={() => setSelectedBalloon(null)}
                className="absolute top-3 right-3 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {selectedBalloon.avatarImg ? (
                <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-3 border-pink-200 shadow-md">
                  <img
                    src={selectedBalloon.avatarImg}
                    alt={selectedBalloon.name}
                    style={{ objectPosition: selectedBalloon.avatarPosition || 'center' }}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-[#FFD93D] via-[#D4A84B] to-amber-600 text-white flex items-center justify-center text-3xl shadow-md border-2 border-amber-200">
                  <span>{selectedBalloon.avatarEmoji}</span>
                </div>
              )}

              <div>
                <h3 className="font-fredoka text-lg font-bold text-gray-900 leading-tight">
                  From {selectedBalloon.name}
                </h3>
                <span className="text-[10px] font-space text-[#FF4D8D] uppercase font-bold tracking-wide">
                  {selectedBalloon.relation}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-pink-50 border border-pink-100 text-left">
                <p className="font-quicksand text-xs text-gray-800 leading-relaxed italic">
                  "{selectedBalloon.message}"
                </p>
                <p className="text-right text-[11px] font-fredoka font-bold text-[#FF4D8D] mt-2">
                  {selectedBalloon.signature}
                </p>
              </div>

              <button
                onClick={() => setSelectedBalloon(null)}
                className="w-full py-2 rounded-full bg-gray-100 text-gray-700 text-xs font-fredoka font-semibold"
              >
                Close 🌸
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Leave a Wish Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
          <motion.form
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onSubmit={handleSubmit}
            className="w-full max-w-xs bg-white rounded-3xl p-6 shadow-2xl border-2 border-pink-200 text-left space-y-3"
          >
            <h3 className="font-fredoka text-lg font-bold text-gray-800 text-center">
              Leave a Wish for Shree 🌸
            </h3>
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-pink-50 border border-pink-200 text-xs font-quicksand focus:outline-none focus:ring-2 focus:ring-[#FF4D8D]"
            />
            <textarea
              required
              rows={3}
              placeholder="Write a sweet birthday blessing..."
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-pink-50 border border-pink-200 text-xs font-quicksand focus:outline-none focus:ring-2 focus:ring-[#FF4D8D]"
            />
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-fredoka font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-2 rounded-full bg-[#FF4D8D] text-white text-xs font-fredoka font-bold shadow-md"
              >
                Post Wish 💌
              </button>
            </div>
          </motion.form>
        </div>
      )}
    </div>
  );
};
