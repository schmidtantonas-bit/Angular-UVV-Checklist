import { Component } from '@angular/core';
import { UiButtonDirective } from '@ui/button/ui-button.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [UiButtonDirective],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class FooterComponent {
  print(): void {
    window.print();
  }
}
