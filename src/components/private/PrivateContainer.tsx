import React from 'react';
import { PrivateIntro } from './PrivateIntro';
import { DistanceTracker } from './DistanceTracker';
import { PlaylistSection } from './PlaylistSection';
import { MemoryLane } from './MemoryLane';
import { GiftUnwrap } from './GiftUnwrap';
import { ScratchCard } from './ScratchCard';
import { FriendWishWall } from './FriendWishWall';
import { SisterCertificate } from './SisterCertificate';
import { TheLetter } from './TheLetter';
import { ShootingStars } from '../shared/ShootingStars';
import { PrivateFinale } from './PrivateFinale';

interface PrivateContainerProps {
  onReplay: () => void;
}

export const PrivateContainer: React.FC<PrivateContainerProps> = ({ onReplay }) => {
  const scrollToChapterOne = () => {
    window.scrollTo({
      top: window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative min-h-screen bg-[#FFF5F5] text-[#2D2D2D]">
      <ShootingStars />
      <PrivateIntro onStartScroll={scrollToChapterOne} />
      <DistanceTracker />
      <PlaylistSection />
      <MemoryLane />
      <GiftUnwrap />
      <ScratchCard />
      <FriendWishWall />
      <SisterCertificate />
      <TheLetter />
      <PrivateFinale onReplay={onReplay} />
    </div>
  );
};
