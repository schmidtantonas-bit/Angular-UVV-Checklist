import { Component, Input, HostBinding } from '@angular/core';

type ButtonKind = 'primary' | 'success' | 'warning' | 'danger' | 'ghost';
type ButtonSize = 's' | 'm';
type ButtonType = 'button' | 'submit' | 'reset';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss'
})
export class ButtonComponent {
  @Input() kind: ButtonKind = 'primary';
  @Input() size: ButtonSize = 'm';
  @Input() disabled = false;
  @Input() type: ButtonType = 'button';
  @Input({ alias: 'aria-label' }) ariaLabel?: string;

  @HostBinding('class.btn') readonly baseClass = true;

  @HostBinding('class.btn--primary') get isPrimary() {
    return this.kind === 'primary';
  }
  @HostBinding('class.btn--success') get isSuccess() {
    return this.kind === 'success';
  }
  @HostBinding('class.btn--warning') get isWarning() {
    return this.kind === 'warning';
  }
  @HostBinding('class.btn--danger') get isDanger() {
    return this.kind === 'danger';
  }
  @HostBinding('class.btn--ghost') get isGhost() {
    return this.kind === 'ghost';
  }

  @HostBinding('class.btn--s') get isSmall() {
    return this.size === 's';
  }
  @HostBinding('class.btn--m') get isMedium() {
    return this.size === 'm';
  }

  @HostBinding('class.is-disabled') get isDisabled() {
    return this.disabled;
  }
}
