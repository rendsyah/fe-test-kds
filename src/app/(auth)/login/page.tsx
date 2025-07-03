import type React from 'react';
import type { Metadata } from 'next';
import LoginView from '@/views/Auth/login';

export const metadata: Metadata = {
  title: 'Login - CMS Application',
  description: 'Authentication page of CMS Application',
};

const LoginPage: React.FC = () => {
  return <LoginView />;
};

export default LoginPage;
