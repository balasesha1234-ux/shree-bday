// Hyper-Realistic Studio Sound Synthesis & Diverse Acoustic Audio Library

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentTrackUrl: string = '/assets/audio/ambient.mp3';

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

  // 1. Ultra-Soft Soothing Glass Raindrop Tap (Standard UI Touch)
  public playTap() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.035);

      filter.type = 'lowpass';
      filter.frequency.value = 1100;

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  // 2. Realistic Supersonic Laser Pulse (For 1,250 KM Distance Tracker)
  public playLaserPulse() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.12);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.35);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(2200, now + 0.15);
      filter.Q.value = 3.5;

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch (_) {}
  }

  // 3. Mechanical Vault / Time Capsule Unlock (For Time Capsule)
  public playCapsuleUnlock() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Heavy click 1 (Gear latch)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(800, now);
      osc1.frequency.exponentialRampToValueAtTime(120, now + 0.04);
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.05);

      // Heavy click 2 (Vault door release after 80ms)
      setTimeout(() => {
        try {
          const now2 = ctx.currentTime;
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(300, now2);
          osc2.frequency.exponentialRampToValueAtTime(60, now2 + 0.08);
          gain2.gain.setValueAtTime(0.2, now2);
          gain2.gain.exponentialRampToValueAtTime(0.001, now2 + 0.08);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start(now2);
          osc2.stop(now2 + 0.09);
        } catch (_) {}
      }, 80);
    } catch (_) {}
  }

  // 4. Parchment & Wax Seal Crack (For Sibling Rules & Letters)
  public playWaxSealCrack() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Noise burst for paper / wax snap
      const bufferSize = ctx.sampleRate * 0.04;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1800;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.045);
    } catch (_) {}
  }

  // 5. Authentic Kitten Purr Vibration (For Whisker Lounge)
  public playCatPurr() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Deep 42Hz rhythmic motor purr
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(42, now); // Low feline vocal vibration

      lfo.frequency.setValueAtTime(24, now); // 24Hz purr cadence modulation
      lfoGain.gain.setValueAtTime(0.08, now);

      lfo.connect(lfoGain);
      lfoGain.connect(gain.gain);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.16, now + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      lfo.start(now);
      osc.stop(now + 1.25);
      lfo.stop(now + 1.25);
    } catch (_) {}
  }

  // 6. Treat Munch & Nibble Click (For Whisker Lounge Feeding)
  public playTreatMunch() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(650, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);

      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.06);
    } catch (_) {}
  }

  // 7. Grand Cosmic Stardust Explosion Whoosh (For Cosmic Constellation Starburst)
  public playStardustExplosion() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Deep sub-bass impact
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(35, now + 0.5);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);

      // Shimmering starburst trail
      this.playSparkle(1.5);
    } catch (_) {}
  }

  // 8. Sacred Temple Singing Bowl (STRICTLY RESERVED for Diya Pond Offerings)
  public playTempleBell() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const fundamental = 432;

      const harmonics = [1.0, 2.76, 5.4];
      const decays = [2.8, 1.8, 1.0];
      const amps = [0.12, 0.05, 0.02];

      harmonics.forEach((ratio, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * ratio, now);

        gain.gain.setValueAtTime(amps[i], now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[i]);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + decays[i] + 0.1);
      });
    } catch (_) {}
  }

  // 9. Soft Organic Bubble Pop
  public playPop() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.06);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (_) {}
  }

  // 10. Harmonic Musical Chime (For balloon pops & sky drawing)
  public playHarmonicPop(index: number = 0) {
    try {
      this.playPop();
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const SCALE = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50]; // C5, D5, E5, G5, A5, C6
      const freq = SCALE[index % SCALE.length];

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.65);
    } catch (_) {}
  }

  // 11. Delicate Shimmering Stardust Chimes
  public playSparkle(pitchMultiplier: number = 1) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const frequencies = [880.00, 1046.50, 1318.51, 1567.98];
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * pitchMultiplier, startTime);

        gain.gain.setValueAtTime(0.05 / (idx + 1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.45);
      });
    } catch (_) {}
  }

  // 12. Cute Soft Kitten Meow
  public playMeow() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(540, now);
      osc.frequency.exponentialRampToValueAtTime(740, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(460, now + 0.4);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.Q.value = 3.0;

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.1, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    } catch (_) {}
  }

  // 13. Mechanical Camera Shutter
  public playCameraShutter() {
    try {
      this.playTap();
      setTimeout(() => this.playTap(), 100);
    } catch (_) {}
  }

  // 14. Granular Coin Scratch
  public playCoinScratch() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2200;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.05);
    } catch (_) {}
  }

  // 15. Background BGM Playback
  public playTrack(trackUrl: string) {
    this.stopAmbientMusic();
    this.currentTrackUrl = trackUrl;

    try {
      const audio = new Audio(trackUrl);
      audio.volume = 0.4;
      audio.loop = true;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.currentAudioElement = audio;
            this.isBgmPlaying = true;
          })
          .catch(() => {
            this.startSynthesizedAmbient('party');
          });
      }
    } catch (_) {
      this.startSynthesizedAmbient('party');
    }
  }

  private startSynthesizedAmbient(mode: 'countdown' | 'party' | 'devotional' = 'party') {
    try {
      const ctx = this.getContext();
      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.bgmGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2.0);
      this.bgmGain.connect(ctx.destination);

      const frequencies = mode === 'countdown' 
        ? [110, 164.81, 220, 329.63]
        : mode === 'devotional'
        ? [216, 288, 324, 432]
        : [261.63, 329.63, 392.00, 523.25];

      frequencies.forEach((freq) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        if (this.bgmGain) {
          osc.connect(this.bgmGain);
        }
        osc.start();
      });

      this.isBgmPlaying = true;
    } catch (_) {}
  }

  public startAmbientMusic(mode: 'countdown' | 'party' | 'devotional' = 'party') {
    const defaultTrack = mode === 'devotional' ? '/assets/audio/ambient.mp3' : '/assets/audio/background.mp3';
    this.playTrack(defaultTrack);
  }

  public stopAmbientMusic() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    this.isBgmPlaying = false;
  }

  public toggleMusic(mode?: 'countdown' | 'party' | 'devotional'): boolean {
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

  public getCurrentTrack(): string {
    return this.currentTrackUrl;
  }
}

export const soundEngine = new SoundEngine();
