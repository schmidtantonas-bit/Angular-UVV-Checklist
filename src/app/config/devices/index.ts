import type { ChecklistCustomerDataDeviceTypeOption } from '@features/checklist-customer-data/checklist-customer-data';
import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';
import { B32_DEVICE_CONFIG } from './buhne/models';
import { L32_DEVICE_CONFIG, L32S_DEVICE_CONFIG } from './drehleiter/models';
export type { DeviceConfig, DeviceType } from './types';
import type { DeviceConfig, DeviceType } from './types';

export const DEVICE_TYPE_OPTIONS: ChecklistCustomerDataDeviceTypeOption[] = [
  { value: 'l32', label: 'L32' },
  { value: 'b32', label: 'B32' }
];

const DEVICE_CONFIGS: Record<DeviceType, DeviceConfig> = {
  l32: L32_DEVICE_CONFIG,
  l32s: L32S_DEVICE_CONFIG,
  b32: B32_DEVICE_CONFIG
};

export function isDeviceType(value: string): value is DeviceType {
  return value === 'l32' || value === 'l32s' || value === 'b32';
}

export function getDeviceConfig(deviceType: DeviceType): DeviceConfig {
  return DEVICE_CONFIGS[deviceType];
}

export function overviewForDevice(deviceType: DeviceType): ChecklistOverviewModel {
  return getDeviceConfig(deviceType).overview;
}

export function sectionsForDevice(deviceType: DeviceType): CheckSectionModel[] {
  return getDeviceConfig(deviceType).sections;
}
