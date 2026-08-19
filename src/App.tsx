import React, { useState } from 'react';
import { isBirthdayActive, AppMode } from './utils/dateCheck';
import { useLenis } from './hooks/useLenis';
import { useTapSequence } from './hooks/useTapSequence';
import { useAudio } from './hooks/useAudio';

// Countdown Realm
import { CountdownPage } from './components/countdown/CountdownPage';

// Public Celebration Realm
import { PublicHero } from './components/public/PublicHero';
import { CandleBlowout } from './components/public/CandleBlowout';
import { Photobooth } from './components/public/Photobooth';
import { PublicMoments } from './components/public/PublicMoments';
import { FanWishWall } from './components/public/FanWishWall';
import { FloatingDiyaPond } from './components/public/FloatingDiyaPond';
import { StoryCardGenerator } from './components/public/StoryCardGenerator';
import { KindnessTribute } from './components/public/KindnessTribute';
import { PetTheCat } from './components/public/PetTheCat';
import { BirthdayMiniGame } from './components/shared/BirthdayMiniGame';
import { PublicFinale } from './components/public/PublicFinale';
import { SecretFloatingEasterEggs } from './components/public/SecretFloatingEasterEggs';
import { TapSequenceOverlay } from './components/public/TapSequenceOverlay';

// Private Sanctuary Realm
import { PrivateContainer } from './components/private/PrivateContainer';

// Shared Effects & Navigation
import { FloatingNav } from './components/shared/FloatingNav';
import { LotusPetals } from './components/shared/LotusPetals';
import { AudioController } from './components/shared/AudioController';
import { ConfettiEffect, triggerCustomConfetti } from './components/shared/Confetti';
import { CursorSparkles } from './components/shared/CursorSparkles';
import { AmbientLotusParticles } from './components/shared/AmbientLotusParticles';

export function App() {
  const [appMode, setAppMode] = useState<AppMode>(() => {
    return isBirthdayActive() ? 'public' : 'countdown';
  });

  // Preview Switcher is strictly enabled only during local npm run dev
  const showPreviewToolbar = import.meta.env.DEV;
  const [devToolbarOpen, setDevToolbarOpen] = useState<boolean>(true);

  // Initialize Lenis smooth scroll with ice-glide physics
  useLenis(true);

  // Audio Engine Hook
  const { isPlaying, currentMode, setCurrentMode, toggle: toggleAudio, playEffect } = useAudio(
    appMode === 'countdown' ? 'countdown' : appMode === 'private' ? 'devotional' : 'party'
  );

  // Secret Tap Unlock Engine (Cat -> Star -> Heart)
  const {
    currentStep,
    isUnlocked: isTapUnlocked,
    handleTap,
  } = useTapSequence({
    onUnlock: () => {
      playEffect('sparkle', 1.5);
      triggerCustomConfetti();
      setTimeout(() => {
        setAppMode('private');
        setCurrentMode('devotional');
      }, 2400);
    }
  });

  const handleTapTarget = (target: any, event: React.MouseEvent) => {
    playEffect('sparkle', currentStep === 0 ? 1 : currentStep === 1 ? 1.25 : 1.5);
    handleTap(target, event);
  };

  const handleWishWallScroll = () => {
    const wall = document.getElementById('wish-wall');
    if (wall) {
      wall.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-[#FF4D8D] selection:text-white">
      {/* Floating Pill Navigation */}
      <FloatingNav appMode={appMode} />

      {/* Floating Lotus & Devotional Ambient Petals */}
      <LotusPetals devotional={appMode === 'private'} />

      {/* Floating Audio Controller */}
      <AudioController
        isPlaying={isPlaying}
        onToggle={toggleAudio}
        mode={appMode === 'countdown' ? 'countdown' : appMode === 'private' ? 'devotional' : 'party'}
      />

      {/* ========================================================================= */}
      {/* REALM 1: COUNTDOWN STREAM */}
      {/* ========================================================================= */}
      {appMode === 'countdown' && (
        <CountdownPage
          onUnlockBirthday={() => {
            setAppMode('public');
            setCurrentMode('party');
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* REALM 2: PUBLIC BIRTHDAY CELEBRATION */}
      {/* ========================================================================= */}
      {appMode === 'public' && (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FFF5F5] via-[#FFF0F3] to-[#FFE5EC]">
          <ConfettiEffect trigger={true} type="fireworks" />
          <PublicHero onWishClick={handleWishWallScroll} />
          <CandleBlowout />
          <FanWishWall />
          <FloatingDiyaPond />
          <StoryCardGenerator />
          <Photobooth />
          <PublicMoments />
          <KindnessTribute />
          <PetTheCat />
          <BirthdayMiniGame />
          <SecretFloatingEasterEggs onTapTarget={handleTapTarget} />
          <PublicFinale />
          <TapSequenceOverlay isUnlocked={isTapUnlocked} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* REALM 3: PRIVATE INTIMATE SANCTUARY */}
      {/* ========================================================================= */}
      {appMode === 'private' && (
        <div className="relative min-h-screen bg-gradient-to-b from-[#FFF0F3] via-[#FFF5F5] to-[#FFE0E8]">
          <ConfettiEffect trigger={true} type="burst" />
          <PrivateContainer onReplay={handleReplay} />
        </div>
      )}

      {/* ========================================================================= */}
      {/* REALM PREVIEW QUICK-SWITCHER TOOLBAR (Visible in dev or with ?preview=1) */}
      {/* ========================================================================= */}
      {showPreviewToolbar && (
        <div className="fixed top-4 right-4 z-50 select-none">
          {devToolbarOpen ? (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-2xl border-2 border-pink-300 text-xs font-quicksand flex items-center gap-2">
              <span className="font-fredoka font-bold text-[#FF4D8D] hidden sm:inline">
                🛠️ Preview:
              </span>

              <button
                onClick={() => {
                  setAppMode('countdown');
                  setCurrentMode('countdown');
                }}
                className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all ${
                  appMode === 'countdown'
                    ? 'bg-[#0A0A1A] text-[#FF2D78] border border-[#FF2D78] shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                ⏳ Countdown
              </button>

              <button
                onClick={() => {
                  setAppMode('public');
                  setCurrentMode('party');
                }}
                className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all ${
                  appMode === 'public'
                    ? 'bg-[#FF4D8D] text-white shadow-pop'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                🎉 Public
              </button>

              <button
                onClick={() => {
                  setAppMode('private');
                  setCurrentMode('devotional');
                }}
                className={`px-3 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all ${
                  appMode === 'private'
                    ? 'bg-[#D4A84B] text-[#3D2040] shadow-sm'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                🔒 Private (🐱⭐💗)
              </button>

              <button
                onClick={() => setDevToolbarOpen(false)}
                className="text-gray-400 hover:text-gray-700 ml-1 font-bold p-1 hover:scale-110 transition-all"
                title="Minimize Switcher"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDevToolbarOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border-2 border-pink-300 text-[#FF4D8D] text-xs font-fredoka font-bold hover:scale-105 active:scale-95 transition-all"
            >
              <span>🛠️ Switch Preview</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
