import { Component, ViewEncapsulation, computed, signal } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';

type OverloadField = 'preloadMm' | 'loadStartMm' | 'load10MinMm' | 'afterLoadMm';

interface OverloadValues {
  preloadMm: number | null;
  loadStartMm: number | null;
  load10MinMm: number | null;
  afterLoadMm: number | null;
}

@Component({
  selector: 'app-overload',
  standalone: true,
  imports: [UiCardDirective, UiButtonDirective],
  templateUrl: './overload.html',
  styleUrl: './overload.scss',
  encapsulation: ViewEncapsulation.None
})
export class OverloadComponent {
  readonly thresholdMm = 100;

  readonly values = signal<OverloadValues>({
    preloadMm: null,
    loadStartMm: null,
    load10MinMm: null,
    afterLoadMm: null
  });

  readonly diffPreloadAfter = computed(() => {
    const { preloadMm, afterLoadMm } = this.values();
    if (preloadMm == null || afterLoadMm == null) return null;
    return preloadMm - afterLoadMm;
  });

  readonly diffLoadStart10 = computed(() => {
    const { loadStartMm, load10MinMm } = this.values();
    if (loadStartMm == null || load10MinMm == null) return null;
    return loadStartMm - load10MinMm;
  });

  setMm(field: OverloadField, raw: string) {
    const next = raw.trim() === '' ? null : Number(raw);
    this.values.update((current) => ({ ...current, [field]: Number.isFinite(next) ? next : null }));
  }

  save() {
    // TODO: später an Store/Backend anschließen
    console.log('overload save', this.values());
  }

  reset() {
    this.values.set({
      preloadMm: null,
      loadStartMm: null,
      load10MinMm: null,
      afterLoadMm: null
    });
  }
}
