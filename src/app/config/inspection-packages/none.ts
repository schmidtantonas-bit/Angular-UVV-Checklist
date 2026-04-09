import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

export const NONE_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'none',
  label: 'Keine Zusatzinspektion',
  extraSections: [
    createCheckSection(
      'sec-package-1',
      'Keine Zusatzinspektion',
      'pkg-none',
      ['Keine Zusatzinspektion ausgewählt']
    )
  ]
};
