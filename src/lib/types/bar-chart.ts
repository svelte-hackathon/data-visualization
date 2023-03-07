export type BorderSkips =
  | 'start'
  | 'end'
  | 'middle'
  | 'bottom'
  | 'left'
  | 'top'
  | 'right'
  | boolean;

export type BarChartBar = {
  data: number;
  label: string;
  backgroundColor?: string;
  borderWidth?: number;
  borderColor?: string;
  borderSkipped?: BorderSkips;
  borderRadius?: number;
  inflateAmount?: number | 'auto';
  hoverBackgroundColor?: string;
  hoverBorderColor?: string;
  hoverBorderWidth?: number;
  hoverBorderRadius?: number;
};
