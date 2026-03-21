import { Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { ProgressBarComponent } from '@app/layouts/progress-bar/progress-bar/progress-bar';
import type { InspectionType } from '@config-inspections';
import { DEVICE_TYPE_OPTIONS, getDeviceConfig, isDeviceType, type DeviceType } from '@config-devices';

type WizardFamily = 'drehleiter' | 'buhne';

type WizardModel = {
  id: DeviceType;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
};

const WIZARD_FAMILY_BY_DEVICE_FAMILY = {
  drehleiter: 'drehleiter',
  hr_buehne: 'buhne'
} as const;

const WIZARD_MODELS: WizardModel[] = DEVICE_TYPE_OPTIONS.filter((option): option is { value: DeviceType; label: string } =>
  isDeviceType(option.value)
).map((option) => {
  const deviceConfig = getDeviceConfig(option.value);

  return {
    id: option.value,
    title: deviceConfig.label,
    imageSrc: deviceConfig.overview.imageSrc,
    imageAlt: deviceConfig.label
  };
});

const MODELS_BY_FAMILY: Record<WizardFamily, WizardModel[]> = {
  drehleiter: WIZARD_MODELS.filter(
    (model) => WIZARD_FAMILY_BY_DEVICE_FAMILY[getDeviceConfig(model.id).family] === 'drehleiter'
  ),
  buhne: WIZARD_MODELS.filter(
    (model) => WIZARD_FAMILY_BY_DEVICE_FAMILY[getDeviceConfig(model.id).family] === 'buhne'
  )
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

  readonly modelsByFamily = MODELS_BY_FAMILY;

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
