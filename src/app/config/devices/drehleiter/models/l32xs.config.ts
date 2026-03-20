import type { DeviceConfig } from '../../types';
export const L32XS_DEVICE_CONFIG: DeviceConfig = {
  type: 'l32xs',
  family: 'drehleiter',
  label: 'L32XS',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L32XS',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 20, toleranceSec: 4 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 20, toleranceSec: 4 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 31, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 34, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren', referenceSec: 30, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren', referenceSec: 33, toleranceSec: 3 },
    { key: 'fullLengthRaise', label: 'Aufrichten mit voller Leiterlaenge', referenceSec: 22, toleranceSec: 5 },
    { key: 'fullLengthTilt', label: 'Neigen mit voller Leiterlaenge', referenceSec: 22, toleranceSec: 5 },
    { key: 'fullLengthRotate', label: 'Drehen mit voller Leiterlaenge', referenceSec: 52, toleranceSec: 5 }
  ],
  overloadVariant: 'standard'
};
