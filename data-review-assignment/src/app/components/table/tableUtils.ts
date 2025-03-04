import { Record, SortConfig } from '@/app/types';

/**
 * Calculates the severity level of a record field
 */
export const getSeverityLevel = (record: Record, column: string): string => {
  const error = record.errors[column];
  if (!error) return 'valid';
  return error.severity;
};

/**
 * Gets a numeric severity level for sorting (2 for critical, 1 for warning, 0 for valid)
 */
export const getSeverityLevelValue = (record: Record, column: string): number => {
  const severity = getSeverityLevel(record, column);
  if (severity === 'critical') return 2;
  if (severity === 'warning') return 1;
  return 0;
};

/**
 * Gets the total count of errors in a record
 */
export const getErrorCount = (record: Record): { total: number, critical: number, warning: number } => {
  let critical = 0;
  let warning = 0;
  
  Object.values(record.errors).forEach((error) => {
    if (error.severity === 'critical') critical++;
    if (error.severity === 'warning') warning++;
  });
  
  return {
    total: Object.keys(record.errors).length,
    critical,
    warning
  };
};

/**
 * Filters records based on selected severity
 */
export const filterRecordsByStatus = (records: Record[], severityFilter: string): Record[] => {
  if (!severityFilter || severityFilter === 'all') return records;
  
  return records.filter(record => {
    // For 'valid' filter, return records with no errors
    if (severityFilter === 'valid') {
      return Object.keys(record.errors).length === 0;
    }
    
    // For 'critical' or 'warning', return records with at least one error of that severity
    return Object.values(record.errors).some(
      error => error.severity === severityFilter
    );
  });
};

/**
 * Sorts records based on the provided sort configuration
 */
export const sortRecords = (records: Record[], sortConfig: SortConfig): Record[] => {
  if (sortConfig.direction === 'none') return records;
  
  return [...records].sort((a, b) => {
    const valueA = a[sortConfig.column as keyof Record];
    const valueB = b[sortConfig.column as keyof Record];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const comparison = valueA.localeCompare(valueB);
      return sortConfig.direction === 'asc' ? comparison : -comparison;
    }
    
    return 0;
  });
}; 