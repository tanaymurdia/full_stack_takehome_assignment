"use client";

import React, { useState } from 'react';
import { commonStyles } from '@/app/constants/theme';

type ExportButtonProps = {
  onClick: () => void;
};

export const ExportButton = ({ onClick }: ExportButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    
    // Reset the animation after it completes
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        ${commonStyles.actionButton}
        flex items-center justify-center
        group
        disabled:opacity-50
        ${isClicked ? 'scale-95' : 'hover:scale-105'}
      `}
      disabled={isClicked}
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm" />
      <div className={`
        absolute inset-0 
        bg-gradient-to-r from-emerald-600/50 to-emerald-400/50
        transition-transform duration-500
        ${isHovered ? 'scale-x-100' : 'scale-x-0'}
        origin-left
      `} />
      <div className={`
        absolute inset-0
        bg-gradient-to-t from-black/20 to-transparent
      `} />

      {/* Border */}
      <div className={`
        absolute inset-0 
        rounded-lg
        border border-white/10
        transition-all duration-300
        ${isHovered ? 'border-emerald-500/30' : ''}
      `} />

      {/* Glow effect */}
      <div className={`
        absolute inset-0 
        rounded-lg
        transition-opacity duration-300
        ${isHovered ? 'opacity-100' : 'opacity-0'}
        bg-emerald-500/20
        blur-md
      `} />

      {/* Success animation */}
      <div className={`
        absolute inset-0
        bg-emerald-500
        transition-transform duration-300
        ${isClicked ? 'scale-x-100' : 'scale-x-0'}
        origin-left
      `} />

      {/* Content */}
      <div className="relative flex items-center justify-center gap-2 z-10 min-w-[90px]">
        <span className={`
          transition-all duration-300
          ${isClicked ? 'text-white' : 'text-gray-300'}
        `}>
          Export CSV
        </span>
        
        {/* Arrow icon with animations */}
        <svg 
          className={`
            w-4 h-4
            transition-all duration-300
            ${isClicked ? 'translate-x-1 text-white' : 'text-gray-300'}
            ${isHovered ? 'translate-x-0.5' : ''}
          `}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M14 5l7 7m0 0l-7 7m7-7H3" 
          />
        </svg>

        {/* Success checkmark */}
        <svg
          className={`
            absolute right-2
            w-4 h-4
            text-white
            transition-all duration-300
            ${isClicked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}
          `}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Particle effects on click */}
      {isClicked && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute left-1/2 top-1/2
                w-1 h-1
                bg-emerald-400
                rounded-full
                animate-particle
              `}
              style={{
                '--angle': `${i * 45}deg`,
                '--delay': `${i * 50}ms`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      )}
    </button>
  );
}; 