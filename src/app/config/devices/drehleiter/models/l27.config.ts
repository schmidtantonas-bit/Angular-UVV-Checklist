import type { DeviceConfig } from '../../types';

export const L27_DEVICE_CONFIG: DeviceConfig = {
  type: 'l27',
  family: 'drehleiter',
  label: 'L27',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L27',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 20, toleranceSec: 4 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 20, toleranceSec: 4 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 31, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 34, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren', referenceSec: 27, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren', referenceSec: 30, toleranceSec: 3 }
  ],
  overloadVariant: 'standard'
};
