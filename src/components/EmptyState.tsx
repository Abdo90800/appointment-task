
import React from 'react';
import { Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  type?: 'search' | 'calendar';
}

const EmptyState = ({
  title,
  description,
  type = 'calendar',
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  const defaultIcon = type === 'search' ? (
    <Search className="h-12 w-12 text-gray-200" />
  ) : (
    <Calendar className="h-12 w-12 text-gray-200" />
  );

  return (
    <div 
      className="text-center py-12 px-4 rounded-lg border border-gray-200 bg-white"
      role="alert"
      aria-live="polite"
    >
      <div className="flex justify-center mb-4">
        {icon || defaultIcon}
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 mb-6 max-w-md mx-auto">{description}</p>
      
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="bg-blue-600 hover:bg-blue-700"
          aria-label={actionLabel}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
