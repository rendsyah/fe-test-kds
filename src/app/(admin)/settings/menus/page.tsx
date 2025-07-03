import type React from 'react';
import type { Metadata } from 'next';
import MenusView from '@/views/Settings/Menus';

export const metadata: Metadata = {
  title: 'Menu Groups - CMS Application',
  description: 'Menu Groups page of CMS Application',
};

const MenusPage: React.FC = () => {
  return <MenusView />;
};

export default MenusPage;
