import { Routes } from '@angular/router';

export const locationRoutes: Routes = [
  {
    path: 'location',
    loadComponent: () =>
      import('./presentation/views/location-tracking/location-tracking.component').then(
        m => m.LocationTrackingComponent
      ),
  },
];
