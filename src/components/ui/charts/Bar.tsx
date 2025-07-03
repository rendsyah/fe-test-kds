import type React from 'react';
import type { BarChartProps } from './types';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const BarChart: React.FC<BarChartProps> = ({
  height = 300,
  width = '100%',
  colors,
  categories,
  series,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'bar',
      fontFamily: 'Poppins, sans-serif',
      height: height,
      toolbar: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '39%',
        borderRadius: 5,
        borderRadiusApplication: 'end',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ['transparent'],
    },
    xaxis: {
      categories,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors,
    fill: {
      opacity: 1,
    },
    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val: number) => `${val}`,
      },
    },
    series,
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="bar"
      height={height}
      width={width}
    />
  );
};

export default BarChart;
