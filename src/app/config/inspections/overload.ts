import type { DeviceFamily } from '../families';
import type { InspectionConfig } from './types';

export function createOverloadInspectionConfig(family: DeviceFamily): InspectionConfig {
  const items =
    family === 'hr_buehne'
      ? [
          { id: 'ol-01', title: 'Überlastsicherung', status: null },
          { id: 'ol-02', title: 'Überlastprüfung', status: null },
          { id: 'ol-03', title: 'Variable Freistandsgrenze', status: null },
          { id: 'ol-04', title: 'Variable Benutzungsgrenze', status: null }
        ]
      : [
          { id: 'ol-01', title: 'Überlastwarneinrichtung (Lasthupe)', status: null },
          { id: 'ol-02', title: 'Überlastprüfung (Hysterese)', status: null },
          { id: 'ol-03', title: 'Sicherheitseinrichtungen', status: null },
          { id: 'ol-04', title: 'Gebrauchstauglichkeit', status: null }
        ];

  return {
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
        title: family === 'hr_buehne' ? 'Überlastprüfung HR Bühne' : 'Überlastprüfung Drehleiter',
        total: items.length,
        completed: 0,
        items
      }
    ]
  };
}
