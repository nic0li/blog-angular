import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CommentCreateRequest } from '../dto/comment/comment-create-request';
import { CommentResponse } from '../dto/comment/comment-response';
import { CommentUpdateRequest } from '../dto/comment/comment-update-request';
import { CommentViewResponse } from '../dto/comment/comment-view-response';

@Service()
export class CommentService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = environment.apiUrl + '/comments';

  findAll(): Observable<CommentViewResponse[]> {
    return this.http.get<CommentViewResponse[]>(this.apiUrl);
  }

  findById(id: number): Observable<CommentViewResponse> {
    return this.http.get<CommentViewResponse>(
      `${this.apiUrl}/${id}`);
  }

  create(request: CommentCreateRequest): Observable<CommentResponse> {
    return this.http.post<CommentResponse>(
      this.apiUrl, request);
  }

  update(id: number, request: CommentUpdateRequest): Observable<CommentResponse> {
    return this.http.patch<CommentResponse>(
      `${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`);
  }

}
