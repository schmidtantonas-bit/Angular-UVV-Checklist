import { Component, input } from '@angular/core';
import { UiCardDirective } from '@ui/card/ui-card.directive';

export interface ChecklistOverviewModel {
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt?: string;
}

@Component({
  selector: 'app-checklist-overview',
  standalone: true,
  imports: [UiCardDirective],
  templateUrl: './checklist-overview.html',
  styleUrl: './checklist-overview.scss'
})
export class ChecklistOverviewComponent {
  model = input.required<ChecklistOverviewModel>();
}

