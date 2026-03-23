import { describe, expect, it } from 'vitest';
import { evaluateSpeedCheck, type SpeedCheckDefinition } from './speed-check.domain';

describe('evaluateSpeedCheck', () => {
  const table: readonly SpeedCheckDefinition[] = [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 20, toleranceSec: 4 }
  ];

  it('accepts values from reference up to reference plus tolerance', () => {
    const resultsAtReference = evaluateSpeedCheck({ rotateRight: 20 }, table);
    const resultsAtUpperBound = evaluateSpeedCheck({ rotateRight: 24 }, table);

    expect(resultsAtReference[0].withinTolerance).toBe(true);
    expect(resultsAtUpperBound[0].withinTolerance).toBe(true);
  });

  it('rejects values below the reference', () => {
    const results = evaluateSpeedCheck({ rotateRight: 19.99 }, table);

    expect(results[0].withinTolerance).toBe(false);
  });

  it('rejects values above the upper bound', () => {
    const results = evaluateSpeedCheck({ rotateRight: 24.01 }, table);

    expect(results[0].withinTolerance).toBe(false);
  });
});
