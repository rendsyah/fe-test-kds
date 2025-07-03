'use client';

import type React from 'react';
import dynamic from 'next/dynamic';
import MenuGroupsHeader from './components/MenuGroupsHeader';
import MenuGroupsTable from './components/MenuGroupsTable';

const ModalAddMenuGroups = dynamic(() => import('./components/ModalAddMenuGroups'), { ssr: false });

const MenuGroupsView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <MenuGroupsHeader />
      </div>
      <div className="col-span-12">
        <MenuGroupsTable />
      </div>
      {/* MODAL */}
      <ModalAddMenuGroups />
    </div>
  );
};

export default MenuGroupsView;
