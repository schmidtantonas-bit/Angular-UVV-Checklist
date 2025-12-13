import { Injectable, signal } from '@angular/core';

/**
 * ChecklistStateService
 * - Hält den aktuellen Checklisten-Fortschritt und Eingaben (Signals)
 * - Später: Persistenz (IndexedDB) optional
 */
@Injectable({ providedIn: 'root' })
export class ChecklistStateService {
  readonly progress = signal<number>(0);
  // TODO: Add item states, measurements, photos, defects, etc.
}
