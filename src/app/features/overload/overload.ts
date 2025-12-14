import { Component, ViewEncapsulation, computed, effect, inject, input, signal } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { ChecklistState } from '@pages/checklist/state/checklist.state';
import { diffMm, OVERLOAD_THRESHOLD_MM, withinThresholdMm } from './overload.domain';
import { OVERLOAD_VARIANTS, type OverloadVariantId } from '@config/overload/overload-variants';
import type { OverloadField, OverloadValues } from './overload.types';

const OVERLOAD_ITEM_KEY = 'overload';
const OVERLOAD_VALUES_KEY = 'measurements';
const OVERLOAD_RESULTS_KEY = 'evaluation';

function coerceOverloadValues(value: unknown): OverloadValues {
  const raw = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const coerce = (key: OverloadField): number | null => {
    const next = raw[key];
    return typeof next === 'number' && Number.isFinite(next) ? next : null;
  };

  return {
    preloadMm: coerce('preloadMm'),
    loadStartMm: coerce('loadStartMm'),
    load10MinMm: coerce('load10MinMm'),
    afterLoadMm: coerce('afterLoadMm')
  };
}

function normalizeValuesForFields(values: OverloadValues, activeFields: readonly OverloadField[]): OverloadValues {
  const active = new Set(activeFields);
  return {
    preloadMm: active.has('preloadMm') ? values.preloadMm : null,
    loadStartMm: active.has('loadStartMm') ? values.loadStartMm : null,
    load10MinMm: active.has('load10MinMm') ? values.load10MinMm : null,
    afterLoadMm: active.has('afterLoadMm') ? values.afterLoadMm : null
  };
}

const OVERLOAD_FIELD_CARDS: Record<OverloadField, { title: string; label: string }> = {
  preloadMm: { title: 'Schritt 1: Nach der Vorbelastung', label: 'Höhe' },
  loadStartMm: { title: 'Schritt 2: Belastet – Beginn', label: 'Höhe' },
  load10MinMm: { title: 'Schritt 3: Belastet – nach 10 Minuten', label: 'Höhe' },
  afterLoadMm: { title: 'Schritt 4: Nach Belastung', label: 'Höhe' }
};

@Component({
  selector: 'app-overload',
  standalone: true,
  imports: [UiCardDirective, UiButtonDirective],
  templateUrl: './overload.html',
  styleUrl: './overload.scss',
  encapsulation: ViewEncapsulation.None
})
export class OverloadComponent {
  private readonly checklistState = inject(ChecklistState, { optional: true });

  variant = input<OverloadVariantId>('standard');

  readonly activeFields = computed(() => OVERLOAD_VARIANTS[this.variant()].fields);

  readonly thresholdMm = OVERLOAD_THRESHOLD_MM;

  private readonly initialValues = normalizeValuesForFields(
    coerceOverloadValues(
      this.checklistState ? this.checklistState.getItem(OVERLOAD_ITEM_KEY).values[OVERLOAD_VALUES_KEY] : undefined
    ),
    this.activeFields()
  );

  readonly values = signal<OverloadValues>(this.initialValues);

  readonly showDiffPreloadAfter = computed(() => {
    const fields = this.activeFields();
    return fields.includes('preloadMm') && fields.includes('afterLoadMm');
  });

  readonly showDiffLoadStart10 = computed(() => {
    const fields = this.activeFields();
    return fields.includes('loadStartMm') && fields.includes('load10MinMm');
  });

  readonly diffPreloadAfter = computed(() => {
    const { preloadMm, afterLoadMm } = this.values();
    return diffMm(preloadMm, afterLoadMm);
  });

  readonly diffLoadStart10 = computed(() => {
    const { loadStartMm, load10MinMm } = this.values();
    return diffMm(loadStartMm, load10MinMm);
  });

  setMm(field: OverloadField, raw: string) {
    const next = raw.trim() === '' ? null : Number(raw);
    this.values.update((current) => ({ ...current, [field]: Number.isFinite(next) ? next : null }));
  }

  cardFor(field: OverloadField) {
    return OVERLOAD_FIELD_CARDS[field];
  }

  valueFor(field: OverloadField): number | null {
    return this.values()[field];
  }

  save() {
    const values = normalizeValuesForFields(this.values(), this.activeFields());
    this.values.set(values);

    const diffPreloadAfterMm = this.diffPreloadAfter();
    const diffLoadStart10Mm = this.diffLoadStart10();

    this.checklistState?.setItemValue(OVERLOAD_ITEM_KEY, OVERLOAD_VALUES_KEY, values);
    this.checklistState?.setItemResult(OVERLOAD_ITEM_KEY, OVERLOAD_RESULTS_KEY, {
      thresholdMm: this.thresholdMm,
      diffPreloadAfterMm,
      diffLoadStart10Mm,
      withinThresholdPreloadAfter: withinThresholdMm(diffPreloadAfterMm, this.thresholdMm),
      withinThresholdLoadStart10: withinThresholdMm(diffLoadStart10Mm, this.thresholdMm)
    });
  }

  reset() {
    this.values.set({
      preloadMm: null,
      loadStartMm: null,
      load10MinMm: null,
      afterLoadMm: null
    });
  }

  constructor() {
    effect(() => {
      const fields = this.activeFields();
      this.values.update((current) => normalizeValuesForFields(current, fields));
    });
  }
}
