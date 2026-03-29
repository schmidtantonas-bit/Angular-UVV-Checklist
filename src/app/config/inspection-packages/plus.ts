import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const PLUS_ITEMS = [
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
  'Reparaturen zzgl. Arbeitszeit und Material',
  'Elektrische Kästen und Deckel kontrollieren',
  'Elektrische Drehdurchführung prüfen/reinigen',
  'Aus- und Einzugsseile prüfen/einstellen',
  'Kabel im Leitersatz prüfen/einstellen',
  'Fehlerspeicher / Service 4 Fire auslesen',
  'Performance prüfen / Bewegungen optimieren',
  'Wassermonitor prüfen',
  'Krankentragelagerung prüfen',
  'Notstromgenerator mit 400V Notbetrieb prüfen',
  'Reparaturen zzgl. Arbeitszeit und Material'
] as const;

export const PLUS_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'plus',
  label: 'Service PLUS (6h)',
  extraSections: [
    createCheckSection('sec-package-1', 'Service PLUS (6h)', 'pkg-plus', PLUS_ITEMS)
  ]
};
