import type { ChecklistCustomerDataModel } from '@features/checklist-customer-data/checklist-customer-data';
import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';

export type InspectionType = 'uvv' | 'vde' | 'overload';

export interface InspectionConfig {
  type: InspectionType;
  label: string;
  overview?: ChecklistOverviewModel;
  customerData?: ChecklistCustomerDataModel;
  sectionMode?: 'append' | 'replace';
  extraSections?: CheckSectionModel[];
}
