import React from 'react';

interface WashiTapeProps {
  color?: 'pink' | 'gold' | 'mint' | 'lavender' | 'peach';
  className?: string;
  rotation?: number;
  width?: string;
}

export const WashiTape: React.FC<WashiTapeProps> = ({
  color = 'pink',
  className = '',
  rotation = -2,
  width = 'w-16'
}) => {
  const colorMap = {
    pink: 'bg-rose-200/80 border-rose-300/60 shadow-[0_2px_4px_rgba(244,63,94,0.15)]',
    gold: 'bg-amber-100/85 border-amber-300/60 shadow-[0_2px_4px_rgba(217,119,6,0.15)]',
    mint: 'bg-emerald-100/80 border-emerald-300/60 shadow-[0_2px_4px_rgba(16,185,129,0.15)]',
    lavender: 'bg-purple-100/80 border-purple-300/60 shadow-[0_2px_4px_rgba(168,85,247,0.15)]',
    peach: 'bg-orange-100/80 border-orange-300/60 shadow-[0_2px_4px_rgba(249,115,22,0.15)]'
  };

  return (
    <div
      style={{ transform: `rotate(${rotation}deg)` }}
      className={`${width} h-4 sm:h-4.5 backdrop-blur-[2px] border-x-2 border-dashed border-opacity-40 ${colorMap[color]} ${className} select-none pointer-events-none z-10`}
    />
  );
};
