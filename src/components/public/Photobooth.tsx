import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, Sparkles, Download, RotateCcw, Trash2, Check, RefreshCw, ZoomIn } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

type FrameStyle = 'pink' | 'gold' | 'kitty' | 'lavender';

interface PlacedSticker {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const STICKER_PALETTE = ['🌸', '🐱', '✨', '🎂', '🪷', '👑', '💖', '🎉', '🪔', '🐾', '🎀', '⭐'];

export const Photobooth: React.FC = () => {
  const [photoSrc, setPhotoSrc] = useState<string | null>('/assets/serial/1s.jpg');
  const [frame, setFrame] = useState<FrameStyle>('pink');
  const [stickers, setStickers] = useState<PlacedSticker[]>([]);
  const [isCameraActive, setIsCameraActive] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccess, setExportSuccess] = useState<boolean>(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photoContainerRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Start Camera Stream Reliably
  const startCamera = async () => {
    setCameraError(null);
    try {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      setIsCameraActive(true);
      soundEngine.playPop();

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable', err);
      setCameraError('Camera access unavailable. Please upload a photo!');
      if (fileInputRef.current) fileInputRef.current.click();
    }
  };

  // Re-attach video stream if videoRef changes or state updates
  useEffect(() => {
    if (isCameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [isCameraActive]);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    try {
      const canvas = document.createElement('canvas');
      const w = videoRef.current.videoWidth || 640;
      const h = videoRef.current.videoHeight || 480;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Mirror capture to match user view
      ctx.translate(w, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, w, h);

      const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setPhotoSrc(dataUrl);
      stopCamera();
      soundEngine.playCameraShutter();
      triggerCustomConfetti();
    } catch (_) {
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        setPhotoSrc(ev.target.result as string);
        stopCamera();
        soundEngine.playCameraShutter();
      }
    };
    reader.readAsDataURL(file);
  };

  const addSticker = (emoji: string) => {
    soundEngine.playPop();
    const newSticker: PlacedSticker = {
      id: Date.now() + Math.random(),
      emoji,
      x: 35 + Math.random() * 30,
      y: 35 + Math.random() * 30
    };
    setStickers((prev) => [...prev, newSticker]);
  };

  const clearStickers = () => {
    setStickers([]);
    soundEngine.playPop();
  };

  // Export High-DPI Realistic Polaroid Image (Classic 4:5 Aspect Ratio)
  const handleExportPolaroid = async () => {
    setIsExporting(true);
    soundEngine.playCameraShutter();
    triggerCustomConfetti();

    try {
      const canvas = document.createElement('canvas');
      const width = 1080;
      const height = 1350;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Warm Studio Backdrop
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      if (frame === 'pink') {
        bgGrad.addColorStop(0, '#FFF5F8');
        bgGrad.addColorStop(1, '#FFE4EC');
      } else if (frame === 'gold') {
        bgGrad.addColorStop(0, '#120F1D');
        bgGrad.addColorStop(1, '#251A38');
      } else if (frame === 'kitty') {
        bgGrad.addColorStop(0, '#F0FDF4');
        bgGrad.addColorStop(1, '#E6FFFA');
      } else {
        bgGrad.addColorStop(0, '#FAF5FF');
        bgGrad.addColorStop(1, '#F3E8FF');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Realistic White Textured Polaroid Frame with Soft Shadow
      ctx.save();
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(0,0,0,0.22)';
      ctx.shadowBlur = 45;
      ctx.shadowOffsetY = 25;
      ctx.beginPath();
      ctx.roundRect(100, 80, 880, 1190, 32);
      ctx.fill();
      ctx.restore();

      // Top Vintage Tape
      ctx.save();
      ctx.fillStyle = frame === 'gold' ? 'rgba(255, 217, 61, 0.85)' : 'rgba(255, 182, 193, 0.85)';
      ctx.fillRect(440, 60, 200, 45);
      ctx.restore();

      // 3. Load & Draw User Photo with Guaranteed Decode
      const photoImg = new Image();
      photoImg.crossOrigin = 'anonymous';
      photoImg.src = photoSrc || '/assets/serial/1s.jpg';

      await new Promise((resolve) => {
        if (photoImg.complete) {
          resolve(true);
        } else {
          photoImg.onload = () => resolve(true);
          photoImg.onerror = () => resolve(false);
        }
      });

      // Photo Window inside Polaroid (1:1 Square)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(140, 130, 800, 800, 20);
      ctx.clip();

      const nw = photoImg.naturalWidth || 800;
      const nh = photoImg.naturalHeight || 800;
      const cropSize = Math.min(nw, nh);
      const cropX = (nw - cropSize) / 2;
      const cropY = (nh - cropSize) / 2;

      ctx.drawImage(photoImg, cropX, cropY, cropSize, cropSize, 140, 130, 800, 800);
      ctx.restore();

      // Draw Placed Stickers
      for (const st of stickers) {
        ctx.font = '76px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const sx = 140 + (st.x / 100) * 800;
        const sy = 130 + (st.y / 100) * 800;
        ctx.fillText(st.emoji, sx, sy);
      }

      // Polaroid Handwritten Bottom Caption
      ctx.fillStyle = frame === 'gold' ? '#D4A84B' : frame === 'lavender' ? '#9333EA' : '#FF2D78';
      ctx.font = 'bold 48px sans-serif';
      ctx.textAlign = 'center';
      const title =
        frame === 'pink'
          ? "Shree's Birthday Squad 🌸"
          : frame === 'gold'
          ? 'Devotional Grace & Radiance 🪷'
          : frame === 'kitty'
          ? 'Certified Cat Whisperer Club 🐱'
          : 'Amethyst Dreams & Magic ✨';
      ctx.fillText(title, 540, 1020);

      ctx.fillStyle = '#718096';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText('MARCH 6 • CELESTIAL ODYSSEY 2027 ✨', 540, 1090);

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
                : frame === 'kitty'
                ? 'border-emerald-200 shadow-emerald-200/50'
                : 'border-purple-300 shadow-purple-200/50'
            }`}
          >
            {/* Top Masking Tape Accent */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-pink-200/90 border border-pink-300/80 rounded-sm shadow-sm z-20 pointer-events-none" />

            {/* Camera / Photo Canvas Viewport */}
            <div className="relative w-full aspect-square bg-gray-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              {isCameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform -scale-x-100"
                />
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

              {/* Camera Active Snapshot Button */}
              {isCameraActive && (
                <button
                  onClick={capturePhoto}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40 px-6 py-2.5 rounded-full bg-[#FF4D8D] text-white font-fredoka font-bold text-sm shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Camera className="w-4 h-4" />
                  <span>📸 Snap Photo!</span>
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
                  : frame === 'kitty'
                  ? 'Cat Whisperer Club 🐱'
                  : 'Amethyst Radiance ✨'}
              </h4>
              <span className="text-[10px] font-space tracking-widest text-gray-400 block mt-0.5 uppercase">
                MARCH 6 • WORLDWIDE CELEBRATION ✨
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Capture / Upload Buttons */}
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm space-y-3">
            <h3 className="text-xs font-space font-bold uppercase tracking-wider text-gray-400">
              1. Choose Your Photo
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={isCameraActive ? stopCamera : startCamera}
                className={`py-3 px-4 rounded-2xl font-fredoka font-semibold text-xs flex items-center justify-center gap-2 border transition-all ${
                  isCameraActive
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                    : 'bg-pink-50 hover:bg-pink-100 text-[#FF4D8D] border-pink-200'
                }`}
              >
                <Camera className="w-4 h-4" />
                <span>{isCameraActive ? 'Stop Camera' : 'Live Camera 📸'}</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="py-3 px-4 rounded-2xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-fredoka font-semibold text-xs flex items-center justify-center gap-2 border border-gray-200 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Pic 🖼️</span>
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {cameraError && (
              <p className="text-[11px] font-quicksand text-rose-500 font-semibold text-center">
                {cameraError}
              </p>
            )}
          </div>

          {/* Frame Style Selector */}
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm space-y-3">
            <h3 className="text-xs font-space font-bold uppercase tracking-wider text-gray-400">
              2. Frame Palette
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'pink', label: '🌸 Rose', bg: 'bg-pink-100 text-pink-700' },
                { id: 'gold', label: '🪷 Gold', bg: 'bg-amber-100 text-amber-800' },
                { id: 'kitty', label: '🐱 Mint', bg: 'bg-emerald-100 text-emerald-800' },
                { id: 'lavender', label: '💜 Lilac', bg: 'bg-purple-100 text-purple-800' }
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => {
                    setFrame(f.id as FrameStyle);
                    soundEngine.playPop();
                  }}
                  className={`py-2 rounded-xl text-xs font-fredoka font-bold border transition-all ${f.bg} ${
                    frame === f.id ? 'ring-2 ring-[#FF4D8D] scale-105' : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stickers Palette */}
          <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-space font-bold uppercase tracking-wider text-gray-400">
                3. Add Stickers (Tap to Add)
              </h3>
              {stickers.length > 0 && (
                <button
                  onClick={clearStickers}
                  className="text-[11px] text-gray-400 hover:text-red-500 flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Clear</span>
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {STICKER_PALETTE.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => addSticker(emoji)}
                  className="w-10 h-10 rounded-xl bg-gray-50 hover:bg-pink-50 hover:scale-110 active:scale-95 flex items-center justify-center text-xl transition-all border border-gray-100 shadow-sm"
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Export Action */}
          <button
            onClick={handleExportPolaroid}
            disabled={isExporting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#FF7A59] hover:brightness-110 text-white font-fredoka font-bold text-sm shadow-pop flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all"
          >
            {exportSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Polaroid Saved to Photos! 📸✨</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{isExporting ? 'Printing Polaroid...' : 'Download Polaroid (1080x1350) 📷'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
