import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'textarea[uiTextarea]',
  standalone: true
})
export class UiTextareaDirective {
  @HostBinding('class.textarea__input') readonly textareaInputClass = true;
}
