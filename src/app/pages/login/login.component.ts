import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginRequest } from '../../dto/auth/login-request';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login.component',
  imports: [FormsModule],
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
      this.authService.saveToken(response.token);
      this.router.navigate(['/home']);
      console.log('Login realizado com sucesso!');
      console.log(response);
    },

    error: error => {
      console.error('Erro ao realizar login');
      console.error(error);
    }
  });
}

}
