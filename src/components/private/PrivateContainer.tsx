import React, { useEffect } from 'react';
import { smoothScrollTo } from '../../hooks/useLenis';
import { PrivateIntro } from './PrivateIntro';
import { DistanceTracker } from './DistanceTracker';
import { SiblingCodex } from './SiblingCodex';
import { MemoryLane } from './MemoryLane';
import { ChildhoodPolaroid } from './ChildhoodPolaroid';
import { TimeCapsule } from './TimeCapsule';
import { WhiskerLounge } from './WhiskerLounge';
import { GiftUnwrap } from './GiftUnwrap';
import { ScratchCard } from './ScratchCard';
import { InnerCircleBlessings } from './InnerCircleBlessings';
import { FriendWishWall } from './FriendWishWall';
import { SisterCertificate } from './SisterCertificate';
import { TheLetter } from './TheLetter';
import { ShreeVoiceReply } from './ShreeVoiceReply';
import { ShootingStars } from '../shared/ShootingStars';
import { PrivateFinale } from './PrivateFinale';
import { PrivateSecurityShield } from './PrivateSecurityShield';

interface PrivateContainerProps {
  onReplay: () => void;
}

export const PrivateContainer: React.FC<PrivateContainerProps> = ({ onReplay }) => {
  useEffect(() => {
    // Instantly reset scroll to top on entering the private sanctuary
    const resetScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      if ((window as any).lenis) {
        try {
          (window as any).lenis.scrollTo(0, { immediate: true, force: true });
          (window as any).lenis.resize();
        } catch (_) {}
      }
    };

    resetScroll();
    const frameId = requestAnimationFrame(resetScroll);
    const t1 = setTimeout(resetScroll, 50);
    const t2 = setTimeout(resetScroll, 200);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const scrollToChapterOne = () => {
    smoothScrollTo(window.innerHeight * 0.9, 1.3);
  };

  return (
    <PrivateSecurityShield>
      <div className="relative min-h-screen bg-[#FFF5F5] text-[#2D2D2D]">
        <ShootingStars />
        <PrivateIntro onStartScroll={scrollToChapterOne} />
        <DistanceTracker />
        <SiblingCodex />
        <ChildhoodPolaroid />
        <MemoryLane />
        <TimeCapsule />
        <WhiskerLounge />
        <GiftUnwrap />
        <ScratchCard />
        <InnerCircleBlessings />
        <FriendWishWall />
        <SisterCertificate />
        <TheLetter />
        <div className="relative w-full max-w-4xl mx-auto px-4">
          <ShreeVoiceReply />
        </div>
        <PrivateFinale onReplay={onReplay} />
      </div>
    </PrivateSecurityShield>
  );
};
