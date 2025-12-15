import { DestroyRef, signal } from '@angular/core';

export interface TimerCoreConfig {
  intervalMs?: number;
}

export class TimerCore {
  private readonly now = () => Date.now();
  private intervalMs: number;
  private intervalHandle: ReturnType<typeof setInterval> | null = null;

  private startedAtMs: number | null = null;
  private baseElapsedMs = 0;

  private readonly _nowMs = signal(this.now());
  private readonly _running = signal(false);

  readonly nowMs = this._nowMs.asReadonly();
  readonly running = this._running.asReadonly();

  readonly elapsedMs = () => {
    if (!this._running() || this.startedAtMs == null) return this.baseElapsedMs;
    return this.baseElapsedMs + (this._nowMs() - this.startedAtMs);
  };

  constructor(config: TimerCoreConfig = {}) {
    this.intervalMs = Math.max(16, config.intervalMs ?? 250);
  }

  connectDestroy(destroyRef: DestroyRef) {
    destroyRef.onDestroy(() => this.destroy());
  }

  setIntervalMs(intervalMs: number) {
    this.intervalMs = Math.max(16, intervalMs);
    if (this._running()) this.startInterval();
  }

  start() {
    if (this._running()) return;
    const now = this.now();
    this.startedAtMs = now;
    this._nowMs.set(now);
    this._running.set(true);
    this.startInterval();
  }

  stop() {
    if (!this._running()) return;
    this.tick();
    this.baseElapsedMs = this.elapsedMs();
    this.startedAtMs = null;
    this._running.set(false);
    this.stopInterval();
  }

  reset() {
    this.stopInterval();
    this._running.set(false);
    this.startedAtMs = null;
    this.baseElapsedMs = 0;
    this._nowMs.set(this.now());
  }

  destroy() {
    this.stopInterval();
  }

  private tick() {
    this._nowMs.set(this.now());
  }

  private startInterval() {
    this.stopInterval();
    this.intervalHandle = setInterval(() => this.tick(), this.intervalMs);
  }

  private stopInterval() {
    if (this.intervalHandle == null) return;
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  }
}
