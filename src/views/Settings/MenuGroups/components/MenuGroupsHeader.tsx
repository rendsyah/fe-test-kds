import type React from 'react';
import { useGlobal } from '@/contexts/global.context';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';
import ButtonPrimary from '@/components/ui/button/ButtonPrimary';

const MenuGroupsHeader: React.FC = () => {
  const { handleModal } = useGlobal();

  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Menu Groups</span>
        <Breadcrumbs
          items={[
            { title: 'Settings', href: '#' },
            { title: 'Menu Groups', href: '#' },
          ]}
        />
      </div>

      <div>
        <ButtonPrimary className="hidden sm:block" onClick={handleModal}>
          Add New Groups
        </ButtonPrimary>
      </div>
    </div>
  );
};

export default MenuGroupsHeader;
