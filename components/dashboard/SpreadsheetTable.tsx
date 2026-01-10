'use client';

import { useState } from 'react';
import { Job, JobStatus } from '@/types';
import { formatDate, getStatusColor, getInterestDisplay } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Pencil, Trash2, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface SpreadsheetTableProps {
  jobs: Job[];
  onUpdate: (id: string, updates: Partial<Job>) => void;
  onDelete: (id: string) => void;
}

export function SpreadsheetTable({ jobs, onUpdate, onDelete }: SpreadsheetTableProps) {
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleCellClick = (id: string, field: string, currentValue: any) => {
    setEditingCell({ id, field });
    setEditValue(currentValue || '');
  };

  const handleCellBlur = () => {
    if (editingCell) {
      onUpdate(editingCell.id, { [editingCell.field]: editValue });
      setEditingCell(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCellBlur();
    } else if (e.key === 'Escape') {
      setEditingCell(null);
    }
  };

  const renderCell = (job: Job, field: keyof Job) => {
    const isEditing = editingCell?.id === job.id && editingCell?.field === field;
    const value = job[field];

    if (isEditing) {
      if (field === 'status') {
        return (
          <select
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellBlur}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-northeastern-red dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Submitted">Submitted</option>
            <option value="Under Review">Under Review</option>
            <option value="Interview">Interview</option>
            <option value="Rejected">Rejected</option>
            <option value="Offer">Offer</option>
          </select>
        );
      } else if (field === 'interest') {
        return (
          <select
            autoFocus
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellBlur}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-northeastern-red dark:bg-gray-800 dark:border-gray-600"
          >
            <option value="5">5 - Dream Job</option>
            <option value="4">4 - Very Interested</option>
            <option value="3">3 - Interested</option>
            <option value="2">2 - Backup</option>
            <option value="1">1 - Practice</option>
          </select>
        );
      } else if (field === 'deadline' || field === 'dateApplied' || field === 'datePosted') {
        return (
          <input
            autoFocus
            type="date"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellBlur}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-northeastern-red dark:bg-gray-800 dark:border-gray-600"
          />
        );
      } else {
        return (
          <input
            autoFocus
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleCellBlur}
            onKeyDown={handleKeyDown}
            className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-2 focus:ring-northeastern-red dark:bg-gray-800 dark:border-gray-600"
          />
        );
      }
    }

    // Display value
    if (field === 'status') {
      return (
        <Badge className={getStatusColor(value as string)}>
          {value}
        </Badge>
      );
    } else if (field === 'interest') {
      const display = getInterestDisplay(value as number);
      return <span className={display.color}>{value}</span>;
    } else if (field === 'deadline' || field === 'dateApplied' || field === 'datePosted') {
      return <span className="text-sm">{formatDate(value as string)}</span>;
    } else {
      return <span className="text-sm">{value || '-'}</span>;
    }
  };

  if (jobs.length === 0) {
    return (
      <Card className="p-12 text-center">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          No applications yet. Add your first job application!
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Interest
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Position
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date Applied
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Location
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
            {jobs.map((job) => (
              <tr 
                key={job.id} 
                className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <td 
                  className="px-4 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleCellClick(job.id, 'interest', job.interest)}
                >
                  {renderCell(job, 'interest')}
                </td>
                <td 
                  className="px-4 py-3 whitespace-nowrap cursor-pointer font-medium"
                  onClick={() => handleCellClick(job.id, 'company', job.company)}
                >
                  {renderCell(job, 'company')}
                </td>
                <td 
                  className="px-4 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleCellClick(job.id, 'title', job.title)}
                >
                  {renderCell(job, 'title')}
                </td>
                <td 
                  className="px-4 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleCellClick(job.id, 'status', job.status)}
                >
                  {renderCell(job, 'status')}
                </td>
                <td 
                  className="px-4 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleCellClick(job.id, 'dateApplied', job.dateApplied)}
                >
                  {renderCell(job, 'dateApplied')}
                </td>
                <td 
                  className="px-4 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleCellClick(job.id, 'deadline', job.deadline)}
                >
                  {renderCell(job, 'deadline')}
                </td>
                <td 
                  className="px-4 py-3 whitespace-nowrap cursor-pointer"
                  onClick={() => handleCellClick(job.id, 'location', job.location)}
                >
                  {renderCell(job, 'location')}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {job.url && (
                      <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-northeastern-red transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    <button
                      onClick={() => onDelete(job.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
