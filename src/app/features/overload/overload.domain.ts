export const OVERLOAD_THRESHOLD_MM = 100;
export const OVERLOAD_OUT_OF_SERVICE_THRESHOLD_MM = 150;
export const OVERLOAD_INVALID_UPPER_MM = 200;
export const OVERLOAD_HEIGHT_MIN_MM = 0;
export const OVERLOAD_HEIGHT_MAX_MM = 99999;

export function diffMm(a: number | null, b: number | null): number | null {
  if (a == null || b == null) return null;
  return a - b;
}

export function sanitizeHeightMm(value: unknown): number | null {
  if (value == null) return null;

  if (typeof value === 'number') {
    if (!Number.isSafeInteger(value)) return null;
    if (value < OVERLOAD_HEIGHT_MIN_MM || value > OVERLOAD_HEIGHT_MAX_MM) return null;
    return value;
  }

  if (typeof value !== 'string') return null;

  const normalized = value.trim();
  if (normalized === '') return null;
  if (!/^\d+$/.test(normalized)) return null;

  const parsed = Number(normalized);
  if (!Number.isSafeInteger(parsed)) return null;
  if (parsed < OVERLOAD_HEIGHT_MIN_MM || parsed > OVERLOAD_HEIGHT_MAX_MM) return null;

  return parsed;
}

export function withinThresholdMm(value: number | null, thresholdMm = OVERLOAD_THRESHOLD_MM): boolean | null {
  if (value == null) return null;
  if (value < 0) return false;
  if (value >= OVERLOAD_INVALID_UPPER_MM) return false;
  return value <= thresholdMm;
}

export type DiffStatus = 'empty' | 'invalid' | 'ok' | 'followUpRequired' | 'outOfService';

export interface DiffEvaluationMm {
  valueMm: number | null;
  status: DiffStatus;
}

export function isDiffStatus(value: unknown): value is DiffStatus {
  return (
    value === 'empty' ||
    value === 'invalid' ||
    value === 'ok' ||
    value === 'followUpRequired' ||
    value === 'outOfService'
  );
}

export function diffStatusNote(status: DiffStatus): string | null {
  switch (status) {
    case 'ok':
      return 'Grenzwert <= 100 mm eingehalten';
    case 'followUpRequired':
      return 'Über 100 mm - genaue Prüfung erforderlich';
    case 'outOfService':
      return 'Über 150 mm - nicht einsatzfähig';
    case 'invalid':
      return 'Ungültiger Wert - bitte Eingaben prüfen';
    default:
      return null;
  }
}

export function evaluateDiffStatus(
  valueMm: number | null,
  thresholdMm = OVERLOAD_THRESHOLD_MM,
  outOfServiceThresholdMm = OVERLOAD_OUT_OF_SERVICE_THRESHOLD_MM,
  invalidUpperMm = OVERLOAD_INVALID_UPPER_MM
): DiffStatus {
  if (valueMm == null) return 'empty';
  if (valueMm < 0 || valueMm >= invalidUpperMm) return 'invalid';
  if (valueMm <= thresholdMm) return 'ok';
  if (valueMm <= outOfServiceThresholdMm) return 'followUpRequired';
  return 'outOfService';
}

export function diffEvaluationMm(
  a: number | null,
  b: number | null,
  thresholdMm = OVERLOAD_THRESHOLD_MM,
  outOfServiceThresholdMm = OVERLOAD_OUT_OF_SERVICE_THRESHOLD_MM,
  invalidUpperMm = OVERLOAD_INVALID_UPPER_MM
): DiffEvaluationMm {
  const valueMm = diffMm(a, b);
  return { valueMm, status: evaluateDiffStatus(valueMm, thresholdMm, outOfServiceThresholdMm, invalidUpperMm) };
}
