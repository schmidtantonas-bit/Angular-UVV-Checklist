import type { DeviceConfig } from '../../types';
export const L32A_DEVICE_CONFIG: DeviceConfig = {
  type: 'l32a',
  family: 'drehleiter',
  label: 'L32A',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L32A',
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
    { key: 'jointTilt', label: 'Gelenk neigen', referenceSec: 34, toleranceSec: 3 },
    { key: 'jointRaise', label: 'Gelenk aufrichten', referenceSec: 34, toleranceSec: 3 },
    { key: 'fullLengthRaise', label: 'Aufrichten mit voller Leiterlaenge', referenceSec: 22, toleranceSec: 5 },
    { key: 'fullLengthTilt', label: 'Neigen mit voller Leiterlaenge', referenceSec: 22, toleranceSec: 5 },
    { key: 'fullLengthRotate', label: 'Drehen mit voller Leiterlaenge', referenceSec: 52, toleranceSec: 5 }
  ],
  overloadVariant: 'standard'
};
