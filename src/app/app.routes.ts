import { Routes } from '@angular/router';
import { Layout } from './shared/presentation/components/layout/layout';
import { authGuard, guestGuard } from './auth/guards/auth.guard';
import { dashboardRoutes } from './dashboard/dashboard.routes';
import { locationRoutes } from './location/location.routes';
import { safeZonesRoutes } from './safe-zones/safe-zones.routes';
import { alertsRoutes } from './alerts/alerts.routes';
import { careNetworkRoutes } from './care-network/care-network.routes';
import { activityRoutes } from './activity/activity.routes';
import { deviceRoutes } from './device/device.routes';

export const routes: Routes = [
  // ── Acceso (sin sesión) ──
  {
    path: 'login',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/presentation/views/login/login').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    canActivate: [guestGuard],
    loadComponent: () => import('./auth/presentation/views/register/register').then(m => m.RegisterComponent),
  },
  {
    path: 'forgot-password',
    canActivate: [guestGuard],
    loadComponent: () =>
      import('./auth/presentation/views/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent),
  },

  // ── Aplicación (con sesión): una sección por bounded context ──
  {
    path: '',
    component: Layout,
    canActivate: [authGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      ...dashboardRoutes,
      ...locationRoutes,
      ...safeZonesRoutes,
      ...alertsRoutes,
      ...careNetworkRoutes,
      ...activityRoutes,
      ...deviceRoutes,
      {
        path: 'profile',
        loadComponent: () =>
          import('./auth/presentation/views/profile/profile.component').then(m => m.ProfileComponent),
      },
    ],
  },

  { path: '**', redirectTo: 'dashboard' },
];
