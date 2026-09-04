import React from 'react';
import { Home, Compass, Flame, MoreHorizontal } from 'lucide-react';

export type MobileTab = 'home' | 'explore' | 'diyas' | 'more';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onChangeTab: (tab: MobileTab) => void;
  dark?: boolean;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onChangeTab,
  dark = false
}) => {
  const tabs = [
    { id: 'home' as MobileTab, label: 'Home', icon: Home },
    { id: 'explore' as MobileTab, label: 'Explore', icon: Compass },
    { id: 'diyas' as MobileTab, label: 'Diyas', icon: Flame },
    { id: 'more' as MobileTab, label: 'More', icon: MoreHorizontal }
  ];

  return (
    <nav
      className={`w-full h-16 px-6 shrink-0 flex items-center justify-between z-30 select-none border-t backdrop-blur-xl transition-all ${
        dark
          ? 'bg-black/60 border-white/10 text-gray-400'
          : 'bg-white/80 border-pink-100 text-gray-500'
      }`}
    >
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onChangeTab(tab.id)}
            className={`flex flex-col items-center justify-center gap-1 transition-all ${
              isActive
                ? dark
                  ? 'text-[#FFD93D] font-bold scale-105'
                  : 'text-[#FF4D8D] font-bold scale-105'
                : 'hover:opacity-80 active:scale-95'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.8]'}`} />
            <span className="text-[10px] tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
