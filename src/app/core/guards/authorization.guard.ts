import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthorizationService } from '../../services/authorization.service';

export const authorizationGuard: CanActivateFn = () => {
  const router = inject(Router);
  const authorizationService = inject(AuthorizationService);

  if (authorizationService.isAdmin()) {
    return true;
  }

  router.navigate(['/home'])
  return false;
};
