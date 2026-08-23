// Hyper-Realistic Studio Sound Synthesis & High-Fidelity Audio Engine

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentTrackUrl: string = '/assets/audio/sacred_flute.mp3';
  private volume: number = Number(localStorage.getItem('shree_audio_volume') || 0.6);

  constructor() {
    // Auto-resume AudioContext on first user interaction across the entire window
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume();
        }
      };
      window.addEventListener('pointerdown', unlockAudio, { once: true });
      window.addEventListener('touchstart', unlockAudio, { once: true });
      window.addEventListener('click', unlockAudio, { once: true });
      window.addEventListener('keydown', unlockAudio, { once: true });
    }
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setVolume(level: number): void {
    this.volume = Math.max(0, Math.min(1, level));
    localStorage.setItem('shree_audio_volume', String(this.volume));

    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.volume;
    }
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.volume * 0.25, this.ctx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  // 1. Crisp Glass Raindrop Tap (Punchy & Audible)
  public playTap() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.06);

      filter.type = 'lowpass';
      filter.frequency.value = 1600;

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (_) {}
  }

  // 2. High-Impact Bubble Pop SFX
  public playPop() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(840, now + 0.05);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (_) {}
  }

  // 3. Shimmering Crystal Sparkle Sound (Chimes)
  public playSparkle(pitchMultiplier: number = 1.0) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const baseFreqs = [784, 988, 1175, 1568, 1976];

      baseFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq * pitchMultiplier, now + idx * 0.04);

        gain.gain.setValueAtTime(0.22, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.36);
      });
    } catch (_) {}
  }

  // 4. Loud & Cute Cat Meow SFX (Dual-Formant Harmonic)
  public playMeow() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Primary meow oscillator
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc2.type = 'sine';

      // Expressive cat pitch curve (Rise -> Hold -> Gentle fall)
      osc1.frequency.setValueAtTime(450, now);
      osc1.frequency.linearRampToValueAtTime(820, now + 0.14);
      osc1.frequency.exponentialRampToValueAtTime(580, now + 0.42);

      osc2.frequency.setValueAtTime(454, now);
      osc2.frequency.linearRampToValueAtTime(824, now + 0.14);
      osc2.frequency.exponentialRampToValueAtTime(584, now + 0.42);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.frequency.linearRampToValueAtTime(1400, now + 0.18);
      filter.Q.value = 4.0;

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.48, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.46);
      osc2.stop(now + 0.46);
    } catch (_) {}
  }

  // 5. Deep Resonant Cat Purr Rumble (Audible in Headphones & Speakers)
  public playCatPurr() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Low carrier oscillator (deep body rumble)
      const carrier = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      const mainGain = ctx.createGain();

      carrier.type = 'triangle';
      carrier.frequency.setValueAtTime(45, now);

      // 24Hz amplitude modulation (rhythmic purring throat flutter)
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(24, now);

      lfoGain.gain.setValueAtTime(0.35, now);
      lfo.connect(lfoGain.gain);

      mainGain.gain.setValueAtTime(0.01, now);
      mainGain.gain.linearRampToValueAtTime(0.45, now + 0.15);
      mainGain.gain.setValueAtTime(0.45, now + 0.65);
      mainGain.gain.exponentialRampToValueAtTime(0.001, now + 0.95);

      carrier.connect(mainGain);
      mainGain.connect(ctx.destination);

      lfo.start(now);
      carrier.start(now);
      lfo.stop(now + 1.0);
      carrier.stop(now + 1.0);
    } catch (_) {}
  }

  // 6. Mechanical Camera Shutter Snap
  public playCameraShutter() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // First snap
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'square';
      osc1.frequency.setValueAtTime(650, now);
      gain1.gain.setValueAtTime(0.38, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.045);

      // Second release click
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(320, now + 0.06);
      gain2.gain.setValueAtTime(0.35, now + 0.06);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.06);
      osc2.stop(now + 0.15);
    } catch (_) {}
  }

  // 7. Sacred Temple Bell Resonance
  public playTempleBell() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const bellFreqs = [440, 880, 1320, 1760];

      bellFreqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.35 / (idx + 1), now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 2.6);
      });
    } catch (_) {}
  }

  // 8. Wax Seal Snap Crack SFX
  public playWaxSealCrack() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);

      gain.gain.setValueAtTime(0.42, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.13);
    } catch (_) {}
  }

  // 9. Supersonic Laser Pulse SFX
  public playLaserPulse() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1600, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(700, now);
      filter.frequency.exponentialRampToValueAtTime(2400, now + 0.15);
      filter.Q.value = 4.0;

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.45, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch (_) {}
  }

  // 10. Mechanical Capsule Unlock
  public playCapsuleUnlock() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(440, now + 0.1);
      osc.frequency.linearRampToValueAtTime(660, now + 0.2);

      gain.gain.setValueAtTime(0.38, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.36);
    } catch (_) {}
  }

  // Background Flute Music System
  public startAmbientMusic(_mode?: string) {
    try {
      this.stopAmbientMusic();
      const trackUrl = '/assets/audio/sacred_flute.mp3';
      this.currentTrackUrl = trackUrl;

      const audio = new Audio(trackUrl);
      audio.loop = true;
      audio.volume = this.volume;

      audio.play().then(() => {
        this.isBgmPlaying = true;
      }).catch(() => {
        this.startProceduralDrone();
        this.isBgmPlaying = true;
      });

      this.currentAudioElement = audio;
    } catch (_) {
      this.startProceduralDrone();
      this.isBgmPlaying = true;
    }
  }

  public stopAmbientMusic() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    this.isBgmPlaying = false;
  }

  public toggleMusic(mode?: any): boolean {
    if (this.isBgmPlaying) {
      this.stopAmbientMusic();
      return false;
    } else {
      this.startAmbientMusic(mode);
      return true;
    }
  }

  public isPlaying(): boolean {
    return this.isBgmPlaying;
  }


  // Additional Studio SFX & Legacy Compatibility
  public playHarmonicPop(freq: number = 520) {
    this.playPop();
  }

  public playStardustExplosion() {
    this.playSparkle(1.6);
  }

  public playTreatMunch() {
    this.playPop();
  }

  public playTrack(trackUrl: string) {
    this.startAmbientMusic();
  }

  private startProceduralDrone() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(216, now); // 432Hz harmonic half

      gain.gain.setValueAtTime(this.volume * 0.2, now);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      this.bgmGain = gain;
    } catch (_) {}
  }
}

export const soundEngine = new SoundEngine();
