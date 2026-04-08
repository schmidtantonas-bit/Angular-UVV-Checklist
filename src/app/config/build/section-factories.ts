import type { CheckItemModel } from '@features/sections/check-item/check-item';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';

function createItemId(prefix: string, index: number): string {
  return `${prefix}-${String(index + 1).padStart(2, '0')}`;
}

export function createCheckItems(prefix: string, titles: readonly string[]): CheckItemModel[] {
  return titles.map((title, index) => ({
    id: createItemId(prefix, index),
    title,
    status: null
  }));
}

export function createCheckSection(
  id: string,
  title: string,
  prefix: string,
  itemTitles: readonly string[],
  pdfTitle?: string
): CheckSectionModel {
  return {
    id,
    title,
    pdfTitle,
    total: itemTitles.length,
    completed: 0,
    items: createCheckItems(prefix, itemTitles)
  };
}

export function createEmptySection(id: string, title: string, pdfTitle?: string): CheckSectionModel {
  return {
    id,
    title,
    pdfTitle,
    total: 0,
    completed: 0,
    items: []
  };
}
