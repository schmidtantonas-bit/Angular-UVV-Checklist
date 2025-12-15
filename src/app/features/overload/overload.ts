import { Component, Injector, ViewEncapsulation, computed, effect, inject, input, signal } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { ChecklistState } from '@pages/checklist/state/checklist.state';
import { diffEvaluationMm, OVERLOAD_THRESHOLD_MM, withinThresholdMm, type DiffEvaluationMm } from './overload.domain';
import { OVERLOAD_VARIANTS, type OverloadVariantId } from '@config/overload/overload-variants';
import { OVERLOAD_UI_LAYOUTS } from '@config/overload/overload-layout';
import { OVERLOAD_FIELD_UI, OVERLOAD_RESULTS_UI, type OverloadResultId } from '@config/overload/overload-ui';
import { TimerCountdownComponent } from '@ui/timer-countdown/timer-countdown';
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

type OverloadBlockView =
  | {
      id: string;
      kind: 'step';
      field: OverloadField;
      stepNumber: number;
      title: string;
      label: string;
    }
  | {
      id: string;
      kind: 'result';
      result: OverloadResultId;
      title: string;
    };

@Component({
  selector: 'app-overload',
  standalone: true,
  imports: [UiCardDirective, UiButtonDirective, TimerCountdownComponent],
  templateUrl: './overload.html',
  styleUrl: './overload.scss',
  encapsulation: ViewEncapsulation.None
})
export class OverloadComponent {
  private readonly injector = inject(Injector);
  private readonly checklistState = inject(ChecklistState, { optional: true });

  variant = input<OverloadVariantId>('standard');

  readonly activeFields = computed(() => OVERLOAD_VARIANTS[this.variant()].fields);
  readonly layout = computed(() => OVERLOAD_UI_LAYOUTS[this.variant()] ?? OVERLOAD_UI_LAYOUTS.standard);
  readonly columns = computed(() => this.layout().columns);

  readonly thresholdMm = OVERLOAD_THRESHOLD_MM;
  readonly countdownDurationMs = 10 * 60 * 1000;

  readonly countdownStarted = signal(false);
  readonly countdownHidden = signal(false);

  private readonly initialValues = normalizeValuesForFields(
    coerceOverloadValues(
      this.checklistState ? this.checklistState.getItem(OVERLOAD_ITEM_KEY).values[OVERLOAD_VALUES_KEY] : undefined
    ),
    this.activeFields()
  );

  readonly values = signal<OverloadValues>(this.initialValues);

  readonly visibleBlocks = computed<OverloadBlockView[]>(() => {
    const fields = new Set(this.activeFields());
    let stepNumber = 1;

    return this.layout().blocks.reduce<OverloadBlockView[]>((blocks, block) => {
      if (block.kind === 'step') {
        if (!fields.has(block.field)) return blocks;
        const meta = OVERLOAD_FIELD_UI[block.field];

        blocks.push({
          id: `step-${block.field}`,
          kind: 'step',
          field: block.field,
          stepNumber: stepNumber++,
          title: meta.title,
          label: meta.label
        });

        return blocks;
      }

      const meta = OVERLOAD_RESULTS_UI[block.result];
      const allRequiredFieldsVisible = meta.requires.every((field) => fields.has(field));
      if (!allRequiredFieldsVisible) return blocks;

      blocks.push({
        id: `result-${block.result}`,
        kind: 'result',
        result: block.result,
        title: meta.title
      });

      return blocks;
    }, []);
  });

  readonly diffPreloadAfterEvaluation = computed(() => {
    const { preloadMm, afterLoadMm } = this.values();
    return diffEvaluationMm(preloadMm, afterLoadMm, this.thresholdMm);
  });

  readonly diffLoadStart10Evaluation = computed(() => {
    const { loadStartMm, load10MinMm } = this.values();
    return diffEvaluationMm(loadStartMm, load10MinMm, this.thresholdMm);
  });

  setMm(field: OverloadField, raw: string) {
    const next = raw.trim() === '' ? null : Number(raw);
    this.values.update((current) => ({ ...current, [field]: Number.isFinite(next) ? next : null }));
  }

  valueFor(field: OverloadField): number | null {
    return this.values()[field];
  }

  resultEvaluation(result: OverloadResultId): DiffEvaluationMm {
    switch (result) {
      case 'diffPreloadAfter':
        return this.diffPreloadAfterEvaluation();
      case 'diffLoadStart10':
        return this.diffLoadStart10Evaluation();
      default:
        return { valueMm: null, status: 'empty' };
    }
  }

  save() {
    const values = normalizeValuesForFields(this.values(), this.activeFields());
    this.values.set(values);

    const diffPreloadAfterMm = this.diffPreloadAfterEvaluation().valueMm;
    const diffLoadStart10Mm = this.diffLoadStart10Evaluation().valueMm;

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
    this.countdownStarted.set(false);
    this.countdownHidden.set(false);
  }

  ngOnInit(): void {
    effect(
      () => {
        const fields = this.activeFields();
        this.values.update((current) => normalizeValuesForFields(current, fields));
      },
      { injector: this.injector }
    );

    effect(
      () => {
        const fields = this.activeFields();
        const hasCountdownFields = fields.includes('loadStartMm') && fields.includes('load10MinMm');
        if (!hasCountdownFields) {
          this.countdownStarted.set(false);
          this.countdownHidden.set(false);
          return;
        }

        if (this.countdownStarted()) return;

        const { loadStartMm, load10MinMm } = this.values();
        if (load10MinMm != null) return;
        if (!isCompleteHeightMm(loadStartMm)) return;

        this.countdownStarted.set(true);
        this.countdownHidden.set(false);
      },
      { injector: this.injector }
    );
  }

  toggleCountdownHidden() {
    this.countdownHidden.update((current) => !current);
  }
}

function isCompleteHeightMm(valueMm: number | null): boolean {
  if (valueMm == null) return false;
  if (!Number.isInteger(valueMm)) return false;
  return valueMm >= 10000 && valueMm <= 99999;
}
