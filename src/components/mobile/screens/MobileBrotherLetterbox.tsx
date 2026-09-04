import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MobileTopBar } from '../shared/MobileTopBar';
import { ChevronLeft, Send, Sparkles, Heart, Stamp, CheckCircle2 } from 'lucide-react';
import { soundEngine } from '../../../utils/soundEffects';
import { triggerCustomConfetti } from '../../shared/Confetti';

interface MobileBrotherLetterboxProps {
  onBack: () => void;
}

export const MobileBrotherLetterbox: React.FC<MobileBrotherLetterboxProps> = ({ onBack }) => {
  const [noteContent, setNoteContent] = useState('');
  const [selectedStamp, setSelectedStamp] = useState<'🌸' | '🐱' | '🌙' | '🛡️'>('🌸');
  const [isSaved, setIsSaved] = useState(false);
  const [savedNote, setSavedNote] = useState<string | null>(null);

  // Load existing note from localStorage if previously written
  useEffect(() => {
    const existing = localStorage.getItem('shree_note_to_brother');
    if (existing) {
      setSavedNote(existing);
    }
  }, []);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;

    soundEngine.playSparkle(1.8);
    soundEngine.playTempleBell();
    triggerCustomConfetti();

    const fullMessage = `${noteContent.trim()} ~ [Sealed with ${selectedStamp} stamp on ${new Date().toLocaleDateString()}]`;
    localStorage.setItem('shree_note_to_brother', fullMessage);
    setSavedNote(fullMessage);
    setIsSaved(true);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] bg-[#1a0f1d] text-white flex flex-col justify-between overflow-hidden select-none">
      {/* Devotional Ambient Night Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#1f0f24] via-[#160b1a] to-[#100713]" />

      <div>
        <MobileTopBar light />

        <div className="relative z-10 px-6 pt-1 flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[11px] font-space font-bold tracking-widest text-[#FFD93D] uppercase">
            A NOTE FOR MY BROTHER
          </span>
          <div className="w-9" />
        </div>
      </div>

      {/* Main Letterbox Interface */}
      <div className="relative z-10 px-6 my-auto flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-[#FFFDF8] text-[#3D2040] rounded-3xl p-6 shadow-2xl border-2 border-pink-200 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="border-b border-pink-100 pb-3 mb-3">
            <h3 className="font-script text-3xl text-[#FF4D8D]">
              Dear Karthik,
            </h3>
            <p className="font-quicksand text-xs text-gray-500">
              "If you are reading this... write whatever is in your heart. Only I can read this."
            </p>
          </div>

          {/* If already saved note exists, display it prominently */}
          {savedNote ? (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#FFF5F7] border border-pink-200/70 text-sm font-caveat text-xl text-gray-800 leading-relaxed min-h-[140px]">
                {savedNote}
              </div>
              <div className="flex items-center justify-between text-xs font-space text-pink-600">
                <span className="flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Sealed in Sibling Alliance</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSavedNote(null);
                    setIsSaved(false);
                  }}
                  className="text-xs text-gray-400 hover:text-gray-700 underline"
                >
                  Write Another Note
                </button>
              </div>
            </div>
          ) : (
            /* Note input form */
            <form onSubmit={handleSaveNote} className="space-y-3">
              <textarea
                required
                rows={5}
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Write your note to your brother here... thoughts, memories, or a thank-you ♡"
                className="w-full p-3.5 rounded-2xl bg-[#FFF5F7] border border-pink-200 text-sm font-caveat text-xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] leading-relaxed resize-none"
              />

              {/* Stamp Selection */}
              <div>
                <label className="block text-[10px] font-space font-bold uppercase text-gray-500 mb-1.5">
                  Pick Your Wax Stamp Seal
                </label>
                <div className="flex items-center gap-2">
                  {(['🌸', '🐱', '🌙', '🛡️'] as const).map((stamp) => (
                    <button
                      key={stamp}
                      type="button"
                      onClick={() => setSelectedStamp(stamp)}
                      className={`w-10 h-10 rounded-xl text-lg flex items-center justify-center transition-all ${
                        selectedStamp === stamp
                          ? 'bg-[#FF4D8D] text-white scale-110 shadow-md border-2 border-white'
                          : 'bg-pink-50 hover:bg-pink-100 text-gray-700 border border-pink-100'
                      }`}
                    >
                      {stamp}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit / Seal Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3.5 rounded-full bg-gradient-to-r from-[#FF4D8D] to-[#FF7A59] text-white font-fredoka font-bold text-xs shadow-pop hover:scale-102 active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Seal & Save for Your Brother ♡</span>
              </button>
            </form>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 px-8 pb-8 text-center text-xs font-caveat text-pink-300">
        "No matter the distance • Bengaluru ➔ Hyderabad • Forever Sibling Alliance"
      </div>
    </div>
  );
};
