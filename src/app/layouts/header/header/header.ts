import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProgressBarComponent } from '@app/layouts/progress-bar/progress-bar/progress-bar';
import { UiButtonDirective } from '@ui/button/ui-button.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProgressBarComponent, RouterLink, UiButtonDirective],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  // Optional Fortschritt (0-100); wenn null, bleibt die Leiste verborgen
  progress = input<number | null>(null);
}
