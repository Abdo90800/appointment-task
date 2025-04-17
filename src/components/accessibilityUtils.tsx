
import React, { useEffect, useRef } from 'react';

// Focus trap for modals to improve keyboard accessibility
export const useFocusTrap = (isActive: boolean) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Set initial focus
    firstElement?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // Trap focus in the container
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return containerRef;
};

// Screen reader announcer for live regions
export const ScreenReaderAnnouncement = ({ 
  message, 
  assertive = false 
}: { 
  message: string; 
  assertive?: boolean; 
}) => {
  return (
    <div 
      className="sr-only" 
      aria-live={assertive ? "assertive" : "polite"}
      aria-atomic="true"
    >
      {message}
    </div>
  );
};

// Skip navigation link for keyboard users
export const SkipToContent = () => {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-blue-600 focus:shadow-md focus:rounded-md"
    >
      Skip to main content
    </a>
  );
};
