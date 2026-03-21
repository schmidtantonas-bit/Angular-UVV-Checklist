import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const PRO_ITEMS = [
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
  'Reparaturen zzgl. Arbeitszeit und Material',
  'Elektrische Kaesten und Deckel kontrollieren',
  'Elektrische Drehdurchfuehrung pruefen/reinigen',
  'Aus- und Einzugsseile pruefen/einstellen',
  'Kabel im Leitersatz pruefen/einstellen',
  'Fehlerspeicher / Service 4 Fire auslesen',
  'Performance pruefen / Bewegungen optimieren',
  'Wassermonitor pruefen',
  'Krankentragelagerung pruefen',
  'Notstromgenerator mit 400V Notbetrieb pruefen',
  'Softwareupdates pruefen',
  'Sensorik / Geber pruefen und kalibrieren',
  'Schmierstellen reinigen und abschmieren',
  'Reparaturen zzgl. Arbeitszeit und Material'
] as const;

export const PRO_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'pro',
  label: 'Service PRO (8h)',
  extraSections: [
    createCheckSection('sec-package-1', 'Inspektionsart: Service PRO (8h)', 'pkg-pro', PRO_ITEMS)
  ]
};
