'use client';

import HomeHeader from './components/HomeHeader';
import HomeMetrics from './components/HomeMetrics';
import HomeMonthlySalesChart from './components/HomeMonthlySalesChart';
import HomeMonthlyTarget from './components/HomeMonthlyTarget';
import HomeStatistic from './components/HomeStatistic';

const HomeView = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12">
        <HomeHeader />
      </div>
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <HomeMetrics />
        <HomeMonthlySalesChart />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <HomeMonthlyTarget />
      </div>
      <div className="col-span-12">
        <HomeStatistic />
      </div>
    </div>
  );
};

export default HomeView;
