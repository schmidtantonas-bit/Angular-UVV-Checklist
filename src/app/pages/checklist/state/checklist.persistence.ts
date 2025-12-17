import { Injectable, effect, inject } from '@angular/core';
import { ChecklistState, type PersistedChecklistStateSnapshot } from './checklist.state';

const STORAGE_KEY = 'uvv-checklist:checklist-state:v1';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readSnapshot(): PersistedChecklistStateSnapshot | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed as PersistedChecklistStateSnapshot;
  } catch {
    return null;
  }
}

function writeSnapshot(snapshot: PersistedChecklistStateSnapshot) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Ignore quota / serialization errors.
  }
}

@Injectable()
export class ChecklistPersistence {
  private readonly state = inject(ChecklistState);

  constructor() {
    this.state.hydrate(readSnapshot());

    effect(() => {
      writeSnapshot(this.state.persistedSnapshot());
    });
  }

  clearPersisted() {
    if (!isBrowser()) return;
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
}

