import { getDeviceConfig, type DeviceType } from '../devices';
import { getInspectionConfig, type InspectionType } from '../inspections';
import type { ChecklistConfig } from './checklist-config';

export function buildChecklistConfig(params: {
  deviceType: DeviceType;
  inspectionType: InspectionType;
}): ChecklistConfig {
  const device = getDeviceConfig(params.deviceType);
  const inspection = getInspectionConfig(params.inspectionType);

  const overview = inspection.overview ?? device.overview;
  const sections =
    inspection.sectionMode === 'replace'
      ? [...(inspection.extraSections ?? [])]
      : [...device.sections, ...(inspection.extraSections ?? [])];

  return {
    deviceType: params.deviceType,
    inspectionType: params.inspectionType,
    overview,
    customerData: {
      ...(device.customerData ?? {}),
      ...(inspection.customerData ?? {}),
      deviceType: device.overview.subtitle,
      inspectionType: inspection.label
    },
    sections
  };
}
