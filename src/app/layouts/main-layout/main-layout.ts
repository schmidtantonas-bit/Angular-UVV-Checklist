import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '@app/layouts/header/header/header';
import { FooterComponent } from '@app/layouts/footer/footer/footer';
import { ChecklistState } from '@pages/checklist/state/checklist.state';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main-layout.html',
  styleUrl: './main-layout.scss',
  providers: [ChecklistState]
})
export class MainLayoutComponent {
  private readonly checklistState = inject(ChecklistState);
  readonly progress = computed(() => this.checklistState.progressPercent());
}
