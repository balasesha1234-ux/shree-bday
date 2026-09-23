import { useState, useEffect } from 'react';

export type AmbianceTheme = 'dawn' | 'midnight' | 'aarti' | 'meadow';
export type SacredRainType = 'lotus' | 'marigold' | 'stardust' | 'paws';

interface AmbianceConfig {
  id: AmbianceTheme;
  name: string;
  emoji: string;
  subtitle: string;
  defaultRain: SacredRainType;
  accentColor: string;
}

export const AMBIANCE_THEMES: Record<AmbianceTheme, AmbianceConfig> = {
  dawn: {
    id: 'dawn',
    name: 'Vrindavan Dawn',
    emoji: '🌅',
    subtitle: 'Blush Rose & Sacred Gold',
    defaultRain: 'lotus',
    accentColor: '#FF4D8D'
  },
  midnight: {
    id: 'midnight',
    name: 'Yamuna Midnight',
    emoji: '🌌',
    subtitle: 'Celestial Starry Sky & Diyas',
    defaultRain: 'stardust',
    accentColor: '#FFD93D'
  },
  aarti: {
    id: 'aarti',
    name: 'Golden Aarti',
    emoji: '🌇',
    subtitle: 'Temple Saffron & Marigold Glow',
    defaultRain: 'marigold',
    accentColor: '#E67E22'
  },
  meadow: {
    id: 'meadow',
    name: 'Govardhan Meadow',
    emoji: '🍃',
    subtitle: 'Sage Tulsi & Dewdrop Crystals',
    defaultRain: 'paws',
    accentColor: '#10B981'
  }
};

export const RAIN_TYPES: { id: SacredRainType; name: string; emoji: string }[] = [
  { id: 'lotus', name: 'Lotus Petals', emoji: '🪷' },
  { id: 'marigold', name: 'Marigolds', emoji: '🌼' },
  { id: 'stardust', name: 'Stardust', emoji: '✨' },
  { id: 'paws', name: 'Kitty Paws', emoji: '🐾' }
];

export function useCelestialTheme() {
  const [theme, setThemeState] = useState<AmbianceTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shree_ambiance_theme') as AmbianceTheme | null;
      if (saved && AMBIANCE_THEMES[saved]) return saved;
    }
    return 'dawn';
  });

  const [rainType, setRainTypeState] = useState<SacredRainType>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('shree_sacred_rain') as SacredRainType | null;
      if (saved && ['lotus', 'marigold', 'stardust', 'paws'].includes(saved)) return saved;
    }
    return 'lotus';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-rain', rainType);
    }
    localStorage.setItem('shree_ambiance_theme', theme);
    localStorage.setItem('shree_sacred_rain', rainType);

    // Dispatch global event so non-React canvas listeners sync immediately
    window.dispatchEvent(
      new CustomEvent('celestial-theme-change', {
        detail: { theme, rainType }
      })
    );
  }, [theme, rainType]);

  const setTheme = (newTheme: AmbianceTheme) => {
    setThemeState(newTheme);
    setRainTypeState(AMBIANCE_THEMES[newTheme].defaultRain);
  };

  const setRainType = (newRain: SacredRainType) => {
    setRainTypeState(newRain);
  };

  return {
    theme,
    setTheme,
    rainType,
    setRainType,
    config: AMBIANCE_THEMES[theme]
  };
}
