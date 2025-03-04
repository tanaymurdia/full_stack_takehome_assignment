import React, { ReactNode } from 'react';
import { commonStyles } from '@/app/constants/theme';
import { Icon } from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'action';
type IconPosition = 'left' | 'right';
type ButtonSize = 'sm' | 'md' | 'lg';
type IconType = 'warning' | 'critical' | 'valid' | 'sort-asc' | 'sort-desc' | 'sort-none' | 'close' | 'arrow-right' | 'check' | 'filter';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: ButtonVariant;
  icon?: IconType;
  iconPosition?: IconPosition;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  isLoading?: boolean;
  animateOnClick?: boolean;
};

/**
 * Reusable button component with consistent styling across the application
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  icon,
  iconPosition = 'right',
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  isLoading = false,
  animateOnClick = false,
}) => {
  let buttonStyle = '';
  
  switch (variant) {
    case 'primary':
      buttonStyle = commonStyles.button.primary;
      break;
    case 'secondary':
      buttonStyle = commonStyles.button.secondary;
      break;
    case 'action':
      buttonStyle = commonStyles.actionButton;
      break;
    default:
      buttonStyle = commonStyles.button.primary;
  }
  
  // Apply size classes
  let sizeClass = '';
  switch (size) {
    case 'sm':
      sizeClass = 'text-xs py-1 px-3';
      break;
    case 'md':
      sizeClass = 'text-sm py-2 px-4';
      break;
    case 'lg':
      sizeClass = 'text-base py-2.5 px-5';
      break;
  }
  
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        ${buttonStyle}
        ${sizeClass}
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${animateOnClick ? 'active:scale-95 transition-transform' : ''}
        ${className}
        flex items-center justify-center gap-2
      `}
    >
      {isLoading ? (
        <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
      ) : (
        <>
          {icon && iconPosition === 'left' && <Icon type={icon} size="sm" />}
          {children}
          {icon && iconPosition === 'right' && <Icon type={icon} size="sm" />}
        </>
      )}
    </button>
  );
}; 