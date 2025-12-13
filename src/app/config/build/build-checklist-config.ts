import { getDeviceConfig, type DeviceType } from '../devices';
import { getInspectionConfig, type InspectionType } from '../inspections';
import type { ChecklistConfig } from './checklist-config';

export function buildChecklistConfig(params: {
  deviceType: DeviceType;
  inspectionType: InspectionType;
}): ChecklistConfig {
  const device = getDeviceConfig(params.deviceType);
  const inspection = getInspectionConfig(params.inspectionType);

  return {
    deviceType: params.deviceType,
    inspectionType: params.inspectionType,
    overview: device.overview,
    sections: [...device.sections, ...(inspection.extraSections ?? [])]
  };
}

