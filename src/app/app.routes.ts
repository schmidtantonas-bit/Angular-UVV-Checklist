import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout';
import { EmptyLayoutComponent } from './layouts/empty-layout/empty-layout';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'checklist'
  },
  {
    path: 'wizard',
    component: EmptyLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.page/home.page').then((m) => m.HomePageComponent),
      },
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Beispielrouten, können später ersetzt/ergänzt werden
      {
        path: 'checklist',
        loadComponent: () =>
          import('./pages/checklist/checklist.page/checklist.page').then(
            (m) => m.ChecklistPageComponent
          ),
      },
      {
        path: 'protocol',
        loadComponent: () =>
          import('./pages/protocol/protocol.page/protocol.page').then(
            (m) => m.ProtocolPageComponent
          ),
      },
      {
        path: 'pdf',
        loadComponent: () =>
          import('./pages/pdf/pdf.page/pdf.page').then((m) => m.PdfPageComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
