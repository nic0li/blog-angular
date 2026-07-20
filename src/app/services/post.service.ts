import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PostCreateRequest } from '../dto/post/post-create-request';
import { PostFiltersRequest } from '../dto/post/post-filters-request';
import { PostResponse } from '../dto/post/post-response';
import { PostUpdateRequest } from '../dto/post/post-update-request';
import { PostViewResponse } from '../dto/post/post-view-response';

@Service()
export class PostService {

    private readonly http = inject(HttpClient);

    private readonly apiUrl = environment.apiUrl + '/posts';

  findAll(filters?: PostFiltersRequest): Observable<PostViewResponse[]> {
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
    return this.http.get<PostViewResponse[]>(
      this.apiUrl, { params });
  }

  findById(id: number): Observable<PostViewResponse> {
    return this.http.get<PostViewResponse>(
      `${this.apiUrl}/${id}`);
  }

  create(request: PostCreateRequest): Observable<PostResponse> {
    return this.http.post<PostResponse>(
      this.apiUrl, request);
  }

  update(id: number, request: PostUpdateRequest): Observable<PostResponse> {
    return this.http.patch<PostResponse>(
      `${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`);
  }    

}
