import { inject, Service } from '@angular/core';

import { UserRole } from '../shared/enums/user-role.enum';
import { AuthenticationService } from './authentication.service';

@Service()
export class AuthorizationService {

  private readonly authenticationService = inject(AuthenticationService);

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  canEdit(ownerId: number): boolean {
    return this.authenticationService.getUser()?.id === ownerId;
  }

  canDelete(ownerId: number): boolean {
    return this.canEdit(ownerId) || this.isAdmin();
  }

  private hasRole(role: UserRole): boolean {
    return this.authenticationService.getUser()?.role === role;
  }

}
