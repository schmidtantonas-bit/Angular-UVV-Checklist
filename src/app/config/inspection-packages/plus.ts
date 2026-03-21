import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const PLUS_ITEMS = [
  'Erinnerung an die alljaehrliche Sicherheitsueberpruefung',
  'Anfahrpauschale mit Tag- und Nachtspesen',
  'Jaehrliche Sicherheitsueberpruefung gemaess Pruefanweisung des Herstellers in Anlehnung an DGUV-Grundsatz 305-002',
  'Ueberlastpruefung des Aufbaus nach Herstellervorgaben (Spezialwerkzeug)',
  'Sichtpruefung des elektrischen, mechanischen und hydraulischen Aufbaus inkl. hydraulischem Notbetrieb',
  'Funktionspruefung des elektrischen, mechanischen und hydraulischen Aufbaus',
  'Anfertigen eines Inspektionsberichtes mit Uebergabegespraech',
  'Eintrag in das Pruefbuch der Drehleiter',
  'Im Nachgang Erstellen eines Infoangebotes, falls erforderlich',
  'Wechsel des Filtereinsatzes der Haupthydraulikanlage alle 2 Jahre oder 150 Betriebsstunden',
  'Durchfuehren von notwendigen Reparaturen zzgl. Arbeitszeit und Material',
  'Oeffnen und Kontrollieren aller elektrischen Verteilerkaesten, Bedienelemente und Montagedeckel',
  'Pruefen und ggf. Reinigen der elektrischen Drehdurchfuehrung',
  'Pruefen und ggf. Einstellen der Aus- und Einzugsseile im Leitersatz',
  'Pruefen und ggf. Einstellen der Kabel im Leitersatz',
  'Fehlerspeicher oder Service 4 Fire auslesen, auswerten, speichern und zuruecksetzen',
  'Performance pruefen und Bewegungen ggf. optimieren',
  'Funktionspruefung des Wassermonitors',
  'Funktionspruefung der Krankentragelagerung',
  'Funktionspruefung Notstromgenerator in Verbindung mit 400V Notbetrieb',
  'Durchfuehren von notwendigen Reparaturen zzgl. Arbeitszeit und Material'
] as const;

export const PLUS_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'plus',
  label: 'Service PLUS (+2h)',
  extraSections: [
    createCheckSection('sec-package-1', 'Inspektionsart: Service PLUS (+2h)', 'pkg-plus', PLUS_ITEMS)
  ]
};
