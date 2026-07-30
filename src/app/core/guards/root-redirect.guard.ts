import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

export const rootRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  return authenticationService.isAuthenticated()
      ? router.createUrlTree(['/home'])
      : router.createUrlTree(['/login']);

};
