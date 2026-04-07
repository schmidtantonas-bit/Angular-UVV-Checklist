import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const PRO_ITEMS = [
  'Inspektionsbericht mit Übergabe',
  'Eintrag ins Prüfbuch',
  'Angebotserstellung für Bearbeitung festgestellter Mängel',
  'Wechsel Filtereinsatz Haupthydraulik alle 2 Jahre / 150 Betriebsstunden',
  'Elektrische Kästen und Deckel kontrollieren',
  'Elektrische Drehdurchführung prüfen/reinigen',
  'Aus- und Einzugsseile prüfen/einstellen',
  'Kabel im Leitersatz prüfen/einstellen',
  'Fehlerspeicher / Service 4 Fire auslesen',
  'Performance prüfen / Bewegungen optimieren',
  'Wassermonitor prüfen',
  'Lagerung Krankentrage prüfen',
  'Notstromgenerator mit 400V Notbetrieb prüfen',
  'Softwareupdates prüfen',
  'Sensorik / Geber prüfen und kalibrieren',
  'Schmierstellen reinigen und abschmieren'
] as const;

export const PRO_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'pro',
  label: 'Service PRO (10h)',
  extraSections: [
    createCheckSection('sec-package-1', 'Service PRO (10h)', 'pkg-pro', PRO_ITEMS)
  ]
};
