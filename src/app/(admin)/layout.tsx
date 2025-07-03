import type React from 'react';
import { AuthProvider } from '@/contexts/auth.context';
import AdminLayout from '@/components/layout/AppAdmin';

const AdminLayoutPage: React.FC<{ children: React.ReactNode }> = async ({ children }) => {
  return (
    <AuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AuthProvider>
  );
};

export default AdminLayoutPage;
