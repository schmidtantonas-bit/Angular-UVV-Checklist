import { Component } from '@angular/core';
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
    SpeedCheckComponent
  ],
  templateUrl: './checklist.page.html',
  styleUrl: './checklist.page.scss'
})
export class ChecklistPageComponent {
  overview: ChecklistOverviewModel = {
    title: 'UVV-Drehleiter',
    subtitle: 'L32',
    imageSrc: '/assets/images/L32.png',
    imageAlt: 'Drehleiter'
  };

  customerData: ChecklistCustomerDataModel = {
    inspectionType: 'Inspektion Basic',
    customerName: '',
    address: '',
    orderNumber: '',
    licensePlate: '',
    deviceType: 'L32',
    bodyNumber: '',
    mileageKm: '',
    operatingHours: '',
    serviceTechnician: '',
    date: '',
    location: ''
  };

  sections: CheckSectionModel[] = [
    {
      id: 'sec-overload-1',
      title: 'Überlastprüfung',
      total: 4,
      completed: 0,
      items: [
        { id: '10-01', title: 'Sicherheitseinrichtungen', status: null },
        { id: '10-02', title: 'Gebrauchstauglichkeit', status: null },
        { id: '10-03', title: 'Anstoßsicherungen', status: null },
        { id: '10-04', title: 'Seiteneinstellvorrichtung', status: null }
      ]
    },
    {
      id: 'sec-battery-1',
      title: 'Batterien',
      total: 4,
      completed: 0,
      items: [
        { id: '3-02', title: 'Batterie / Batteriefach', status: null },
        { id: '3-03', title: 'Allgemeiner Zustand Starterbatterien', status: null },
        { id: '3-05', title: 'Zustand der Lagerung und Befestigung der Batterien', status: null }
      ]
    },
    {
      id: 'sec-misc-1',
      title: 'Sonstiges',
      total: 0,
      completed: 0,
      items: []
    },
    {
      id: 'sec-speed-1',
      title: 'Geschwindigkeiten',
      total: 0,
      completed: 0,
      items: []
    },
    {
      id: 'sec-1',
      title: 'Fahrerhaus Innen',
      total: 11,
      completed: 0,
      items: [
        { id: '1-01', title: 'Akustische und optische Warneinrichtungen', status: null }]
    },
    {
      id: 'sec-2',
      title: 'Fahrerhaus Außen',
      total: 4,
      completed: 0,
      items: [
        { id: '2-01', title: 'Beleuchtungseinrichtungen am Gesamtfahrzeug (Chassis + Aufbau)', status: null },
        { id: '2-02', title: 'Abdeckkappen Ladeerhaltung', status: null },
        { id: '2-03', title: 'Beschilderung am Fahrerhaus', status: null }
      ]
    }
  ];
}
