import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  if (authenticationService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'])
  return false;
};
