import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserResponse } from '../models/user-response';
import { UserUpdateRequest } from '../models/user-update-request';
import { UserViewResponse } from '../models/user-view-response';
import { PostResponse } from '../models/post-response';

@Service()
export class UserService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/users';

  findAll(): Observable<UserViewResponse[]> {
    return this.http.get<UserViewResponse[]>(this.apiUrl);
  }

  findById(id: number): Observable<UserViewResponse> {
    return this.http.get<UserViewResponse>(
      `${this.apiUrl}/${id}`);
  }

  update(id: number, request: UserUpdateRequest): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      `${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`);
  }

  findMe(): Observable<UserResponse> {
    return this.http.get<UserResponse>(
      `${this.apiUrl}/me`);
  }

  updateMe(request: UserUpdateRequest): Observable<UserResponse> {
    return this.http.patch<UserResponse>(
      `${this.apiUrl}/me`, request);
  }

  deleteMe(): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/me`);
  }

  findPostsByUser(id: number): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(
      `${this.apiUrl}/${id}/posts`);
  }

  findAuthenticatedUserPosts(): Observable<PostResponse[]> {
    return this.http.get<PostResponse[]>(
      `${this.apiUrl}/me/posts`);
  }

}
