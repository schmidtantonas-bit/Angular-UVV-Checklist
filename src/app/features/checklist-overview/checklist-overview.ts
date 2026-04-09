import { Component, computed, input } from '@angular/core';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { toDisplayText } from '@shared/text';

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

  readonly displayTitle = computed(() => toDisplayText(this.model().title));
  readonly displaySubtitle = computed(() => {
    const subtitle = this.model().subtitle;
    return subtitle ? toDisplayText(subtitle) : undefined;
  });
}

