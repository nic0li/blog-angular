import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

export const authenticatedGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);

  return authenticationService.isAuthenticated()
    ? true
    : router.navigate(['/login']);

};
