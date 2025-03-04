"use client";

import React from 'react';
import { Record, Error } from '@/app/types';
import { severityStyles, fieldValidityStyle } from '@/app/constants/theme';
import { commonStyles } from '@/app/constants/theme';
import * as Tooltip from '@radix-ui/react-tooltip';
import { Icon } from '../ui/Icon';
import { Button } from '../ui/Button';

// Helper function to convert severity to Icon type
const severityToIconType = (severity: string): 'critical' | 'warning' | 'valid' => {
  return severity === 'critical' ? 'critical' :
         severity === 'warning' ? 'warning' : 'valid';
};

type TableRowProps = {
  record: Record;
  index: number;
  onOpenModal: (record: Record) => void;
};

export const TableRow = ({ record, index, onOpenModal }: TableRowProps) => {
  const getErrorCount = (record: Record) => {
    return Object.values(record.errors).reduce(
      (acc, curr) => ({
        critical: acc.critical + (curr.severity === 'critical' ? 1 : 0),
        warning: acc.warning + (curr.severity === 'warning' ? 1 : 0),
      }),
      { critical: 0, warning: 0 }
    );
  };

  const errorCount = getErrorCount(record);

  const getCellStyle = (key: string) => {
    const baseStyle = record.errors[key] 
      ? `${severityStyles[record.errors[key].severity]} cursor-help border`
      : `${fieldValidityStyle} border`;
  
    return baseStyle;
  };

  const cells = Object.entries({
    name: record.name,
    email: record.email,
    street: record.street,
    city: record.city,
    zipcode: record.zipcode,
    phone: record.phone,
    status: record.status
  });

  return (
    <Tooltip.Provider delayDuration={0}>
      <tr 
        className="hover:bg-white/5 transition-colors duration-200 ease-in-out animate-fade-in group"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        {cells.map(([key, value]) => (
          <td 
            key={key}
            className={`${commonStyles.table.cell} ${
              getCellStyle(key)
            }`}
          >
            {record.errors[key] ? (
              <Tooltip.Root>
                <Tooltip.Trigger className="flex items-center gap-2 w-full">
                  <Icon 
                    type={severityToIconType(record.errors[key].severity)} 
                    size="sm" 
                  />
                  {key === 'status' ? (
                    <span className={`${commonStyles.table.statusBadge}
                      ${value === 'Active' 
                        ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' 
                        : 'bg-gray-800/30 text-gray-400 border border-gray-600/30'}`
                    }>
                      {value}
                    </span>
                  ) : value}
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="
                      bg-gray-900 
                      text-white 
                      px-4 py-3
                      rounded-lg 
                      text-xs
                      font-medium
                      shadow-xl 
                      z-50
                      border border-white/10
                      backdrop-blur-sm
                      max-w-[400px]
                      leading-relaxed
                    "
                    sideOffset={8}
                  >
                    {record.errors[key].message}
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            ) : (
              <div className="flex items-center gap-2">
                {record.errors[key] && (
                  <Icon 
                    type={severityToIconType((record.errors[key] as Error).severity)} 
                    size="sm" 
                  />
                )}
                {key === 'status' ? (
                  <span className={`${commonStyles.table.statusBadge}
                    ${value === 'Active' 
                      ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' 
                      : 'bg-gray-800/30 text-gray-400 border border-gray-600/30'}`
                  }>
                    {value}
                  </span>
                ) : value}
              </div>
            )}
          </td>
        ))}
        <td className={`${commonStyles.table.cell} pr-16`}>
          <Button
            variant="secondary"
            onClick={() => onOpenModal(record)}
            size="sm"
          >
            View Errors
            {errorCount.critical > 0 && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-xs">
                {errorCount.critical}
              </span>
            )}
            {errorCount.warning > 0 && (
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 rounded-full text-xs">
                {errorCount.warning}
              </span>
            )}
          </Button>
        </td>
      </tr>
    </Tooltip.Provider>
  );
}; 