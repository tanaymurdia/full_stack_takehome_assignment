"use client";

import React, { useState } from 'react';
import { colors } from '@/app/constants/theme';
import { commonStyles } from '@/app/constants/theme';

type FilterOption = {
  value: string;
  label: string;
  icon: React.ReactNode;
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
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      ),
      color: colors.surface.text,
    },
    {
      value: 'critical',
      label: 'Critical Errors',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: colors.critical.text,
    },
    {
      value: 'warning',
      label: 'Warnings',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      color: colors.warning.text,
    },
    {
      value: 'valid',
      label: 'Valid Records',
      icon: (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      color: colors.valid.text,
    },
  ];

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          ${commonStyles.actionButton}
          flex items-center justify-between
          ${isOpen ? 'ring-2 ring-emerald-500/30' : ''}
        `}
      >
        <div className="flex items-center gap-2 min-w-[90px]">
          <span className={selectedOption.color}>{selectedOption.icon}</span>
          <span className="text-gray-300">{selectedOption.label}</span>
        </div>
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

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
                  {option.icon}
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