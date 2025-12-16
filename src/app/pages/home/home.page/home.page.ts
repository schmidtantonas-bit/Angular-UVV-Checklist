import { Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { ProgressBarComponent } from '@app/layouts/progress-bar/progress-bar/progress-bar';
import type { InspectionType } from '@config-inspections';

type WizardFamily = 'drehleiter' | 'buhne';

type WizardModel = {
  id: 'l32' | 'l32a' | 'b32';
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
};

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [UiCardDirective, UiButtonDirective, ProgressBarComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomePageComponent {
  private readonly router = inject(Router);

  readonly selectedFamily = signal<WizardFamily | null>(null);
  readonly selectedModel = signal<WizardModel | null>(null);

  readonly stepNumber = computed(() => {
    if (this.selectedFamily() === null) return 1;
    if (this.selectedModel() === null) return 2;
    return 3;
  });
  readonly stepProgress = computed(() => {
    const step = this.stepNumber();
    if (step === 1) return 33;
    if (step === 2) return 67;
    return 100;
  });

  readonly families: Array<{
    id: WizardFamily;
    title: string;
    imageSrc: string;
    imageAlt: string;
  }> = [
    { id: 'drehleiter', title: 'Drehleiter', imageSrc: '/assets/images/L32.png', imageAlt: 'Drehleiter' },
    { id: 'buhne', title: 'Bühne', imageSrc: '/assets/images/B32.png', imageAlt: 'Bühne' }
  ];

  readonly modelsByFamily: Record<WizardFamily, WizardModel[]> = {
    drehleiter: [
      { id: 'l32', title: 'L32', imageSrc: '/assets/images/L32.png', imageAlt: 'L32' },
      { id: 'l32a', title: 'L32A', imageSrc: '/assets/images/L32.png', imageAlt: 'L32A' }
    ],
    buhne: [{ id: 'b32', title: 'B32', imageSrc: '/assets/images/B32.png', imageAlt: 'B32' }]
  };

  readonly inspections: Array<{ id: InspectionType; title: string; subtitle: string; imageSrc: string; imageAlt: string }> =
    [
      {
        id: 'uvv',
        title: 'UVV',
        subtitle: 'Standard UVV-Check',
        imageSrc: '/assets/images/defekltlist.png',
        imageAlt: 'UVV'
      },
      {
        id: 'vde',
        title: 'VDE',
        subtitle: 'Elektrische Prüfung',
        imageSrc: '/assets/images/Vde Gossen Messgerät.png',
        imageAlt: 'VDE'
      },
      {
        id: 'overload',
        title: 'Überlastprüfung',
        subtitle: 'Nur Überlastprüfung',
        imageSrc: '/assets/images/overload-bild.png',
        imageAlt: 'Überlastprüfung'
      }
    ];

  selectFamily(family: WizardFamily) {
    this.selectedFamily.set(family);
    this.selectedModel.set(null);
  }

  back() {
    if (this.selectedModel() !== null) {
      this.selectedModel.set(null);
      return;
    }
    this.selectedFamily.set(null);
  }

  selectModel(model: WizardModel) {
    this.selectedModel.set(model);
  }

  startChecklist(inspectionType: InspectionType) {
    const model = this.selectedModel();
    if (!model) return;
    this.router.navigate(['/checklist'], { queryParams: { deviceType: model.id, inspectionType } });
  }
}
