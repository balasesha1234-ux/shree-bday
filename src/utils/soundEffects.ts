// Hyper-Realistic Studio Sound Synthesis & Acoustic Audio Engine

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

  // 1. Ultra-Realistic Wooden / Haptic UI Click (iPhone / Switch feel)
  public playTap() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Click transient
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.035);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.035);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch (_) {}
  }

  // 2. Liquid Bubble / Gentle Pop
  public playPop() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(380, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } catch (_) {}
  }

  // 3. Harmonic Musical Chime (Pentatonic note scale for balloon pops)
  public playHarmonicPop(index: number = 0) {
    try {
      this.playPop();
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const SCALE = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50, 1174.66]; // C D E G A C D
      const freq = SCALE[index % SCALE.length];

      // Fundamental chime
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);

      // Warm harmonic overtone
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(freq * 2.02, now);

      gain1.gain.setValueAtTime(0.2, now);
      gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.75);

      gain2.gain.setValueAtTime(0.08, now);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

      osc1.connect(gain1);
      osc2.connect(gain2);
      gain1.connect(ctx.destination);
      gain2.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.8);
      osc2.stop(now + 0.8);
    } catch (_) {}
  }

  // 4. Shimmering Stardust Chime Arpeggio
  public playSparkle(pitchMultiplier: number = 1) {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const frequencies = [783.99, 1046.50, 1318.51, 1567.98, 2093.00]; // G5, C6, E6, G6, C7
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const startTime = now + idx * 0.045;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq * pitchMultiplier, startTime);

        gain.gain.setValueAtTime(0.12 / (idx + 1), startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.5);
      });
    } catch (_) {}
  }

  // 5. Authentic 432Hz Japanese Singing Bowl / Temple Bell Resonance
  public playTempleBell() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const fundamental = 432; // Sacred Healing A

      // Inharmonic metal bowl ratios: 1.0, 2.76, 5.40, 8.93
      const harmonics = [1.0, 2.756, 5.404, 8.933];
      const decays = [3.5, 2.2, 1.4, 0.8];
      const amps = [0.25, 0.12, 0.06, 0.02];

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

  // 6. Realistic Formant Synthesized Soft Kitten Meow
  public playMeow() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      // Pitch contour: gentle rise then cute fall
      osc.frequency.setValueAtTime(520, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.16);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.48);

      // Formant filter (vocal tract simulation)
      filter.type = 'bandpass';
      filter.Q.value = 4.0;
      filter.frequency.setValueAtTime(1100, now);
      filter.frequency.linearRampToValueAtTime(1600, now + 0.2);
      filter.frequency.linearRampToValueAtTime(900, now + 0.48);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18, now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.52);
    } catch (_) {}
  }

  // 7. Mechanical Camera Shutter Sound (For Photobooth & Story Downloads)
  public playCameraShutter() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      // Click 1 (Curtain open)
      this.playTap();

      // Click 2 (Curtain close after 120ms)
      setTimeout(() => {
        try {
          const now2 = ctx.currentTime;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(900, now2);
          osc.frequency.exponentialRampToValueAtTime(120, now2 + 0.04);
          gain.gain.setValueAtTime(0.2, now2);
          gain.gain.exponentialRampToValueAtTime(0.001, now2 + 0.04);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now2);
          osc.stop(now2 + 0.05);
        } catch (_) {}
      }, 110);
    } catch (_) {}
  }

  // 8. Granular Coin Scratch Sound (For Scratch Card)
  public playCoinScratch() {
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;

      const bufferSize = ctx.sampleRate * 0.06; // 60ms noise burst
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2400;
      filter.Q.value = 3.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.06);
    } catch (_) {}
  }

  // 9. Play a specific MP3 Track
  public playTrack(trackUrl: string) {
    this.stopAmbientMusic();
    this.currentTrackUrl = trackUrl;

    try {
      const audio = new Audio(trackUrl);
      audio.volume = 0.45;
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
      this.bgmGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2.0);
      this.bgmGain.connect(ctx.destination);

      const frequencies = mode === 'countdown' 
        ? [110, 164.81, 220, 329.63]
        : mode === 'devotional'
        ? [216, 288, 324, 432]
        : [261.63, 329.63, 392.00, 523.25];

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
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
