export enum BorderSkips {
  start = 'start',
  end = 'end',
  middle = 'middle',
  bottom = 'bottom',
  left = 'left',
  top = 'top',
  right = 'right',
  false = 'none',
  true = 'all'
}

export type BarChartBar = {
  data: number;
  label?: string;
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
