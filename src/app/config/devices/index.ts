import type { ChecklistCustomerDataDeviceTypeOption } from '@features/checklist-customer-data/checklist-customer-data';
import type { ChecklistOverviewModel } from '@features/checklist-overview/checklist-overview';
import { B32_DEVICE_CONFIG, B36_DEVICE_CONFIG, B42_DEVICE_CONFIG } from './buhne/models';
import {
  L27_DEVICE_CONFIG,
  L32_DEVICE_CONFIG,
  L32A_DEVICE_CONFIG,
  L39_DEVICE_CONFIG,
  L39_LIFT_DEVICE_CONFIG,
  PLC_DEVICE_CONFIG
} from './drehleiter/models';
export type { DeviceConfig, DeviceType } from './types';
import type { DeviceConfig, DeviceType } from './types';

export const DEVICE_TYPE_OPTIONS: ChecklistCustomerDataDeviceTypeOption[] = [
  { value: 'l27', label: 'L27' },
  { value: 'l32', label: 'L32' },
  { value: 'l32a', label: 'L32A/XS' },
  { value: 'l39', label: 'L39' },
  { value: 'l39_lift', label: 'L39 Lift' },
  { value: 'plc', label: 'PLC' },
  { value: 'b32', label: 'B32' },
  { value: 'b36', label: 'B36' },
  { value: 'b42', label: 'B42' }
];

const DEVICE_CONFIGS: Record<DeviceType, DeviceConfig> = {
  l27: L27_DEVICE_CONFIG,
  l32: L32_DEVICE_CONFIG,
  l32a: L32A_DEVICE_CONFIG,
  l39: L39_DEVICE_CONFIG,
  l39_lift: L39_LIFT_DEVICE_CONFIG,
  plc: PLC_DEVICE_CONFIG,
  b32: B32_DEVICE_CONFIG,
  b36: B36_DEVICE_CONFIG,
  b42: B42_DEVICE_CONFIG
};

export function isDeviceType(value: string): value is DeviceType {
  return (
    value === 'l27' ||
    value === 'l32' ||
    value === 'l32a' ||
    value === 'l39' ||
    value === 'l39_lift' ||
    value === 'plc' ||
    value === 'b32' ||
    value === 'b36' ||
    value === 'b42'
  );
}

export function getDeviceConfig(deviceType: DeviceType): DeviceConfig {
  return DEVICE_CONFIGS[deviceType];
}

export function overviewForDevice(deviceType: DeviceType): ChecklistOverviewModel {
  return getDeviceConfig(deviceType).overview;
}
