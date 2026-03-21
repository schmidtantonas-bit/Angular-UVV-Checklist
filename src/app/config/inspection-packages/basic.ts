import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const BASIC_ITEMS = [
  'Erinnerung Sicherheitsueberpruefung',
  'Anfahrt inkl. Tag- und Nachtspesen',
  'Jaehrliche Sicherheitsueberpruefung nach DGUV 305-002',
  'Ueberlastpruefung nach Herstellervorgaben',
  'Sichtpruefung Aufbau inkl. Notbetrieb',
  'Funktionspruefung Aufbau',
  'Inspektionsbericht mit Uebergabe',
  'Eintrag ins Pruefbuch',
  'Infoangebot bei Bedarf',
  'Filtereinsatz Haupthydraulik alle 2 Jahre / 150 Bh',
  'Reparaturen zzgl. Arbeitszeit und Material'
] as const;

export const BASIC_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'basic',
  label: 'Inspektion BASIC (4h)',
  extraSections: [
    createCheckSection('sec-package-1', 'Inspektionsart: Inspektion BASIC (4h)', 'pkg-basic', BASIC_ITEMS)
  ]
};
