import { Component, DestroyRef, EventEmitter, Injector, computed, effect, inject, input, Output } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { TimerCore } from '@shared/timer/timer-core';

@Component({
  selector: 'app-timer-countdown',
  standalone: true,
  imports: [UiButtonDirective],
  templateUrl: './timer-countdown.html',
  styleUrl: './timer-countdown.scss'
})
export class TimerCountdownComponent {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  durationMs = input.required<number>();
  autoStart = input(true);
  intervalMs = input(250);

  @Output() done = new EventEmitter<void>();

  private readonly timer = new TimerCore();
  private doneEmitted = false;

  readonly running = computed(() => this.timer.running());
  readonly elapsedMs = computed(() => this.timer.elapsedMs());
  readonly remainingMs = computed(() => Math.max(this.durationMs() - this.elapsedMs(), 0));
  readonly isDone = computed(() => this.remainingMs() === 0 && this.durationMs() > 0);
  readonly progress = computed(() => {
    const duration = this.durationMs();
    if (duration <= 0) return 0;
    return Math.min(100, Math.max(0, (this.elapsedMs() / duration) * 100));
  });
  readonly display = computed(() => formatMs(this.remainingMs()));

  ngOnInit(): void {
    this.timer.connectDestroy(this.destroyRef);

    effect(
      () => {
        this.timer.setIntervalMs(this.intervalMs());
      },
      { injector: this.injector }
    );

    effect(
      () => {
        const done = this.isDone();
        if (done && !this.doneEmitted) {
          this.doneEmitted = true;
          this.timer.stop();
          this.done.emit();
        }
        if (!done) this.doneEmitted = false;
      },
      { injector: this.injector }
    );

    if (this.autoStart()) this.timer.start();
  }

  toggle() {
    if (this.timer.running()) this.timer.stop();
    else this.timer.start();
  }

  reset() {
    this.timer.reset();
    if (this.autoStart()) this.timer.start();
  }
}

function formatMs(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
