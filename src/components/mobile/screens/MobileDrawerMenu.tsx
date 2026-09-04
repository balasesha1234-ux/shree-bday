import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Music, Image, Sparkles, Heart, BookOpen, Lock } from 'lucide-react';

interface MobileDrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectScreen: (screenId: string) => void;
}

export const MobileDrawerMenu: React.FC<MobileDrawerMenuProps> = ({
  isOpen,
  onClose,
  onSelectScreen
}) => {
  const menuItems = [
    { id: 'home', label: 'Home', subtitle: 'The World', icon: Home, color: 'text-[#FF4D8D]' },
    { id: 'music', label: 'Music', subtitle: 'Her Voice', icon: Music, color: 'text-amber-500' },
    { id: 'memories', label: 'Memories', subtitle: 'Moments', icon: Image, color: 'text-rose-500' },
    { id: 'faith', label: 'Faith', subtitle: 'Krishna', icon: Sparkles, color: 'text-amber-400' },
    { id: 'wishes', label: 'Wishes', subtitle: 'From Everyone', icon: Heart, color: 'text-pink-500' },
    { id: 'letter-open', label: 'Letter', subtitle: 'A Personal Note', icon: BookOpen, color: 'text-purple-500' },
    { id: 'private-home', label: 'Private', subtitle: 'Just for Shree', icon: Lock, color: 'text-[#D4A84B]', highlight: true },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="absolute inset-0 z-50 flex select-none">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Body matching Screen 05 */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="relative ml-auto w-4/5 max-w-xs h-full bg-[#FFF5F7] text-[#3D2040] shadow-2xl border-l border-pink-200 flex flex-col justify-between p-6 z-10"
          >
            <div>
              {/* Header with Title & Close */}
              <div className="flex items-center justify-between border-b border-pink-200/80 pb-4 mb-4">
                <h2 className="font-script text-4xl text-[#FF4D8D]">
                  Shree ♡
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-white hover:bg-pink-100 flex items-center justify-center text-gray-600 transition-colors shadow-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Menu Items List */}
              <div className="space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectScreen(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all hover:bg-pink-100/70 ${
                        item.highlight ? 'bg-pink-100/90 border border-pink-200 shadow-sm' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-xl bg-white flex items-center justify-center shadow-xs ${item.color}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-fredoka text-sm font-semibold text-gray-800 leading-tight">
                            {item.label}
                          </p>
                          <p className="font-quicksand text-[10px] text-gray-500">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Footer Quote from Screen 05 */}
            <div className="pt-4 border-t border-pink-200/70 text-center">
              <p className="font-caveat text-sm text-gray-600 italic">
                "A kinder tomorrow is still possible."
              </p>
              <div className="text-pink-400 text-lg mt-1">🌸</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
