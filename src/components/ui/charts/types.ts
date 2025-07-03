type Series = {
  name: string;
  data: number[];
};

export type AreaChartProps = {
  height?: string | number;
  width?: string | number;
  colors?: string[];
  categories: string[];
  series: Series[];
};

export type BarChartProps = {
  height?: string | number;
  width?: string | number;
  colors?: string[];
  categories: string[];
  series: Series[];
};

export type SparklineChartProps = {
  height?: string | number;
  width?: string | number;
  colors?: string[];
  categories: string[];
  series: Series[];
};

export type RadialBarChartProps = {
  height?: string | number;
  width?: string | number;
  colors?: string[];
  labels: string[];
  series: number[];
};
