import type { DeviceConfig } from '../../types';
import { DREHLEITER_BASE_SECTIONS } from '../base';

export const L32_DEVICE_CONFIG: DeviceConfig = {
  type: 'l32',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L32',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  },
  sections: DREHLEITER_BASE_SECTIONS.map((s) => ({
    ...s,
    id: s.id.replace('sec-l-', 'sec-l32-')
  }))
};

