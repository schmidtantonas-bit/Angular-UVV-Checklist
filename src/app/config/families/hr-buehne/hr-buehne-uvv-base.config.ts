import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import { createCheckSection } from '../../build/section-factories';
import { BATTERY_CHECK_SECTION, SPEED_CHECK_SECTION } from '../shared.sections';

export const HR_BUEHNE_UVV_BASE_SECTIONS: CheckSectionModel[] = [
  createCheckSection('sec-hr-1', 'Grundpruefungen und Vorpruefung', 'hr-1', [
    'Getriebesperre',
    'Kontrollleuchten im Fahrerhaus',
    'Warnsummer im Fahrerhaus',
    'Gelenkwelle Nebenantrieb',
    'Dichtigkeit der Abstuetzzylinder (vertikal)',
    'Dichtigkeit der Waagerechtzylinder (horizontal)'
  ]),
  createCheckSection('sec-hr-2', 'Unterbau und Abstuetzung', 'hr-2', [
    'Dichtigkeit Unterbau allgemein',
    'Federfeststellvorrichtung',
    'Schraubverbindung zwischen Fahrgestell und Grundrahmen',
    'Schweissnaehte am Grundrahmen',
    'Schrauben am Drehkranz',
    'Schraubverbindung am Drehgestell',
    'Schweissnaehte am Drehgestell',
    'Pruefung der Autonivellierung',
    'Befestigung der Bodenteller pruefen',
    'Pruefung Hydraulikoelstand',
    'Pruefung Druckumbau unter +/- 10',
    'Pruefung Stuetzkraftmessung'
  ]),
  createCheckSection('sec-hr-3', 'Aufbau, Leitungen und Zylinder', 'hr-3', [
    'Gleitlager der Waagerechtbalken pruefen',
    'Hubarm pruefen (Risse, Verformung, Korrosion)',
    'Auszugseile Sichtpruefung',
    'Teleskoprohre pruefen (Risse, Verformung, Korrosion)',
    'Einzugseile Sichtpruefung',
    'Korbtraeger pruefen (Risse, Verformung, Korrosion)',
    'Hydraulische Leitungen und Verbindungen pruefen',
    'Korbarm pruefen (Risse, Verformung, Korrosion)',
    'Drehtisch pruefen (Risse, Verformung, Korrosion)',
    'Korbdreheinrichtung pruefen (Schraubverbindung)',
    'Teleskopzylinder pruefen (Bolzen, Befestigung)',
    'Hubarmzylinder pruefen (Bolzen, Befestigung)',
    'Nivellierzylinder pruefen (Bolzen, Befestigung)'
  ]),
  createCheckSection('sec-hr-4', 'Funktionen pruefen', 'hr-4', [
    'Bewegungsansteuerung (stufenlos)',
    'Rettungskorbbewegungen',
    'Endverlangsamungen',
    'Neige- und Anstosssicherungen (Korb)',
    'Hand- und Notbetrieb (Elektromotor)',
    'Gegensprechanlage'
  ]),
  createCheckSection('sec-hr-5', 'Sicherheitseinrichtungen bei Stillstand', 'hr-5', [
    'Abstuetzung in Fahrstellung',
    'Abstuetzung im Zwischenstand',
    'Abstuetzung in Arbeitsstellung',
    'Ruhestand der Buehne',
    'Stillstandsueberwachung',
    'Optische und akustische Betriebsueberwachungseinrichtungen',
    'Variable Freistand- und Benutzungsgrenze'
  ]),
  createCheckSection('sec-hr-6', 'Weitere Sicherheits- und Systempruefungen', 'hr-6', [
    'Hubarm pruefen',
    'Teleskopgleitlager pruefen',
    'Schleppketten (Kabel) pruefen',
    'Ueberlastsicherung',
    'Ueberlastpruefung',
    'Seilendschalter ueberpruefen',
    'Variable Freistandsgrenze',
    'Variable Benutzungsgrenze',
    'Stillstand der Achsverriegelung und Abstuetzung',
    'Stillstand der Bewegungen am Hubrettungssatz',
    'Betriebsdruecke pruefen',
    'Abschaltung der Abstuetzbedienstaende'
  ]),
  createCheckSection('sec-hr-7', 'Betriebsdruecke', 'hr-7', [
    'Arbeitsdruck Abstuetzung',
    'Arbeitsdruck Oberwagen',
    'Arbeitsdruck Korbnivellierung',
    'Arbeitsdruck Notbetrieb 24 Volt'
  ]),
  SPEED_CHECK_SECTION,
  BATTERY_CHECK_SECTION,
  createCheckSection('sec-hr-8', 'Abschlusspruefungen und Zusatzfunktionen', 'hr-8', [
    'Abschaltung Korbschraeglage',
    'Notbetrieb',
    'Warn- und Hinweisschilder',
    'Ggf. Einspielen neuer Updates',
    'Ferndiagnosesystem pruefen',
    'Funktionspruefung Abstuetzung',
    'Funktionspruefung Freistandsgrenze',
    'Variable Freistandsgrenze',
    'Funktionskontrolle Bedienungselemente HBS',
    'Funktionskontrolle Bedienungselemente KBS',
    'Funktionskontrolle Zusatzausstattung',
    'Funktionskontrolle Generatorfernstart',
    'Oelprobe',
    'Oelfilter',
    'Funktion Oelkuehler + Temperatursensor',
    'Funktion Arbeitsplattform Korb mit Abschottung',
    'Funktion Monitor + Grundstellung',
    'Funktion Notabstiegsleiter + Handlauf',
    'Funktion Lastsensor Korb',
    'Funktion Windmesser',
    'Funktion Mannschaftsduese',
    'Funktion Sicherheitsueberwachung Notbetrieb'
  ]),
  createCheckSection('sec-hr-9', 'Mess- und Nachweisteile', 'hr-9', [
    'Messwerte / Messdauer dokumentieren',
    'Pruefung mit Prueflast dokumentieren',
    'Pruefung mit Mehrzweckzug dokumentieren',
    '3 Personen Freistandsgrenze dokumentieren',
    '2 Personen Freistandsgrenze dokumentieren',
    '1 Person Freistandsgrenze dokumentieren',
    'Benutzungsgrenze dokumentieren',
    'Notwendige Instandsetzungsarbeiten dokumentieren'
  ]),
  {
    id: 'sec-operational-status-1',
    title: '10. Einsatzfaehigkeit',
    total: 1,
    completed: 0,
    items: [],
    customStateKey: 'operational-status'
  }
];
