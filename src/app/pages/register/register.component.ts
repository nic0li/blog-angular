import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { RegisterRequest } from '../../models/register-request';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-register.component',
  imports: [FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthenticationService);

  request: RegisterRequest = {
    email: '',
    password: '',
    name: '',
    photo: ''
  };
  confirmPassword: string = '';

  register(): void {
    if (this.request.password !== this.confirmPassword) {
      alert('Senhas não coincidem.');
      return;
    }

    this.authenticationService.register(this.request).subscribe({
      next: () => {
        alert('Usuário cadastrado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: () => {
        console.error;
        alert('Falha ao cadastrar usuário.');
      }
    });

  }

}
