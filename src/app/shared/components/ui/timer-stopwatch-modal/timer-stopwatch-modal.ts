import { Component, EventEmitter, input, Output } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiModalComponent } from '@ui/modal/ui-modal';
import { TimerStopwatchComponent } from '@ui/timer-stopwatch/timer-stopwatch';

@Component({
  selector: 'app-timer-stopwatch-modal',
  standalone: true,
  imports: [UiModalComponent, UiButtonDirective, TimerStopwatchComponent],
  templateUrl: './timer-stopwatch-modal.html',
  styleUrl: './timer-stopwatch-modal.scss'
})
export class TimerStopwatchModalComponent {
  title = input<string>('Messung');
  autoStart = input(false);

  @Output() acceptedMs = new EventEmitter<number>();
  @Output() closed = new EventEmitter<void>();

  onAccept(stopwatch: TimerStopwatchComponent) {
    if (stopwatch.running()) stopwatch.pause();
    this.acceptedMs.emit(stopwatch.currentMs());
    this.closed.emit();
  }

  onClose() {
    this.closed.emit();
  }
}
