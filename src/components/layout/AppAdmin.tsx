'use client';

import type React from 'react';
import { useEffect, useMemo } from 'react';
import { useAuth } from '@/contexts/auth.context';
import { useSidebar } from '@/contexts/sidebar.context';
import { useNetwork } from '@/contexts/network.context';
import { cn } from '@/libs/utils/cn.utils';
import { Menus } from '@/libs/__mocks__/menu';
import AppHeader from './AppHeader';
import AppSidebar from './AppSidebar';
import AppBackdrop from './AppBackdrop';
import Notification from '../ui/notification/Notification';

type AppAdminLayoutProps = {
  children: React.ReactNode;
};

const AppAdminLayout: React.FC<AppAdminLayoutProps> = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();
  const { isOnline, isConnection } = useNetwork();
  const { isExpanded, isMobileOpen } = useSidebar();

  const mainContentMargin = useMemo(() => {
    if (isMobileOpen) return 'ml-0';
    return isExpanded ? 'lg:ml-[240px]' : 'lg:ml-[90px]';
  }, [isExpanded, isMobileOpen]);

  useEffect(() => {
    const wasOnline = isConnection.current;

    if (wasOnline !== null && wasOnline !== isOnline) {
      Notification({
        message: isOnline ? 'Connected to internet' : 'You are offline',
        description: isOnline
          ? 'Your network connection has been restored.'
          : 'Please check your connection and try again.',
        type: isOnline ? 'success' : 'error',
      });
    }

    isConnection.current = isOnline;
  }, [isOnline, isConnection]);

  if (isLoading || !isAuthenticated) return null;

  return (
    <div className="min-h-screen xl:flex">
      {/* SIDEBAR & BACKDROP */}
      <AppSidebar menus={Menus} />
      <AppBackdrop />
      {/* MAIN CONTENT */}
      <div className={cn('flex-1 transition-[margin] duration-300 ease-in-out', mainContentMargin)}>
        {/* HEADER */}
        <AppHeader />
        {/* PAGE CONTENT */}
        <div className="p-4 md:p-6 mx-auto max-w-(--breakpoint-2xl)">{children}</div>
      </div>
    </div>
  );
};

export default AppAdminLayout;
