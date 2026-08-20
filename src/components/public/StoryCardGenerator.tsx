import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Check, Image as ImageIcon, Camera } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

type StoryTheme = 'pink' | 'devotional' | 'kitty';

const AVAILABLE_PHOTOS = [
  { id: '1', url: '/assets/serial/6s.jpg', label: 'Elegance 🌸' },
  { id: '2', url: '/assets/serial/1s.jpg', label: 'Radiant Joy ✨' },
  { id: '3', url: '/assets/serial/23s.jpg', label: 'Celebration 🎂' }
];

export const StoryCardGenerator: React.FC = () => {
  const [theme, setTheme] = useState<StoryTheme>('pink');
  const [selectedPhoto, setSelectedPhoto] = useState(AVAILABLE_PHOTOS[0].url);
  const [fanName, setFanName] = useState('Ananya');
  const [wishText, setWishText] = useState('Wishing you a year filled with pure joy, big achievements, and endless smiles! 🌸✨');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownloadStory = async () => {
    setIsGenerating(true);
    soundEngine.playCameraShutter();
    triggerCustomConfetti();

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1920;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Background Gradient
      const grad = ctx.createLinearGradient(0, 0, 1080, 1920);
      if (theme === 'pink') {
        grad.addColorStop(0, '#FFF0F5');
        grad.addColorStop(0.3, '#FFE4EC');
        grad.addColorStop(0.7, '#FFD1DC');
        grad.addColorStop(1, '#FFB6C1');
      } else if (theme === 'devotional') {
        grad.addColorStop(0, '#0F0E24');
        grad.addColorStop(0.4, '#1A1638');
        grad.addColorStop(0.8, '#261B46');
        grad.addColorStop(1, '#110D20');
      } else {
        grad.addColorStop(0, '#F6FFF8');
        grad.addColorStop(0.4, '#E8F5E9');
        grad.addColorStop(1, '#A8E6CF');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Background Stardust Particles
      ctx.fillStyle = theme === 'devotional' ? 'rgba(255, 217, 61, 0.15)' : 'rgba(255, 77, 141, 0.15)';
      for (let i = 0; i < 40; i++) {
        const px = (i * 137) % 1080;
        const py = (i * 223) % 1920;
        const pr = (i % 4) + 2;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Top Header Badge
      ctx.fillStyle = theme === 'devotional' ? '#FFD93D' : '#FF4D8D';
      ctx.font = 'bold 34px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('MARCH 6 • BIRTHDAY CELEBRATION 🌸', 540, 170);

      ctx.fillStyle = theme === 'devotional' ? '#FFFFFF' : '#2D2D2D';
      ctx.font = 'bold 80px sans-serif';
      ctx.fillText('HAPPY BIRTHDAY SHREE! 🎂', 540, 265);

      // 4. Load Photo Reliably
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = selectedPhoto;

      await new Promise((resolve) => {
        if (img.complete) {
          resolve(true);
        } else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        }
      });

      // 5. White Polaroid Card Shadow Container
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.25)';
      ctx.shadowBlur = 45;
      ctx.shadowOffsetY = 25;
      ctx.beginPath();
      ctx.roundRect(140, 340, 800, 960, 36);
      ctx.fill();
      ctx.restore();

      // Washi tape on top of polaroid
      ctx.fillStyle = theme === 'devotional' ? 'rgba(255, 217, 61, 0.85)' : 'rgba(255, 179, 198, 0.85)';
      ctx.fillRect(440, 315, 200, 45);

      // Photo inside Polaroid with perfect face centering (1:1 crop from center 20%)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(180, 380, 720, 760, 24);
      ctx.clip();

      const nw = img.naturalWidth || 800;
      const nh = img.naturalHeight || 1000;
      const cropSize = Math.min(nw, nh);
      const cropX = (nw - cropSize) / 2;
      const cropY = Math.max(0, nh * 0.12);

      ctx.drawImage(img, cropX, cropY, cropSize, cropSize, 180, 380, 720, 760);
      ctx.restore();

      // Polaroid Caption
      ctx.fillStyle = '#FF4D8D';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText('Forever Radiant & Kind 🌸', 540, 1230);

      // 6. Wish Message Card
      ctx.save();
      ctx.fillStyle = theme === 'devotional' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = 'rgba(0,0,0,0.1)';
      ctx.shadowBlur = 25;
      ctx.shadowOffsetY = 10;
      ctx.beginPath();
      ctx.roundRect(120, 1370, 840, 360, 32);
      ctx.fill();
      ctx.restore();

      // Wish Header
      ctx.fillStyle = theme === 'devotional' ? '#FFD93D' : '#FF4D8D';
      ctx.font = 'bold 36px sans-serif';
      ctx.fillText('WISH FROM: ' + fanName.toUpperCase(), 540, 1450);

      // Wish Body text
      ctx.fillStyle = theme === 'devotional' ? '#FFFFFF' : '#3D3D3D';
      ctx.font = 'italic 36px sans-serif';

      const maxW = 760;
      const words = wishText.split(' ');
      let line = '';
      let yPos = 1530;
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxW && n > 0) {
          ctx.fillText(line, 540, yPos);
          line = words[n] + ' ';
          yPos += 52;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 540, yPos);

      // 7. Footer Hashtag
      ctx.fillStyle = theme === 'devotional' ? '#D4A84B' : '#FF4D8D';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('#HappyBirthdayShree • Celebrating Shree', 540, 1820);

      // Trigger Download
      const link = document.createElement('a');
      link.download = 'Shree_Birthday_Story_' + fanName.replace(/\s+/g, '_') + '.png';
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
          <Camera className="w-3.5 h-3.5" />
          <span>VIRAL INSTAGRAM STORY CREATOR 📸</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Make Your Instagram Story Card
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Create a personalized 9:16 high-resolution birthday story card to share on your Instagram story!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Left Form Controls */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 shadow-pop border border-pink-100 space-y-5">
          {/* Theme Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">1. Pick Story Theme</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  soundEngine.playTap();
                  setTheme('pink');
                }}
                className={'py-3 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex flex-col items-center gap-1 transition-all ' + (theme === 'pink' ? 'bg-pink-50 border-[#FF4D8D] text-[#FF4D8D]' : 'border-gray-200 text-gray-600')}
              >
                <span className="text-xl">🌸</span>
                <span>Pink Aesthetic</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playTap();
                  setTheme('devotional');
                }}
                className={'py-3 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex flex-col items-center gap-1 transition-all ' + (theme === 'devotional' ? 'bg-amber-50 border-[#D4A84B] text-[#5C4410]' : 'border-gray-200 text-gray-600')}
              >
                <span className="text-xl">🪷</span>
                <span>Sacred Gold</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundEngine.playTap();
                  setTheme('kitty');
                }}
                className={'py-3 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex flex-col items-center gap-1 transition-all ' + (theme === 'kitty' ? 'bg-emerald-50 border-[#7CEBC6] text-emerald-700' : 'border-gray-200 text-gray-600')}
              >
                <span className="text-xl">🐱</span>
                <span>Kitty Party</span>
              </button>
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">2. Choose Shree's Portrait</label>
            <div className="grid grid-cols-3 gap-2">
              {AVAILABLE_PHOTOS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    soundEngine.playTap();
                    setSelectedPhoto(p.url);
                  }}
                  className={'p-1 rounded-2xl border-2 transition-all flex flex-col items-center gap-1 ' + (selectedPhoto === p.url ? 'border-[#FF4D8D] bg-pink-50 shadow-sm' : 'border-gray-200')}
                >
                  <div className="w-14 h-14 rounded-xl overflow-hidden">
                    <img src={p.url} alt={p.label} className="w-full h-full object-cover object-[center_20%]" />
                  </div>
                  <span className="text-[10px] font-fredoka font-semibold text-gray-700">{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">3. Your Name</label>
            <input
              type="text"
              value={fanName}
              onChange={(e) => setFanName(e.target.value)}
              maxLength={25}
              placeholder="Your name"
              className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm font-fredoka"
            />
          </div>

          {/* Wish Textarea */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">4. Your Birthday Wish</label>
            <textarea
              rows={3}
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              maxLength={140}
              placeholder="Your warm wish..."
              className="w-full px-4 py-2.5 rounded-xl bg-pink-50/50 border border-pink-200 focus:outline-none focus:ring-2 focus:ring-[#FF4D8D] text-sm resize-none font-quicksand"
            />
            <span className="text-[10px] text-gray-400 float-right mt-0.5">{wishText.length}/140</span>
          </div>

          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownloadStory}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#FF2D78] text-white font-fredoka font-bold text-base shadow-pop hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Story Card Saved to Photos! 📸</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{isGenerating ? 'Rendering Story (1080x1920)...' : 'Download 9:16 Story Card 📸'}</span>
              </>
            )}
          </button>
        </div>

        {/* Right Live 9:16 Preview Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            className={'relative w-full max-w-[300px] aspect-[9/16] rounded-3xl p-4 shadow-2xl border-4 flex flex-col justify-between overflow-hidden transition-all duration-300 ' + (
              theme === 'pink'
                ? 'bg-gradient-to-b from-[#FFF0F5] via-[#FFE4EC] to-[#FFB6C1] border-pink-200'
                : theme === 'devotional'
                ? 'bg-gradient-to-b from-[#0F0E24] via-[#1A1638] to-[#110D20] border-amber-300/40 text-white'
                : 'bg-gradient-to-b from-[#F6FFF8] via-[#E8F5E9] to-[#A8E6CF] border-emerald-200'
            )}
          >
            {/* Top Text */}
            <div className="text-center pt-2">
              <span className={'text-[9px] font-space font-bold uppercase tracking-widest block ' + (theme === 'devotional' ? 'text-[#FFD93D]' : 'text-[#FF4D8D]')}>
                MARCH 6 • CELEBRATION 🌸
              </span>
              <h4 className="font-fredoka font-bold text-base sm:text-lg mt-0.5 leading-tight">
                HAPPY BIRTHDAY SHREE! 🎂
              </h4>
            </div>

            {/* Central Polaroid */}
            <div className="relative bg-white rounded-2xl p-2 pb-3 shadow-lg border border-pink-100 mx-auto w-[85%] text-center">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-1">
                <img
                  src={selectedPhoto}
                  alt="Shree Preview"
                  className="w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <span className="font-caveat text-sm font-bold text-[#FF4D8D]">
                Forever Radiant & Kind 🌸
              </span>
            </div>

            {/* Bottom Wish Bubble */}
            <div className={'rounded-2xl p-3 text-center border shadow-sm ' + (
              theme === 'devotional' ? 'bg-white/10 border-white/10 text-white' : 'bg-white/90 border-pink-100 text-gray-800'
            )}>
              <span className={'text-[9px] font-space font-bold uppercase block ' + (theme === 'devotional' ? 'text-[#FFD93D]' : 'text-[#FF4D8D]')}>
                FROM: {fanName || 'A Loving Friend'}
              </span>
              <p className="font-quicksand text-[10px] mt-0.5 line-clamp-3 leading-snug italic">
                "{wishText}"
              </p>
            </div>

            {/* Footer */}
            <div className="text-center pb-1">
              <span className={'text-[8px] font-space font-semibold ' + (theme === 'devotional' ? 'text-[#D4A84B]' : 'text-[#FF4D8D]')}>
                #HappyBirthdayShree
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
