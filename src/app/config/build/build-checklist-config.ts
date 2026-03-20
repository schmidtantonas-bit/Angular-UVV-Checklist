import { getDeviceConfig, type DeviceType } from '../devices';
import { getFamilyConfig } from '../families';
import { MISC_SECTION } from '../families/shared.sections';
import { getInspectionPackageConfig, type InspectionPackageType } from '../inspection-packages';
import { getInspectionConfig, type InspectionType } from '../inspections';
import type { ChecklistConfig } from './checklist-config';

export function buildChecklistConfig(params: {
  deviceType: DeviceType;
  inspectionType: InspectionType;
  inspectionPackage?: InspectionPackageType;
}): ChecklistConfig {
  const device = getDeviceConfig(params.deviceType);
  const family = getFamilyConfig(device.family);
  const inspection = getInspectionConfig(params.inspectionType, device.family);
  const inspectionPackageType = params.inspectionType === 'uvv' ? (params.inspectionPackage ?? 'none') : 'none';
  const inspectionPackage = getInspectionPackageConfig(inspectionPackageType);

  const overview = inspection.overview ?? device.overview;
  const sections =
    inspection.sectionMode === 'replace'
      ? [...(inspection.extraSections ?? [])]
      : [...family.uvvSections, ...(inspection.extraSections ?? []), ...inspectionPackage.extraSections, MISC_SECTION];

  const inspectionLabel =
    params.inspectionType === 'uvv' && inspectionPackageType !== 'none'
      ? `${inspection.label} / ${inspectionPackage.label}`
      : inspection.label;

  return {
    deviceType: params.deviceType,
    family: device.family,
    inspectionType: params.inspectionType,
    inspectionPackage: inspectionPackageType,
    overview,
    customerData: {
      ...(device.customerData ?? {}),
      ...(inspection.customerData ?? {}),
      deviceType: device.label,
      inspectionType: inspectionLabel,
      inspectionPackage: inspectionPackageType === 'none' ? '' : inspectionPackage.label
    },
    sections,
    speedCheckTable: device.speedCheckTable,
    overloadVariant: device.overloadVariant
  };
}
