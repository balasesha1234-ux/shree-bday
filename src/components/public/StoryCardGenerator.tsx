import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Check } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

type StoryTheme = 'pink' | 'devotional' | 'kitty';

export const StoryCardGenerator: React.FC = () => {
  const [theme, setTheme] = useState<StoryTheme>('pink');
  const [fanName, setFanName] = useState('Ananya');
  const [wishText, setWishText] = useState('Happy 22nd Birthday to our favorite creator! Keep shining always 🌸✨');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const previewCardRef = useRef<HTMLDivElement>(null);

  const handleDownloadStory = async () => {
    setIsGenerating(true);
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const grad = ctx.createLinearGradient(0, 0, 0, 1920);
      if (theme === 'pink') {
        grad.addColorStop(0, '#FFF5F5');
        grad.addColorStop(0.5, '#FFE5EC');
        grad.addColorStop(1, '#FFB3C6');
      } else if (theme === 'devotional') {
        grad.addColorStop(0, '#0F0E1E');
        grad.addColorStop(0.5, '#1B1736');
        grad.addColorStop(1, '#0C0A17');
      } else {
        grad.addColorStop(0, '#FFF8F0');
        grad.addColorStop(0.5, '#FFE8D6');
        grad.addColorStop(1, '#7CEBC6');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      ctx.fillStyle = theme === 'devotional' ? '#D4A84B' : '#FF4D8D';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MARCH 6 • 22ND BIRTHDAY CELEBRATION', 540, 180);

      ctx.fillStyle = theme === 'devotional' ? '#FFFFFF' : '#2D2D2D';
      ctx.font = 'bold 84px sans-serif';
      ctx.fillText('HAPPY BIRTHDAY SHREE! 🎂', 540, 280);

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/assets/serial/1s.jpg';

      await new Promise((resolve) => {
        img.onload = resolve;
        img.onerror = resolve;
      });

      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;
      ctx.roundRect(140, 360, 800, 940, 30);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      ctx.save();
      ctx.roundRect(180, 400, 720, 720, 20);
      ctx.clip();
      ctx.drawImage(img, 180, 400, 720, 720);
      ctx.restore();

      ctx.fillStyle = '#FF4D8D';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('The Kindest Soul 🌸', 540, 1220);

      ctx.fillStyle = theme === 'devotional' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.9)';
      ctx.roundRect(120, 1360, 840, 340, 30);
      ctx.fill();

      ctx.fillStyle = theme === 'devotional' ? '#FFD93D' : '#FF4D8D';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('WISH FROM: ' + fanName.toUpperCase(), 540, 1440);

      ctx.fillStyle = theme === 'devotional' ? '#FFFFFF' : '#2D2D2D';
      ctx.font = 'italic 36px sans-serif';
      
      const maxW = 760;
      const words = wishText.split(' ');
      let line = '';
      let yPos = 1520;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && n > 0) {
          ctx.fillText(line, 540, yPos);
          line = words[n] + ' ';
          yPos += 50;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 540, yPos);

      ctx.fillStyle = theme === 'devotional' ? '#D4A84B' : '#FF4D8D';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('#HappyBirthdayShree • my-love-bday.vercel.app', 540, 1820);

      const link = document.createElement('a');
      link.download = 'Shree-Birthday-Story-' + fanName.replace(/\s+/g, '_') + '.png';
      link.href = canvas.toDataURL('image/png');
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (_) {}

    setIsGenerating(false);
  };

  return (
    <section id="story-generator" className="relative w-full max-w-6xl mx-auto px-4 py-20 overflow-hidden select-none">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>VIRAL INSTAGRAM STORY CREATOR 📸</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Make Your Instagram Story Card
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Create a personalized 9:16 birthday story card for Shree to share on your Instagram story!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-pop border border-pink-100 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">1. Pick Story Template Theme</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setTheme('pink')}
                className={'py-3 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex flex-col items-center gap-1 transition-all ' + (theme === 'pink' ? 'bg-pink-50 border-[#FF4D8D] text-[#FF4D8D]' : 'border-gray-200 text-gray-600')}
              >
                <span className="text-xl">🌸</span>
                <span>Pink Aesthetic</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('devotional')}
                className={'py-3 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex flex-col items-center gap-1 transition-all ' + (theme === 'devotional' ? 'bg-amber-50 border-[#D4A84B] text-[#5C4410]' : 'border-gray-200 text-gray-600')}
              >
                <span className="text-xl">🪷</span>
                <span>Sacred Gold</span>
              </button>

              <button
                type="button"
                onClick={() => setTheme('kitty')}
                className={'py-3 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex flex-col items-center gap-1 transition-all ' + (theme === 'kitty' ? 'bg-emerald-50 border-[#7CEBC6] text-emerald-700' : 'border-gray-200 text-gray-600')}
              >
                <span className="text-xl">🐱</span>
                <span>Kitty Party</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">2. Your Name</label>
            <input
              type="text"
              value={fanName}
              onChange={(e) => setFanName(e.target.value)}
              maxLength={25}
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">3. Your Birthday Wish</label>
            <textarea
              rows={3}
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              maxLength={140}
              placeholder="Your wish..."
              className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm resize-none"
            />
            <span className="text-[10px] text-gray-400 float-right mt-0.5">{wishText.length}/140</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownloadStory}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2.5 py-4 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-base shadow-pop hover:scale-[1.02] active:scale-95 transition-all"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Story Card Downloaded! 🎉</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>{isGenerating ? 'Rendering Story...' : 'Download Instagram Story (1080x1920) 📸'}</span>
                </>
              )}
            </button>
            <span className="block text-center text-[11px] font-quicksand text-gray-400 mt-2">
              Ready to post directly on Instagram Stories & tag Shree!
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 flex justify-center">
          <div
            ref={previewCardRef}
            className={'w-[290px] sm:w-[320px] aspect-[9/16] rounded-3xl p-5 shadow-2xl border-4 flex flex-col justify-between items-center text-center overflow-hidden transition-all duration-500 relative ' + (theme === 'pink' ? 'bg-gradient-to-b from-[#FFF5F5] via-[#FFE5EC] to-[#FFB3C6] border-white' : theme === 'devotional' ? 'bg-gradient-to-b from-[#0F0E1E] via-[#1B1736] to-[#0C0A17] border-[#D4A84B]/60 text-white' : 'bg-gradient-to-b from-[#FFF8F0] via-[#FFE8D6] to-[#7CEBC6] border-white')}
          >
            <div className="pt-2">
              <span className="text-[9px] font-space font-bold tracking-widest text-[#FF4D8D] block uppercase">
                MARCH 6 • 22ND BIRTHDAY
              </span>
              <h4 className="text-xl font-fredoka font-bold text-gray-800 leading-tight mt-0.5">
                HAPPY BIRTHDAY SHREE! 🎂
              </h4>
            </div>

            <div className="bg-white rounded-2xl p-2.5 shadow-lg border border-pink-100 w-[85%] text-center">
              <div className="aspect-square w-full rounded-xl overflow-hidden bg-pink-50">
                <img
                  src="/assets/serial/1s.jpg"
                  alt="Shree"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: '50% 18%' }}
                />
              </div>
              <span className="font-caveat text-base font-bold text-gray-700 block mt-1">
                The Kindest Soul 🌸
              </span>
            </div>

            <div className="w-full bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-md border border-pink-100 text-center">
              <span className="text-[9px] font-space font-bold text-[#FF4D8D] uppercase block">
                FROM: {fanName || 'A FAN'}
              </span>
              <p className="font-quicksand text-xs font-semibold text-gray-800 line-clamp-2 mt-0.5 italic">
                "{wishText}"
              </p>
            </div>

            <div className="pb-1">
              <span className="text-[9px] font-space font-bold text-gray-500 tracking-wider">
                #HappyBirthdayShree • my-love-bday.vercel.app
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
