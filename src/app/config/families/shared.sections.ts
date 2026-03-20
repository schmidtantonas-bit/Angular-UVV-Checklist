import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import { createCheckSection, createEmptySection } from '../build/section-factories';

export const BATTERY_CHECK_SECTION: CheckSectionModel = createCheckSection('sec-battery-1', 'Batterien', 'battery', [
  'Batterie / Batteriefach',
  'Allgemeiner Zustand Starterbatterien',
  'Austausch empfohlen',
  'Zustand der Lagerung und Befestigung der Batterien'
]);

export const SPEED_CHECK_SECTION: CheckSectionModel = createEmptySection('sec-speed-1', 'Geschwindigkeiten');

export const MISC_SECTION: CheckSectionModel = createEmptySection('sec-misc-1', 'Sonstiges');
