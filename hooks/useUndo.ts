'use client';

import { useState, useEffect } from 'react';

export interface UndoItem {
  type: 'job' | 'company' | 'contact' | 'followup' | 'interview';
  data: any;
  deletedAt: string;
}

const STORAGE_KEY = 'lastDeleted';

export function useUndo() {
  const [lastDeleted, setLastDeleted] = useState<UndoItem | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLastDeleted(parsed);
      }
    } catch (error) {
      console.error('Error loading undo item:', error);
    }
  }, []);

  // Save to localStorage whenever it changes
  useEffect(() => {
    try {
      if (lastDeleted) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(lastDeleted));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving undo item:', error);
    }
  }, [lastDeleted]);

  const addToUndoStack = (item: UndoItem) => {
    // Replace with new item (only track last deletion)
    setLastDeleted(item);
  };

  const popFromUndoStack = (): UndoItem | null => {
    if (!lastDeleted) return null;

    const item = lastDeleted;
    setLastDeleted(null); // Clear after retrieving
    return item;
  };

  const clearUndoStack = () => {
    setLastDeleted(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const canUndo = lastDeleted !== null;

  return {
    addToUndoStack,
    popFromUndoStack,
    clearUndoStack,
    canUndo,
    undoCount: lastDeleted ? 1 : 0,
  };
}
