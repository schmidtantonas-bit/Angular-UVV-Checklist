import { Component, input } from '@angular/core';
import { ProgressBarComponent } from '@app/layouts/progress-bar/progress-bar/progress-bar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ProgressBarComponent],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {
  // Optional Fortschritt (0-100); wenn null, bleibt die Leiste verborgen
  progress = input<number | null>(null);
}
