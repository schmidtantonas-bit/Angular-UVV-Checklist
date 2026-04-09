import type { DeviceConfig } from '../../types';

export const L32_DEVICE_CONFIG: DeviceConfig = {
  type: 'l32',
  family: 'drehleiter',
  label: 'L32',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L32',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter L32'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 20, toleranceSec: 4 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 20, toleranceSec: 4 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 31, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 34, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren', referenceSec: 30, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren', referenceSec: 33, toleranceSec: 3 }
  ],
  overloadVariant: 'standard'
};
