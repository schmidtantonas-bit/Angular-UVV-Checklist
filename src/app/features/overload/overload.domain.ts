export const OVERLOAD_THRESHOLD_MM = 100;
export const OVERLOAD_INVALID_UPPER_MM = 200;

export function diffMm(a: number | null, b: number | null): number | null {
  if (a == null || b == null) return null;
  return a - b;
}

export function withinThresholdMm(value: number | null, thresholdMm = OVERLOAD_THRESHOLD_MM): boolean | null {
  if (value == null) return null;
  if (value < 0) return false;
  if (value >= OVERLOAD_INVALID_UPPER_MM) return false;
  return value <= thresholdMm;
}

export type DiffStatus = 'empty' | 'invalid' | 'ok' | 'overLimit';

export interface DiffEvaluationMm {
  valueMm: number | null;
  status: DiffStatus;
}

export function evaluateDiffStatus(
  valueMm: number | null,
  thresholdMm = OVERLOAD_THRESHOLD_MM,
  invalidUpperMm = OVERLOAD_INVALID_UPPER_MM
): DiffStatus {
  if (valueMm == null) return 'empty';
  if (valueMm < 0 || valueMm >= invalidUpperMm) return 'invalid';
  if (valueMm <= thresholdMm) return 'ok';
  return 'overLimit';
}

export function diffEvaluationMm(
  a: number | null,
  b: number | null,
  thresholdMm = OVERLOAD_THRESHOLD_MM,
  invalidUpperMm = OVERLOAD_INVALID_UPPER_MM
): DiffEvaluationMm {
  const valueMm = diffMm(a, b);
  return { valueMm, status: evaluateDiffStatus(valueMm, thresholdMm, invalidUpperMm) };
}
