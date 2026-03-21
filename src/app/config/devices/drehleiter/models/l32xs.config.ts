import type { DeviceConfig } from '../../types';
import { L32A_DEVICE_CONFIG } from './l32a.config';

export const L32XS_DEVICE_CONFIG: DeviceConfig = {
  ...L32A_DEVICE_CONFIG,
  type: 'l32xs',
  label: 'L32XS',
  overview: {
    ...L32A_DEVICE_CONFIG.overview,
    subtitle: 'L32XS',
  }
};
