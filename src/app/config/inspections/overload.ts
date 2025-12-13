import type { InspectionConfig } from './types';

export const OVERLOAD_INSPECTION_CONFIG: InspectionConfig = {
  type: 'overload',
  label: 'Überlast',
  extraSections: [
    {
      id: 'sec-overload-1',
      title: 'Überlastprüfung',
      total: 2,
      completed: 0,
      items: [
        { id: 'OVL-01', title: 'Grenzwertprüfung', status: null },
        { id: 'OVL-02', title: 'Protokollierung', status: null }
      ]
    }
  ]
};

