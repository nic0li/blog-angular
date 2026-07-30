import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { LoginRequest } from '../../models/login-request';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login.component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);

  request: LoginRequest = {
    login: '',
    password: ''
  }

  login(): void {
    this.authenticationService.login(this.request).subscribe({
      next: response => {
        this.authenticationService.saveSession(response);
        this.router.navigate(['/home']);
      },
      error: console.error
    });
  }

}
