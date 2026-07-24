import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../dto/auth/login-request';
import { LoginResponse } from '../dto/auth/login-response';
import { UserCreateRequest } from '../dto/user/user-create-request';
import { UserResponse } from '../dto/user/user-response';
import { Observable } from 'rxjs';
import { UserRole } from '../shared/enums/user-role.enum';

@Service()
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/auth';

  private readonly TOKEN_KEY = 'token';
  private readonly USER_KEY = 'user';

  register(request: UserCreateRequest): Observable<UserResponse> {
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

  isAdmin(): boolean {
    return this.hasRole(UserRole.ADMIN);
  }

  isUser(): boolean {
    return this.hasRole(UserRole.USER);
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

  private hasRole(role: UserRole): boolean {
    return this.getUser()?.role === role;
  }

}
