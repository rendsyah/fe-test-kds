import type React from 'react';
import AppDefaultLayout from '@/components/layout/AppDefault';

const AuthLayoutPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <AppDefaultLayout>{children}</AppDefaultLayout>;
};

export default AuthLayoutPage;
