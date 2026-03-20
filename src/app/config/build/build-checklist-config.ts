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
  const overloadInspection = getInspectionConfig('overload', device.family);
  const inspectionPackageType = params.inspectionType === 'uvv' ? (params.inspectionPackage ?? 'none') : 'none';
  const inspectionPackage = getInspectionPackageConfig(inspectionPackageType);
  const overloadSections = params.inspectionType === 'uvv' ? [...(overloadInspection.extraSections ?? [])] : [];
  const baseSections = [...family.uvvSections];
  const lastBaseSection = baseSections.at(-1);
  const operationalStatusSection =
    lastBaseSection?.id === 'sec-operational-status-1' ? baseSections.pop() : undefined;

  const overview = inspection.overview ?? device.overview;
  const sections =
    inspection.sectionMode === 'replace'
      ? [...(inspection.extraSections ?? [])]
      : [
          ...baseSections,
          ...(inspection.extraSections ?? []),
          ...inspectionPackage.extraSections,
          ...overloadSections,
          MISC_SECTION,
          ...(operationalStatusSection ? [operationalStatusSection] : [])
        ];

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
