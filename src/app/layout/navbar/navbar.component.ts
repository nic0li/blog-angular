import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {

  private readonly authenticationService = inject(AuthenticationService);
  private readonly authorizationService = inject(AuthorizationService);

  get user() {
    return this.authenticationService.getUser();
  }

  get isAdmin(): boolean {
    return this.authorizationService.isAdmin();
  }

  logout(): void {
    this.authenticationService.logout();
  }

}
