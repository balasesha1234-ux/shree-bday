import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Shield, Check } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const ScratchCard: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = (canvas.width = canvas.offsetWidth * 2);
    const height = (canvas.height = canvas.offsetHeight * 2);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#D4A84B');
    grad.addColorStop(0.3, '#F3D78A');
    grad.addColorStop(0.7, '#D4A84B');
    grad.addColorStop(1, '#8C6D23');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = '#FFFDF8';
    for (let i = 0; i < 60; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const r = Math.random() * 2.5 + 1;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#3D2040';
    ctx.font = 'bold 36px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ SCRATCH WITH FINGER / MOUSE ✨', width / 2, height / 2 - 15);
    ctx.font = '24px sans-serif';
    ctx.fillText('Rub gently to reveal your Lifetime Brother Voucher 🛡️', width / 2, height / 2 + 25);
  }, []);

  const handleScratch = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 45, 0, Math.PI * 2);
    ctx.fill();

    if (Math.random() > 0.6) {
      soundEngine.playSparkle(1.6);
      const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      let clearPixels = 0;
      const totalPixels = imgData.data.length / 4;

      for (let i = 3; i < imgData.data.length; i += 4 * 16) {
        if (imgData.data[i] === 0) {
          clearPixels++;
        }
      }

      const percent = Math.min(100, Math.round((clearPixels / (totalPixels / 16)) * 100));

      if (percent > 45 && !isRevealed) {
        setIsRevealed(true);
        triggerCustomConfetti();
      }
    }
  };

  return (
    <section className="relative w-full max-w-4xl mx-auto px-4 py-20 text-center select-none">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-[#D4A84B]/30 mb-2">
        <Sparkles className="w-3.5 h-3.5" />
        <span>LIFETIME BROTHER VOUCHER 🎟️</span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
        The Golden Sibling Pass
      </h2>
      <p className="text-sm font-quicksand text-gray-600 mt-2 max-w-md mx-auto">
        Rub your finger or cursor over the gold foil to scratch and reveal your lifetime brother guarantee!
      </p>

      <div className="mt-8 relative max-w-md mx-auto aspect-[16/10] w-full rounded-3xl shadow-2xl border-4 border-[#D4A84B] overflow-hidden bg-gradient-to-br from-[#FFF0F3] via-white to-[#FFE5EC] flex flex-col items-center justify-center p-6 text-center">
        <div className="space-y-3">
          <span className="text-5xl">🛡️🍕🚗</span>
          <div className="inline-block px-3 py-1 rounded-full bg-pink-100 text-[#D4A84B] font-space font-bold text-xs">
            100% UNCONDITIONAL SIBLING PACT
          </div>
          <h3 className="text-2xl font-playfair font-bold text-[#3D2040]">
            Emergency Bro Protection & Treat Pass
          </h3>
          <p className="font-caveat text-xl sm:text-2xl text-gray-700 leading-snug">
            "Valid anytime: 1 Emergency Bro Protection Pass + Unlimited Favorite Snacks, 2am Advice & Late-Night Airport Pickups 🚗🍕"
          </p>
        </div>

        <canvas
          ref={canvasRef}
          onMouseMove={handleScratch}
          onTouchMove={handleScratch}
          className={'absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-700 ' + (isRevealed ? 'pointer-events-none opacity-0' : 'opacity-100')}
        />
      </div>

      {isRevealed && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 inline-flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-50 text-emerald-700 font-fredoka font-bold text-sm border border-emerald-200"
        >
          <Check className="w-4 h-4" />
          <span>Foil Scratched! Brother Pact Claimed for Life 🛡️🌸</span>
        </motion.div>
      )}
    </section>
  );
};
