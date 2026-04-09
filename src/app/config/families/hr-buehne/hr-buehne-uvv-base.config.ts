import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import { createCheckSection } from '../../build/section-factories';
import { createBatteryCheckSection, SPEED_CHECK_SECTION } from '../shared.sections';

export const HR_BUEHNE_UVV_BASE_SECTIONS: CheckSectionModel[] = [
  createCheckSection('sec-hr-1', 'Grundprüfungen und Vorprüfung', 'hr-1', [
    'Getriebesperre',
    'Kontrollleuchten im Fahrerhaus',
    'Warnsummer im Fahrerhaus',
    'Gelenkwelle Nebenantrieb',
    'Dichtigkeit der Abstützzylinder (vertikal)',
    'Dichtigkeit der Waagerechtzylinder (horizontal)'
  ]),
  createCheckSection('sec-hr-2', 'Unterbau und Abstützung', 'hr-2', [
    'Dichtigkeit Unterbau allgemein',
    'Federfeststellvorrichtung',
    'Schraubverbindung zwischen Fahrgestell und Grundrahmen',
    'Schweißnähte am Grundrahmen',
    'Schrauben am Drehkranz',
    'Schraubverbindung am Drehgestell',
    'Schweißnähte am Drehgestell',
    'Prüfung der Autonivellierung',
    'Befestigung der Bodenteller prüfen',
    'Prüfung Hydraulikölstand',
    'Prüfung Druckumbau unter +/- 10',
    'Prüfung Stützkraftmessung'
  ]),
  createCheckSection('sec-hr-3', 'Aufbau, Leitungen und Zylinder', 'hr-3', [
    'Gleitlager der Waagerechtbalken prüfen',
    'Hubarm prüfen (Risse, Verformung, Korrosion)',
    'Auszugseile Sichtprüfung',
    'Teleskoprohre prüfen (Risse, Verformung, Korrosion)',
    'Einzugseile Sichtprüfung',
    'Korbträger prüfen (Risse, Verformung, Korrosion)',
    'Hydraulische Leitungen und Verbindungen prüfen',
    'Korbarm prüfen (Risse, Verformung, Korrosion)',
    'Drehtisch prüfen (Risse, Verformung, Korrosion)',
    'Korbdreheinrichtung prüfen (Schraubverbindung)',
    'Teleskopzylinder prüfen (Bolzen, Befestigung)',
    'Hubarmzylinder prüfen (Bolzen, Befestigung)',
    'Nivellierzylinder prüfen (Bolzen, Befestigung)'
  ]),
  createCheckSection('sec-hr-4', 'Funktionen prüfen', 'hr-4', [
    'Bewegungsansteuerung (stufenlos)',
    'Rettungskorbbewegungen',
    'Endverlangsamungen',
    'Neige- und Anstoßsicherungen (Korb)',
    'Hand- und Notbetrieb (Elektromotor)',
    'Gegensprechanlage'
  ]),
  createCheckSection('sec-hr-5', 'Sicherheitseinrichtungen bei Stillstand', 'hr-5', [
    'Abstützung in Fahrstellung',
    'Abstützung im Zwischenstand',
    'Abstützung in Arbeitsstellung',
    'Ruhestand der Bühne',
    'Stillstandsüberwachung',
    'Optische und akustische Betriebsüberwachungseinrichtungen',
    'Variable Freistand- und Benutzungsgrenze'
  ]),
  createCheckSection('sec-hr-6', 'Weitere Sicherheits- und Systemprüfungen', 'hr-6', [
    'Hubarm prüfen',
    'Teleskopgleitlager prüfen',
    'Schleppketten (Kabel) prüfen',
    'Überlastsicherung',
    'Überlastprüfung',
    'Seilendschalter Überprüfen',
    'Variable Freistandsgrenze',
    'Variable Benutzungsgrenze',
    'Stillstand der Achsverriegelung und Abstützung',
    'Stillstand der Bewegungen am Hubrettungssatz',
    'Betriebsdrücke prüfen',
    'Abschaltung der Abstützbedienstände'
  ]),
  createCheckSection('sec-hr-7', 'Betriebsdrücke', 'hr-7', [
    'Arbeitsdruck Abstützung',
    'Arbeitsdruck Oberwagen',
    'Arbeitsdruck Korbnivellierung',
    'Arbeitsdruck Notbetrieb 24 Volt'
  ]),
  SPEED_CHECK_SECTION,
  createBatteryCheckSection('Batterien'),
  createCheckSection('sec-hr-8', 'Abschlussprüfungen und Zusatzfunktionen', 'hr-8', [
    'Abschaltung Korbschräglage',
    'Notbetrieb',
    'Warn- und Hinweisschilder',
    'Ggf. Einspielen neuer Updates',
    'Ferndiagnosesystem prüfen',
    'Funktionsprüfung Abstützung',
    'Funktionsprüfung Freistandsgrenze',
    'Variable Freistandsgrenze',
    'Funktionskontrolle Bedienungselemente HBS',
    'Funktionskontrolle Bedienungselemente KBS',
    'Funktionskontrolle Zusatzausstattung',
    'Funktionskontrolle Generatorfernstart',
    'Ölprobe',
    'Ölfilter',
    'Funktion Ölkühler + Temperatursensor',
    'Funktion Arbeitsplattform Korb mit Abschottung',
    'Funktion Monitor + Grundstellung',
    'Funktion Notabstiegsleiter + Handlauf',
    'Funktion Lastsensor Korb',
    'Funktion Windmesser',
    'Funktion Mannschaftsdüse',
    'Funktion Sicherheitsüberwachung Notbetrieb'
  ]),
  createCheckSection('sec-hr-9', 'Mess- und Nachweisteile', 'hr-9', [
    'Messwerte / Messdauer dokumentieren',
    'Prüfung mit Prüflast dokumentieren',
    'Prüfung mit Mehrzweckzug dokumentieren',
    '3 Personen Freistandsgrenze dokumentieren',
    '2 Personen Freistandsgrenze dokumentieren',
    '1 Person Freistandsgrenze dokumentieren',
    'Benutzungsgrenze dokumentieren',
    'Notwendige Instandsetzungsarbeiten dokumentieren'
  ]),
  {
    id: 'sec-operational-status-1',
    title: '10. Einsatzfähigkeit',
    pdfTitle: 'Einsatzfähigkeit',
    total: 1,
    completed: 0,
    items: [],
    customStateKey: 'operational-status'
  }
];
