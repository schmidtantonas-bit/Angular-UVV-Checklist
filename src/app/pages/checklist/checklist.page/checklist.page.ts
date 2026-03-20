import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckSectionComponent, CheckSectionModel } from '@features/sections/check-section/check-section';
import {
  ChecklistOverviewComponent,
  ChecklistOverviewModel
} from '@features/checklist-overview/checklist-overview';
import {
  ChecklistCustomerDataComponent,
  ChecklistCustomerDataModel
} from '@features/checklist-customer-data/checklist-customer-data';
import { OverloadComponent } from '@features/overload/overload';
import { AdditionalItemsComponent } from '@features/additional-items/additional-items';
import { BatteryCheckComponent } from '@features/battery-check/battery-check';
import { SpeedCheckComponent } from '@features/speed-check/speed-check';
import { OperationalStatusComponent } from '@features/operational-status/operational-status';
import { ChecklistState } from '@pages/checklist/state/checklist.state';
import { isDeviceType, type DeviceType } from '@config-devices';
import { buildChecklistConfig } from '@config/build/build-checklist-config';
import { isInspectionType, type InspectionType } from '@config-inspections';
import { isInspectionPackageType, type InspectionPackageType } from '@app/config/inspection-packages';
import { ConfigChecklistService } from '@app/config/service/config-service';

@Component({
  selector: 'app-checklist-page',
  standalone: true,
  imports: [
    ChecklistOverviewComponent,
    ChecklistCustomerDataComponent,
    CheckSectionComponent,
    OverloadComponent,
    AdditionalItemsComponent,
    BatteryCheckComponent,
    SpeedCheckComponent,
    OperationalStatusComponent
  ],
  templateUrl: './checklist.page.html',
  styleUrl: './checklist.page.scss'
})
export class ChecklistPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly checklistState = inject(ChecklistState);
  private readonly configService = inject(ConfigChecklistService);

  readonly deviceType: DeviceType;
  readonly inspectionType: InspectionType;
  readonly inspectionPackage: InspectionPackageType;

  overloadVariant: 'standard' | 'buehne';

  overview: ChecklistOverviewModel;
  customerData: ChecklistCustomerDataModel;
  sections: CheckSectionModel[];

  constructor() {
    const rawDeviceType = this.route.snapshot.queryParamMap.get('deviceType') ?? 'l32';
    const rawInspectionType = this.route.snapshot.queryParamMap.get('inspectionType') ?? 'uvv';
    const rawInspectionPackage = this.route.snapshot.queryParamMap.get('inspectionPackage') ?? 'none';

    this.deviceType = isDeviceType(rawDeviceType) ? rawDeviceType : 'l32';
    this.inspectionType = isInspectionType(rawInspectionType) ? rawInspectionType : 'uvv';
    this.inspectionPackage = isInspectionPackageType(rawInspectionPackage) ? rawInspectionPackage : 'none';

    const checklistConfig = buildChecklistConfig({
      deviceType: this.deviceType,
      inspectionType: this.inspectionType,
      inspectionPackage: this.inspectionPackage
    });

    this.overloadVariant = checklistConfig.overloadVariant;
    this.overview = checklistConfig.overview;
    this.sections = checklistConfig.sections;
    this.customerData = checklistConfig.customerData;

    const totalCount = this.sections.reduce(
      (sum, section) => sum + (Number.isFinite(section.total) ? section.total : 0),
      0
    );
    this.checklistState.setTotalCount(totalCount);
    this.configService.setCurrentConfig(checklistConfig);
  }

  ngOnDestroy() {
    this.checklistState.clear();
    this.configService.clearCurrentConfig();
  }
}
