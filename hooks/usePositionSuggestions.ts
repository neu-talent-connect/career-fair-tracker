'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'positionSuggestions';

export function usePositionSuggestions() {
  const [positions, setPositions] = useState<string[]>([]);

  // Load positions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setPositions(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading position suggestions:', error);
    }
  }, []);

  // Add a new position to the list
  const addPosition = (position: string) => {
    if (!position || position.trim() === '') return;

    const trimmed = position.trim();
    
    // Check if position already exists (case-insensitive)
    const exists = positions.some(
      (p) => p.toLowerCase() === trimmed.toLowerCase()
    );

    if (!exists) {
      const updated = [...positions, trimmed];
      setPositions(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    }
  };

  // Remove a position from the list
  const removePosition = (position: string) => {
    const updated = positions.filter((p) => p !== position);
    setPositions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  // Clear all positions
  const clearPositions = () => {
    setPositions([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    positions,
    addPosition,
    removePosition,
    clearPositions,
  };
}
