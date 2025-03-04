"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Record, SortConfig, SortDirection } from '@/app/types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import RecordModal from '../modals/RecordModal';
import { commonStyles } from '@/app/constants/theme';
import { exportToCSV } from '@/app/utils/csvExport';
import { Card } from '@/app/components/ui';
import { SortIcon } from './SortIcon';
import { filterRecordsByStatus, sortRecords } from './tableUtils';

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

  const filterAndSortData = useCallback(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    // Apply status filtering
    let result = filterRecordsByStatus(data, severityFilter);
    
    // Apply sorting if a column is selected
    if (sortConfig.column && sortConfig.direction !== 'none') {
      result = sortRecords(result, sortConfig);
    }

    setFilteredData(result);
  }, [data, severityFilter, sortConfig]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterAndSortData();
  }, [filterAndSortData]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
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
      <Card size="lg">
        <TableHeader 
          onExport={handleExportCSV}
          onFilterChange={setSeverityFilter}
          selectedFilter={severityFilter}
        />
        <div className="table-wrapper">
          <div className={commonStyles.table.container}>
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
      </Card>
      <RecordModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        record={selectedRecord}
      />
    </>
  );
};

export default Table;