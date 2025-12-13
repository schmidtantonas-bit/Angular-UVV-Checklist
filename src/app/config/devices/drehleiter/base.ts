import type { CheckSectionModel } from '@features/sections/check-section/check-section';

// Shared sections for Drehleiter family (L32, L32/S, ...)
export const DREHLEITER_BASE_SECTIONS: CheckSectionModel[] = [
  {
    id: 'sec-l-1',
    title: 'Fahrerhaus Innen',
    total: 11,
    completed: 0,
    items: [{ id: '1-01', title: 'Akustische und optische Warneinrichtungen', status: null }]
  },
  {
    id: 'sec-l-2',
    title: 'Fahrerhaus Außen',
    total: 4,
    completed: 0,
    items: [
      { id: '2-01', title: 'Beleuchtungseinrichtungen am Gesamtfahrzeug (Chassis + Aufbau)', status: null },
      { id: '2-02', title: 'Abdeckkappen Ladeerhaltung', status: null },
      { id: '2-03', title: 'Beschilderung am Fahrerhaus', status: null }
    ]
  }
];

