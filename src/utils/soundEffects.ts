// Web Audio API Sound Generator & Synthesizer

class SoundEngine {
  private ctx: AudioContext | null = null;
  private bgmGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmOscillators: OscillatorNode[] = [];

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
      // Meow pitch contour: rises then falls
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

  // Devotional temple bell / resonant chime
  public playTempleBell() {
    try {
      const ctx = this.getContext();
      const fundamental = 432; // Healing A frequency

      [1, 2.76, 5.4, 8.9].forEach((harmonic, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(fundamental * harmonic, ctx.currentTime);

        const decay = 2.5 / (idx + 1);
        gain.gain.setValueAtTime(0.15 / (idx + 1), ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + decay);
      });
    } catch (_) {}
  }

  // Procedural Dreamy Ambient Music Synthesizer
  public startAmbientMusic(mode: 'countdown' | 'party' | 'devotional' = 'party') {
    if (this.isBgmPlaying) return;

    try {
      const ctx = this.getContext();
      this.bgmGain = ctx.createGain();
      this.bgmGain.gain.setValueAtTime(0.01, ctx.currentTime);
      this.bgmGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 2.5);
      this.bgmGain.connect(ctx.destination);

      // Chords based on mode
      const frequencies = mode === 'countdown' 
        ? [110, 164.81, 220, 329.63] // A minor mysterious
        : mode === 'devotional'
        ? [216, 288, 324, 432] // 432Hz sacred harmonic scale
        : [261.63, 329.63, 392.00, 523.25]; // C Major festive joyful

      this.bgmOscillators = frequencies.map((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Gentle subtle LFO detune
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

  public stopAmbientMusic() {
    if (!this.isBgmPlaying) return;

    if (this.ctx && this.bgmGain) {
      this.bgmGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.0);
      setTimeout(() => {
        this.bgmOscillators.forEach(osc => {
          try { osc.stop(); } catch (_) {}
        });
        this.bgmOscillators = [];
        this.isBgmPlaying = false;
      }, 1000);
    }
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
}

export const soundEngine = new SoundEngine();
