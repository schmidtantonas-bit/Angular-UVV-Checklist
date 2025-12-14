import { Directive, HostBinding, Input } from '@angular/core';

export type UiCardVariant = 'raised' | 'flat';
export type UiCardPadding = 'none' | 's' | 'm';

@Directive({
  selector: '[uiCard],[uicard]',
  standalone: true
})
export class UiCardDirective {
  @Input() padding: UiCardPadding = 'm';
  @Input() variant: UiCardVariant = 'raised';

  @HostBinding('class.card') readonly baseClass = true;

  @HostBinding('class.card--pad-none') get padNone() {
    return this.padding === 'none';
  }
  @HostBinding('class.card--pad-s') get padSmall() {
    return this.padding === 's';
  }
  @HostBinding('class.card--pad-m') get padMedium() {
    return this.padding === 'm';
  }

  @HostBinding('class.card--flat') get isFlat() {
    return this.variant === 'flat';
  }
  @HostBinding('class.card--raised') get isRaised() {
    return this.variant === 'raised';
  }
}
