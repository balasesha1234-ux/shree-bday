import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, MicOff, RotateCcw, Wind, Heart, Flame } from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';

export const CandleBlowout: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>([true, true, true, true, true]);
  const [isExtinguished, setIsExtinguished] = useState<boolean>(false);
  const [showWishReward, setShowWishReward] = useState<boolean>(false);
  const [isListeningMic, setIsListeningMic] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [wishMade, setWishMade] = useState<string>('');
  const [isWishModalOpen, setIsWishModalOpen] = useState<boolean>(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const micStreamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const holdIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Microphone Audio Blow-Detection
  const startMicDetection = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      micStreamRef.current = stream;

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      audioContextRef.current = audioCtx;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        if (!analyserRef.current || isExtinguished) return;

        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        setMicVolume(Math.min(100, Math.round((average / 128) * 100)));

        // Blow detection threshold
        if (average > 48) {
          extinguishCandles();
          return;
        }

        animationFrameRef.current = requestAnimationFrame(checkAudio);
      };

      animationFrameRef.current = requestAnimationFrame(checkAudio);
    } catch (err) {
      console.warn('Microphone access not granted, using tap fallback', err);
      setIsListeningMic(false);
    }
  };

  const stopMicDetection = () => {
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    setIsListeningMic(false);
    setMicVolume(0);
  };

  const extinguishCandles = () => {
    if (isExtinguished) return;
    setIsExtinguished(true);
    setCandlesLit([false, false, false, false, false]);
    stopMicDetection();

    soundEngine.playPop();

    // 0.65s Momentary quiet suspense before joyous light burst and blessing
    setTimeout(() => {
      setShowWishReward(true);
      soundEngine.playSparkle(1.5);
      soundEngine.playTempleBell();
      triggerCustomConfetti();
    }, 650);
  };

  const handleHoldStart = () => {
    if (isExtinguished) return;
    let progress = 0;
    holdIntervalRef.current = setInterval(() => {
      progress += 5;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(holdIntervalRef.current!);
        setHoldProgress(0);
        extinguishCandles();
      }
    }, 50);
  };

  const handleHoldEnd = () => {
    if (holdIntervalRef.current) {
      clearInterval(holdIntervalRef.current);
      setHoldProgress(0);
    }
  };

  const handleRelight = () => {
    setIsExtinguished(false);
    setShowWishReward(false);
    setCandlesLit([true, true, true, true, true]);
    setWishMade('');
    soundEngine.playPop();
  };

  useEffect(() => {
    return () => {
      stopMicDetection();
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  return (
    <section id="make-a-wish" className="relative w-full max-w-5xl mx-auto px-4 py-24 select-none">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-300/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#FF4D8D] font-fredoka text-xs font-semibold shadow-sm border border-pink-200 mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
          <span>BIRTHDAY TRADITION // MAKE A WISH 🎂</span>
        </motion.div>

        <h2 className="text-3xl sm:text-5xl font-fredoka font-bold text-gray-800">
          Blow Out The Candles! 🕯️✨
        </h2>
        <p className="text-sm font-quicksand text-gray-600 mt-2">
          Make a silent wish for Shree, then blow into your microphone or hold the button to extinguish the flames!
        </p>
      </div>

      {/* Main Interactive Cake Stage */}
      <div className="relative max-w-xl mx-auto bg-gradient-to-b from-white/90 via-white/80 to-[#FFF0F3]/90 rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-pink-200/80 backdrop-blur-xl text-center overflow-hidden">
        
        {/* Tiered Cake Graphic */}
        <div className="relative flex flex-col items-center justify-center my-6">
          {/* Candles Layer */}
          <div className="flex items-end justify-center gap-5 sm:gap-7 mb-2 relative z-10">
            {candlesLit.map((isLit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Flame / Smoke */}
                <div className="h-10 flex items-center justify-center">
                  {isLit ? (
                    <motion.div
                      animate={{
                        scale: [1, 1.15, 0.95, 1.05, 1],
                        rotate: [-3, 3, -2, 2, 0],
                        opacity: [0.9, 1, 0.85, 1]
                      }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut', delay: idx * 0.1 }}
                      className="w-4 h-6 rounded-full bg-gradient-to-t from-[#FF6B9D] via-[#FFD93D] to-[#FFFDF0] shadow-[0_0_18px_#FFD93D] filter drop-shadow-[0_0_8px_#FF6B9D]"
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ opacity: [0.8, 0], y: -30, x: (idx % 2 === 0 ? 6 : -6) }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                      className="w-1.5 h-6 rounded-full bg-gray-400/40 blur-[1px]"
                    />
                  )}
                </div>

                {/* Candle Stick */}
                <div className="w-2.5 h-10 sm:h-12 rounded-t-md bg-gradient-to-r from-pink-300 via-rose-200 to-pink-400 border border-white shadow-sm" />
              </div>
            ))}
          </div>

          {/* Top Cake Tier */}
          <div className="w-48 sm:w-56 h-14 rounded-2xl bg-gradient-to-r from-[#FFD1DC] via-[#FFE5EC] to-[#FFD1DC] border-2 border-white shadow-md flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-3 bg-white/70 rounded-full" />
            <span className="text-xl">🍓🌸🍓</span>
          </div>

          {/* Bottom Cake Tier */}
          <div className="w-64 sm:w-76 h-20 rounded-3xl bg-gradient-to-r from-[#FFB3C6] via-[#FFC2D1] to-[#FFB3C6] border-2 border-white shadow-lg flex items-center justify-center relative overflow-hidden -mt-1">
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-full" />
            <div className="flex items-center gap-3 text-2xl">
              <span>🐱</span>
              <span className="font-fredoka font-bold text-sm text-[#FF4D8D] uppercase tracking-widest">
                Happy Birthday Shree
              </span>
              <span>🪷</span>
            </div>
          </div>

          {/* Cake Plate Stand */}
          <div className="w-72 sm:w-88 h-4 rounded-full bg-[#D4A84B]/40 border-t-2 border-[#D4A84B] shadow-lg mt-1" />
        </div>

        {/* Controls & Wish Actions */}
        {!showWishReward ? (
          <div className="space-y-4 pt-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Mic Detection Button */}
              <button
                disabled={isExtinguished}
                onClick={isListeningMic ? stopMicDetection : startMicDetection}
                className={`flex items-center gap-2 px-5 py-3 rounded-full font-fredoka font-semibold text-xs transition-all shadow-sm ${
                  isListeningMic
                    ? 'bg-emerald-500 text-white animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                    : 'bg-white hover:bg-pink-50 border border-pink-200 text-gray-700'
                }`}
              >
                {isListeningMic ? (
                  <>
                    <Mic className="w-4 h-4" />
                    <span>Listening... Blow into mic! ({micVolume}%)</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-[#FF4D8D]" />
                    <span>Enable Mic to Blow 🎤</span>
                  </>
                )}
              </button>

              {/* Tap & Hold Fallback Button */}
              <button
                disabled={isExtinguished}
                onMouseDown={handleHoldStart}
                onMouseUp={handleHoldEnd}
                onTouchStart={handleHoldStart}
                onTouchEnd={handleHoldEnd}
                className="relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4D8D] hover:bg-[#FF2D78] text-white font-fredoka font-bold text-xs shadow-pop hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
              >
                {holdProgress > 0 && (
                  <div
                    className="absolute left-0 inset-y-0 bg-white/30 transition-all duration-75"
                    style={{ width: `${holdProgress}%` }}
                  />
                )}
                <Wind className="w-4 h-4" />
                <span>{holdProgress > 0 ? `Blowing... ${holdProgress}%` : isExtinguished ? 'Wish Rising... ✨' : 'Hold to Blow 💨'}</span>
              </button>
            </div>

            <p className="text-[11px] font-quicksand text-gray-400">
              {isExtinguished ? 'The universe is catching your wish...' : "Hold the button for 1.5 seconds or blow softly into your phone's microphone!"}
            </p>
          </div>
        ) : (
          /* Wish Granted Celebration Reveal */
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 280 }}
            className="space-y-4 pt-4"
          >
            <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-50 via-rose-50 to-amber-50 border border-pink-200 text-center space-y-2">
              <span className="text-4xl block animate-bounce">✨🪷💖</span>
              <h3 className="text-2xl font-playfair font-bold text-[#3D2040]">
                Candles Blown Out! Wish Granted! 🌸
              </h3>
              <p className="font-caveat text-xl sm:text-2xl text-gray-700 leading-snug">
                "May Radha Rani bless Shree with infinite smiles, peaceful health, and every silent prayer answered."
              </p>
            </div>

            <button
              onClick={handleRelight}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-pink-50 border border-pink-200 text-gray-700 font-fredoka text-xs font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#FF4D8D]" />
              <span>Relight Candles 🕯️</span>
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};
