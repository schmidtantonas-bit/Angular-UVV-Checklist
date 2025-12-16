import type { ChecklistCustomerDataModel } from '@features/checklist-customer-data/checklist-customer-data';
import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';

export type DeviceType = 'l32' | 'l32a' | 'l32xs' | 'b32';

export interface DeviceConfig {
  type: DeviceType;
  overview: ChecklistOverviewModel;
  customerData?: ChecklistCustomerDataModel;
  sections: CheckSectionModel[];
}
