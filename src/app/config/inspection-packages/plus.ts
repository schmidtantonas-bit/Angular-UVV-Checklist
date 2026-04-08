import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const PLUS_ITEMS = [
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
  'Notstromgenerator mit 400V Notbetrieb pruefen'
] as const;

export const PLUS_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'plus',
  label: 'Service PLUS',
  extraSections: [
    createCheckSection('sec-package-1', 'Service PLUS', 'pkg-plus', PLUS_ITEMS)
  ]
};
