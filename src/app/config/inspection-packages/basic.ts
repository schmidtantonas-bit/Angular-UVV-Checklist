import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const BASIC_ITEMS = [
  'Inspektionsbericht mit Uebergabe',
  'Eintrag ins Pruefbuch',
  'Angebotserstellung fuer Bearbeitung festgestellter Maengel',
  'Wechsel Filtereinsatz Haupthydraulik alle 2 Jahre / 150 Betriebsstunden'
] as const;

export const BASIC_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'basic',
  label: 'Inspektion BASIC',
  extraSections: [
    createCheckSection('sec-package-1', 'Inspektion BASIC', 'pkg-basic', BASIC_ITEMS)
  ]
};
