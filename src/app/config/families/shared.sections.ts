import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import { createCheckSection, createEmptySection } from '../build/section-factories';

export const BATTERY_CHECK_ITEMS = [
  'Batterie / Batteriefach',
  'Abdeckung / Verriegelung',
  'Wanne (VA)',
  'Kabelfuehrung',
  'Kabelsicherung',
  'Entlueftung',
  'Batteriehalter (Befestigung)'
] as const;

export function createBatteryCheckSection(title: string, pdfTitle?: string, items: readonly string[] = BATTERY_CHECK_ITEMS): CheckSectionModel {
  return createCheckSection('sec-battery-1', title, 'battery', items, pdfTitle);
}

export const BATTERY_CHECK_SECTION: CheckSectionModel = createBatteryCheckSection('Batterien');

export const SPEED_CHECK_SECTION: CheckSectionModel = createEmptySection('sec-speed-1', 'Geschwindigkeiten');

export const MISC_SECTION: CheckSectionModel = createEmptySection('sec-misc-1', 'Sonstiges');
