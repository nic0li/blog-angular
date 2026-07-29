import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { catchError, throwError } from 'rxjs';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  const token = authenticationService.getToken();

  const request = token
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
    : req;

  return next(request).pipe(
    catchError(error => {
      if (error.status === 401) {
        authenticationService.clearSession();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );

};
