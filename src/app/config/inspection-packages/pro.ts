import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const PRO_ITEMS = [
  'Inspektionsbericht mit Uebergabe',
  'Eintrag ins Pruefbuch',
  'Angebotserstellung fuer Bearbeitung festgestellter Maengel',
  'Wechsel Filtereinsatz Haupthydraulik alle 2 Jahre / 150 Betriebsstunden',
  'Elektrische Kaesten und Deckel kontrollieren',
  'Elektrische Drehdurchfuehrung pruefen/reinigen',
  'Aus- und Einzugsseile pruefen/einstellen',
  'Kabel im Leitersatz pruefen/einstellen',
  'Fehlerspeicher / Service 4 Fire auslesen',
  'Performance pruefen / Bewegungen optimieren',
  'Wassermonitor pruefen',
  'Lagerung Krankentrage pruefen',
  'Notstromgenerator mit 400V Notbetrieb pruefen',
  'Softwareupdates pruefen',
  'Sensorik / Geber pruefen und kalibrieren',
  'Schmierstellen reinigen und abschmieren'
] as const;

export const PRO_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'pro',
  label: 'Service PRO',
  extraSections: [
    createCheckSection('sec-package-1', 'Service PRO', 'pkg-pro', PRO_ITEMS)
  ]
};
