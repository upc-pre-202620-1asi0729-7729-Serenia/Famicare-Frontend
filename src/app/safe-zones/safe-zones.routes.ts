import { Routes } from '@angular/router';

export const safeZonesRoutes: Routes = [
  {
    path: 'safe-zones',
    loadComponent: () =>
      import('./presentation/views/safe-zone-list/safe-zone-list.component').then(
        m => m.SafeZoneListComponent
      ),
  },
];
