import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CategoryRequest } from '../models/category-request';
import { CategoryResponse } from '../models/category-response';

@Service()
export class CategoryService {

  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.apiUrl + '/categories';

  findAll(name?: string): Observable<CategoryResponse[]> {
    let params = new HttpParams();
    if (name?.trim()) {
      params = params.set('name', name);
    }
    return this.http.get<CategoryResponse[]>(this.apiUrl, { params });
  }

  findById(id: number): Observable<CategoryResponse> {
    return this.http.get<CategoryResponse>(
      `${this.apiUrl}/${id}`);
  }

  create(request: CategoryRequest): Observable<CategoryResponse> {
    return this.http.post<CategoryResponse>(
      this.apiUrl, request);
  }

  update(id: number, request: CategoryRequest): Observable<CategoryResponse> {
    return this.http.patch<CategoryResponse>(
      `${this.apiUrl}/${id}`, request);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`);
  }

}
