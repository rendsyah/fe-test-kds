import type React from 'react';
import type { RadialBarChartProps } from './types';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const RadialBarChart: React.FC<RadialBarChartProps> = ({
  height = 330,
  width = '100%',
  colors,
  labels,
  series,
}) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'radialBar',
      height: 330,
      sparkline: {
        enabled: true,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -85,
        endAngle: 85,
        hollow: {
          size: '80%',
        },
        track: {
          background: '#E4E7EC',
          strokeWidth: '100%',
          margin: 5,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            fontSize: '34px',
            fontWeight: '600',
            offsetY: -40,
            color: '#1D2939',
            formatter: function (val) {
              return val + '%';
            },
          },
        },
      },
    },
    fill: {
      type: 'solid',
      colors: colors,
    },
    colors,
    stroke: {
      lineCap: 'round',
    },
    series,
    labels,
  };

  return (
    <ReactApexChart
      options={options}
      series={options.series}
      type="radialBar"
      height={height}
      width={width}
    />
  );
};

export default RadialBarChart;
