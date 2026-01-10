import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          'transition-colors',
          {
            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300':
              variant === 'default',
            'bg-northeastern-red text-white': variant === 'primary',
            'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300':
              variant === 'secondary',
            'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300':
              variant === 'success',
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300':
              variant === 'warning',
            'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300':
              variant === 'danger',
          },
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';
