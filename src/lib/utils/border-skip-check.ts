import { BorderSkips } from '$lib/types/bar-chart';

export default function borderskipCheck(value: string): BorderSkips {
  if (Object.values(BorderSkips).includes(value as BorderSkips)) {
    return value as BorderSkips;
  }
  return BorderSkips.false;
}
