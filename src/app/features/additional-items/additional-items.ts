import { Component, ViewEncapsulation, signal } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import type { CheckItemModel, CheckStatus } from '@features/sections/check-item/check-item';
import { CheckItemComponent } from '@features/sections/check-item/check-item';

@Component({
  selector: 'app-additional-items',
  standalone: true,
  imports: [UiButtonDirective, CheckItemComponent],
  templateUrl: './additional-items.html',
  styleUrl: './additional-items.scss',
  encapsulation: ViewEncapsulation.None
})
export class AdditionalItemsComponent {
  readonly points = signal<CheckItemModel[]>([]);

  addPoint() {
    const index = this.points().length + 1;
    this.points.update((current) => [
      ...current,
      { id: `ZP-${String(index).padStart(2, '0')}`, title: '', status: null, note: '' }
    ]);
  }

  setTitle(id: string, raw: string) {
    const title = raw;
    this.points.update((current) => current.map((p) => (p.id === id ? { ...p, title } : p)));
  }

  setStatus(id: string, status: CheckStatus) {
    this.points.update((current) => current.map((p) => (p.id === id ? { ...p, status } : p)));
  }

  setNote(id: string, note: string) {
    this.points.update((current) => current.map((p) => (p.id === id ? { ...p, note } : p)));
  }
}
