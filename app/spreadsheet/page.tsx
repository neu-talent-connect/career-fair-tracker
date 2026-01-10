'use client';

import { useState, useEffect } from 'react';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Plus, Download, Upload, Filter, X } from 'lucide-react';
import { SpreadsheetTable } from '@/components/dashboard/SpreadsheetTable';
import { exportToCSV } from '@/lib/utils';
import { DashboardFilters } from '@/types';
import { WelcomeModal } from '@/components/onboarding/WelcomeModal';
import { GettingStartedBanner } from '@/components/onboarding/GettingStartedBanner';

export default function SpreadsheetPage() {
  const { data, updateJob, deleteJob, addJob, loadSampleData } = useAppData();
  const [filters, setFilters] = useState<DashboardFilters>({});
  const [showFilters, setShowFilters] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showGettingStarted, setShowGettingStarted] = useState(false);
  const [quickAddData, setQuickAddData] = useState({
    company: '',
    title: '',
    status: 'Not Started' as const,
    interest: 3,
  });

  // Check if first time user
  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    const hasData = data.jobs.length > 0;
    
    if (!hasSeenWelcome) {
      setShowWelcome(true);
    } else if (!hasData) {
      setShowGettingStarted(true);
    }
  }, [data.jobs.length]);

  const handleWelcomeClose = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
    if (data.jobs.length === 0) {
      setShowGettingStarted(true);
    }
  };

  const handleStartTour = () => {
    setShowWelcome(false);
    localStorage.setItem('hasSeenWelcome', 'true');
    // TODO: Implement interactive tour
    alert('Interactive tour coming soon! For now, try adding a job or loading sample data.');
  };

  const handleDismissGettingStarted = () => {
    setShowGettingStarted(false);
    localStorage.setItem('dismissedGettingStarted', 'true');
  };

  // Filter jobs
  const filteredJobs = data.jobs.filter((job) => {
    if (filters.status && job.status !== filters.status) return false;
    if (filters.interest && job.interest !== Number(filters.interest)) return false;
    if (filters.applicationCycle && job.applicationCycle !== filters.applicationCycle) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return (
        job.company.toLowerCase().includes(search) ||
        job.title.toLowerCase().includes(search)
      );
    }
    return true;
  });

  const handleExport = () => {
    exportToCSV(filteredJobs, 'job-applications');
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  const handleQuickAdd = () => {
    if (!quickAddData.company || !quickAddData.title) {
      alert('Please enter at least a company and position');
      return;
    }

    addJob(quickAddData as any);
    setQuickAddData({
      company: '',
      title: '',
      status: 'Not Started',
      interest: 3,
    });
    setShowQuickAdd(false);
  };

  return (
    <>
      {/* Welcome Modal for First-Time Users */}
      {showWelcome && (
        <WelcomeModal
          onClose={handleWelcomeClose}
          onStartTour={handleStartTour}
        />
      )}
      
      <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50 dark:bg-gray-950">
        {/* Toolbar */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex-shrink-0">
        <div className="max-w-[1920px] mx-auto flex items-center justify-between gap-4">
          {/* Left side */}
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white hidden sm:block">
              My Applications
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'})
            </span>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className={showFilters ? 'bg-gray-100 dark:bg-gray-800' : ''}
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={loadSampleData}
            >
              <Upload className="w-4 h-4 mr-2" />
              Sample Data
            </Button>
            
            <Button
              variant="secondary"
              size="sm"
              onClick={handleExport}
              disabled={filteredJobs.length === 0}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            
            <Button
              size="sm"
              onClick={() => setShowQuickAdd(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Row
            </Button>
          </div>
        </div>

        {/* Filters Row */}
        {showFilters && (
          <div className="max-w-[1920px] mx-auto mt-3 pt-3 border-t border-gray-200 dark:border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Search company or position..."
                value={filters.search || ''}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
              <Select
                value={filters.status || ''}
                onChange={(e) => setFilters({ ...filters, status: e.target.value as any })}
              >
                <option value="">All Status</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
                <option value="Under Review">Under Review</option>
                <option value="Interview">Interview</option>
                <option value="Rejected">Rejected</option>
                <option value="Offer">Offer</option>
              </Select>
              <Select
                value={filters.interest || ''}
                onChange={(e) => setFilters({ ...filters, interest: e.target.value as any })}
              >
                <option value="">All Interest Levels</option>
                <option value="5">5 - Dream Job</option>
                <option value="4">4 - Very Interested</option>
                <option value="3">3 - Interested</option>
                <option value="2">2 - Backup</option>
                <option value="1">1 - Practice</option>
              </Select>
              {Object.values(filters).some(v => v) && (
                <Button variant="outline" size="sm" onClick={handleClearFilters}>
                  <X className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Quick Add Row */}
      {showQuickAdd && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800 px-4 py-3 flex-shrink-0">
          <div className="max-w-[1920px] mx-auto">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-medium text-blue-900 dark:text-blue-200">
                Quick Add:
              </span>
              <Input
                placeholder="Company*"
                value={quickAddData.company}
                onChange={(e) => setQuickAddData({ ...quickAddData, company: e.target.value })}
                className="max-w-[200px]"
              />
              <Input
                placeholder="Position*"
                value={quickAddData.title}
                onChange={(e) => setQuickAddData({ ...quickAddData, title: e.target.value })}
                className="max-w-[200px]"
              />
              <Select
                value={quickAddData.status}
                onChange={(e) => setQuickAddData({ ...quickAddData, status: e.target.value as any })}
                className="max-w-[150px]"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Submitted">Submitted</option>
              </Select>
              <Select
                value={quickAddData.interest}
                onChange={(e) => setQuickAddData({ ...quickAddData, interest: Number(e.target.value) })}
                className="max-w-[100px]"
              >
                <option value="5">5 ⭐</option>
                <option value="4">4 ⭐</option>
                <option value="3">3 ⭐</option>
                <option value="2">2 ⭐</option>
                <option value="1">1 ⭐</option>
              </Select>
              <Button size="sm" onClick={handleQuickAdd}>
                Add
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowQuickAdd(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

        {/* Spreadsheet Table - Full height */}
        <div className="flex-1 overflow-auto">
          <div className="max-w-[1920px] mx-auto p-4">
            {/* Getting Started Banner */}
            {showGettingStarted && data.jobs.length === 0 && (
              <GettingStartedBanner
                onDismiss={handleDismissGettingStarted}
                onLoadSample={() => {
                  loadSampleData();
                  setShowGettingStarted(false);
                }}
                onAddFirst={() => {
                  setShowQuickAdd(true);
                  setShowGettingStarted(false);
                }}
                onTakeTour={() => {
                  handleStartTour();
                  setShowGettingStarted(false);
                }}
              />
            )}
            
            <SpreadsheetTable
              jobs={filteredJobs}
              onUpdate={updateJob}
              onDelete={deleteJob}
            />
          </div>
        </div>
      </div>
    </>
  );
}
