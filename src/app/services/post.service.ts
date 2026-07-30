import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { PostFiltersRequest } from '../models/post-filters-request';
import { PostRequest } from '../models/post-request';
import { PostResponse } from '../models/post-response';

@Service()
export class PostService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/posts';

  findAll(filters?: PostFiltersRequest): Observable<PostResponse[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null &&
          value !== undefined &&
          value !== '') {
          params = params.set(key, String(value));
        }
      });
    }
    return this.http.get<PostResponse[]>(
      this.apiUrl, { params });
  }

  findById(id: number): Observable<PostResponse> {
    return this.http.get<PostResponse>(
      `${this.apiUrl}/${id}`);
  }

  create(request: PostRequest): Observable<PostResponse> {
    return this.http.post<PostResponse>(
      this.apiUrl, request);
  }

  update(id: number, request: PostRequest): Observable<PostResponse> {
    return this.http.patch<PostResponse>(
      `${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`);
  }

}
