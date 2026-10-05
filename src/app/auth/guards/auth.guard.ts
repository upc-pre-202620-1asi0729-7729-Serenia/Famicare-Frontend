import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../application/auth.store';

/** Protege las pantallas internas: sin sesión → /login. */
export const authGuard: CanActivateFn = () => {
  const auth   = inject(AuthStore);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.createUrlTree(['/login']);
};

/** Para login/registro: con sesión activa se redirige al Inicio. */
export const guestGuard: CanActivateFn = () => {
  const auth   = inject(AuthStore);
  const router = inject(Router);
  return auth.isAuthenticated() ? router.createUrlTree(['/dashboard']) : true;
};
