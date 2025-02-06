"use client";
import { createContext, useContext, useRef, ReactNode } from "react";

// Create the context
const ScrollContext = createContext<{ scrollToTop: () => void } | null>(null);

// Provider component
export const ScrollProvider = ({ children }: { children: ReactNode }) => {
  const bookingPageRef = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (bookingPageRef.current) {
      bookingPageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ scrollToTop }}>
      <div ref={bookingPageRef}>{children}</div>
    </ScrollContext.Provider>
  );
};

// Custom hook to use scroll function
export const useScroll = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};
