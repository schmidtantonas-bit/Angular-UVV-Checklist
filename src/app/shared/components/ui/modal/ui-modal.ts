import { Component, EventEmitter, HostListener, input, Output } from '@angular/core';

@Component({
  selector: 'app-ui-modal',
  standalone: true,
  imports: [],
  templateUrl: './ui-modal.html',
  styleUrl: './ui-modal.scss'
})
export class UiModalComponent {
  title = input<string | null>(null);
  closeOnBackdrop = input(true);
  closeOnEscape = input(true);

  @Output() closed = new EventEmitter<void>();

  requestClose() {
    this.closed.emit();
  }

  onBackdropClick() {
    if (!this.closeOnBackdrop()) return;
    this.requestClose();
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    if (!this.closeOnEscape()) return;
    this.requestClose();
  }
}

