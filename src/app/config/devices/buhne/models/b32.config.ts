import type { DeviceConfig } from '../../types';
import { BUHNE_BASE_SECTIONS } from '../base.config';

export const B32_DEVICE_CONFIG: DeviceConfig = {
  type: 'b32',
  overview: {
    title: 'UVV-Bühne',
    subtitle: 'B32',
    imageSrc: '/assets/images/B32.png',
    imageAlt: 'Bühne'
  },
  customerData: {
    customerName: '',
    address: '',
    orderNumber: '',
    licensePlate: '',
    deviceType: 'B32',
    bodyNumber: '',
    mileageKm: '',
    operatingHours: '',
    serviceTechnician: '',
    date: '',
    location: ''
  },
  sections: BUHNE_BASE_SECTIONS.map((section) => ({
    ...section,
    id: section.id.startsWith('sec-b-') ? section.id.replace('sec-b-', 'sec-b32-') : section.id
  }))
};
