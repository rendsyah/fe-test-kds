import type React from 'react';
import type { Metadata } from 'next';
import HomeView from '@/views/Home';

export const metadata: Metadata = {
  title: 'Home - CMS Application',
  description: 'Home page of CMS Application',
};

const HomePage: React.FC = () => {
  return <HomeView />;
};

export default HomePage;
