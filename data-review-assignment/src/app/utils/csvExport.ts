import { Record } from '@/app/types/data';

export const exportToCSV = (data: Record[]) => {
  // Define headers with proper names
  const headers = [
    'Name',
    'Email',
    'Street',
    'City',
    'Zipcode',
    'Phone',
    'Status',
    'Error Count',
    'Critical Errors',
    'Warning Errors'
  ];

  // Convert data to CSV rows with error information
  const csvData = data.map(record => {
    const errorCount = Object.keys(record.errors).length;
    const criticalCount = Object.values(record.errors)
      .filter(error => error.severity === 'critical').length;
    const warningCount = Object.values(record.errors)
      .filter(error => error.severity === 'warning').length;

    return [
      record.name,
      record.email,
      record.street,
      record.city,
      record.zipcode,
      record.phone,
      record.status,
      errorCount,
      criticalCount,
      warningCount
    ];
  });

  // Create CSV content with proper escaping
  const csvContent = [
    headers.join(','),
    ...csvData.map(row => 
      row.map(cell => {
        // Handle cells that contain commas, quotes, or newlines
        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
          return `"${cell.replace(/"/g, '""')}"`;
        }
        return cell;
      }).join(',')
    )
  ].join('\n');

  // Create and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  link.href = URL.createObjectURL(blob);
  link.download = `data_export_${date}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}; 