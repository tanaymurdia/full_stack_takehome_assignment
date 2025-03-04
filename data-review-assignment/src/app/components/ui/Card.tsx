import React, { ReactNode } from 'react';
import { commonStyles } from '@/app/constants/theme';

type CardVariant = 'default' | 'error' | 'warning' | 'success';
type CardSize = 'sm' | 'md' | 'lg';

type CardProps = {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  size?: CardSize;
  withAnimation?: boolean;
};

/**
 * Reusable card component with consistent styling
 */
export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  size = 'md',
  withAnimation = false,
}) => {
  let padding = '';
  
  switch (size) {
    case 'sm':
      padding = 'p-4';
      break;
    case 'md':
      padding = 'p-6';
      break;
    case 'lg':
      padding = 'p-8';
      break;
  }
  
  let variantClasses = '';
  switch (variant) {
    case 'error':
      variantClasses = 'border-red-500/30 bg-red-900/20 text-red-400';
      break;
    case 'warning':
      variantClasses = 'border-amber-500/30 bg-amber-900/20 text-amber-400';
      break;
    case 'success':
      variantClasses = 'border-emerald-500/30 bg-emerald-900/20 text-emerald-400';
      break;
    default:
      variantClasses = '';
  }
  
  return (
    <div className={`
      ${commonStyles.card}
      ${padding}
      ${variantClasses}
      ${withAnimation ? 'animate-fade-in' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
}; 