import type { InspectionConfig } from '../types';

export const VDE_INSPECTION_CONFIG: InspectionConfig = {
  type: 'vde',
  label: 'VDE',
  extraSections: [
    {
      id: 'sec-vde-1',
      title: 'VDE Prüfung',
      total: 3,
      completed: 0,
      items: [
        { id: 'VDE-01', title: 'Sichtprüfung Kabel/Stecker', status: null },
        { id: 'VDE-02', title: 'Schutzleiterwiderstand', status: null },
        { id: 'VDE-03', title: 'Isolationswiderstand', status: null }
      ]
    }
  ]
};
