import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Sparkles, Pin } from 'lucide-react';
import { FanWish, INITIAL_MOCK_WISHES, getFanWishes, submitFanWish, supabase } from '../../utils/supabaseClient';
import { WishSubmitForm } from './WishSubmitForm';
import { soundEngine } from '../../utils/soundEffects';

export const FanWishWall: React.FC = () => {
  const [wishes, setWishes] = useState<FanWish[]>(INITIAL_MOCK_WISHES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  // Load from live database on mount
  useEffect(() => {
    getFanWishes().then((data) => {
      if (data && data.length > 0) {
        setWishes(data);
      }
    });

    if (supabase) {
      const channel = supabase
        .channel('public:fan_wishes')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'fan_wishes' },
          (payload) => {
            const newWish = payload.new as FanWish;
            setWishes((prev) => [newWish, ...prev.filter((w) => w.id !== newWish.id)]);
          }
        )
        .subscribe();

      return () => {
        if (supabase) { supabase.removeChannel(channel); }
      };
    }
  }, []);

  const handleAddWish = async (newWishData: Omit<FanWish, 'id' | 'created_at' | 'likes'>) => {
    const saved = await submitFanWish(newWishData);
    setWishes((prev) => [saved, ...prev.filter((w) => w.id !== saved.id)]);
  };

  const handleLike = async (id: string) => {
    if (likedIds.has(id)) return;
    soundEngine.playPop();
    setLikedIds(new Set([...likedIds, id]));

    setWishes((prev) =>
      prev.map((w) => (w.id === id ? { ...w, likes: (w.likes || 0) + 1 } : w))
    );

    if (supabase) {
      try {
        const targetWish = wishes.find((w) => w.id === id);
        const currentLikes = (targetWish?.likes || 0) + 1;
        await supabase.from('fan_wishes').update({ likes: currentLikes }).eq('id', id);
      } catch (_) {}
    }
  };

  return (
    <section id="wish-wall" className="w-full max-w-6xl mx-auto px-4 py-20 select-none">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        <div>
          <span className="text-xs font-space uppercase tracking-widest text-[#FF4D8D] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>GLOBAL CELEBRATION CHORUS 🌸</span>
          </span>
          <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800 mt-1">
            Shree’s Birthday Wish Wall
          </h2>
          <p className="text-sm font-quicksand text-gray-600 mt-1">
            {wishes.length} lovely birthday wishes live from fans worldwide!
          </p>
        </div>

        <button
          onClick={() => {
            soundEngine.playTap();
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF7A59] hover:brightness-110 text-white font-fredoka font-bold text-sm shadow-pop hover:scale-105 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Post Your Wish 💌</span>
        </button>
      </div>

      {/* 3D Depth Card Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1000px' }}>
        {wishes.map((wish, index) => {
          const isLiked = likedIds.has(wish.id);

          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{
                y: -8,
                scale: 1.03,
                rotateZ: (index % 2 === 0 ? 1 : -1) * 0.8,
                transition: { duration: 0.25 }
              }}
              className="relative p-6 rounded-3xl bg-white/90 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-2xl border border-pink-100/90 flex flex-col justify-between transform-gpu transition-all duration-300 group"
            >
              {/* Subtle Corner Pin */}
              <div className="absolute top-3.5 right-3.5 text-pink-300/60 group-hover:text-[#FF4D8D] transition-colors">
                <Pin className="w-3.5 h-3.5" />
              </div>

              <div>
                <div className="flex items-center gap-3 border-b border-pink-50 pb-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-pink-50 border border-pink-100 flex items-center justify-center text-2xl shadow-inner">
                    {wish.emoji || '🌸'}
                  </div>
                  <div>
                    <h4 className="font-fredoka font-bold text-gray-800 text-base">
                      {wish.name}
                    </h4>
                    {wish.city && (
                      <span className="text-[11px] font-space font-semibold text-pink-600 block">
                        📍 {wish.city}
                      </span>
                    )}
                  </div>
                </div>

                <p className="font-quicksand text-gray-700 text-sm leading-relaxed mb-4">
                  "{wish.message}"
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-pink-50 text-xs font-quicksand text-gray-400">
                <span>{new Date(wish.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>

                <button
                  onClick={() => handleLike(wish.id)}
                  className={'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all ' + (isLiked ? 'bg-pink-100 text-[#FF4D8D] shadow-sm' : 'bg-gray-50 text-gray-500 hover:bg-pink-50 hover:text-[#FF4D8D]')}
                >
                  <Heart className={'w-3.5 h-3.5 ' + (isLiked ? 'fill-[#FF4D8D] text-[#FF4D8D]' : '')} />
                  <span>{wish.likes || 0}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <WishSubmitForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleAddWish}
      />
    </section>
  );
};
