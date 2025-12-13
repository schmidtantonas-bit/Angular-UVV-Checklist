import { Component, effect, input, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { TextareaComponent } from '@ui/textarea/textarea';
import { CheckItemMediaComponent } from '@features/sections/check-item-media/check-item-media';

export type CheckStatus = 'ok' | 'na' | 'nok' | null;

export interface CheckItemModel {
  id: string;
  title: string;
  description?: string;
  status: CheckStatus;
}

@Component({
  selector: 'app-check-item',
  standalone: true,
  imports: [NgClass, UiButtonDirective, UiCardDirective, TextareaComponent, CheckItemMediaComponent],
  templateUrl: './check-item.html',
  styleUrl: './check-item.scss'
})
export class CheckItemComponent {
  model = input.required<CheckItemModel>();

  readonly status = signal<CheckStatus>(null);
  readonly isNokOpen = signal(false);
  readonly photos = signal<File[]>([]);

  private currentItemId: string | null = null;

  constructor() {
    effect(() => {
      const nextModel = this.model();
      if (nextModel.id !== this.currentItemId) {
        this.currentItemId = nextModel.id;
        this.photos.set([]);
      }

      const nextStatus = nextModel.status;
      this.status.set(nextStatus);
      this.isNokOpen.set(nextStatus === 'nok');
    });
  }

  setStatus(next: Exclude<CheckStatus, null>) {
    this.status.set(next);
    this.isNokOpen.set(false);
  }

  toggleNok() {
    if (this.status() !== 'nok') {
      this.status.set('nok');
      this.isNokOpen.set(true);
      return;
    }

    this.isNokOpen.update((current) => !current);
  }
}
