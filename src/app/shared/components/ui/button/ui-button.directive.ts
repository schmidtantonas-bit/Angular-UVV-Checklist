import { booleanAttribute, Directive, HostBinding, Input } from '@angular/core';

export type UiButtonKind = 'primary' | 'success' | 'warning' | 'danger' | 'ghost';
export type UiButtonSize = 's' | 'm';

@Directive({
  selector: 'button[uiButton],button[uibutton]',
  standalone: true
})
export class UiButtonDirective {
  @Input() kind: UiButtonKind = 'primary';
  @Input() size: UiButtonSize = 'm';
  @Input({ transform: booleanAttribute }) icon = false;
  @Input({ transform: booleanAttribute }) full = false;

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

  @HostBinding('class.btn--icon') get isIcon() {
    return this.icon;
  }
  @HostBinding('class.is-full') get isFull() {
    return this.full;
  }
}
