import { Injectable, computed, signal } from '@angular/core';
import type { CheckStatus } from '@features/sections/check-item/check-item';

export interface ChecklistItemState {
  status: CheckStatus;
  note: string;
  photos: File[];
  values: Record<string, unknown>;
  results: Record<string, unknown>;
}

export interface ChecklistStateSnapshot {
  totalCount: number;
  items: Record<string, ChecklistItemState>;
}

function emptyItemState(): ChecklistItemState {
  return {
    status: null,
    note: '',
    photos: [],
    values: {},
    results: {}
  };
}

@Injectable()
export class ChecklistState {
  private readonly totalCountSignal = signal(0);
  private readonly itemsSignal = signal<Record<string, ChecklistItemState>>({});

  readonly totalCount = computed(() => this.totalCountSignal());

  readonly completedCount = computed(() => {
    const items = Object.values(this.itemsSignal());
    return items.filter((item) => item.status !== null).length;
  });

  readonly progressPercent = computed(() => {
    const total = this.totalCountSignal();
    if (total <= 0) return 0;
    return Math.round((this.completedCount() / total) * 100);
  });

  snapshot(): ChecklistStateSnapshot {
    return {
      totalCount: this.totalCountSignal(),
      items: this.itemsSignal()
    };
  }

  setTotalCount(totalCount: number) {
    this.totalCountSignal.set(Number.isFinite(totalCount) ? Math.max(0, totalCount) : 0);
  }

  getItem(itemKey: string): ChecklistItemState {
    return this.itemsSignal()[itemKey] ?? emptyItemState();
  }

  setItemStatus(itemKey: string, status: CheckStatus) {
    this.patchItem(itemKey, { status });
  }

  setItemNote(itemKey: string, note: string) {
    this.patchItem(itemKey, { note });
  }

  setItemPhotos(itemKey: string, photos: File[]) {
    this.patchItem(itemKey, { photos });
  }

  setItemValue(itemKey: string, key: string, value: unknown) {
    const current = this.itemsSignal()[itemKey] ?? emptyItemState();
    this.patchItem(itemKey, { values: { ...current.values, [key]: value } });
  }

  setItemResult(itemKey: string, key: string, value: unknown) {
    const current = this.itemsSignal()[itemKey] ?? emptyItemState();
    this.patchItem(itemKey, { results: { ...current.results, [key]: value } });
  }

  clear() {
    this.totalCountSignal.set(0);
    this.itemsSignal.set({});
  }

  private patchItem(itemKey: string, patch: Partial<ChecklistItemState>) {
    this.itemsSignal.update((current) => {
      const prev = current[itemKey] ?? emptyItemState();
      return { ...current, [itemKey]: { ...prev, ...patch } };
    });
  }
}

