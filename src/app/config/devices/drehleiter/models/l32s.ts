import type { DeviceConfig } from '../../types';
import { DREHLEITER_BASE_SECTIONS } from '../base';

// Placeholder example: L32/S reuses the same base but can override sections/items later.
export const L32S_DEVICE_CONFIG: DeviceConfig = {
  type: 'l32s',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L32/S',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  },
  sections: DREHLEITER_BASE_SECTIONS.map((s) => ({
    ...s,
    id: s.id.replace('sec-l-', 'sec-l32s-')
  }))
};

