import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
          'transition-colors',
          // Only apply variant styles if variant is explicitly set
          variant && {
            'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-white':
              variant === 'default',
            'bg-northeastern-red text-white': variant === 'primary',
            'bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white':
              variant === 'secondary',
            'bg-green-100 text-green-700 dark:bg-green-600 dark:text-white':
              variant === 'success',
            'bg-yellow-100 text-yellow-700 dark:bg-yellow-500 dark:text-black':
              variant === 'warning',
            'bg-red-100 text-red-700 dark:bg-red-600 dark:text-white':
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
