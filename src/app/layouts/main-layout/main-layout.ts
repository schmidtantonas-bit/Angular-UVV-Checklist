import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/layouts/header/header/header';
import { FooterComponent } from '@app/layouts/footer/footer/footer';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss'
})
export class MainLayoutComponent {
  // Mockwert, damit die Progressbar im UI sichtbar ist, bis echte Logik folgt
  progress = input<number | null>(50);
}
