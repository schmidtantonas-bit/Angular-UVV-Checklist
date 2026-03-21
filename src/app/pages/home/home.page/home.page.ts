import { Component, ViewEncapsulation, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { UiButtonDirective } from '@ui/button/ui-button.directive';
import { UiCardDirective } from '@ui/card/ui-card.directive';
import { ProgressBarComponent } from '@app/layouts/progress-bar/progress-bar/progress-bar';
import type { InspectionType } from '@config-inspections';
import { DEVICE_TYPE_OPTIONS, getDeviceConfig, isDeviceType, type DeviceType } from '@config-devices';
import {
  INSPECTION_PACKAGE_OPTIONS,
  isInspectionPackageType,
  type InspectionPackageType
} from '@app/config/inspection-packages';

type WizardFamily = 'drehleiter' | 'buhne';

type WizardModel = {
  id: DeviceType;
  title: string;
  subtitle?: string;
  imageSrc: string;
  imageAlt: string;
};

type WizardInspectionPackage = {
  id: InspectionPackageType;
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

const WIZARD_INSPECTION_PACKAGE_ORDER: readonly InspectionPackageType[] = ['none', 'basic', 'plus', 'pro'];

const WIZARD_INSPECTION_PACKAGE_IMAGES: Record<InspectionPackageType, string> = {
  none: '/assets/images/Inspektion%20Ohne%20Zusatzpaket.png',
  basic: '/assets/images/Inspektion%20BASIC.png',
  plus: '/assets/images/Inspektion%20PLUS.png',
  pro: '/assets/images/Inspektion%20PRO.png'
};

const INSPECTION_PACKAGE_OPTIONS_BY_ID = new Map(
  INSPECTION_PACKAGE_OPTIONS.filter(
    (option): option is { value: InspectionPackageType; label: string } => isInspectionPackageType(option.value)
  ).map((option) => [option.value, option])
);

const WIZARD_INSPECTION_PACKAGES: WizardInspectionPackage[] = WIZARD_INSPECTION_PACKAGE_ORDER.map((packageType) => {
  const option = INSPECTION_PACKAGE_OPTIONS_BY_ID.get(packageType);

  return {
    id: packageType,
    title:
      packageType === 'none'
        ? 'Ohne Zusatzpaket'
        : packageType === 'basic'
          ? 'Inspektion BASIC 4h'
          : packageType === 'plus'
            ? 'Inspektion PLUS 6h'
            : 'Inspektion PRO 8h',
    subtitle:
      packageType === 'none'
        ? 'Nur die Standard-Checkliste'
        : undefined,
    imageSrc: WIZARD_INSPECTION_PACKAGE_IMAGES[packageType],
    imageAlt: option?.label ?? packageType
  };
});

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
  readonly selectedInspectionType = signal<InspectionType | null>(null);

  readonly stepNumber = computed(() => {
    if (this.selectedFamily() === null) return 1;
    if (this.selectedModel() === null) return 2;
    if (this.selectedInspectionType() === null) return 3;
    if (this.selectedInspectionType() === 'uvv') return 4;
    return 3;
  });

  readonly totalSteps = computed(() => (this.selectedInspectionType() === 'uvv' ? 4 : 3));

  readonly stepProgress = computed(() => {
    return Math.round((this.stepNumber() / this.totalSteps()) * 100);
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
  readonly inspectionPackages = WIZARD_INSPECTION_PACKAGES;

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
    this.selectedInspectionType.set(null);
  }

  back() {
    if (this.selectedInspectionType() !== null) {
      this.selectedInspectionType.set(null);
      return;
    }

    if (this.selectedModel() !== null) {
      this.selectedModel.set(null);
      return;
    }

    this.selectedFamily.set(null);
  }

  selectModel(model: WizardModel) {
    this.selectedModel.set(model);
    this.selectedInspectionType.set(null);
  }

  selectInspectionType(inspectionType: InspectionType) {
    if (inspectionType === 'uvv') {
      this.selectedInspectionType.set(inspectionType);
      return;
    }

    this.startChecklist(inspectionType, 'none');
  }

  startChecklist(inspectionType: InspectionType, inspectionPackage: InspectionPackageType) {
    const model = this.selectedModel();
    if (!model) return;
    this.router.navigate(['/checklist'], {
      queryParams: { deviceType: model.id, inspectionType, inspectionPackage }
    });
  }
}
