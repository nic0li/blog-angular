import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCreateRequest } from '../../../dto/user/user-create-request';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register.component',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  request: UserCreateRequest = {
    email: '',
    password: '',
    name: '',
    photo: ''
  };
  confirmPassword: string = '';

  register(): void {

    if (this.request.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    this.authService.register(this.request).subscribe({
      next: () => {
        alert('User registered successfully!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(error);
        alert('Failed to register user.');
      }
    });

  }

}
