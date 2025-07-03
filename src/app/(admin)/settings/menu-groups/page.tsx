import type React from 'react';
import type { Metadata } from 'next';
import MenuGroupsView from '@/views/Settings/MenuGroups';

export const metadata: Metadata = {
  title: 'Menu Groups - CMS Application',
  description: 'Menu Groups page of CMS Application',
};

const MenuGroupsPage: React.FC = () => {
  return <MenuGroupsView />;
};

export default MenuGroupsPage;
