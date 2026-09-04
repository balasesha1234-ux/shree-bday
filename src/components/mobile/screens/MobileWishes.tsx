import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { WashiTape } from '../shared/WashiTape';
import { ChevronLeft, Plus, Heart } from 'lucide-react';
import { HANGING_WISHES, HangingWish } from '../../../data/mobileExperienceData';
import { soundEngine } from '../../../utils/soundEffects';

interface MobileWishesProps {
  onBack: () => void;
}

export const MobileWishes: React.FC<MobileWishesProps> = ({ onBack }) => {
  const [activeFilter, setActiveFilter] = useState<'Latest' | 'Popular' | 'Yours'>('Popular');
  const [wishes, setWishes] = useState<HangingWish[]>(HANGING_WISHES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorInput, setAuthorInput] = useState('');
  const [msgInput, setMsgInput] = useState('');

  const filtered = wishes.filter((w) => w.category === activeFilter);

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
    <div className="relative w-full h-full min-h-[720px] bg-[#FFF2F4] text-[#3D2040] flex flex-col justify-between overflow-hidden select-none">
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
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Pinned Wish Banner matching Screen 09 */}
        <div className="relative z-10 px-6 pt-3 flex justify-center">
          <div className="relative bg-[#FFDFE7] text-[#3D2040] px-5 py-2.5 rounded-xl shadow-md border border-pink-200 transform -rotate-1 text-center max-w-xs">
            <WashiTape color="pink" rotation={-3} className="absolute -top-2 left-1/2 -translate-x-1/2" />
            <p className="font-caveat text-base font-bold text-[#FF2D78]">
              Good People Brighter Days ♡
            </p>
          </div>
        </div>

        {/* Filter Navigation: < Latest | Popular | Yours > */}
        <div className="relative z-10 px-6 pt-4 flex items-center justify-center gap-4 text-xs font-space font-bold text-gray-600">
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
      </div>

      {/* Hanging Wish Cards Stream */}
      <div className="relative z-10 px-6 py-4 flex-1 overflow-y-auto no-scrollbar space-y-3 pb-8">
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative bg-white p-4 rounded-2xl shadow-sm border border-pink-100 flex flex-col justify-between"
          >
            <p className="font-quicksand text-xs sm:text-sm text-gray-700 leading-relaxed italic">
              "{item.message}"
            </p>

            <div className="mt-3 flex items-center justify-between pt-2 border-t border-pink-50">
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
