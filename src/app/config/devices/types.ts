import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';

export type DeviceType = 'l32' | 'l32s' | 'b32';

export interface DeviceConfig {
  type: DeviceType;
  overview: ChecklistOverviewModel;
  sections: CheckSectionModel[];
}

