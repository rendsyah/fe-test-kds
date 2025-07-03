'use client';

import type React from 'react';
import dynamic from 'next/dynamic';
import MenusHeader from './components/MenusHeader';
import MenusTable from './components/MenusTable';

const ModalAddMenus = dynamic(() => import('./components/ModalAddMenus'), { ssr: false });

const MenusView: React.FC = () => {
  return (
    <div className="grid grid-cols-12 space-y-6">
      <div className="col-span-12">
        <MenusHeader />
      </div>
      <div className="col-span-12">
        <MenusTable />
      </div>
      {/* MODAL */}
      <ModalAddMenus />
    </div>
  );
};

export default MenusView;
