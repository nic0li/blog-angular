import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PostResponse } from '../models/post-response';
import { UserProfileResponse } from '../models/user-profile-response';
import { UserResponse } from '../models/user-response';

@Service()
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/users';

  findById(id: number): Observable<UserProfileResponse> {
    return this.http.get<UserProfileResponse>(
      `${this.apiUrl}/${id}`);
  }

  findAll(): Observable<UserProfileResponse[]> {
    return this.http.get<UserProfileResponse[]>(this.apiUrl);
  }

  toggleUserRole(id: number): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      `${this.apiUrl}/${id}/role`, {});
  }

  deleteById(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`);
  }

  findPostsByUser(id: number): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(
      `${this.apiUrl}/${id}/posts`);
  }

}
