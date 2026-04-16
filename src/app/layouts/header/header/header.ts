import { Component, input, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressBarComponent } from '@app/layouts/progress-bar/progress-bar/progress-bar';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { ChecklistPersistence } from '@pages/checklist/state/checklist.persistence';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProgressBarComponent, RouterLink, UiButtonDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  private readonly persistence = inject(ChecklistPersistence, { optional: true });

  // Optional Fortschritt (0-100); wenn null, bleibt die Leiste verborgen
  progress = input<number | null>(null);
  
  // Session status - reactive from persistence service
  readonly sessionStatus = computed(() => this.persistence?.sessionStatus() ?? null);
}
