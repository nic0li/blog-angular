import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostResponse } from '../models/post-response';
import { UserResponse } from '../models/user-response';
import { UserUpdateRequest } from '../models/user-update-request';
import { UserPasswordUpdateRequest } from '../models/user-password-update-request';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedUserService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/users/me';

  find(): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      this.apiUrl);
  }

  update(request: UserUpdateRequest): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      this.apiUrl, request);
  }

  updatePassword(request: UserPasswordUpdateRequest): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/password`, request);
  }

  delete(): Observable<void> {
    return this.http.delete<void>(
      this.apiUrl);
  }

  findAllPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(
      `${this.apiUrl}/posts`);
  }

}
