import type { DeviceConfig } from '../../types';

export const L39_LIFT_DEVICE_CONFIG: DeviceConfig = {
  type: 'l39_lift',
  family: 'drehleiter',
  label: 'L39 Lift',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L39 Lift',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 20, toleranceSec: 4 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 20, toleranceSec: 4 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 32, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 35, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren', referenceSec: 43, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren', referenceSec: 47, toleranceSec: 3 },
    { key: 'liftUp', label: 'Lift auffahren', referenceSec: 33, toleranceSec: 4 },
    { key: 'liftDown', label: 'Lift abfahren', referenceSec: 33, toleranceSec: 4 }
  ],
  overloadVariant: 'standard'
};
