import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const PLUS_ITEMS = [
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
  'Notstromgenerator mit 400V Notbetrieb prüfen'
] as const;

export const PLUS_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'plus',
  label: 'Service PLUS (6h)',
  extraSections: [
    createCheckSection('sec-package-1', 'Service PLUS (6h)', 'pkg-plus', PLUS_ITEMS)
  ]
};
