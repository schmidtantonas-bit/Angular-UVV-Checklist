import type { ChecklistCustomerDataModel } from '@features/checklist-customer-data/checklist-customer-data';
import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import type { SpeedCheckDefinition } from '@features/speed-check/speed-check.domain';
import type { DeviceFamily } from '../families';
import type { OverloadVariantId } from '../overload/overload-variants';

export type DeviceType = 'l27' | 'l32' | 'l32a' | 'l32xs' | 'l39' | 'l39_lift' | 'plc' | 'b32' | 'b36' | 'b42';

export interface DeviceConfig {
  type: DeviceType;
  family: DeviceFamily;
  label: string;
  overview: ChecklistOverviewModel;
  customerData?: ChecklistCustomerDataModel;
  speedCheckTable: readonly SpeedCheckDefinition[];
  overloadVariant: OverloadVariantId;
}
