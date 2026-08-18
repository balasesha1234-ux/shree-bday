import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Heart, AlertCircle } from 'lucide-react';
import { FanWish } from '../../utils/supabaseClient';
import { triggerCustomConfetti } from '../shared/Confetti';

interface WishSubmitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (wish: Omit<FanWish, 'id' | 'created_at' | 'likes'>) => void;
}

// Anti-XSS and Anti-Spam Sanitizer
function sanitizeInput(text: string): string {
  return text
    .replace(/[<>]/g, '') // Strip HTML tags
    .replace(/javascript:/gi, '')
    .trim();
}

export const WishSubmitForm: React.FC<WishSubmitFormProps> = ({ isOpen, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🌸');
  const [cooldownError, setCooldownError] = useState<string | null>(null);

  const emojis = ['🌸', '🐱', '🪷', '✨', '💖', '🎂', '🎈', '👑'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCooldownError(null);

    const cleanName = sanitizeInput(name);
    const cleanMessage = sanitizeInput(message);
    const cleanCity = sanitizeInput(city);

    if (!cleanName || !cleanMessage) return;

    // Rate Limiting (Anti-Spam Flooding Guard)
    const lastSubmitTime = Number(sessionStorage.getItem('last_wish_submit_time') || 0);
    const now = Date.now();
    if (now - lastSubmitTime < 10000) {
      const waitSeconds = Math.ceil((10000 - (now - lastSubmitTime)) / 1000);
      setCooldownError(`Please wait ${waitSeconds}s before submitting another wish!`);
      return;
    }

    sessionStorage.setItem('last_wish_submit_time', String(now));

    onSubmit({
      name: cleanName.slice(0, 40),
      city: cleanCity ? cleanCity.slice(0, 30) : undefined,
      message: cleanMessage.slice(0, 300),
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
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

            {cooldownError && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-600 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{cooldownError}</span>
              </div>
            )}

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
                  placeholder="Write a sweet, uplifting birthday wish for Shree..."
                  maxLength={300}
                  className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm resize-none"
                />
                <span className="text-[10px] text-gray-400 block text-right">
                  {message.length} / 300 characters
                </span>
              </div>

              {/* Choose Emoji Avatar */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Choose an Emoji Stamp</label>
                <div className="flex flex-wrap gap-2">
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setSelectedEmoji(emoji)}
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all ${
                        selectedEmoji === emoji
                          ? 'bg-pink-100 border-2 border-[#FF4D8D] scale-110 shadow-sm'
                          : 'bg-gray-50 border border-gray-200 hover:bg-pink-50'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-semibold text-sm shadow-pop hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Post Birthday Wish 🌸</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
