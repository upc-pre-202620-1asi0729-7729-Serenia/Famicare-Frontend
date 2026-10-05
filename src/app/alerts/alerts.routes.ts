import { Routes } from '@angular/router';

export const alertsRoutes: Routes = [
  {
    path: 'alerts',
    loadComponent: () =>
      import('./presentation/views/alert-center/alert-center.component').then(
        m => m.AlertCenterComponent
      ),
  },
  {
    path: 'alerts/:id',
    loadComponent: () =>
      import('./presentation/views/alert-detail/alert-detail.component').then(
        m => m.AlertDetailComponent
      ),
  },
];
