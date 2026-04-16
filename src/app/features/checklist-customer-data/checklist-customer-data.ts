import { Component, inject, input, signal, computed } from '@angular/core';
import { ChecklistState } from '@app/pages/checklist/state/checklist.state';

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
  inspectionPackage?: string;
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
  private readonly checklist = inject(ChecklistState);

  model = input.required<ChecklistCustomerDataModel>();

  // Form values signal that holds the current values (from state or model)
  readonly formValues = computed(() => {
    const m = this.model();
    const storedFields = this.checklist.getItem("customerData").values["fields"] as Record<string, unknown> | undefined;
    
    return {
      inspectionType: (storedFields?.["inspectionType"] as string) ?? m.inspectionType ?? '',
      inspectionPackage: (storedFields?.["inspectionPackage"] as string) ?? m.inspectionPackage ?? '',
      customerName: (storedFields?.["customerName"] as string) ?? m.customerName ?? '',
      address: (storedFields?.["address"] as string) ?? m.address ?? '',
      orderNumber: (storedFields?.["orderNumber"] as string) ?? m.orderNumber ?? '',
      licensePlate: (storedFields?.["licensePlate"] as string) ?? m.licensePlate ?? '',
      deviceType: (storedFields?.["deviceType"] as string) ?? m.deviceType ?? '',
      bodyNumber: (storedFields?.["bodyNumber"] as string) ?? m.bodyNumber ?? '',
      mileageKm: (storedFields?.["mileageKm"] as string) ?? m.mileageKm ?? '',
      operatingHours: (storedFields?.["operatingHours"] as string) ?? m.operatingHours ?? '',
      serviceTechnician: (storedFields?.["serviceTechnician"] as string) ?? m.serviceTechnician ?? '',
      date: (storedFields?.["date"] as string) ?? m.date ?? '',
      location: (storedFields?.["location"] as string) ?? m.location ?? ''
    };
  });

  ngOnInit() {
    // Only set initial values if no stored data exists
    const storedFields = this.checklist.getItem("customerData").values["fields"] as Record<string, unknown> | undefined;
    
    if (!storedFields || Object.keys(storedFields).length === 0) {
      const m = this.model();
      this.updateCustomerData("inspectionType", m.inspectionType);
      this.updateCustomerData("inspectionPackage", m.inspectionPackage);
      this.updateCustomerData("customerName", m.customerName);
      this.updateCustomerData("address", m.address);
      this.updateCustomerData("orderNumber", m.orderNumber);
      this.updateCustomerData("licensePlate", m.licensePlate);
      this.updateCustomerData("deviceType", m.deviceType);
      this.updateCustomerData("bodyNumber", m.bodyNumber);
      this.updateCustomerData("mileageKm", m.mileageKm);
      this.updateCustomerData("operatingHours", m.operatingHours);
      this.updateCustomerData("serviceTechnician", m.serviceTechnician);
      this.updateCustomerData("date", m.date);
      this.updateCustomerData("location", m.location);
    }
  }

  updateCustomerData(key: string, value: unknown) {
    // it seems that this is the way the protocol.page.ts wants it
    var val = (this.checklist.getItem("customerData").values["fields"] ?? {}) as Record<string, unknown>;
    val[key] = value;
    this.checklist.setItemValue("customerData", "fields", val);
  }
}
