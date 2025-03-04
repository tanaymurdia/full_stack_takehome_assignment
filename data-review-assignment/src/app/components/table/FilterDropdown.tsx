"use client";

import React, { useState } from 'react';
import { colors } from '@/app/constants/theme';
import { Button } from '../ui/Button';
import { Icon } from '../ui/Icon';

// Define a type for valid icon types
type IconType = 'warning' | 'critical' | 'valid' | 'sort-asc' | 'sort-desc' | 'sort-none' | 'close' | 'arrow-right' | 'check' | 'filter';

type FilterOption = {
  value: string;
  label: string;
  iconType: IconType;
  color: string;
};

type FilterDropdownProps = {
  value: string;
  onChange: (value: string) => void;
};

export const FilterDropdown = ({ value, onChange }: FilterDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const options: FilterOption[] = [
    {
      value: 'all',
      label: 'All Records',
      iconType: 'filter',
      color: colors.surface.text,
    },
    {
      value: 'critical',
      label: 'Critical Errors',
      iconType: 'critical',
      color: colors.critical.text,
    },
    {
      value: 'warning',
      label: 'Warnings',
      iconType: 'warning',
      color: colors.warning.text,
    },
    {
      value: 'valid',
      label: 'Valid Records',
      iconType: 'valid',
      color: colors.valid.text,
    },
  ];

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative">
      <Button
        variant="action"
        onClick={() => setIsOpen(!isOpen)}
        className={isOpen ? 'ring-2 ring-emerald-500/30' : ''}
      >
        <div className="flex items-center gap-2 min-w-[90px]">
          <span className={selectedOption.color}>
            <Icon type={selectedOption.iconType} size="sm" />
          </span>
          <span className="text-gray-300">{selectedOption.label}</span>
        </div>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <Icon type="filter" size="sm" className="opacity-50" />
        </span>
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          <div className="
            absolute z-40 mt-2 w-48
            bg-gray-900/95 backdrop-blur-xl
            border border-white/10
            rounded-lg shadow-xl
            overflow-hidden
            animate-in fade-in slide-in-from-top-5
            duration-200
          ">
            {options.map((option, index) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`
                  w-full flex items-center gap-2 px-3 py-2 text-xs
                  transition-all duration-200
                  hover:bg-white/5
                  group
                  animate-in fade-in slide-in-from-left
                  ${option.value === value ? 'bg-white/5' : ''}
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span 
                  className={`
                    ${option.color}
                    transition-transform duration-200
                    group-hover:scale-110
                  `}
                >
                  <Icon type={option.iconType} size="sm" />
                </span>
                <span className="text-gray-300">{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}; 