import type { DeviceConfig } from '../../types';

export const B32_DEVICE_CONFIG: DeviceConfig = {
  type: 'b32',
  overview: {
    title: 'UVV-Bühne',
    subtitle: 'B32',
    imageSrc: '/assets/images/B32.png',
    imageAlt: 'Bühne'
  },
  sections: [
    {
      id: 'sec-b32-1',
      title: 'Bühne – Grundprüfung',
      total: 3,
      completed: 0,
      items: [
        { id: 'B-01', title: 'Not-Aus Funktion', status: null },
        { id: 'B-02', title: 'Abstützung geprüft', status: null },
        { id: 'B-03', title: 'Warnhinweise vorhanden', status: null }
      ]
    }
  ]
};
