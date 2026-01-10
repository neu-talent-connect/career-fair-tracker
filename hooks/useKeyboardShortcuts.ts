import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface KeyboardShortcut {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  description: string;
  action: () => void;
  category: 'Navigation' | 'Actions' | 'View' | 'General';
}

export function useKeyboardShortcuts(
  shortcuts: KeyboardShortcut[],
  enabled: boolean = true
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      const target = event.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        // Allow Escape to work in inputs
        if (event.key !== 'Escape') {
          return;
        }
      }

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? (event.ctrlKey || event.metaKey) : !event.ctrlKey && !event.metaKey;
        const shiftMatch = shortcut.shift ? event.shiftKey : !event.shiftKey;
        const altMatch = shortcut.alt ? event.altKey : !event.altKey;
        
        if (
          event.key.toLowerCase() === shortcut.key.toLowerCase() &&
          ctrlMatch &&
          shiftMatch &&
          altMatch
        ) {
          event.preventDefault();
          shortcut.action();
          break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, enabled]);
}

export function useGlobalShortcuts(
  onNewJob?: () => void,
  onShowShortcuts?: () => void
) {
  const router = useRouter();

  const shortcuts: KeyboardShortcut[] = [
    // Navigation
    {
      key: '1',
      ctrl: true,
      description: 'Go to Dashboard',
      action: () => router.push('/'),
      category: 'Navigation',
    },
    {
      key: '2',
      ctrl: true,
      description: 'Go to Spreadsheet',
      action: () => router.push('/spreadsheet'),
      category: 'Navigation',
    },
    {
      key: '3',
      ctrl: true,
      description: 'Go to Career Fairs',
      action: () => router.push('/career-fairs'),
      category: 'Navigation',
    },
    {
      key: '4',
      ctrl: true,
      description: 'Go to Applications',
      action: () => router.push('/applications'),
      category: 'Navigation',
    },
    {
      key: '5',
      ctrl: true,
      description: 'Go to Networking',
      action: () => router.push('/networking'),
      category: 'Navigation',
    },
    {
      key: '6',
      ctrl: true,
      description: 'Go to Resources',
      action: () => router.push('/resources'),
      category: 'Navigation',
    },
    // Actions
    {
      key: 'n',
      ctrl: true,
      description: 'Add new job',
      action: () => {
        if (onNewJob) {
          onNewJob();
        } else {
          router.push('/applications');
        }
      },
      category: 'Actions',
    },
    {
      key: 'k',
      ctrl: true,
      description: 'Quick search (coming soon)',
      action: () => {
        // TODO: Implement quick search
        console.log('Quick search coming soon!');
      },
      category: 'Actions',
    },
    // View
    {
      key: 'd',
      ctrl: true,
      description: 'Toggle dark mode',
      action: () => {
        const html = document.documentElement;
        html.classList.toggle('dark');
        localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
      },
      category: 'View',
    },
    // General
    {
      key: '/',
      ctrl: true,
      description: 'Show keyboard shortcuts',
      action: () => {
        if (onShowShortcuts) {
          onShowShortcuts();
        }
      },
      category: 'General',
    },
    {
      key: 'Escape',
      description: 'Close modal/Cancel action',
      action: () => {
        // This is handled by individual components
      },
      category: 'General',
    },
  ];

  useKeyboardShortcuts(shortcuts);

  return shortcuts;
}
