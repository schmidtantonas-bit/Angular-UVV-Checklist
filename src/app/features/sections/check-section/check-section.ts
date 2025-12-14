import { booleanAttribute, Component, ViewEncapsulation, input } from '@angular/core';
import { CheckItemComponent, CheckItemModel } from '@features/sections/check-item/check-item';

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

  isOpen = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
