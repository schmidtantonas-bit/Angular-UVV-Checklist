import type { ChecklistCustomerDataInspectionType } from '@features/checklist-customer-data/checklist-customer-data';
import { BASIC_INSPECTION_PACKAGE_CONFIG } from './basic';
import { NONE_INSPECTION_PACKAGE_CONFIG } from './none';
import { PLUS_INSPECTION_PACKAGE_CONFIG } from './plus';
import { PRO_INSPECTION_PACKAGE_CONFIG } from './pro';
import type { InspectionPackageConfig, InspectionPackageType } from './types';

export type { InspectionPackageConfig, InspectionPackageType } from './types';

export const INSPECTION_PACKAGE_OPTIONS: ChecklistCustomerDataInspectionType[] = [
  { value: 'none', label: 'Keine Zusatzinspektion' },
  { value: 'basic', label: 'Inspektion BASIC (4h)' },
  { value: 'plus', label: 'Service PLUS (+2h)' },
  { value: 'pro', label: 'Service PRO (+4h)' }
];

const INSPECTION_PACKAGE_CONFIGS: Record<InspectionPackageType, InspectionPackageConfig> = {
  none: NONE_INSPECTION_PACKAGE_CONFIG,
  basic: BASIC_INSPECTION_PACKAGE_CONFIG,
  plus: PLUS_INSPECTION_PACKAGE_CONFIG,
  pro: PRO_INSPECTION_PACKAGE_CONFIG
};

export function isInspectionPackageType(value: string): value is InspectionPackageType {
  return value === 'none' || value === 'basic' || value === 'plus' || value === 'pro';
}

export function getInspectionPackageConfig(type: InspectionPackageType): InspectionPackageConfig {
  return INSPECTION_PACKAGE_CONFIGS[type];
}
