import type { CheckSectionModel } from '@features/sections/check-section/check-section';

export type InspectionPackageType = 'none' | 'basic' | 'plus' | 'pro';

export interface InspectionPackageConfig {
  type: InspectionPackageType;
  label: string;
  extraSections: CheckSectionModel[];
}
