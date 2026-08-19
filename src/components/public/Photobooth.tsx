import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, Sparkles, Download, RotateCcw, Trash2, Check, RefreshCw } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

type FrameStyle = 'pink' | 'gold' | 'kitty';

interface PlacedSticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
  scale: number;
}

const STICKER_PALETTE = ['🌸', '🐱', '✨', '🎂', '🪷', '👑', '💖', '🎉', '🪔', '🐾'];

export const Photobooth: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);
  const [frame, setFrame] = useState<FrameStyle>('pink');
  const [stickers, setStickers] = useState<PlacedSticker[]>([]);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photoContainerRef = useRef<HTMLDivElement | null>(null);

  // Camera start / stop
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsCameraActive(true);
      soundEngine.playPop();
    } catch (err) {
      console.warn('Camera access denied or unavailable', err);
      if (fileInputRef.current) fileInputRef.current.click();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((t) => t.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 640;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    setPhotoSrc(dataUrl);
    stopCamera();
    soundEngine.playSparkle(1.5);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setPhotoSrc(ev.target.result as string);
        stopCamera();
        soundEngine.playSparkle(1.3);
      }
    };
    reader.readAsDataURL(file);
  };

  const addSticker = (emoji: string) => {
    soundEngine.playPop();
    const newSticker: PlacedSticker = {
      id: Date.now() + Math.random(),
      emoji,
      x: 35 + Math.random() * 30, // Percentage
      y: 35 + Math.random() * 30,
      scale: 1
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const clearStickers = () => {
    setStickers([]);
    soundEngine.playPop();
  };

  // Export High-Res Polaroid Image
  const handleExportPolaroid = async () => {
    setIsExporting(true);
    soundEngine.playSparkle(1.5);
    triggerCustomConfetti();

    try {
      const canvas = document.createElement('canvas');
      const width = 1080;
      const height = 1350;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (frame === 'pink') {
        bgGrad.addColorStop(0, '#FFF5F5');
        bgGrad.addColorStop(1, '#FFE5EC');
      } else if (frame === 'gold') {
        bgGrad.addColorStop(0, '#100E1C');
        bgGrad.addColorStop(1, '#201934');
      } else {
        bgGrad.addColorStop(0, '#F0FDF4');
        bgGrad.addColorStop(1, '#E6FFFA');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Polaroid Card Container
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.2)';
      ctx.shadowBlur = 40;
      ctx.shadowOffsetY = 20;
      ctx.roundRect(90, 80, 900, 1190, 30);
      ctx.fill();
      ctx.shadowColor = 'transparent';

      // Inner Photo
      const photoImg = new Image();
      photoImg.crossOrigin = 'anonymous';
      photoImg.src = photoSrc || '/assets/serial/1s.jpg';

      await new Promise((resolve) => {
        photoImg.onload = resolve;
        photoImg.onerror = resolve;
      });

      ctx.save();
      ctx.roundRect(140, 130, 800, 800, 20);
      ctx.clip();
      ctx.drawImage(photoImg, 140, 130, 800, 800);
      ctx.restore();

      // Render Placed Stickers
      for (const st of stickers) {
        ctx.font = '72px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const sx = 140 + (st.x / 100) * 800;
        const sy = 130 + (st.y / 100) * 800;
        ctx.fillText(st.emoji, sx, sy);
      }

      // Polaroid Caption & Branding
      ctx.fillStyle = frame === 'gold' ? '#D4A84B' : '#FF4D8D';
      ctx.font = 'bold 44px sans-serif';
      ctx.textAlign = 'center';
      const title =
        frame === 'pink'
          ? "Shree's Birthday Squad 🌸"
          : frame === 'gold'
          ? 'Devotional Grace & Radiance 🪷'
          : 'Certified Cat Whisperer Club 🐱';
      ctx.fillText(title, 540, 1020);

      ctx.fillStyle = '#718096';
      ctx.font = '28px sans-serif';
      ctx.fillText('MARCH 6 • WORLDWIDE CELEBRATION ✨', 540, 1090);

      const link = document.createElement('a');
      link.download = `Shree_Birthday_Polaroid_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 4000);
    } catch (_) {}

    setIsExporting(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <section id="photobooth" className="relative w-full max-w-6xl mx-auto px-4 py-24 select-none">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>PHOTO EXPERIENCE // SNAP & STICKER 📸</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Retro Birthday Photobooth
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Take a selfie or upload a photo, decorate with cute stickers, and download your commemorative Polaroid!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
        {/* Left Column: Live Preview & Polaroid */}
        <div className="lg:col-span-7 flex justify-center">
          <div
            ref={photoContainerRef}
            className={`w-[320px] sm:w-[380px] bg-white rounded-3xl p-5 shadow-2xl border-4 transition-all duration-300 relative flex flex-col items-center ${
              frame === 'pink'
                ? 'border-pink-200 shadow-pink-200/50'
                : frame === 'gold'
                ? 'border-amber-300 shadow-amber-200/50'
                : 'border-emerald-200 shadow-emerald-200/50'
            }`}
          >
            {/* Camera / Photo Canvas Viewport */}
            <div className="relative w-full aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              {isCameraActive ? (
                <video ref={videoRef} className="w-full h-full object-cover transform -scale-x-100" />
              ) : photoSrc ? (
                <img src={photoSrc} alt="Captured" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center text-center p-6 text-gray-400 space-y-2">
                  <Camera className="w-12 h-12 text-pink-300 animate-bounce" />
                  <span className="font-fredoka text-sm text-gray-300">No Photo Selected</span>
                  <span className="text-[11px] font-quicksand">Enable camera or upload a picture</span>
                </div>
              )}

              {/* Placed Interactive Stickers */}
              {stickers.map((st) => (
                <motion.div
                  key={st.id}
                  drag
                  dragConstraints={photoContainerRef}
                  className="absolute cursor-grab active:cursor-grabbing text-4xl select-none filter drop-shadow-md z-30"
                  style={{ top: `${st.y}%`, left: `${st.x}%` }}
                >
                  {st.emoji}
                </motion.div>
              ))}

              {/* Camera Active Shutter overlay */}
              {isCameraActive && (
                <button
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 px-5 py-2 rounded-full bg-[#FF4D8D] text-white font-fredoka font-bold text-xs shadow-lg hover:scale-105 transition-all"
                >
                  📸 Take Snapshot!
                </button>
              )}
            </div>

            {/* Polaroid Bottom Caption */}
            <div className="pt-4 pb-2 text-center w-full">
              <h4 className="font-caveat font-bold text-2xl text-gray-800">
                {frame === 'pink'
                  ? "Shree's Birthday Squad 🌸"
                  : frame === 'gold'
                  ? 'Devotional Grace & Light 🪷'
                  : 'Cat Whisperer Club 🐱'}
              </h4>
              <span className="text-[10px] font-space tracking-widest text-gray-400 block mt-0.5 uppercase">
                MARCH 6 • WORLDWIDE CELEBRATION ✨
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Controls, Stickers & Export */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 shadow-pop border border-pink-100 space-y-6">
          {/* Photo Source Actions */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">1. Choose Photo Source</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={isCameraActive ? stopCamera : startCamera}
                className={`flex items-center justify-center gap-2 py-3 rounded-2xl border-2 text-xs font-fredoka font-semibold transition-all ${
                  isCameraActive ? 'bg-rose-50 border-rose-400 text-rose-600' : 'bg-pink-50/60 border-pink-200 text-[#FF4D8D] hover:bg-pink-100'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{isCameraActive ? 'Turn Off Cam' : 'Open Camera 📸'}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs font-fredoka font-semibold transition-all"
              >
                <Upload className="w-4 h-4 text-gray-500" />
                <span>Upload Photo 🖼️</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Frame Theme Style */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">2. Choose Polaroid Frame</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setFrame('pink')}
                className={`py-2.5 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  frame === 'pink' ? 'bg-pink-50 border-[#FF4D8D] text-[#FF4D8D]' : 'border-gray-200 text-gray-600'
                }`}
              >
                <span>🌸 Pink</span>
              </button>
              <button
                onClick={() => setFrame('gold')}
                className={`py-2.5 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  frame === 'gold' ? 'bg-amber-50 border-[#D4A84B] text-[#5C4410]' : 'border-gray-200 text-gray-600'
                }`}
              >
                <span>🪷 Gold</span>
              </button>
              <button
                onClick={() => setFrame('kitty')}
                className={`py-2.5 px-2 rounded-2xl border-2 text-xs font-fredoka font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  frame === 'kitty' ? 'bg-emerald-50 border-[#7CEBC6] text-emerald-700' : 'border-gray-200 text-gray-600'
                }`}
              >
                <span>🐱 Kitty</span>
              </button>
            </div>
          </div>

          {/* Stickers Tray */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold text-gray-700">3. Tap Stickers to Add</label>
              {stickers.length > 0 && (
                <button
                  onClick={clearStickers}
                  className="flex items-center gap-1 text-[11px] text-rose-500 hover:text-rose-700 font-semibold"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 p-3 bg-pink-50/50 rounded-2xl border border-pink-100">
              {STICKER_PALETTE.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => addSticker(emoji)}
                  className="w-10 h-10 rounded-xl bg-white hover:bg-pink-100 text-2xl flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-all"
                  title="Click to stamp sticker"
                >
                  {emoji}
                </button>
              ))}
            </div>
            <span className="text-[10px] text-gray-400 block mt-1">
              Tip: You can drag stamps around anywhere on your photo!
            </span>
          </div>

          {/* Export Action */}
          <div className="pt-2">
            <button
              onClick={handleExportPolaroid}
              disabled={isExporting}
              className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-sm shadow-pop hover:scale-[1.02] active:scale-95 transition-all"
            >
              {exportSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Polaroid Downloaded! 🎉</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  <span>{isExporting ? 'Creating Polaroid...' : 'Download Polaroid Photo (1080x1350) 📸'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
