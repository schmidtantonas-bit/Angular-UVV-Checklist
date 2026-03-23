export type SpeedCheckKey =
  | 'rotateRight'
  | 'rotateLeft'
  | 'tilt'
  | 'raise'
  | 'extend'
  | 'retract'
  | 'jointTilt'
  | 'jointRaise'
  | 'liftUp'
  | 'liftDown'
  | 'basketRotateFast'
  | 'basketRotateSlow';

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
  { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 20, toleranceSec: 4 },
  { key: 'rotateLeft', label: 'Drehen links', referenceSec: 20, toleranceSec: 4 },
  { key: 'raise', label: 'Aufrichten', referenceSec: 31, toleranceSec: 3 },
  { key: 'tilt', label: 'Neigen', referenceSec: 34, toleranceSec: 3 },
  { key: 'extend', label: 'Ausfahren', referenceSec: 30, toleranceSec: 3 },
  { key: 'retract', label: 'Einfahren', referenceSec: 33, toleranceSec: 3 }
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
      measuredSec == null
        ? null
        : measuredSec >= definition.referenceSec &&
          measuredSec <= definition.referenceSec + definition.toleranceSec;

    return { ...definition, measuredSec, deltaSec, withinTolerance };
  });
}
