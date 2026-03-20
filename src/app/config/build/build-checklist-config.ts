import { getDeviceConfig, type DeviceType } from '../devices';
import { getFamilyConfig } from '../families';
import { MISC_SECTION } from '../families/shared.sections';
import { getInspectionPackageConfig, type InspectionPackageType } from '../inspection-packages';
import { getInspectionConfig, type InspectionType } from '../inspections';
import type { ChecklistConfig } from './checklist-config';
import type { CheckSectionModel } from '@features/sections/check-section/check-section';

const SECTION_NUMBER_PATTERN = /^\d+\.\s+/;

function takeSection(sections: CheckSectionModel[], sectionId: string): CheckSectionModel | undefined {
  const index = sections.findIndex((section) => section.id === sectionId);
  if (index === -1) {
    return undefined;
  }

  const [section] = sections.splice(index, 1);
  return section;
}

function renumberSections(sections: CheckSectionModel[]): CheckSectionModel[] {
  return sections.map((section, index) => ({
    ...section,
    title: `${index + 1}. ${section.title.replace(SECTION_NUMBER_PATTERN, '')}`
  }));
}

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
  const speedSection = takeSection(baseSections, 'sec-speed-1');
  const batterySection = takeSection(baseSections, 'sec-battery-1');
  const operationalStatusSection = takeSection(baseSections, 'sec-operational-status-1');

  const overview = inspection.overview ?? device.overview;
  const sections =
    inspection.sectionMode === 'replace'
      ? renumberSections([...(inspection.extraSections ?? [])])
      : renumberSections([
          ...baseSections,
          ...(inspection.extraSections ?? []),
          ...inspectionPackage.extraSections,
          ...(speedSection ? [speedSection] : []),
          ...(batterySection ? [batterySection] : []),
          ...overloadSections,
          MISC_SECTION,
          ...(operationalStatusSection ? [operationalStatusSection] : [])
        ]);

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
