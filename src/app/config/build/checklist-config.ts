import type { ChecklistCustomerDataModel } from '@features/checklist-customer-data/checklist-customer-data';
import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import type { SpeedCheckDefinition } from '@features/speed-check/speed-check.domain';
import type { DeviceType } from '../devices';
import type { DeviceFamily } from '../families';
import type { InspectionPackageType } from '../inspection-packages';
import type { InspectionType } from '../inspections';
import type { OverloadVariantId } from '../overload/overload-variants';

export interface ChecklistConfig {
  deviceType: DeviceType;
  family: DeviceFamily;
  inspectionType: InspectionType;
  inspectionPackage: InspectionPackageType;
  overview: ChecklistOverviewModel;
  customerData: ChecklistCustomerDataModel;
  sections: CheckSectionModel[];
  speedCheckTable: readonly SpeedCheckDefinition[];
  overloadVariant: OverloadVariantId;
}
