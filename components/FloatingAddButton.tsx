'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { useAppData } from '@/hooks/useAppData';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export function FloatingAddButton() {
  const router = useRouter();
  const { addJob } = useAppData();
  const [isExpanded, setIsExpanded] = useState(false);
  const [quickAddData, setQuickAddData] = useState({
    company: '',
    title: '',
    status: 'Not Started' as const,
    interest: 3,
  });

  // Keyboard shortcut to toggle the add button
  useKeyboardShortcuts([
    {
      key: 'n',
      ctrl: true,
      description: 'Add new job',
      action: () => setIsExpanded(prev => !prev),
      category: 'Actions',
    },
  ]);

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
    setIsExpanded(false);
    
    // Show success briefly
    const btn = document.getElementById('floating-add-btn');
    if (btn) {
      btn.classList.add('scale-110');
      setTimeout(() => btn.classList.remove('scale-110'), 200);
    }
  };

  const handleFullForm = () => {
    setIsExpanded(false);
    router.push('/applications');
  };

  return (
    <>
      {/* Quick Add Popup */}
      {isExpanded && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fade-in"
            onClick={() => setIsExpanded(false)}
          />
          
          {/* Popup Card */}
          <Card className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-3rem)] animate-slide-up shadow-2xl">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Quick Add Job
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              
              <div className="space-y-3">
                <Input
                  placeholder="Company*"
                  value={quickAddData.company}
                  onChange={(e) => setQuickAddData({ ...quickAddData, company: e.target.value })}
                  autoFocus
                />
                <Input
                  placeholder="Position*"
                  value={quickAddData.title}
                  onChange={(e) => setQuickAddData({ ...quickAddData, title: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    value={quickAddData.status}
                    onChange={(e) => setQuickAddData({ ...quickAddData, status: e.target.value as any })}
                  >
                    <option value="Not Started">Not Started</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Submitted">Submitted</option>
                  </Select>
                  <Select
                    value={quickAddData.interest}
                    onChange={(e) => setQuickAddData({ ...quickAddData, interest: Number(e.target.value) })}
                  >
                    <option value="5">5 ⭐⭐⭐⭐⭐</option>
                    <option value="4">4 ⭐⭐⭐⭐</option>
                    <option value="3">3 ⭐⭐⭐</option>
                    <option value="2">2 ⭐⭐</option>
                    <option value="1">1 ⭐</option>
                  </Select>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button onClick={handleQuickAdd} className="flex-1">
                  Add Job
                </Button>
                <Button variant="outline" onClick={handleFullForm}>
                  Full Form
                </Button>
              </div>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                💡 Tip: Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">Ctrl+N</kbd> to open this anywhere
              </p>
            </div>
          </Card>
        </>
      )}
      
      {/* Floating Button */}
      <button
        id="floating-add-btn"
        onClick={() => setIsExpanded(!isExpanded)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 bg-northeastern-red hover:bg-red-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center group ${
          isExpanded ? 'rotate-45' : ''
        }`}
        title="Add new job (Ctrl+N)"
      >
        <Plus className="w-6 h-6" />
        
        {/* Tooltip */}
        <span className="absolute right-16 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Add Job (Ctrl+N)
        </span>
      </button>
    </>
  );
}
