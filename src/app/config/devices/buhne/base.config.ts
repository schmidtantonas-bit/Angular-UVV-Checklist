import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import { DREHLEITER_BASE_SECTIONS } from '../drehleiter/base.config';

export const BUHNE_BASE_SECTIONS: CheckSectionModel[] = DREHLEITER_BASE_SECTIONS.map((section) => ({
  ...section,
  id: section.id.startsWith('sec-l-') ? section.id.replace('sec-l-', 'sec-b-') : section.id
}));
