import type { CheckStatus } from '@features/sections/check-item/check-item';

export interface CheckSectionItemSnapshot {
  key: string;
  status: CheckStatus;
}

export interface CheckSectionSummary {
  totalCount: number;
  completedCount: number;
  progressPercent: number;
}

export function summarizeSection(items: CheckSectionItemSnapshot[]): CheckSectionSummary {
  const totalCount = items.length;
  const completedCount = items.filter((item) => item.status !== null).length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  return { totalCount, completedCount, progressPercent };
}

