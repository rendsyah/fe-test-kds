import type React from 'react';
import type { SparklineChartProps } from './types';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const SparklineChart: React.FC<SparklineChartProps> = ({
  height = 50,
  width = 100,
  colors,
  categories,
  series,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'line',
      fontFamily: 'Poppins, sans-serif',
      height: height,
      toolbar: { show: false },
      zoom: { enabled: false },
      sparkline: {
        enabled: true,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    grid: {
      show: false,
    },
    colors,
    xaxis: {
      categories,
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    tooltip: {
      enabled: true,
    },
    series,
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="line"
      height={height}
      width={width}
    />
  );
};

export default SparklineChart;
