'use client';

import type React from 'react';
import type { Nullable } from '@/types/commons.types';
import { useState, useEffect } from 'react';
import { createSafeContext } from '@/libs/utils/createSafeContext';

type SidebarContextProps = Nullable<{
  isExpanded: boolean;
  isMobile: boolean;
  isMobileOpen: boolean;
  activeItem: string | null;
  openSubmenu: string | null;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  setActiveItem: (item: string | null) => void;
  toggleSubmenu: (item: string) => void;
}>;

const [SidebarContext, useSidebar] = createSafeContext<SidebarContextProps>('Sidebar');

const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleSubmenu = (item: string) => {
    setOpenSubmenu((prev) => (prev === item ? null : item));
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,
        isMobile,
        isMobileOpen,
        activeItem,
        openSubmenu,
        toggleSidebar,
        toggleMobileSidebar,
        setActiveItem,
        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export { useSidebar, SidebarProvider };
