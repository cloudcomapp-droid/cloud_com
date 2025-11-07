export interface ProductData {
  id: string;
  produktname: string;
  impressionen: string;
  klicks: string;
  ctr: string;
  conversions: string;
  value: string;
  costs: string;
  roas: string;
}

export interface SilentProductData {
  id: string;
  produktname: string;
  status: string;
  impressionen: string;
  klicks: string;
  conversions: string;
  ursache: string;
}

export const exportToCSV = (data: ProductData[], filename: string) => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(',');
  const csvContent = [
    headers,
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const exportSilentToCSV = (data: SilentProductData[], filename: string) => {
  // Convert data to CSV format
  const headers = Object.keys(data[0]).join(',');
  const csvContent = [
    headers,
    ...data.map(row => Object.values(row).join(','))
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};