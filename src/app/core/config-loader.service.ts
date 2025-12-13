import { Injectable, Signal, computed, signal } from '@angular/core';
import { buildChecklistConfig } from '@config/build/build-checklist-config';
import { isDeviceType, type DeviceType } from '@config-devices';
import { INSPECTION_TYPE_OPTIONS, isInspectionType, type InspectionType } from '@config-inspections';
import type { ChecklistConfig } from '@config/build/checklist-config';

/**
 * ConfigLoaderService
 * - Hält die aktuelle Wizard-Auswahl
 * - Lädt/Mergt passende Konfiguration (Gerät + Inspection)
 * - Stellt ein Signal für die aktive Config bereit
 */
@Injectable({ providedIn: 'root' })
export class ConfigLoaderService {
  private readonly selection = signal<{ device?: DeviceType; inspection?: InspectionType }>({
    device: 'l32',
    inspection: 'uvv'
  });

  readonly currentConfig: Signal<ChecklistConfig> = computed(() => {
    const selection = this.selection();
    return buildChecklistConfig({
      deviceType: selection.device ?? 'l32',
      inspectionType: selection.inspection ?? 'uvv'
    });
  });

  setSelection(partial: { device?: string; inspection?: string }) {
    this.selection.update((prev) => ({
      device: partial.device && isDeviceType(partial.device) ? partial.device : prev.device,
      inspection:
        partial.inspection && isInspectionType(partial.inspection) ? partial.inspection : prev.inspection
    }));
  }

  // Expose the current option list for simple UIs (Wizard/CustomerData).
  readonly inspectionOptions = INSPECTION_TYPE_OPTIONS;
}
