import { Component, computed, signal } from '@angular/core';
import { CheckSectionComponent, CheckSectionModel } from '@features/sections/check-section/check-section';
import { ChecklistOverviewComponent } from '@features/checklist-overview/checklist-overview';
import {
  ChecklistCustomerDataComponent,
  ChecklistCustomerDataModel
} from '@features/checklist-customer-data/checklist-customer-data';
import {
  DEVICE_TYPE_OPTIONS,
  isDeviceType,
  overviewForDevice,
  sectionsForDevice,
  type DeviceType
} from '@config/devices';

@Component({
  selector: 'app-checklist-page',
  standalone: true,
  imports: [ChecklistOverviewComponent, ChecklistCustomerDataComponent, CheckSectionComponent],
  templateUrl: './checklist.page.html',
  styleUrl: './checklist.page.scss'
})
export class ChecklistPageComponent {
  readonly deviceType = signal<DeviceType>('l32');

  readonly overview = computed(() => overviewForDevice(this.deviceType()));

  readonly customerData = computed<ChecklistCustomerDataModel>(() => ({
    inspectionTypes: [
      { value: 'basic', label: 'Inspektion Basic' },
      { value: 'full', label: 'Inspektion Full' }
    ],
    inspectionType: 'basic',
    deviceTypes: DEVICE_TYPE_OPTIONS,
    deviceType: this.deviceType()
  }));

  readonly sections = computed<CheckSectionModel[]>(() => {
    return sectionsForDevice(this.deviceType());
  });

  setDeviceType(value: string) {
    if (isDeviceType(value)) this.deviceType.set(value);
  }
}
