import type { DeviceConfig } from '../../types';

export const L39_DEVICE_CONFIG: DeviceConfig = {
  type: 'l39',
  family: 'drehleiter',
  label: 'L39',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L39',
    imageSrc: '/assets/images/L39.png',
    imageAlt: 'Drehleiter L39'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 20, toleranceSec: 4 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 20, toleranceSec: 4 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 31, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 34, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren', referenceSec: 43, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren', referenceSec: 45, toleranceSec: 3 }
  ],
  overloadVariant: 'standard'
};
