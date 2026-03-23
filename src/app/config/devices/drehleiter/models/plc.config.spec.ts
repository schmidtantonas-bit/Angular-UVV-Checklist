import { describe, expect, it } from 'vitest';
import { PLC_DEVICE_CONFIG } from './plc.config';

describe('PLC_DEVICE_CONFIG', () => {
  it('registers PLC as a drehleiter with its speed-check rows', () => {
    expect(PLC_DEVICE_CONFIG.type).toBe('plc');
    expect(PLC_DEVICE_CONFIG.family).toBe('drehleiter');
    expect(PLC_DEVICE_CONFIG.label).toBe('PLC');
    expect(PLC_DEVICE_CONFIG.speedCheckTable).toEqual([
      { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 24, toleranceSec: 3 },
      { key: 'rotateLeft', label: 'Drehen links', referenceSec: 24, toleranceSec: 3 },
      { key: 'raise', label: 'Aufrichten', referenceSec: 39, toleranceSec: 3 },
      { key: 'tilt', label: 'Neigen', referenceSec: 44, toleranceSec: 3 },
      { key: 'extend', label: 'Ausfahren volle Laenge', referenceSec: 30, toleranceSec: 3 },
      { key: 'retract', label: 'Einfahren volle Laenge', referenceSec: 28, toleranceSec: 3 }
    ]);
  });
});
