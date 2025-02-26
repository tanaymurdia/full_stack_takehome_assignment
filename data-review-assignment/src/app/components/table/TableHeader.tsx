"use client";

import React from 'react';
import { commonStyles } from '@/app/constants/theme';
import { FilterDropdown } from './FilterDropdown';
import { ExportButton } from './ExportButton';

type TableHeaderProps = {
  onExport: () => void;
  onFilterChange: (severity: string) => void;
  selectedFilter: string;
};

export const TableHeader = ({ onExport, onFilterChange, selectedFilter }: TableHeaderProps) => (
  <div className="flex justify-between items-center mb-8">
    <div>
      <h2 className="text-3xl font-semibold text-white mb-2 animate-fade-in">
        DataSense
      </h2>
      {/* <p className="text-gray-400 text-sm">Data Validation & Export Interface</p> */}
    </div>
    <div className="flex items-center gap-4">
      <FilterDropdown 
        value={selectedFilter}
        onChange={onFilterChange}
      />
      <ExportButton onClick={onExport} />
    </div>
  </div>
); 