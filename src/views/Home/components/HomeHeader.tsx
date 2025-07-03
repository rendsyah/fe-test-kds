import type React from 'react';
import Breadcrumbs from '@/components/ui/breadcrumbs/Breadcrumbs';

const HomeHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-end">
      <div>
        <span className="text-xl font-semibold block mb-2">Home</span>
        <Breadcrumbs items={[{ title: 'Home', href: '#' }]} />
      </div>
    </div>
  );
};

export default HomeHeader;
