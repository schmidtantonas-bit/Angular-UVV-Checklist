import type { CheckSectionModel } from '@features/sections/check-section/check-section';

export type DeviceFamily = 'drehleiter' | 'hr_buehne';

export interface DeviceFamilyConfig {
  id: DeviceFamily;
  uvvSections: CheckSectionModel[];
}
