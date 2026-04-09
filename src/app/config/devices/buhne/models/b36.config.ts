import type { DeviceConfig } from '../../types';

export const B36_DEVICE_CONFIG: DeviceConfig = {
  type: 'b36',
  family: 'hr_buehne',
  label: 'B36',
  overview: {
    title: 'UVV-HR Bühne',
    subtitle: 'B36',
    imageSrc: '/assets/images/B36.png',
    imageAlt: 'HR Bühne B36'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 30, toleranceSec: 3 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 30, toleranceSec: 3 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 42, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 43, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren', referenceSec: 62, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren', referenceSec: 73, toleranceSec: 3 },
    { key: 'jointTilt', label: 'Korbarm neigen', referenceSec: 68, toleranceSec: 3 },
    { key: 'jointRaise', label: 'Korbarm aufrichten', referenceSec: 68, toleranceSec: 3 },
    { key: 'basketRotateFast', label: 'Korb drehen schnell', referenceSec: 15, toleranceSec: 3 },
    { key: 'basketRotateSlow', label: 'Korb drehen langsam', referenceSec: 30, toleranceSec: 3 }
  ],
  overloadVariant: 'buehne'
};
