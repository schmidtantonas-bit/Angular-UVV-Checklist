import { Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { TimerStopwatchModalComponent } from '@ui/timer-stopwatch-modal/timer-stopwatch-modal';
import { ChecklistState } from '@pages/checklist/state/checklist.state';
import {
  DEFAULT_SPEED_CHECK_TABLE,
  evaluateSpeedCheck,
  type SpeedCheckKey,
  type SpeedCheckMeasurements
} from './speed-check.domain';

function createEmptyValues(): SpeedCheckMeasurements {
  return Object.fromEntries(DEFAULT_SPEED_CHECK_TABLE.map((row) => [row.key, null])) as SpeedCheckMeasurements;
}

const SPEED_CHECK_ITEM_KEY = 'speed-check';
const SPEED_CHECK_VALUES_KEY = 'measurements';
const SPEED_CHECK_RESULTS_KEY = 'evaluation';
const SPEED_CHECK_SUMMARY_KEY = 'summary';

function coerceMeasurements(value: unknown): SpeedCheckMeasurements {
  const raw = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  return Object.fromEntries(
    DEFAULT_SPEED_CHECK_TABLE.map((row) => {
      const next = raw[row.key];
      return [row.key, typeof next === 'number' && Number.isFinite(next) ? next : null];
    })
  ) as SpeedCheckMeasurements;
}

@Component({
  selector: 'app-speed-check',
  standalone: true,
  imports: [UiCardDirective, UiButtonDirective, TimerStopwatchModalComponent],
  templateUrl: './speed-check.html',
  styleUrl: './speed-check.scss',
  encapsulation: ViewEncapsulation.None
})
export class SpeedCheckComponent {
  private readonly checklistState = inject(ChecklistState, { optional: true });

  private readonly initialMeasurements = coerceMeasurements(
    this.checklistState ? this.checklistState.getItem(SPEED_CHECK_ITEM_KEY).values[SPEED_CHECK_VALUES_KEY] : undefined
  );

  readonly values = signal<SpeedCheckMeasurements>(this.initialMeasurements);

  readonly results = computed(() => evaluateSpeedCheck(this.values(), DEFAULT_SPEED_CHECK_TABLE));

  readonly okCount = computed(() => this.results().filter((row) => row.withinTolerance === true).length);
  readonly filledCount = computed(() => this.results().filter((row) => row.measuredSec != null).length);

  readonly measuring = signal<{ key: SpeedCheckKey; label: string } | null>(null);

  setSeconds(field: SpeedCheckKey, raw: string) {
    const next = raw.trim() === '' ? null : Number(raw);
    this.values.update((current) => ({ ...current, [field]: Number.isFinite(next) ? next : null }));
  }

  openMeasurement(key: SpeedCheckKey, label: string) {
    if (this.measuring() != null) return;
    this.measuring.set({ key, label });
  }

  closeMeasurement() {
    this.measuring.set(null);
  }

  acceptMeasurement(ms: number) {
    const context = this.measuring();
    if (!context) return;

    const seconds = Math.round((ms / 1000) * 100) / 100;
    this.values.update((current) => ({ ...current, [context.key]: seconds }));
    this.measuring.set(null);
  }

  save() {
    const values = this.values();
    const results = this.results();

    this.checklistState?.setItemValue(SPEED_CHECK_ITEM_KEY, SPEED_CHECK_VALUES_KEY, values);
    this.checklistState?.setItemResult(SPEED_CHECK_ITEM_KEY, SPEED_CHECK_RESULTS_KEY, results);
    this.checklistState?.setItemResult(SPEED_CHECK_ITEM_KEY, SPEED_CHECK_SUMMARY_KEY, {
      okCount: this.okCount(),
      filledCount: this.filledCount()
    });
  }

  reset() {
    this.values.set(createEmptyValues());
    this.measuring.set(null);
  }
}
