import { Routes } from '@angular/router';

export const careNetworkRoutes: Routes = [
  {
    path: 'care-network',
    loadComponent: () =>
      import('./presentation/views/care-network/care-network.component').then(
        m => m.CareNetworkComponent
      ),
  },
];
