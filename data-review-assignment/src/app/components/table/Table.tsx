"use client";

import React, { useState, useEffect } from 'react';
import { Record, SortConfig, SortDirection } from '@/app/types/data';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import RecordModal from '../modals/RecordModal';
import { commonStyles } from '@/app/constants/theme';
import { exportToCSV } from '@/app/utils/csvExport';

const SortIcon = ({ direction }: { direction: SortDirection }) => {
  if (direction === 'none') {
    return (
      <svg className="w-4 h-4 opacity-0 group-hover:opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    );
  }
  
  return direction === 'asc' ? (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
};

const Table = () => {
  const [data, setData] = useState<Record[]>([]);
  const [filteredData, setFilteredData] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<Record | null>(null);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    column: '',
    direction: 'none'
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [data, severityFilter, sortConfig]);

  const fetchData = async () => {
    try {
      console.log('Fetching data...');
      const response = await fetch('/api/data');
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Parsed result:', result);
      
      if (!result || !result.records) {
        throw new Error('Invalid data format');
      }
      
      setData(result.records);
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortData = () => {
    let result = [...data];

    // Apply filters
    if (severityFilter !== 'all') {
      result = result.filter(record => {
        const hasErrorWithSeverity = Object.values(record.errors).some(
          error => error.severity === severityFilter
        );
        
        if (severityFilter === 'valid') {
          return Object.keys(record.errors).length === 0;
        }
        
        return hasErrorWithSeverity;
      });
    }

    if (sortConfig.column && sortConfig.direction !== 'none') {
      result.sort((a, b) => {
        const getSeverityLevel = (record: Record, column: string) => {
          const error = record.errors[column];
          if (!error) return 0;
          return error.severity === 'critical' ? 2 : 1;
        };

        const aLevel = getSeverityLevel(a, sortConfig.column);
        const bLevel = getSeverityLevel(b, sortConfig.column);

        if (sortConfig.direction === 'asc') {
          return aLevel - bLevel;
        } else {
          return bLevel - aLevel;
        }
      });
    }

    setFilteredData(result);
  };

  const handleExportCSV = () => {
    exportToCSV(data);
  };

  const openRecordModal = (record: Record) => {
    setSelectedRecord(record);
    setModalIsOpen(true);
  };

  const handleSort = (column: string) => {
    setSortConfig(prevConfig => {
      if (prevConfig.column === column) {
        // Cycle through sort directions: none -> asc -> desc -> none
        const directions: SortDirection[] = ['none', 'asc', 'desc'];
        const currentIndex = directions.indexOf(prevConfig.direction);
        const nextIndex = (currentIndex + 1) % directions.length;
        return {
          column,
          direction: directions[nextIndex]
        };
      }
      // New column, start with ascending
      return {
        column,
        direction: 'asc'
      };
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-400/50"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-surface-mixed/20 backdrop-blur-xl rounded-3xl p-4 sm:p-6 lg:p-8 shadow-2xl transition-all duration-500 border border-white/10">
        <TableHeader 
          onExport={handleExportCSV}
          onFilterChange={setSeverityFilter}
          selectedFilter={severityFilter}
        />
        <div className="table-wrapper">
          <div className="table-container">
            <table className="data-table">
              <thead className="bg-black/50 sticky top-0 z-10">
                <tr>
                  {[
                    { id: 'name', label: 'Name', className: 'col-name' },
                    { id: 'email', label: 'Email', className: 'col-email' },
                    { id: 'street', label: 'Street', className: 'col-street' },
                    { id: 'city', label: 'City', className: 'col-city' },
                    { id: 'zipcode', label: 'Zipcode', className: 'col-zipcode' },
                    { id: 'phone', label: 'Phone', className: 'col-phone' },
                    { id: 'status', label: 'Status', className: 'col-status' }
                  ].map((header) => (
                    <th 
                      key={header.id}
                      onClick={() => handleSort(header.id)}
                      className={`${commonStyles.table.header} whitespace-nowrap ${header.className}`}
                    >
                      <div className="flex items-center gap-2">
                        {header.label}
                        <SortIcon 
                          direction={
                            sortConfig.column === header.id 
                              ? sortConfig.direction 
                              : 'none'
                          }
                        />
                      </div>
                    </th>
                  ))}
                  <th className={`${commonStyles.table.header} whitespace-nowrap col-actions`}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-400">
                      No records found matching the filter criteria
                    </td>
                  </tr>
                ) : (
                  filteredData.map((record, index) => (
                    <TableRow
                      key={record.id}
                      record={record}
                      index={index}
                      onOpenModal={openRecordModal}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <RecordModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        record={selectedRecord}
      />
    </>
  );
};

export default Table;