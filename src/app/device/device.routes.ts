import { Routes } from '@angular/router';

export const deviceRoutes: Routes = [
  {
    path: 'device',
    loadComponent: () =>
      import('./presentation/views/device-status/device-status.component').then(
        m => m.DeviceStatusComponent
      ),
  },
];
