import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../dto/auth/login-request';
import { LoginResponse } from '../dto/auth/login-response';
import { UserCreateRequest } from '../dto/user/user-create-request';
import { UserResponse } from '../dto/user/user-response';
import { Observable } from 'rxjs';

@Service()
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/auth';

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
    `${this.apiUrl}/login`, request);
  }

  register(request: UserCreateRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(
    `${this.apiUrl}/register`, request);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

}
