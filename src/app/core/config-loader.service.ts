import { Injectable, Signal, computed, signal } from '@angular/core';

/**
 * ConfigLoaderService
 * - Hält die aktuelle Wizard-Auswahl
 * - Lädt/Mergt passende Konfiguration (Gerät + Inspection)
 * - Stellt ein Signal für die aktive Config bereit
 */
@Injectable({ providedIn: 'root' })
export class ConfigLoaderService {
  private readonly selection = signal<{ device?: string; inspection?: string }>({});

  readonly currentConfig: Signal<unknown> = computed(() => {
    // TODO: Load + merge config based on selection (device, inspection)
    // Placeholder returns null until implemented.
    return null;
  });

  setSelection(partial: { device?: string; inspection?: string }) {
    this.selection.update((prev) => ({ ...prev, ...partial }));
  }
}
