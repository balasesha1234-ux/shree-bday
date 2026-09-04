import React from 'react';
import { Wifi, Battery } from 'lucide-react';

interface MobileTopBarProps {
  light?: boolean;
  dynamicIsland?: boolean;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({ light = false, dynamicIsland = true }) => {
  return (
    <header
      className={`w-full h-11 px-6 flex items-center justify-between z-30 shrink-0 select-none text-xs font-semibold tracking-tight transition-colors duration-300 ${
        light ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]' : 'text-gray-800'
      }`}
    >
      {/* Time */}
      <span className="font-space font-bold tracking-normal text-[13px]">9:41</span>

      {/* Dynamic Island pill */}
      {dynamicIsland && (
        <div className="w-24 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-md">
          <div className="w-2.5 h-2.5 rounded-full bg-[#1A1A1A] border border-gray-700" />
          <div className="w-2 h-2 rounded-full bg-[#0d2a45]/60" />
        </div>
      )}

      {/* Signal, Wifi, Battery */}
      <div className="flex items-center gap-1.5 text-[11px]">
        {/* Cellular Bars */}
        <div className="flex items-end gap-[1.5px] h-2.5">
          <span className="w-[2.5px] h-1 rounded-sm bg-current" />
          <span className="w-[2.5px] h-1.5 rounded-sm bg-current" />
          <span className="w-[2.5px] h-2 rounded-sm bg-current" />
          <span className="w-[2.5px] h-2.5 rounded-sm bg-current" />
        </div>
        <Wifi className="w-3.5 h-3.5" />
        <Battery className="w-4 h-4" />
      </div>
    </header>
  );
};
