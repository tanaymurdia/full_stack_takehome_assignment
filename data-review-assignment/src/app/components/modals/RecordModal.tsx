"use client";

import React from 'react';
import { Record } from '@/app/types/data';
import { severityStyles } from '@/app/constants/theme';
import { CriticalIcon, WarningIcon, ValidIcon } from '../icons/SeverityIcons';
import Modal from 'react-modal';

type RecordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  record: Record | null;
};

const getIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return <CriticalIcon />;
    case 'warning':
      return <WarningIcon />;
    case 'valid':
      return <ValidIcon />;
    default:
      return null;
  }
};

const RecordModal = ({ isOpen, onClose, record }: RecordModalProps) => {
  if (!record) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="
        absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        w-full max-w-2xl
        bg-gray-900/95 backdrop-blur-md
        p-8 rounded-2xl
        border border-white/20
        shadow-2xl
        outline-none
        text-gray-100
        z-50
      "
      overlayClassName="
        fixed inset-0
        bg-black/80 backdrop-blur-sm
        z-40
        modal-overlay
      "
    >
      <div>
        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white">
              Error Summary
            </h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
              <span className="px-2 py-1 rounded-md bg-gray-800/50 border border-white/10">
                ID: {record.id}
              </span>
              <span className="text-gray-500">•</span>
              <span className="font-medium text-gray-300">{record.name}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Error List */}
        <div className="mt-6 space-y-4">
          {Object.entries(record.errors).map(([field, error]) => (
            <div
              key={field}
              className={`
                p-4 rounded-xl
                ${severityStyles[error.severity]}
                border border-white/20
                backdrop-blur-sm
              `}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {getIcon(error.severity)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h4 className="font-medium capitalize text-sm">
                      {field}
                    </h4>
                    <div className="h-4 w-px bg-white/20" />
                    <div className="text-xs opacity-85 truncate">
                      Current: <span className="font-mono bg-black/20 px-1.5 py-0.5 rounded">
                        {String(record[field as keyof typeof record])}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm mt-1.5 leading-relaxed opacity-90">
                    {error.message}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default RecordModal; 