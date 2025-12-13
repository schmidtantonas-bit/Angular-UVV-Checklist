import { Component, HostBinding, Input } from '@angular/core';

type CardVariant = 'raised' | 'flat';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss'
})
export class CardComponent {
  @Input() padding: 'none' | 's' | 'm' = 'm';
  @Input() variant: CardVariant = 'raised';

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
