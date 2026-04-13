import { Injectable, signal, computed } from '@angular/core';

export type LoaderStatus = 'idle' | 'loading' | 'success' | 'error';

export interface LoaderState {
  status: LoaderStatus;
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private readonly state = signal<LoaderState>({ status: 'idle' });

  readonly status = computed(() => this.state().status);
  readonly message = computed(() => this.state().message);
  readonly isLoading = computed(() => this.state().status === 'loading');
  readonly isVisible = computed(() => this.state().status !== 'idle');

  /**
   * Start loading with optional message
   */
  start(message?: string): void {
    this.state.set({ status: 'loading', message });
  }

  /**
   * Show success state and auto-hide after delay
   */
  success(message?: string, autoHideMs = 1500): void {
    this.state.set({ status: 'success', message });
    this.autoHide(autoHideMs);
  }

  /**
   * Show error state and auto-hide after delay
   */
  error(message?: string, autoHideMs = 2500): void {
    this.state.set({ status: 'error', message });
    this.autoHide(autoHideMs);
  }

  /**
   * Hide loader immediately
   */
  hide(): void {
    this.state.set({ status: 'idle' });
  }

  /**
   * Execute an async action with automatic loader handling
   */
  async wrap<T>(
    action: () => Promise<T>,
    options?: {
      loadingMessage?: string;
      successMessage?: string;
      errorMessage?: string;
    }
  ): Promise<T> {
    this.start(options?.loadingMessage);
    try {
      const result = await action();
      this.success(options?.successMessage);
      return result;
    } catch (err) {
      this.error(options?.errorMessage ?? 'Ein Fehler ist aufgetreten');
      throw err;
    }
  }

  private autoHide(delayMs: number): void {
    setTimeout(() => this.hide(), delayMs);
  }
}
