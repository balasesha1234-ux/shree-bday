import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Heart } from 'lucide-react';
import { FanWish } from '../../utils/supabaseClient';
import { triggerCustomConfetti } from '../shared/Confetti';

interface WishSubmitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (wish: Omit<FanWish, 'id' | 'created_at' | 'likes'>) => void;
}

export const WishSubmitForm: React.FC<WishSubmitFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌸');

  const emojis = ['🌸', '🐱', '🪷', '✨', '💖', '🎂', '🎈', '👑'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onSubmit({
      name: name.trim(),
      city: city.trim() || undefined,
      message: message.trim(),
      emoji: selectedEmoji
    });

    triggerCustomConfetti();
    setName('');
    setCity('');
    setMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-pink-100 overflow-hidden"
          >
            {/* Top decorative gradient */}
            <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-[#FF4D8D] via-[#FFD93D] to-[#7CEBC6]" />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-fredoka font-bold text-gray-800 flex items-center gap-2">
                  Send Your Birthday Wish 💌
                </h3>
                <p className="text-xs font-quicksand text-gray-500 mt-0.5">
                  Your message will appear live on Shree’s Birthday Wish Wall!
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 font-quicksand">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya"
                    maxLength={40}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Your City (Optional)</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Delhi, Mumbai"
                    maxLength={30}
                    className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Your Birthday Message *</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write something sweet, warm, or funny for Shree..."
                  maxLength={280}
                  className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm resize-none"
                />
                <span className="text-[10px] text-gray-400 float-right mt-1">
                  {message.length} / 280
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Pick a Reaction Badge</label>
                <div className="flex items-center gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg transition-all ${
                        selectedEmoji === emoji
                          ? 'bg-[#FF4D8D] text-white scale-110 shadow-sm'
                          : 'bg-pink-50 hover:bg-pink-100'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-full text-xs font-fredoka font-semibold text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white text-xs font-fredoka font-semibold shadow-pop hover:scale-105 active:scale-95 transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Wish 🌸</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
