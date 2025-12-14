import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';

type SpeedKey =
  | 'rotate90'
  | 'tilt'
  | 'raise'
  | 'extend'
  | 'retract'
  | 'jointTilt'
  | 'jointRaise';

interface SpeedDefinition {
  key: SpeedKey;
  label: string;
  referenceSec: number;
  toleranceSec: number;
}

const SPEED_DEFINITIONS: SpeedDefinition[] = [
  { key: 'rotate90', label: 'Drehen 90°', referenceSec: 23, toleranceSec: 5 },
  { key: 'tilt', label: 'Neigen', referenceSec: 36, toleranceSec: 5 },
  { key: 'raise', label: 'Aufrichten', referenceSec: 36, toleranceSec: 5 },
  { key: 'extend', label: 'Ausfahren', referenceSec: 34, toleranceSec: 5 },
  { key: 'retract', label: 'Einfahren', referenceSec: 39, toleranceSec: 5 },
  { key: 'jointTilt', label: 'Gelenk neigen', referenceSec: 48, toleranceSec: 5 },
  { key: 'jointRaise', label: 'Gelenk aufrichten', referenceSec: 45, toleranceSec: 5 }
];

type SpeedValues = Record<SpeedKey, number | null>;

function createEmptyValues(): SpeedValues {
  return {
    rotate90: null,
    tilt: null,
    raise: null,
    extend: null,
    retract: null,
    jointTilt: null,
    jointRaise: null
  };
}

@Component({
  selector: 'app-speed-check',
  standalone: true,
  imports: [UiCardDirective, UiButtonDirective],
  templateUrl: './speed-check.html',
  styleUrl: './speed-check.scss',
  encapsulation: ViewEncapsulation.None
})
export class SpeedCheckComponent {
  readonly definitions = SPEED_DEFINITIONS;

  readonly values = signal<SpeedValues>(createEmptyValues());

  readonly results = computed(() =>
    this.definitions.map((definition) => {
      const measuredSec = this.values()[definition.key];
      const deltaSec = measuredSec == null ? null : measuredSec - definition.referenceSec;
      const withinTolerance =
        measuredSec == null ? null : Math.abs(deltaSec ?? 0) <= definition.toleranceSec;
      return { ...definition, measuredSec, deltaSec, withinTolerance };
    })
  );

  readonly okCount = computed(() => this.results().filter((row) => row.withinTolerance === true).length);
  readonly filledCount = computed(() => this.results().filter((row) => row.measuredSec != null).length);

  setSeconds(field: SpeedKey, raw: string) {
    const next = raw.trim() === '' ? null : Number(raw);
    this.values.update((current) => ({ ...current, [field]: Number.isFinite(next) ? next : null }));
  }

  save() {
    // TODO: später an Store/Backend anschließen
    console.log('speed-check save', this.values());
  }

  reset() {
    this.values.set(createEmptyValues());
  }
}

