export type SpeedCheckKey =
  | 'rotate90'
  | 'tilt'
  | 'raise'
  | 'extend'
  | 'retract'
  | 'jointTilt'
  | 'jointRaise';

export interface SpeedCheckDefinition {
  key: SpeedCheckKey;
  label: string;
  referenceSec: number;
  toleranceSec: number;
}

export interface SpeedCheckRowResult extends SpeedCheckDefinition {
  measuredSec: number | null;
  deltaSec: number | null;
  withinTolerance: boolean | null;
}

export const DEFAULT_SPEED_CHECK_TABLE: readonly SpeedCheckDefinition[] = [
  { key: 'rotate90', label: 'Drehen 90°', referenceSec: 23, toleranceSec: 5 },
  { key: 'tilt', label: 'Neigen', referenceSec: 36, toleranceSec: 5 },
  { key: 'raise', label: 'Aufrichten', referenceSec: 36, toleranceSec: 5 },
  { key: 'extend', label: 'Ausfahren', referenceSec: 34, toleranceSec: 5 },
  { key: 'retract', label: 'Einfahren', referenceSec: 39, toleranceSec: 5 },
  { key: 'jointTilt', label: 'Gelenk neigen', referenceSec: 48, toleranceSec: 5 },
  { key: 'jointRaise', label: 'Gelenk aufrichten', referenceSec: 45, toleranceSec: 5 }
] as const;

export type SpeedCheckMeasurements = Partial<Record<SpeedCheckKey, number | null>>;

export function evaluateSpeedCheck(
  measurements: SpeedCheckMeasurements,
  table: readonly SpeedCheckDefinition[] = DEFAULT_SPEED_CHECK_TABLE
): SpeedCheckRowResult[] {
  return table.map((definition) => {
    const measuredSec = measurements[definition.key] ?? null;
    const deltaSec = measuredSec == null ? null : measuredSec - definition.referenceSec;
    const withinTolerance =
      measuredSec == null ? null : Math.abs(deltaSec ?? 0) <= definition.toleranceSec;

    return { ...definition, measuredSec, deltaSec, withinTolerance };
  });
}

