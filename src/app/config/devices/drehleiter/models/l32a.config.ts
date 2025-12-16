import type { DeviceConfig } from '../../types';
import { DREHLEITER_BASE_SECTIONS } from '../base.config';

// TODO: Modell-spezifische Anpassungen ergänzen.
export const L32A_DEVICE_CONFIG: DeviceConfig = {
  type: 'l32a',
  overview: {
    title: 'UVV-Drehleiter',
    subtitle: 'L32A',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  },
  sections: DREHLEITER_BASE_SECTIONS.map((section) => ({
    ...section,
    id: section.id.replace('sec-l-', 'sec-l32a-')
  }))
};
