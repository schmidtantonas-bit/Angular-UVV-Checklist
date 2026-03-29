import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const BASIC_ITEMS = [
  'Erinnerung Sicherheitsüberprüfung',
  'Anfahrt inkl. Tag- und Nachtspesen',
  'Jährliche Sicherheitsüberprüfung nach DGUV 305-002',
  'Überlastprüfung nach Herstellervorgaben',
  'Sichtprüfung Aufbau inkl. Notbetrieb',
  'Funktionsprüfung Aufbau',
  'Inspektionsbericht mit Übergabe',
  'Eintrag ins Prüfbuch',
  'Infoangebot bei Bedarf',
  'Filtereinsatz Haupthydraulik alle 2 Jahre / 150 Bh',
  'Reparaturen zzgl. Arbeitszeit und Material'
] as const;

export const BASIC_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'basic',
  label: 'Inspektion BASIC (4h)',
  extraSections: [
    createCheckSection('sec-package-1', 'Inspektion BASIC (4h)', 'pkg-basic', BASIC_ITEMS)
  ]
};
