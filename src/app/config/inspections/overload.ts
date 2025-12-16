import type { InspectionConfig } from './types';

export const OVERLOAD_INSPECTION_CONFIG: InspectionConfig = {
  type: 'overload',
  label: 'Überlastprüfung',
  overview: {
    title: 'Überlastprüfung',
    subtitle: '',
    imageSrc: '/assets/images/overload-bild.png',
    imageAlt: 'Überlastprüfung'
  },
  sectionMode: 'replace',
  extraSections: [
    {
      id: 'sec-overload-1',
      title: 'Überlastprüfung',
      total: 4,
      completed: 0,
      items: [
        { id: '10-01', title: 'Sicherheitseinrichtungen', status: null },
        { id: '10-02', title: 'Gebrauchstauglichkeit', status: null },
        { id: '10-03', title: 'Anstoßsicherungen', status: null },
        { id: '10-04', title: 'Seiteneinstellvorrichtung', status: null }
      ]
    }
  ]
};
