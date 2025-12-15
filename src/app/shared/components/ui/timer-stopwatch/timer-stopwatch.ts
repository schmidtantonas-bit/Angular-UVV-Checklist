import { Component, DestroyRef, Injector, computed, effect, inject, input } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { TimerCore } from '@shared/timer/timer-core';

@Component({
  selector: 'app-timer-stopwatch',
  standalone: true,
  imports: [UiButtonDirective],
  templateUrl: './timer-stopwatch.html',
  styleUrl: './timer-stopwatch.scss'
})
export class TimerStopwatchComponent {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);

  autoStart = input(false);
  intervalMs = input(250);
  showControls = input(true);

  private readonly timer = new TimerCore();

  readonly running = computed(() => this.timer.running());
  readonly elapsedMs = computed(() => this.timer.elapsedMs());
  readonly display = computed(() => formatMs(this.elapsedMs()));

  ngOnInit(): void {
    this.timer.connectDestroy(this.destroyRef);
    effect(
      () => {
        this.timer.setIntervalMs(this.intervalMs());
      },
      { injector: this.injector }
    );
    if (this.autoStart()) this.timer.start();
  }

  start() {
    this.timer.start();
  }

  pause() {
    this.timer.stop();
  }

  reset() {
    this.timer.reset();
  }

  currentMs(): number {
    return this.elapsedMs();
  }
}

function formatMs(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
