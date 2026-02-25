import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const role = authService.getUserRole(); // e.g. 'superadmin' or 'admin'
//  let role: string = 'superadmin';
  const allowedRoles = route.data?.['roles'] as string[] | undefined;

  if (role && (!allowedRoles || allowedRoles.includes(role))) {
      return true;
    }

  // otherwise, block and redirect
  router.navigate(['/dashboard']);
  return false;
};