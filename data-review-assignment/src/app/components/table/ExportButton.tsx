"use client";

import React, { useState } from 'react';
import { Button } from '../ui/Button';

type ExportButtonProps = {
  onClick: () => void;
};

export const ExportButton = ({ onClick }: ExportButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick();
    
    // Reset the animation after it completes
    setTimeout(() => setIsClicked(false), 1000);
  };

  return (
    <Button
      variant="action"
      icon="arrow-right"
      onClick={handleClick}
      disabled={isClicked}
      animateOnClick={true}
      className={`text-white ${isClicked ? 'bg-emerald-500' : ''}`}
    >
      Export CSV
      
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
    </Button>
  );
}; 