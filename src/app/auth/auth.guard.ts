import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const homeGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = inject(AuthService).currentUser;
  return user?.rol === 'vendedor' ? router.createUrlTree(['/ventas']) : true;
};

export const salesGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = inject(AuthService).currentUser;
  if (!user) {
    return router.createUrlTree(['/login']);
  }
  return user.rol === 'administrador' || user.rol === 'vendedor'
    ? true
    : router.createUrlTree(['/home']);
};

export const adminGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = inject(AuthService).currentUser;
  if (!user) {
    return router.createUrlTree(['/login']);
  }
  return user.rol === 'administrador'
    ? true
    : router.createUrlTree(['/ventas']);
};

export const loginGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = inject(AuthService).currentUser;
  return user
    ? router.createUrlTree([user.rol === 'vendedor' ? '/ventas' : '/home'])
    : true;
};
