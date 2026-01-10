import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNow, parseISO } from "date-fns";

/**
 * Merge Tailwind CSS classes with proper override handling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Format date based on user preference
 */
export function formatDate(
  date: string | undefined,
  dateFormat: 'numeric' | 'short' | 'relative' = 'numeric'
): string {
  if (!date) return '';
  
  try {
    const parsedDate = parseISO(date);
    
    switch (dateFormat) {
      case 'numeric':
        return format(parsedDate, 'MM/dd/yyyy');
      case 'short':
        return format(parsedDate, 'MMM dd, yyyy');
      case 'relative':
        return formatDistanceToNow(parsedDate, { addSuffix: true });
      default:
        return format(parsedDate, 'MM/dd/yyyy');
    }
  } catch (error) {
    return date;
  }
}

/**
 * Get today's date in YYYY-MM-DD format
 */
export function getTodayDate(): string {
  return format(new Date(), 'yyyy-MM-dd');
}

/**
 * Export data to CSV
 */
export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const cell = row[header]?.toString() || '';
        // Escape quotes and wrap in quotes if contains comma
        return cell.includes(',') ? `"${cell.replace(/"/g, '""')}"` : cell;
      }).join(',')
    )
  ].join('\n');
  
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${format(new Date(), 'yyyy-MM-dd')}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Get status badge color
 */
export function getStatusColor(status: string): string {
  switch (status) {
    case 'Not Started':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
    case 'In Progress':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'Submitted':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
    case 'Under Review':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Interview':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'Rejected':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    case 'Offer':
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
    case 'Pending':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    case 'Completed':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}

/**
 * Get interest level display
 */
export function getInterestDisplay(level: number): { label: string; color: string } {
  const displays = {
    5: { label: '5 - Dream Job', color: 'text-red-600 dark:text-red-400' },
    4: { label: '4 - Very Interested', color: 'text-orange-600 dark:text-orange-400' },
    3: { label: '3 - Interested', color: 'text-yellow-600 dark:text-yellow-400' },
    2: { label: '2 - Backup', color: 'text-blue-600 dark:text-blue-400' },
    1: { label: '1 - Practice', color: 'text-gray-600 dark:text-gray-400' },
  };
  
  return displays[level as keyof typeof displays] || displays[3];
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'High':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'Low':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300';
  }
}

/**
 * Check if a date is overdue
 */
export function isOverdue(date: string): boolean {
  try {
    const dueDate = parseISO(date);
    return dueDate < new Date();
  } catch {
    return false;
  }
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}
