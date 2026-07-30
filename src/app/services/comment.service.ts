import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { CommentRequest } from '../models/comment-request';
import { CommentResponse } from '../models/comment-response';

@Service()
export class CommentService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/comments';

  findAll(): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(this.apiUrl);
  }

  findById(id: number): Observable<CommentResponse> {
    return this.http.get<CommentResponse>(
      `${this.apiUrl}/${id}`);
  }

  create(postId: number, request: CommentRequest): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      this.apiUrl, { ...request, postId });
  }

  update(id: number, request: CommentRequest): Observable<CommentResponse> {
    return this.http.patch<CommentResponse>(
      `${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`);
  }

}
