import { DREHLEITER_UVV_BASE_SECTIONS } from './drehleiter/uvv-base.config';
import { HR_BUEHNE_UVV_BASE_SECTIONS } from './hr-buehne/uvv-base.config';
import type { DeviceFamily, DeviceFamilyConfig } from './types';

export type { DeviceFamily, DeviceFamilyConfig } from './types';

const FAMILY_CONFIGS: Record<DeviceFamily, DeviceFamilyConfig> = {
  drehleiter: {
    id: 'drehleiter',
    uvvSections: DREHLEITER_UVV_BASE_SECTIONS
  },
  hr_buehne: {
    id: 'hr_buehne',
    uvvSections: HR_BUEHNE_UVV_BASE_SECTIONS
  }
};

export function getFamilyConfig(family: DeviceFamily): DeviceFamilyConfig {
  return FAMILY_CONFIGS[family];
}
