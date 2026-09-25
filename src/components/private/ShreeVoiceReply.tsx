import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  Square,
  Play,
  Pause,
  RotateCcw,
  Send,
  Sparkles,
  Download,
  Shield,
  Heart,
  Headphones,
  CheckCircle2,
  Volume2,
  FastForward
} from 'lucide-react';
import { soundEngine } from '../../utils/soundEffects';
import { triggerCustomConfetti } from '../shared/Confetti';
import { saveShreeVoiceNote, getLatestShreeVoiceNote, ShreeVoiceNote } from '../../utils/supabaseClient';

interface ShreeVoiceReplyProps {
  className?: string;
  isCompact?: boolean;
}

export const ShreeVoiceReply: React.FC<ShreeVoiceReplyProps> = ({
  className = '',
  isCompact = false
}) => {
  const [status, setStatus] = useState<'idle' | 'recording' | 'preview' | 'saving' | 'saved'>('idle');
  const [recordTime, setRecordTime] = useState<number>(0);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackTime, setPlaybackTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [liveVolume, setLiveVolume] = useState<number[]>(new Array(16).fill(15));
  const [noteMessage, setNoteMessage] = useState<string>('');
  const [savedNote, setSavedNote] = useState<ShreeVoiceNote | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const previewAudioRef = useRef<HTMLAudioElement | null>(null);

  // Check if a voice note was already saved on mount
  useEffect(() => {
    async function loadSaved() {
      const existing = await getLatestShreeVoiceNote();
      if (existing) {
        setSavedNote(existing);
        setAudioUrl(existing.audio_data);
        setDuration(existing.duration || 0);
        setStatus('saved');
      }
    }
    loadSaved();
  }, []);

  // Duck BGM when listening to preview or playback
  useEffect(() => {
    soundEngine.duckBgm(isPlaying);
    return () => {
      soundEngine.duckBgm(false);
    };
  }, [isPlaying]);

  // Handle preview audio element listeners
  useEffect(() => {
    const audio = previewAudioRef.current;
    if (!audio) return;

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const onTimeUpdate = () => {
      setPlaybackTime(audio.currentTime);
    };
    const onEnded = () => {
      setIsPlaying(false);
      setPlaybackTime(0);
      soundEngine.duckBgm(false);
    };

    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
    };
  }, [audioUrl]);

  // Clean up streams & audio context on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch (_) {}
      }
    };
  }, []);

  // Live microphone frequency visualizer loop
  const startVolumeMeter = (stream: MediaStream) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 64;
      source.connect(analyser);
      analyserRef.current = analyser;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      const updateMeter = () => {
        analyser.getByteFrequencyData(dataArray);
        const bars: number[] = [];
        for (let i = 0; i < 16; i++) {
          const val = dataArray[i * 2] || 0;
          bars.push(Math.max(12, Math.min(100, (val / 255) * 100)));
        }
        setLiveVolume(bars);
        animFrameRef.current = requestAnimationFrame(updateMeter);
      };
      updateMeter();
    } catch (_) {}
  };

  // Start recording
  const startRecording = async () => {
    try {
      soundEngine.playPop();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Determine best audio mime type
      const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4', 'audio/ogg', 'audio/wav'];
      const supportedMime = mimeTypes.find((type) => MediaRecorder.isTypeSupported(type)) || '';

      const recorder = new MediaRecorder(stream, supportedMime ? { mimeType: supportedMime } : undefined);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };

      recorder.onstop = () => {
        const mime = recorder.mimeType || 'audio/webm';
        const blob = new Blob(audioChunksRef.current, { type: mime });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setStatus('preview');

        // Stop stream tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        if (audioContextRef.current) {
          try {
            audioContextRef.current.close();
          } catch (_) {}
        }
      };

      recorder.start(100);
      setStatus('recording');
      setRecordTime(0);

      startVolumeMeter(stream);

      timerIntervalRef.current = window.setInterval(() => {
        setRecordTime((prev) => {
          if (prev >= 180) {
            // Max 3 minutes
            stopRecording();
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    } catch (err) {
      console.warn('Microphone access failed:', err);
      alert('Microphone access is needed to record a voice note for Karthik. Please allow microphone permission!');
    }
  };

  // Stop recording
  const stopRecording = () => {
    soundEngine.playSparkle(1.2);
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  // Cancel recording
  const cancelRecording = () => {
    soundEngine.playPop();
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (audioContextRef.current) {
      try {
        audioContextRef.current.close();
      } catch (_) {}
    }
    setStatus('idle');
    setAudioBlob(null);
    setAudioUrl(savedNote ? savedNote.audio_data : null);
  };

  // Toggle playback
  const togglePlay = () => {
    soundEngine.playPop();
    const audio = previewAudioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.playbackRate = playbackSpeed;
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.warn('Audio playback error:', e);
      });
    }
  };

  // Cycle speed
  const cycleSpeed = () => {
    soundEngine.playTap();
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const next = speeds[nextIdx];
    setPlaybackSpeed(next);
    if (previewAudioRef.current) {
      previewAudioRef.current.playbackRate = next;
    }
  };

  // Seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = previewAudioRef.current;
    if (!audio) return;
    const val = parseFloat(e.target.value);
    audio.currentTime = val;
    setPlaybackTime(val);
  };

  // Seal & Send Voice Note to Karthik
  const handleSendVoiceNote = async (e: React.MouseEvent) => {
    if (!audioBlob) return;
    setStatus('saving');
    soundEngine.playSparkle(1.8);

    // Convert audio blob to base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Audio = reader.result as string;
      const note = await saveShreeVoiceNote({
        audio_data: base64Audio,
        duration: recordTime,
        sender_name: 'Shree',
        note_message: noteMessage.trim()
      });

      setSavedNote(note);
      setStatus('saved');
      soundEngine.playTempleBell();
      triggerCustomConfetti(e.clientX, e.clientY);
    };
    reader.readAsDataURL(audioBlob);
  };

  // Download voice note
  const handleDownload = () => {
    if (!audioUrl) return;
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `shree_voice_note_for_karthik_${new Date().toISOString().slice(0, 10)}.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    soundEngine.playPop();
  };

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      className={`relative ${
        isCompact ? 'my-2 p-4 sm:p-6' : 'my-10 p-6 sm:p-9'
      } rounded-3xl bg-gradient-to-br from-[#FFF5F8] via-[#FFFDF9] to-[#FFF0F5] text-[#3D2040] shadow-2xl border-2 border-[#FF4D8D]/30 overflow-hidden select-none ${className}`}
    >
      {/* Soft Ambient Glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-[100px] bg-[#FF4D8D]/15 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full blur-[100px] bg-[#D4A84B]/15 pointer-events-none" />

      {/* Hidden Audio Element for Playback */}
      {audioUrl && <audio ref={previewAudioRef} src={audioUrl} preload="metadata" />}

      {/* Header Bar */}
      <div
        className={`relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-pink-200/60 ${
          isCompact ? 'pb-3 mb-4' : 'pb-4 mb-6'
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#FF4D8D] to-amber-500 text-white flex items-center justify-center text-lg sm:text-xl shadow-md border border-white shrink-0">
            🌸
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-fredoka text-base sm:text-xl font-bold text-[#3D2040]">
                A Sister's Voice Reply
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-pink-100 text-[#FF4D8D] text-[9px] sm:text-[10px] font-space font-bold uppercase border border-pink-200">
                For Karthik Only
              </span>
            </div>
            <p className="text-[11px] sm:text-xs font-quicksand text-gray-600 mt-0.5">
              Have something you want to say to your brother? Record a voice note right here.
            </p>
          </div>
        </div>

        {status === 'saved' && (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] sm:text-xs font-space font-bold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Voice Note Sealed & Saved</span>
          </span>
        )}
      </div>

      {/* ========================================================================= */}
      {/* STATE 1: IDLE (READY TO RECORD) */}
      {/* ========================================================================= */}
      {status === 'idle' && (
        <div
          className={`relative z-10 ${
            isCompact ? 'p-4 sm:p-6' : 'p-6 sm:p-8'
          } rounded-2xl bg-white/80 border border-pink-200/80 text-center shadow-sm space-y-3`}
        >
          <div className="max-w-md mx-auto">
            <p className="font-playfair text-sm sm:text-lg font-semibold text-[#3D2040]">
              "Sometimes words typed on a screen aren't enough. Tap the button below to leave a personal voice note for Karthik."
            </p>
            <p className="text-[11px] sm:text-xs font-quicksand text-gray-500 mt-1">
              Your voice note stays permanently saved in this private sanctuary.
            </p>
          </div>

          <div className="pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={startRecording}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#FF2D78] hover:from-[#ff3a81] hover:to-[#e62067] text-white font-fredoka font-bold text-xs sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Mic className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white animate-pulse" />
              </div>
              <span>Tap to Record Voice Note 🎙️</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 2: RECORDING LIVE */}
      {/* ========================================================================= */}
      {status === 'recording' && (
        <div className="relative z-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-rose-50 via-white to-pink-50 border-2 border-[#FF4D8D] text-center shadow-md space-y-5">
          <div className="flex items-center justify-center gap-2 font-mono text-sm sm:text-base font-bold text-[#FF2D78]">
            <span className="w-3 h-3 rounded-full bg-rose-600 animate-ping" />
            <span>RECORDING LIVE: {formatSeconds(recordTime)} / 3:00</span>
          </div>

          {/* Live Reactive Audio Amplitude Bars */}
          <div className="flex items-center justify-center gap-1.5 h-16 sm:h-20 px-4 py-2 bg-pink-100/50 rounded-2xl border border-pink-200 max-w-md mx-auto">
            {liveVolume.map((vol, idx) => (
              <motion.div
                key={idx}
                className="w-2 rounded-full bg-gradient-to-t from-[#FF4D8D] to-[#D4A84B]"
                style={{ height: `${vol}%` }}
                transition={{ duration: 0.05 }}
              />
            ))}
          </div>

          <p className="text-xs font-quicksand text-gray-600 italic">
            Speak naturally... Karthik will hear this whenever he opens your sanctuary.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={cancelRecording}
              className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-fredoka font-bold transition-all cursor-pointer"
            >
              Cancel ✕
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={stopRecording}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Square className="w-4 h-4 fill-white" />
              <span>Done & Review ⏹️</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 3: PREVIEW (BEFORE SENDING) */}
      {/* ========================================================================= */}
      {status === 'preview' && (
        <div className="relative z-10 p-6 sm:p-8 rounded-2xl bg-white border border-pink-300 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-space font-bold text-gray-500 uppercase">
              Preview Your Recording ({formatSeconds(recordTime)})
            </span>
            <span className="text-xs font-space text-[#FF4D8D] font-semibold">
              Ready to Send 💌
            </span>
          </div>

          {/* Preview Scrubber */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-11 h-11 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#D4A84B] text-white flex items-center justify-center shadow-md cursor-pointer shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </motion.button>

            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={duration || recordTime || 100}
                value={playbackTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D8D]"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 mt-1">
                <span>{formatSeconds(playbackTime)}</span>
                <span>{formatSeconds(duration || recordTime)}</span>
              </div>
            </div>
          </div>

          {/* Optional Short Written Note */}
          <div>
            <label className="block text-xs font-space font-semibold text-gray-700 mb-1">
              Add an optional short note for Karthik:
            </label>
            <input
              type="text"
              value={noteMessage}
              onChange={(e) => setNoteMessage(e.target.value)}
              placeholder="e.g. Happy Birthday Karthik! Stay awesome..."
              className="w-full px-3.5 py-2 rounded-xl bg-pink-50/50 border border-pink-200 text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-[#FF4D8D]"
              maxLength={150}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-pink-100">
            <button
              onClick={() => {
                soundEngine.playPop();
                setStatus('idle');
                setAudioBlob(null);
                setAudioUrl(null);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-fredoka font-semibold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Re-record</span>
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSendVoiceNote}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF4D8D] to-[#D4A84B] text-white font-fredoka font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Seal & Deliver to Karthik 💌</span>
            </motion.button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STATE 4: SAVED (PERMANENTLY SEALED PLAYBACK CARD) */}
      {/* ========================================================================= */}
      {status === 'saved' && (
        <div className="relative z-10 p-6 sm:p-7 rounded-2xl bg-white border-2 border-amber-300 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-pink-100 pb-3">
            <div>
              <p className="font-fredoka text-base font-bold text-[#3D2040] flex items-center gap-2">
                <span>Shree’s Voice Note for Karthik</span>
                <span className="text-base">🎙️</span>
              </p>
              <p className="text-[11px] font-space text-gray-500">
                Recorded & sealed in the Sibling Sanctuary
                {savedNote?.created_at && (
                  <span> • {new Date(savedNote.created_at).toLocaleDateString()}</span>
                )}
              </p>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              {/* Playback speed toggle */}
              <button
                onClick={cycleSpeed}
                className="px-2 py-0.5 rounded-lg bg-pink-50 text-[11px] font-mono font-bold text-[#FF4D8D] border border-pink-200"
                title="Speed"
              >
                {playbackSpeed}x
              </button>

              {/* Download Voice Note */}
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-space transition-colors cursor-pointer"
                title="Download Audio File"
              >
                <Download className="w-3.5 h-3.5 text-gray-600" />
                <span className="hidden sm:inline">Save</span>
              </button>

              {/* Re-record Option */}
              <button
                onClick={() => {
                  soundEngine.playPop();
                  setStatus('idle');
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-pink-50 hover:bg-pink-100 text-[#FF4D8D] text-xs font-space transition-colors cursor-pointer"
                title="Record a new voice note"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Update</span>
              </button>
            </div>
          </div>

          {/* Optional Message Display */}
          {savedNote?.note_message && (
            <div className="p-3 rounded-xl bg-pink-50/60 border border-pink-200/80 text-xs font-quicksand text-gray-700 italic">
              "{savedNote.note_message}"
            </div>
          )}

          {/* Audio Player Controls */}
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={togglePlay}
              className="w-12 h-12 rounded-2xl bg-gradient-to-r from-[#FF4D8D] to-[#D4A84B] text-white flex items-center justify-center shadow-md cursor-pointer shrink-0"
              title={isPlaying ? 'Pause' : 'Play Shree\'s Voice Note'}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </motion.button>

            <div className="flex-1">
              <input
                type="range"
                min={0}
                max={duration || savedNote?.duration || 100}
                value={playbackTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-pink-200 rounded-lg appearance-none cursor-pointer accent-[#FF4D8D]"
              />
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 mt-1">
                <span>{formatSeconds(playbackTime)}</span>
                <span className="text-[#D4A84B] font-semibold">
                  {duration > 0 ? formatSeconds(duration) : `${savedNote?.duration || 0}s`}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs font-quicksand text-gray-600 border-t border-pink-100">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <Shield className="w-3.5 h-3.5 text-emerald-600" />
              <span>Encrypted in Private Sibling Sanctuary</span>
            </span>
            <span className="font-playfair text-[#FF4D8D] italic">
              "A sister's voice remembered forever."
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
