import { Routes } from '@angular/router';

export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./presentation/views/dashboard').then(m => m.DashboardComponent),
  },
];
