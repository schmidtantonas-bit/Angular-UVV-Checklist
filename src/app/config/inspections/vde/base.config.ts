import type { InspectionConfig } from '../types';

export const VDE_INSPECTION_CONFIG: InspectionConfig = {
  type: 'vde',
  label: 'VDE',
  extraSections: [
    {
      id: 'sec-vde-1',
      title: 'VDE Pruefung',
      total: 3,
      completed: 0,
      items: [
        { id: 'VDE-01', title: 'Sichtpruefung Kabel/Stecker', status: null },
        { id: 'VDE-02', title: 'Schutzleiterwiderstand', status: null },
        { id: 'VDE-03', title: 'Isolationswiderstand', status: null }
      ]
    }
  ]
};
