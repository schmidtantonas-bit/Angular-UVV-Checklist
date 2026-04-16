import type { DeviceConfig } from '../../types';

export const PLC_DEVICE_CONFIG: DeviceConfig = {
  type: 'plc',
  family: 'drehleiter',
  label: 'PLC',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'PLC',
    imageSrc: '/assets/images/PLC.png',
    imageAlt: 'Drehleiter PLC'
  },
  speedCheckTable: [
    { key: 'rotateRight', label: 'Drehen rechts', referenceSec: 24, toleranceSec: 3 },
    { key: 'rotateLeft', label: 'Drehen links', referenceSec: 24, toleranceSec: 3 },
    { key: 'raise', label: 'Aufrichten', referenceSec: 39, toleranceSec: 3 },
    { key: 'tilt', label: 'Neigen', referenceSec: 44, toleranceSec: 3 },
    { key: 'extend', label: 'Ausfahren volle Laenge', referenceSec: 30, toleranceSec: 3 },
    { key: 'retract', label: 'Einfahren volle Laenge', referenceSec: 28, toleranceSec: 3 }
  ],
  overloadVariant: 'standard'
};
