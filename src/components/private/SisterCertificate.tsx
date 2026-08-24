import { ParticleReveal3D } from '../shared/ParticleReveal3D';
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Sparkles, Download, Check, Shield, Star, Heart } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const SisterCertificate: React.FC = () => {
  const [isExporting, setIsExporting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  const handleDownloadCertificate = async () => {
    setIsExporting(true);
    soundEngine.playSparkle(1.5);
    soundEngine.playTempleBell();
    triggerCustomConfetti();

    try {
      const canvas = document.createElement('canvas');
      const width = 1080;
      const height = 1350;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Background Gradient
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, '#FFFDF8');
      grad.addColorStop(0.5, '#FFF8EC');
      grad.addColorStop(1, '#FFF2D6');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Gold Foil Border Outer
      ctx.strokeStyle = '#D4A84B';
      ctx.lineWidth = 14;
      ctx.strokeRect(40, 40, width - 80, height - 80);

      // Inner Thin Border
      ctx.strokeStyle = 'rgba(212, 168, 75, 0.4)';
      ctx.lineWidth = 3;
      ctx.strokeRect(60, 60, width - 120, height - 120);

      // Corner Lotus Accents
      ctx.font = '48px sans-serif';
      ctx.fillText('🪷', 75, 115);
      ctx.fillText('🪷', width - 125, 115);
      ctx.fillText('🪷', 75, height - 85);
      ctx.fillText('🪷', width - 125, height - 85);

      // Top Shield & Badge
      ctx.fillStyle = '#D4A84B';
      ctx.font = 'bold 30px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OFFICIAL SISTERHOOD HONOURS & MERIT 🛡️', width / 2, 180);

      ctx.fillStyle = '#3D2040';
      ctx.font = 'bold 72px serif';
      ctx.fillText('Order of the Sibling Shield', width / 2, 270);

      ctx.fillStyle = '#718096';
      ctx.font = 'italic 28px serif';
      ctx.fillText('This highest distinction of lifelong brotherly protection is conferred upon', width / 2, 340);

      // Shree's Name
      ctx.fillStyle = '#FF4D8D';
      ctx.font = 'bold 84px sans-serif';
      ctx.fillText('SHREE 🌸', width / 2, 450);

      ctx.fillStyle = '#D4A84B';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('THE KINDEST CREATOR & BEST SISTER IN THE UNIVERSE', width / 2, 510);

      // Divider Line
      ctx.strokeStyle = '#D4A84B';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(240, 560);
      ctx.lineTo(width - 240, 560);
      ctx.stroke();

      // Citation Paragraph
      ctx.fillStyle = '#4A5568';
      ctx.font = '28px serif';
      const lines = [
        'For illuminating millions of lives with unconditional kindness,',
        'for stopping on streets to love stray kittens, and for her pure',
        'devotion to Radharani. Issued with deepest pride and unconditional',
        'brotherly loyalty across the distance between Hyderabad and Delhi.'
      ];
      lines.forEach((line, i) => {
        ctx.fillText(line, width / 2, 630 + i * 45);
      });

      // Photo Portrait in Center with Flawless Aspect Ratio Face Crop
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = '/assets/serial/6s.jpg';
      await new Promise((resolve) => {
        if (img.complete) resolve(true);
        else {
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        }
      });

      // Draw Gold Foil Outer Ring
      ctx.save();
      ctx.shadowColor = 'rgba(212, 168, 75, 0.4)';
      ctx.shadowBlur = 20;
      ctx.strokeStyle = '#D4A84B';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(width / 2, 940, 125, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Clip Circle and Draw Perfectly Centered Portrait
      ctx.save();
      ctx.beginPath();
      ctx.arc(width / 2, 940, 120, 0, Math.PI * 2);
      ctx.clip();

      const nw = img.naturalWidth || 800;
      const nh = img.naturalHeight || 1000;
      const cropSize = Math.min(nw, nh);
      const cropX = (nw - cropSize) / 2;
      const cropY = Math.max(0, nh * 0.12);

      ctx.drawImage(img, cropX, cropY, cropSize, cropSize, width / 2 - 120, 820, 240, 240);
      ctx.restore();

      // Signatures
      ctx.fillStyle = '#2D3748';
      ctx.font = 'bold 26px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('DATE: MARCH 6, 2027', 120, 1180);
      ctx.fillText('SEAL: HYD ➔ DEL PROTOCOL 🛡️', 120, 1220);

      ctx.textAlign = 'right';
      ctx.fillStyle = '#D4A84B';
      ctx.font = 'bold 36px serif';
      ctx.fillText('Your Brother in Hyderabad', width - 120, 1180);
      ctx.fillStyle = '#718096';
      ctx.font = '22px sans-serif';
      ctx.fillText('Lifelong Sibling Shield 🛡️🌸', width - 120, 1220);

      const link = document.createElement('a');
      link.download = `Shree_Best_Sister_Certificate_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (_) {}

    setIsExporting(false);
  };

  return (
    <section id="sister-certificate" className="relative w-full max-w-4xl mx-auto px-4 py-20 select-none">
            <ParticleReveal3D direction="depth" stardustColor="gold">
      <div className="text-center max-w-xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#D4A84B] font-fredoka text-xs font-semibold shadow-sm border border-amber-200 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>OFFICIAL SISTERHOOD MERIT & HONOURS 🏆</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-amber-900 tracking-wide">
          Best Sister in the Universe
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Conferred with unconditional pride, lifelong loyalty, and highest brotherly respect.
        </p>
      </div>
      </ParticleReveal3D>

      {/* Luxury Certificate Plaque Container */}
      <motion.div
        ref={certRef}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative bg-gradient-to-b from-[#FFFDF8] via-[#FFF9EE] to-[#FFF4DF] rounded-3xl p-8 sm:p-14 shadow-2xl border-4 border-[#D4A84B] text-center overflow-hidden"
      >
        {/* Corner Lotus Accents */}
        <div className="absolute top-4 left-4 text-2xl select-none opacity-40">🪷</div>
        <div className="absolute top-4 right-4 text-2xl select-none opacity-40">🪷</div>
        <div className="absolute bottom-4 left-4 text-2xl select-none opacity-40">🪷</div>
        <div className="absolute bottom-4 right-4 text-2xl select-none opacity-40">🪷</div>

        {/* Certificate Content */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-100/80 border border-[#D4A84B]/40 text-[#5C4410] text-[11px] font-space font-bold tracking-widest uppercase">
            <Shield className="w-3.5 h-3.5 text-[#D4A84B]" />
            <span>ORDER OF THE SIBLING SHIELD</span>
          </div>

          <p className="text-xs sm:text-sm font-quicksand italic text-gray-500">
            This highest distinction of lifelong brotherly protection is conferred upon
          </p>

          <h3 className="text-4xl sm:text-6xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#D4A84B] via-[#FF2D78] to-[#D4A84B] tracking-wider drop-shadow-sm">
            SHREE 🌸
          </h3>

          <p className="text-xs sm:text-sm font-space font-bold tracking-widest text-[#D4A84B] uppercase">
            The Kindest Creator & Best Sister in the Universe
          </p>

          <div className="w-36 h-0.5 bg-[#D4A84B]/40 mx-auto my-4" />

          <p className="font-caveat text-xl sm:text-2xl text-gray-700 max-w-xl mx-auto leading-relaxed">
            "For illuminating millions of lives with unconditional kindness, for stopping on streets to feed stray kittens, and for her pure devotion to Radharani. Issued under the lifelong protection and loyalty of Hyderabad Command."
          </p>

          {/* Central Portrait & Wax Seal */}
          <div className="flex items-center justify-center gap-6 pt-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#D4A84B] shadow-xl">
              <img
                src="/assets/serial/6s.jpg"
                alt="Shree"
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>

            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8B1E2F] to-[#A8283D] border-2 border-[#D4A84B] flex items-center justify-center text-3xl shadow-xl text-amber-200">
              🛡️
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="pt-8 border-t border-[#D4A84B]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-quicksand text-gray-600">
            <div className="text-left">
              <span className="font-bold text-gray-800 block">AUTHENTICATION: HYD ➔ DEL PROTOCOL</span>
              <span className="text-gray-400">March 6, 2027 • 100% Sibling Pact</span>
            </div>

            <div className="text-right">
              <span className="font-caveat text-2xl font-bold text-[#D4A84B] block">Your Brother in Hyderabad</span>
              <span className="text-gray-400">Lifelong Guardian & Biggest Cheerleader 🛡️</span>
            </div>
          </div>
        </div>

        {/* Download Action */}
        <div className="mt-8 pt-4">
          <button
            onClick={handleDownloadCertificate}
            disabled={isExporting}
            className="flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-[#D4A84B] to-[#F5C642] hover:brightness-110 text-[#2D1B00] font-fredoka font-bold text-sm shadow-pop hover:scale-105 active:scale-95 transition-all mx-auto"
          >
            {downloadSuccess ? (
              <>
                <Check className="w-5 h-5" />
                <span>Certificate Saved to Camera Roll! 🏆</span>
              </>
            ) : (
              <>
                <Download className="w-5 h-5" />
                <span>{isExporting ? 'Generating Plaque...' : 'Download Official Certificate (1080x1350) 📜'}</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
};
