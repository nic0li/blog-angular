import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { UserResponse } from '../dto/user/user-response';
import { UserUpdateRequest } from '../dto/user/user-update-request';
import { UserViewResponse } from '../dto/user/user-view-response';
import { PostViewResponse } from '../dto/post/post-view-response';

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

  findPostsByUser(id: number): Observable<PostViewResponse[]> {
    return this.http.get<PostViewResponse[]>(
      `${this.apiUrl}/${id}/posts`);
  }

  findAuthenticatedUserPosts(): Observable<PostViewResponse[]> {
    return this.http.get<PostViewResponse[]>(
      `${this.apiUrl}/me/posts`);
  }
    
}
