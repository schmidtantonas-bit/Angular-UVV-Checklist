import type { DeviceConfig } from '../../types';
import { DREHLEITER_BASE_SECTIONS } from '../base.config';

// Placeholder example: L32XS reuses the same base but can override sections/items later.
export const L32XS_DEVICE_CONFIG: DeviceConfig = {
  type: 'l32xs',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L32XS',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  },
  sections: DREHLEITER_BASE_SECTIONS.map((section) => ({
    ...section,
    id: section.id.replace('sec-l-', 'sec-l32xs-')
  }))
};
