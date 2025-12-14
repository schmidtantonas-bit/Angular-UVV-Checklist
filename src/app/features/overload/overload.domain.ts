export const OVERLOAD_THRESHOLD_MM = 100;

export function diffMm(a: number | null, b: number | null): number | null {
  if (a == null || b == null) return null;
  return a - b;
}

export function withinThresholdMm(value: number | null, thresholdMm = OVERLOAD_THRESHOLD_MM): boolean | null {
  if (value == null) return null;
  return Math.abs(value) <= thresholdMm;
}

