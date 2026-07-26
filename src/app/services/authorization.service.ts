import { inject, Service } from '@angular/core';
import { UserRole } from '../shared/enums/user-role.enum';
import { AuthService } from './auth.service';

@Service()
export class AuthorizationService {

  private readonly authService = inject(AuthService);

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  canEdit(ownerId: number): boolean {
    return this.authService.getUser()?.id === ownerId;
  }

  canDelete(ownerId: number): boolean {
    return this.canEdit(ownerId) || this.isAdmin();
  }

  private hasRole(role: UserRole): boolean {
    return this.authService.getUser()?.role === role;
  }

}
