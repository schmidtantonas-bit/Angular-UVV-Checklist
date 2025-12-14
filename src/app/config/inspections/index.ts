import type { ChecklistCustomerDataInspectionType } from '@features/checklist-customer-data/checklist-customer-data';
import { OVERLOAD_INSPECTION_CONFIG } from './overload';
import type { InspectionConfig, InspectionType } from './types';
import { UVV_INSPECTION_CONFIG } from './uvv';
import { VDE_INSPECTION_CONFIG } from './vde';

export type { InspectionConfig, InspectionType } from './types';

export const INSPECTION_TYPE_OPTIONS: ChecklistCustomerDataInspectionType[] = [
  { value: 'uvv', label: 'UVV' },
  { value: 'vde', label: 'VDE' },
  { value: 'overload', label: 'Überlast' }
];

const INSPECTION_CONFIGS: Record<InspectionType, InspectionConfig> = {
  uvv: UVV_INSPECTION_CONFIG,
  vde: VDE_INSPECTION_CONFIG,
  overload: OVERLOAD_INSPECTION_CONFIG
};

export function isInspectionType(value: string): value is InspectionType {
  return value === 'uvv' || value === 'vde' || value === 'overload';
}

export function getInspectionConfig(type: InspectionType): InspectionConfig {
  return INSPECTION_CONFIGS[type];
}
