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
  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

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
    <div
      className={`min-h-screen transition-all duration-500 ${
        viewportMode === 'desktop'
          ? 'bg-[#FFF0F3]'
          : 'bg-[#0B091A] p-2 sm:p-6 flex flex-col items-center justify-center'
      }`}
    >
      {/* Device Bezel Simulator Container */}
      <div
        className={`w-full transition-all duration-500 text-gray-800 relative selection:bg-pink-300 selection:text-pink-900 ${
          viewportMode === 'mobile'
            ? 'max-w-[390px] min-h-[844px] my-6 rounded-[3rem] border-[12px] border-[#1F2937] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-x-hidden bg-[#FFF0F3]'
            : viewportMode === 'tablet'
            ? 'max-w-[768px] min-h-[1024px] my-6 rounded-[2.5rem] border-[12px] border-[#1F2937] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-x-hidden bg-[#FFF0F3]'
            : 'min-h-screen bg-[#FFF0F3]'
        }`}
      >
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
          <main className="relative overflow-hidden">
            <PublicHero onWishClick={handleWishWallScroll} />
            <CandleBlowout />
            <Photobooth />
            <PublicMoments />
            <KindnessTribute />
            <FloatingDiyaPond />
            <StoryCardGenerator />
            <PetTheCat />
            <BirthdayMiniGame />
            <FanWishWall />
            <PublicFinale />

            {/* Secret Easter Egg Bubbles scattered across scroll depths */}
            <SecretFloatingEasterEggs onTapTarget={handleTapTarget} />
          </main>
        )}

        {/* ========================================================================= */}
        {/* REALM 3: PRIVATE SIBLING SANCTUARY */}
        {/* ========================================================================= */}
        {appMode === 'private' && (
          <PrivateContainer onReplay={handleReplay} />
        )}

        {/* Global Canvas Layers */}
        <CursorSparkles />
        <AmbientLotusParticles />
        <ConfettiEffect />

        {/* Cinematic Golden Lotus Portal Transition Overlay */}
        <TapSequenceOverlay isUnlocked={isTapUnlocked} />
      </div>

      {/* ========================================================================= */}
      {/* DEV-ONLY FLOATING PREVIEW & VIEWPORT TOOLBAR */}
      {/* ========================================================================= */}
      {showPreviewToolbar && (
        <div className="fixed top-3 right-3 sm:top-5 sm:right-5 z-50 select-none">
          {devToolbarOpen ? (
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-2 sm:p-3 shadow-2xl border-2 border-pink-300 text-xs font-quicksand flex flex-wrap items-center gap-2">
              <span className="font-fredoka font-bold text-[#FF4D8D] hidden sm:inline">
                🛠️ Preview:
              </span>

              {/* Mode Switcher */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setAppMode('countdown');
                    setCurrentMode('countdown');
                  }}
                  className={`px-2.5 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all ${
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
                  className={`px-2.5 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all ${
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
                  className={`px-2.5 py-1.5 rounded-xl font-fredoka font-bold text-xs transition-all ${
                    appMode === 'private'
                      ? 'bg-[#D4A84B] text-[#3D2040] shadow-sm'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  🔒 Private
                </button>
              </div>

              <div className="h-4 w-px bg-pink-200 mx-1 hidden sm:block" />

              {/* Viewport Device Switcher */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
                <button
                  onClick={() => setViewportMode('desktop')}
                  className={`px-2 py-1 rounded-lg text-xs font-fredoka font-bold transition-all ${
                    viewportMode === 'desktop'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Desktop (100% Full Width)"
                >
                  🖥️ Full
                </button>
                <button
                  onClick={() => setViewportMode('tablet')}
                  className={`px-2 py-1 rounded-lg text-xs font-fredoka font-bold transition-all ${
                    viewportMode === 'tablet'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Tablet (768px iPad)"
                >
                  📱 Tablet
                </button>
                <button
                  onClick={() => setViewportMode('mobile')}
                  className={`px-2 py-1 rounded-lg text-xs font-fredoka font-bold transition-all ${
                    viewportMode === 'mobile'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                  title="Mobile (390px iPhone)"
                >
                  📱 Mobile
                </button>
              </div>

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
