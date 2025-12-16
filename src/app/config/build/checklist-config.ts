import type { ChecklistCustomerDataModel } from '@features/checklist-customer-data/checklist-customer-data';
import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import type { DeviceType } from '../devices';
import type { InspectionType } from '../inspections';

export interface ChecklistConfig {
  deviceType: DeviceType;
  inspectionType: InspectionType;
  overview: ChecklistOverviewModel;
  customerData: ChecklistCustomerDataModel;
  sections: CheckSectionModel[];
}
