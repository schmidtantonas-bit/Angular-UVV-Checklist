import { booleanAttribute, Component, ViewEncapsulation, computed, inject, input } from '@angular/core';
import { CheckItemComponent, CheckItemModel } from '@features/sections/check-item/check-item';
import { ChecklistState } from '@pages/checklist/state/checklist.state';

export interface CheckSectionModel {
  id: string;
  title: string;
  total: number;
  completed: number;
  items: CheckItemModel[];
}

@Component({
  selector: 'app-check-section',
  standalone: true,
  imports: [CheckItemComponent],
  templateUrl: './check-section.html',
  styleUrl: './check-section.scss',
  encapsulation: ViewEncapsulation.None
})
export class CheckSectionComponent {
  model = input.required<CheckSectionModel>();
  hideEmptyState = input(false, { transform: booleanAttribute });

  private readonly checklistState = inject(ChecklistState, { optional: true });

  readonly completedCount = computed(() => {
    const section = this.model();
    if (!this.checklistState) return section.completed;
    return section.items.filter((item) => this.checklistState!.getItem(`${section.id}:${item.id}`).status !== null).length;
  });

  readonly totalCount = computed(() => this.model().total);

  readonly isCompleted = computed(() => {
    const section = this.model();
    if (section.items.length === 0) return false;

    if (!this.checklistState) {
      return section.items.every((item) => item.status !== null);
    }

    return section.items.every((item) => this.checklistState!.getItem(`${section.id}:${item.id}`).status !== null);
  });

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
