import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { LoginRequest } from '../../../dto/auth/login-request';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  request: LoginRequest = {
    login: '',
    password: ''
  }

  login(): void {
    this.authService.login(this.request).subscribe({
      next: response => {
        this.authService.saveSession(response);
        this.router.navigate(['/home']);
      },
      error: console.error
    });
  }

}
