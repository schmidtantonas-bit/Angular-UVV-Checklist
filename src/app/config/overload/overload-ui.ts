import type { OverloadField } from '@features/overload/overload.types';

export interface OverloadFieldUiConfig {
  title: string;
  label: string;
}

export const OVERLOAD_FIELD_UI: Record<OverloadField, OverloadFieldUiConfig> = {
  preloadMm: { title: 'Nach der Vorbelastung', label: 'Höhe' },
  loadStartMm: { title: 'Belastet – Beginn', label: 'Höhe' },
  load10MinMm: { title: 'Belastet – nach 10 Minuten', label: 'Höhe' },
  afterLoadMm: { title: 'Nach Belastung', label: 'Höhe' }
};

export type OverloadResultId = 'diffPreloadAfter' | 'diffLoadStart10';

export interface OverloadResultUiConfig {
  id: OverloadResultId;
  title: string;
  requires: readonly OverloadField[];
}

export const OVERLOAD_RESULTS_UI: Record<OverloadResultId, OverloadResultUiConfig> = {
  diffPreloadAfter: {
    id: 'diffPreloadAfter',
    title: 'Differenz Vorbelastung – Nach Belastung',
    requires: ['preloadMm', 'afterLoadMm']
  },
  diffLoadStart10: {
    id: 'diffLoadStart10',
    title: 'Differenz Belastet (Beginn) – Belastet (nach 10 Minuten)',
    requires: ['loadStartMm', 'load10MinMm']
  }
};
