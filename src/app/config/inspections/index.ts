import type { ChecklistCustomerDataInspectionType } from '@features/checklist-customer-data/checklist-customer-data';
import type { DeviceFamily } from '../families';
import { createOverloadInspectionConfig } from './overload';
import type { InspectionConfig, InspectionType } from './types';
import { UVV_INSPECTION_CONFIG } from './uvv';
import { VDE_INSPECTION_CONFIG } from './vde';

export type { InspectionConfig, InspectionType } from './types';

export const INSPECTION_TYPE_OPTIONS: ChecklistCustomerDataInspectionType[] = [
  { value: 'uvv', label: 'UVV' },
  { value: 'overload', label: 'Überlast' }
];

const INSPECTION_CONFIGS: Record<InspectionType, InspectionConfig> = {
  uvv: UVV_INSPECTION_CONFIG,
  vde: VDE_INSPECTION_CONFIG,
  overload: createOverloadInspectionConfig('drehleiter')
};

export function isInspectionType(value: string): value is InspectionType {
  return value === 'uvv' || value === 'overload';
}

export function getInspectionConfig(type: InspectionType, family: DeviceFamily = 'drehleiter'): InspectionConfig {
  if (type === 'overload') {
    return createOverloadInspectionConfig(family);
  }
  return INSPECTION_CONFIGS[type];
}
