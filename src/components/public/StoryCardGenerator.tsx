import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Sparkles, Check, Image as ImageIcon, Camera, Palette } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

type StoryTheme = 'pink' | 'devotional' | 'sunset' | 'emerald' | 'lavender' | 'cyber';

const AVAILABLE_PHOTOS = [
  { id: '1', url: '/assets/serial/6s.jpg', label: 'Elegance 🌸' },
  { id: '2', url: '/assets/serial/1s.jpg', label: 'Radiant Joy ✨' },
  { id: '3', url: '/assets/serial/23s.jpg', label: 'Celebration 🎂' }
];

const THEME_OPTIONS = [
  { id: 'pink', label: '🌸 Rose Cotton', color: 'from-[#FFF0F5] to-[#FFB6C1]' },
  { id: 'devotional', label: '🪷 Midnight Gold', color: 'from-[#0F0E24] to-[#261B46]' },
  { id: 'sunset', label: '🌅 Sunset Peach', color: 'from-[#FFF7ED] to-[#FDBA74]' },
  { id: 'emerald', label: '🍃 Vrindavan Mint', color: 'from-[#F0FDF4] to-[#A7F3D0]' },
  { id: 'lavender', label: '💜 Amethyst Lilac', color: 'from-[#FAF5FF] to-[#D8B4FE]' },
  { id: 'cyber', label: '⚡ Cyber Rose', color: 'from-[#1A0B1A] to-[#FF2D78]' }
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
        grad.addColorStop(0.5, '#FFD1DC');
        grad.addColorStop(1, '#FFB6C1');
      } else if (theme === 'devotional') {
        grad.addColorStop(0, '#0C0A1A');
        grad.addColorStop(0.5, '#1C1635');
        grad.addColorStop(1, '#110D20');
      } else if (theme === 'sunset') {
        grad.addColorStop(0, '#FFF7ED');
        grad.addColorStop(0.5, '#FED7AA');
        grad.addColorStop(1, '#FB923C');
      } else if (theme === 'emerald') {
        grad.addColorStop(0, '#F0FDF4');
        grad.addColorStop(0.5, '#BBF7D0');
        grad.addColorStop(1, '#6EE7B7');
      } else if (theme === 'lavender') {
        grad.addColorStop(0, '#FAF5FF');
        grad.addColorStop(0.5, '#E9D5FF');
        grad.addColorStop(1, '#C084FC');
      } else {
        grad.addColorStop(0, '#100714');
        grad.addColorStop(0.5, '#2D0D2E');
        grad.addColorStop(1, '#FF2D78');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1080, 1920);

      // 2. Subtle Background Stardust
      ctx.fillStyle = theme === 'devotional' || theme === 'cyber' ? 'rgba(255, 217, 61, 0.2)' : 'rgba(255, 77, 141, 0.2)';
      for (let i = 0; i < 50; i++) {
        const px = (i * 137) % 1080;
        const py = (i * 223) % 1920;
        const pr = (i % 4) + 2.5;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. LAYERED TYPOGRAPHY (Block Text Background + Flowing Calligraphy Overlay)
      // Block Text Base Layer (Large, Clean, High Fashion)
      ctx.save();
      ctx.fillStyle = theme === 'devotional' || theme === 'cyber' ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 77, 141, 0.22)';
      ctx.font = '900 68px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.letterSpacing = '8px';
      ctx.fillText('MARCH 6 • BIRTHDAY CELEBRATION', 540, 160);
      ctx.restore();

      // Flowing Calligraphy Script Overlaid Above
      ctx.save();
      ctx.fillStyle = theme === 'devotional' ? '#FFD93D' : theme === 'cyber' ? '#FFFFFF' : '#FF2D78';
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 20;
      ctx.font = 'italic bold 92px cursive, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('Happy Birthday Shree 🌸', 540, 240);
      ctx.restore();

      // 4. Load Photo Reliably
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = selectedPhoto;

      await new Promise((resolve) => {
        if (img.complete) resolve(true);
        else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        }
      });

      // 5. White Polaroid Card Shadow Container
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.28)';
      ctx.shadowBlur = 50;
      ctx.shadowOffsetY = 25;
      ctx.beginPath();
      ctx.roundRect(140, 340, 800, 960, 36);
      ctx.fill();
      ctx.restore();

      // Washi Tape at Top
      ctx.fillStyle = theme === 'devotional' ? 'rgba(255, 217, 61, 0.9)' : 'rgba(255, 179, 198, 0.9)';
      ctx.fillRect(440, 315, 200, 45);

      // Photo inside Polaroid with Centered Crop
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
      ctx.fillStyle = '#FF2D78';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Forever Radiant & Kind 🌸', 540, 1230);

      // 6. Wish Message Card
      ctx.save();
      ctx.fillStyle = theme === 'devotional' || theme === 'cyber' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.96)';
      ctx.shadowColor = 'rgba(0,0,0,0.12)';
      ctx.shadowBlur = 30;
      ctx.shadowOffsetY = 12;
      ctx.beginPath();
      ctx.roundRect(120, 1370, 840, 360, 32);
      ctx.fill();
      ctx.restore();

      // Wish Header
      ctx.fillStyle = theme === 'devotional' ? '#FFD93D' : '#FF2D78';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('WISH FROM: ' + fanName.toUpperCase(), 540, 1450);

      // Wish Body Text
      ctx.fillStyle = theme === 'devotional' || theme === 'cyber' ? '#FFFFFF' : '#3D3D3D';
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

      // 7. Footer Watermark
      ctx.fillStyle = theme === 'devotional' || theme === 'cyber' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.45)';
      ctx.font = 'bold 24px sans-serif';
      ctx.fillText('SHREE’S BIRTHDAY ODYSSEY • 2027 🌸🛡️', 540, 1850);

      const link = document.createElement('a');
      link.download = `Shree_Instagram_Story_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (_) {}

    setIsGenerating(false);
  };

  return (
    <section id="story-generator" className="w-full max-w-6xl mx-auto px-4 py-20 select-none">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INSTAGRAM STORY STUDIO (9:16) 📸</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Create Your Birthday Story Card
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Generate a high-res 1080x1920 Instagram Story card with layered calligraphy, pick your color palette, and share on social media!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Left Column: Story Card Preview */}
        <div className="lg:col-span-6 flex justify-center">
          <div
            className={`w-[280px] sm:w-[340px] aspect-[9/16] rounded-3xl p-5 shadow-2xl flex flex-col justify-between transition-all duration-500 relative border-4 border-white/60 bg-gradient-to-br ${
              THEME_OPTIONS.find((t) => t.id === theme)?.color
            }`}
          >
            {/* Top Layered Typography Preview */}
            <div className="text-center relative pt-2">
              <span className="text-[10px] sm:text-xs font-space font-extrabold tracking-widest text-black/30 dark:text-white/30 uppercase block">
                MARCH 6 • BIRTHDAY CELEBRATION
              </span>
              <h3 className="font-caveat font-bold text-2xl sm:text-3xl text-[#FF2D78] dark:text-white -mt-1 drop-shadow-sm">
                Happy Birthday Shree 🌸
              </h3>
            </div>

            {/* Photo Polaroid Preview */}
            <div className="bg-white p-3 pb-4 rounded-2xl shadow-lg border border-pink-100 flex flex-col items-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-inner">
                <img
                  src={selectedPhoto}
                  alt="Portrait"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
              </div>
              <span className="font-caveat font-bold text-base text-[#FF4D8D] mt-2">
                Forever Radiant & Kind 🌸
              </span>
            </div>

            {/* Wish Message Box */}
            <div className="bg-white/95 backdrop-blur-md p-3.5 rounded-2xl border border-pink-100 shadow-sm text-center">
              <span className="text-[10px] font-space font-bold text-[#FF4D8D] uppercase block">
                WISH FROM: {fanName || 'FAN'}
              </span>
              <p className="font-quicksand italic text-xs text-gray-700 line-clamp-3 mt-1 leading-snug">
                "{wishText}"
              </p>
            </div>

            {/* Bottom Footer */}
            <div className="text-center text-[9px] font-space font-bold text-gray-400">
              SHREE’S BIRTHDAY ODYSSEY 🌸🛡️
            </div>
          </div>
        </div>

        {/* Right Column: Customization Controls */}
        <div className="lg:col-span-6 space-y-5 bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-sm">
          {/* Theme Selector */}
          <div>
            <label className="text-xs font-space font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
              1. Choose Story Theme Palette
            </label>
            <div className="grid grid-cols-3 gap-2">
              {THEME_OPTIONS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id as StoryTheme);
                    soundEngine.playPop();
                  }}
                  className={`p-2.5 rounded-xl text-xs font-fredoka font-bold border transition-all text-center ${
                    theme === t.id
                      ? 'border-[#FF4D8D] bg-pink-50 text-[#FF4D8D] ring-2 ring-[#FF4D8D]/30 shadow-sm'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Photo Selector */}
          <div>
            <label className="text-xs font-space font-bold text-gray-500 uppercase tracking-wider block mb-2.5">
              2. Select Shree's Portrait
            </label>
            <div className="grid grid-cols-3 gap-3">
              {AVAILABLE_PHOTOS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedPhoto(p.url);
                    soundEngine.playPop();
                  }}
                  className={`aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                    selectedPhoto === p.url
                      ? 'border-[#FF4D8D] ring-2 ring-[#FF4D8D]/30 scale-105'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={p.url} alt={p.label} className="w-full h-full object-cover object-[center_20%]" />
                </div>
              ))}
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="text-xs font-space font-bold text-gray-500 uppercase tracking-wider block mb-1">
              3. Your Name
            </label>
            <input
              type="text"
              value={fanName}
              onChange={(e) => setFanName(e.target.value)}
              maxLength={25}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-quicksand focus:outline-none focus:border-[#FF4D8D]"
              placeholder="e.g. Rahul from Mumbai"
            />
          </div>

          {/* Message Input */}
          <div>
            <label className="text-xs font-space font-bold text-gray-500 uppercase tracking-wider block mb-1">
              4. Your Birthday Message
            </label>
            <textarea
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              maxLength={140}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-quicksand focus:outline-none focus:border-[#FF4D8D] resize-none"
              placeholder="Write your wishes for Shree..."
            />
          </div>

          {/* Download Button */}
          <button
            onClick={handleDownloadStory}
            disabled={isGenerating}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#FF7A59] hover:brightness-110 text-white font-fredoka font-bold text-sm shadow-pop flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Story Card Saved to Photos! 📸✨</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{isGenerating ? 'Generating 1080x1920 Card...' : 'Download Instagram Story (1080x1920) 📱'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
