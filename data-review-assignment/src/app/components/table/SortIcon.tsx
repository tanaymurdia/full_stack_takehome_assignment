import React from 'react';
import { SortDirection } from '@/app/types';
import { Icon } from '@/app/components/ui';

type SortIconProps = {
  direction: SortDirection;
};

export const SortIcon: React.FC<SortIconProps> = ({ direction }) => {
  if (direction === 'none') {
    return null;
  }
  
  return (
    <Icon 
      type={direction === 'asc' ? 'sort-asc' : 'sort-desc'} 
      size="sm" 
      className="ml-1" 
    />
  );
}; 