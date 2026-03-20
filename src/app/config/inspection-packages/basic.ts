import { createCheckSection } from '../build/section-factories';
import type { InspectionPackageConfig } from './types';

const BASIC_ITEMS = [
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
  'Durchfuehren von notwendigen Reparaturen zzgl. Arbeitszeit und Material'
] as const;

export const BASIC_INSPECTION_PACKAGE_CONFIG: InspectionPackageConfig = {
  type: 'basic',
  label: 'Inspektion BASIC (4h)',
  extraSections: [createCheckSection('sec-package-1', 'Inspektionsart: BASIC', 'pkg-basic', BASIC_ITEMS)]
};
