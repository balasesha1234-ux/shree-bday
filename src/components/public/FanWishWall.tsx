import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Plus, Sparkles, Pin, Flame, MessageSquare } from 'lucide-react';
import { FanWish, INITIAL_MOCK_WISHES, getFanWishes, submitFanWish, supabase } from '../../utils/supabaseClient';
import { WishSubmitForm } from './WishSubmitForm';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const FanWishWall: React.FC = () => {
  const [wishes, setWishes] = useState<FanWish[]>(INITIAL_MOCK_WISHES);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'recent'>('all');
  const [heartBursts, setHeartBursts] = useState<{ id: string; x: number; y: number }[]>([]);

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

  const handleLike = async (id: string, e: React.MouseEvent) => {
    if (likedIds.has(id)) return;
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti(e.clientX, e.clientY);

    // Trigger visual floating heart burst at click position
    const burstId = Date.now() + Math.random().toString();
    setHeartBursts((prev) => [...prev, { id: burstId, x: e.clientX, y: e.clientY }]);
    setTimeout(() => {
      setHeartBursts((prev) => prev.filter((b) => b.id !== burstId));
    }, 1000);

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

  const filteredWishes = [...wishes].sort((a, b) => {
    if (activeFilter === 'popular') return (b.likes || 0) - (a.likes || 0);
    if (activeFilter === 'recent') return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    return 0;
  });

  return (
    <section id="wish-wall" className="w-full max-w-6xl mx-auto px-4 py-20 select-none relative">
      {/* Floating Heart Burst Overlay */}
      {heartBursts.map((b) => (
        <motion.div
          key={b.id}
          initial={{ opacity: 1, scale: 0.5, y: 0 }}
          animate={{ opacity: 0, scale: 2.2, y: -70 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ position: 'fixed', left: b.x - 15, top: b.y - 15, zIndex: 9999, pointerEvents: 'none' }}
          className="text-3xl"
        >
          💖
        </motion.div>
      ))}

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-space uppercase tracking-widest text-[#FF4D8D] font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
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

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1">
        {[
          { id: 'all', label: '🌸 All Wishes' },
          { id: 'popular', label: '💖 Most Loved' },
          { id: 'recent', label: '✨ Latest' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveFilter(tab.id as any);
              soundEngine.playPop();
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-fredoka font-bold border transition-all ${
              activeFilter === tab.id
                ? 'bg-[#FF4D8D] text-white border-[#FF4D8D] shadow-sm scale-105'
                : 'bg-white text-gray-600 hover:bg-pink-50 border-pink-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3D Depth Card Deck */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: '1200px' }}>
        {filteredWishes.map((wish, index) => {
          const isLiked = likedIds.has(wish.id);

          return (
            <motion.div
              key={wish.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.04 }}
              whileHover={{
                y: -10,
                scale: 1.03,
                rotateZ: (index % 2 === 0 ? 1 : -1) * 1.2,
                transition: { duration: 0.25 }
              }}
              className="relative p-6 rounded-3xl bg-white/95 backdrop-blur-md shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:shadow-2xl border-2 border-pink-100/90 flex flex-col justify-between transform-gpu transition-all duration-300 group"
            >
              {/* Subtle Metallic Corner Pin */}
              <div className="absolute top-3.5 right-3.5 text-pink-300/60 group-hover:text-[#FF4D8D] transition-colors">
                <Pin className="w-4 h-4" />
              </div>

              <div>
                <div className="flex items-center gap-3 border-b border-pink-50 pb-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 flex items-center justify-center text-2xl shadow-inner">
                    {wish.emoji || '🌸'}
                  </div>
                  <div>
                    <h4 className="font-fredoka font-bold text-gray-800 text-base">
                      {wish.name}
                    </h4>
                    {wish.city && (
                      <span className="text-[11px] font-space font-bold text-pink-600 block">
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
                  onClick={(e) => handleLike(wish.id, e)}
                  className={'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm active:scale-90 ' + (isLiked ? 'bg-pink-100 text-[#FF4D8D] ring-2 ring-[#FF4D8D]/30' : 'bg-gray-50 text-gray-500 hover:bg-pink-50 hover:text-[#FF4D8D]')}
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
