import type { DeviceConfig } from '../../types';

export const B42_DEVICE_CONFIG: DeviceConfig = {
  type: 'b42',
  family: 'hr_buehne',
  label: 'B42',
  overview: {
    title: 'UVV-HR Buehne',
    subtitle: 'B42',
    imageSrc: '/assets/images/B42.png',
    imageAlt: 'HR Buehne B42'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 30, toleranceSec: 3 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 30, toleranceSec: 3 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 42, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 43, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren', referenceSec: 72, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren', referenceSec: 76, toleranceSec: 3 },
    { key: 'jointTilt', label: 'Korbarm neigen', referenceSec: 68, toleranceSec: 3 },
    { key: 'jointRaise', label: 'Korbarm aufrichten', referenceSec: 68, toleranceSec: 3 },
    { key: 'basketRotateFast', label: 'Korb drehen schnell', referenceSec: 15, toleranceSec: 3 },
    { key: 'basketRotateSlow', label: 'Korb drehen langsam', referenceSec: 30, toleranceSec: 3 }
  ],
  overloadVariant: 'buehne'
};
