import { useState, useEffect, useCallback } from 'react';
import { soundEngine } from '../utils/soundEffects';

export function useAudio(initialMode: 'countdown' | 'party' | 'devotional' = 'party') {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentMode, setCurrentMode] = useState(initialMode);

  const toggle = useCallback(() => {
    const active = soundEngine.toggleMusic(currentMode);
    setIsPlaying(active);
  }, [currentMode]);

  const playEffect = useCallback((effect: 'sparkle' | 'meow' | 'pop' | 'bell', pitch?: number) => {
    switch (effect) {
      case 'sparkle':
        soundEngine.playSparkle(pitch);
        break;
      case 'meow':
        soundEngine.playMeow();
        break;
      case 'pop':
        soundEngine.playPop();
        break;
      case 'bell':
        soundEngine.playTempleBell();
        break;
    }
  }, []);

  return {
    isPlaying,
    currentMode,
    setCurrentMode,
    toggle,
    playEffect
  };
}
