import type React from 'react';
import { useSidebar } from '@/contexts/sidebar.context';

const AppBackdrop: React.FC = () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-40 bg-ui-900/50 backdrop-blur-sm lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default AppBackdrop;
