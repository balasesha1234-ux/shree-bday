// Web Audio API Sound Generator & Synthesizer with MP3 Playback & Jukebox

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmOscillators: OscillatorNode[] = [];
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

  // Play a soft sparkle / chime sound for tap sequence feedback
  public playSparkle(pitch: number = 1) {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33 * pitch, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880 * pitch, ctx.currentTime + 0.15); // A5
      osc.frequency.exponentialRampToValueAtTime(1174.66 * pitch, ctx.currentTime + 0.3); // D6

      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch (_) {}
  }

  // Play an adorable kitten meow sound for gift unwrap & cat easter eggs
  public playMeow() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(550, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.18);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.45);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    } catch (_) {}
  }

  // Balloon pop sound
  public playPop() {
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(250, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (_) {}
  }

  // Harmonic musical chime on balloon pop (Index 0-5 gives C5, E5, G5, A5, C6, E6)
  public playHarmonicPop(index: number = 0) {
    try {
      this.playPop();
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const NOTES = [523.25, 659.25, 783.99, 880.00, 1046.50, 1318.51];
      const freq = NOTES[index % NOTES.length];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch (_) {}
  }

  // Devotional temple bell / resonant chime
  public playTempleBell() {
    try {
      const ctx = this.getContext();
      const fundamental = 432; // Healing A frequency

      [1, 2.76, 5.4, 8.9].forEach((harmonic, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.value = fundamental * harmonic;

        const initialGain = 0.12 / (idx + 1);
        gain.gain.setValueAtTime(initialGain, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.8);
      });
    } catch (_) {}
  }

  // Play a specific MP3 Track (with fallback to synthetic ambient chords)
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
            // Fallback to synthesized ambient chords
            this.startSynthesizedAmbient('party');
          });
      }
    } catch (_) {
      this.startSynthesizedAmbient('party');
    }
  }

  // Synthesized Ambient Music Fallback
  private startSynthesizedAmbient(mode: 'countdown' | 'party' | 'devotional' = 'party') {
    try {
      const ctx = this.getContext();
      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.bgmGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.5);
      this.bgmGain.connect(ctx.destination);

      const frequencies = mode === 'countdown' 
        ? [110, 164.81, 220, 329.63]
        : mode === 'devotional'
        ? [216, 288, 324, 432]
        : [261.63, 329.63, 392.00, 523.25];

      this.bgmOscillators = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.value = 0.2 + i * 0.1;
        lfoGain.gain.value = 1.5;
        lfo.connect(osc.frequency);
        lfo.start();

        if (this.bgmGain) {
          osc.connect(this.bgmGain);
        }
        osc.start();
        return osc;
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

    if (this.ctx && this.bgmGain) {
      this.bgmGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.5);
      setTimeout(() => {
        this.bgmOscillators.forEach(osc => {
          try { osc.stop(); } catch (_) {}
        });
        this.bgmOscillators = [];
      }, 500);
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
