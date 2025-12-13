import { Component, input } from '@angular/core';

export interface ChecklistCustomerDataInspectionType {
  value: string;
  label: string;
}

export interface ChecklistCustomerDataDeviceTypeOption {
  value: string;
  label: string;
}

export interface ChecklistCustomerDataModel {
  inspectionTypes?: ChecklistCustomerDataInspectionType[];
  inspectionType?: string;
  deviceTypes?: ChecklistCustomerDataDeviceTypeOption[];
  customerName?: string;
  address?: string;
  orderNumber?: string;
  licensePlate?: string;
  deviceType?: string;
  bodyNumber?: string;
  mileageKm?: string;
  operatingHours?: string;
  serviceTechnician?: string;
  date?: string;
  location?: string;
}

@Component({
  selector: 'app-checklist-customer-data',
  standalone: true,
  imports: [],
  templateUrl: './checklist-customer-data.html',
  styleUrl: './checklist-customer-data.scss'
})
export class ChecklistCustomerDataComponent {
  model = input.required<ChecklistCustomerDataModel>();
}
