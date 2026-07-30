import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/login-request';
import { LoginResponse } from '../models/login-response';
import { RegisterRequest } from '../models/register-request';
import { UserResponse } from '../models/user-response';

@Service()
export class AuthenticationService {

  private readonly http = inject(HttpClient);

  private readonly router = inject(Router);

  private readonly apiUrl = environment.apiUrl + '/auth';

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  register(request: RegisterRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${this.apiUrl}/register`, request);
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`, request);
  }

  saveSession(response: LoginResponse): void {
    this.saveUser(response.user);
    this.saveToken(response.token);
  }

  clearSession(): void {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  logout(): void {
    this.clearSession();
    this.router.navigate(['/login']);
  }

  getUser(): UserResponse | null {
    const user = localStorage.getItem(this.USER_KEY);
    if (!user) {
      return null;
    }
    return JSON.parse(user) as UserResponse;
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  private saveUser(user: UserResponse): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

}
