'use client';
import { createContext, useContext, ReactNode } from 'react';

// Create the context
const ScrollContext = createContext<{
  scrollToSection: (section: 'booking' | 'slot' | 'payment') => void;
} | null>(null);

// Provider component
export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const scrollToSection = (section: 'booking' | 'slot' | 'payment') => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToSection }}>
      {children}
    </ScrollContext.Provider>
  );
};

// Custom hook to use scroll function
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
};
