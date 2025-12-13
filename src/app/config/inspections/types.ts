import type { CheckSectionModel } from '@features/sections/check-section/check-section';

export type InspectionType = 'uvv' | 'vde' | 'overload';

export interface InspectionConfig {
  type: InspectionType;
  label: string;
  extraSections?: CheckSectionModel[];
}

