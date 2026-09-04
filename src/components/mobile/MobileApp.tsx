import React, { useState } from 'react';
import { MobileSplash } from './screens/MobileSplash';
import { MobileCountdown } from './screens/MobileCountdown';
import { MobileUnlock } from './screens/MobileUnlock';
import { MobileHome } from './screens/MobileHome';
import { MobileDrawerMenu } from './screens/MobileDrawerMenu';
import { MobileMusicPlayer } from './screens/MobileMusicPlayer';
import { MobileMemories } from './screens/MobileMemories';
import { MobileFaith } from './screens/MobileFaith';
import { MobileWishes } from './screens/MobileWishes';
import { MobileLetterLock } from './screens/MobileLetterLock';
import { MobilePrivateHome } from './screens/MobilePrivateHome';
import { MobileLetterOpen } from './screens/MobileLetterOpen';
import { MobileBrotherLetterbox } from './screens/MobileBrotherLetterbox';
import { MobileElevenEleven } from './screens/MobileElevenEleven';
import { MobileTabletOverview } from './screens/MobileTabletOverview';
import { MobileTab } from './shared/MobileBottomNav';

export type ScreenId =
  | 'splash'
  | 'countdown'
  | 'unlock'
  | 'home'
  | 'music'
  | 'memories'
  | 'faith'
  | 'wishes'
  | 'letter-lock'
  | 'private-home'
  | 'letter-open'
  | 'brother-letterbox'
  | 'eleven-eleven'
  | 'overview';

interface MobileAppProps {
  initialScreen?: ScreenId;
  currentScreenOverride?: ScreenId;
  onScreenChange?: (screen: ScreenId) => void;
}

export const MobileApp: React.FC<MobileAppProps> = ({
  initialScreen = 'splash',
  currentScreenOverride,
  onScreenChange
}) => {
  const [internalScreen, setInternalScreen] = useState<ScreenId>(initialScreen);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<MobileTab>('home');

  const currentScreen = currentScreenOverride || internalScreen;

  const navigateTo = (screen: ScreenId | string) => {
    const target = screen as ScreenId;
    setInternalScreen(target);
    if (onScreenChange) onScreenChange(target);
  };

  const handleTabChange = (tab: MobileTab) => {
    setActiveTab(tab);
    if (tab === 'home') navigateTo('home');
    if (tab === 'explore') navigateTo('memories');
    if (tab === 'diyas') navigateTo('faith');
    if (tab === 'more') setIsMenuOpen(true);
  };

  return (
    <div className="relative w-full h-full min-h-[720px] overflow-hidden flex flex-col font-quicksand">
      {currentScreen === 'splash' && (
        <MobileSplash onNext={() => navigateTo('countdown')} />
      )}

      {currentScreen === 'countdown' && (
        <MobileCountdown
          onPrev={() => navigateTo('splash')}
          onNext={() => navigateTo('unlock')}
        />
      )}

      {currentScreen === 'unlock' && (
        <MobileUnlock onUnlock={() => navigateTo('home')} />
      )}

      {currentScreen === 'home' && (
        <MobileHome
          onNavigateScreen={navigateTo}
          onOpenMenu={() => setIsMenuOpen(true)}
          activeTab={activeTab}
          onChangeTab={handleTabChange}
        />
      )}

      {currentScreen === 'music' && (
        <MobileMusicPlayer onBack={() => navigateTo('home')} />
      )}

      {currentScreen === 'memories' && (
        <MobileMemories onBack={() => navigateTo('home')} />
      )}

      {currentScreen === 'faith' && (
        <MobileFaith onBack={() => navigateTo('home')} />
      )}

      {currentScreen === 'wishes' && (
        <MobileWishes onBack={() => navigateTo('home')} />
      )}

      {currentScreen === 'letter-lock' && (
        <MobileLetterLock
          onBack={() => navigateTo('home')}
          onEnterPrivate={() => navigateTo('private-home')}
        />
      )}

      {currentScreen === 'private-home' && (
        <MobilePrivateHome
          onBack={() => navigateTo('home')}
          onSelectSubscreen={(sub) => {
            if (sub === 'letter-open') navigateTo('letter-open');
            else if (sub === 'brother-letterbox') navigateTo('brother-letterbox');
            else if (sub === 'eleven-eleven') navigateTo('eleven-eleven');
            else if (sub === 'memories-we-share') navigateTo('memories');
            else navigateTo('letter-open');
          }}
        />
      )}

      {currentScreen === 'letter-open' && (
        <MobileLetterOpen onBack={() => navigateTo('private-home')} />
      )}

      {currentScreen === 'brother-letterbox' && (
        <MobileBrotherLetterbox onBack={() => navigateTo('private-home')} />
      )}

      {currentScreen === 'eleven-eleven' && (
        <MobileElevenEleven onBack={() => navigateTo('private-home')} />
      )}

      {currentScreen === 'overview' && (
        <MobileTabletOverview
          onBack={() => navigateTo('home')}
          onSelectScreen={navigateTo}
        />
      )}

      {/* Slide-out Menu Overlay (Screen 05) */}
      <MobileDrawerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onSelectScreen={(screenId) => navigateTo(screenId as ScreenId)}
      />
    </div>
  );
};
