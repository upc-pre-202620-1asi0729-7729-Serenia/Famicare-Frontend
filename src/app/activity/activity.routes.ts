import { Routes } from '@angular/router';

export const activityRoutes: Routes = [
  {
    path: 'activity',
    loadComponent: () =>
      import('./presentation/views/activity-report/activity-report.component').then(
        m => m.ActivityReportComponent
      ),
  },
];
