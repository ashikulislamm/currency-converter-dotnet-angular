import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Functional HTTP Interceptor to attach JWT Bearer tokens to outgoing API requests
 * and handle 401 Unauthorized responses.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  const router = inject(Router);
  const isBrowser = isPlatformBrowser(platformId);

  const token = isBrowser ? localStorage.getItem('token') : null;

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // If unauthorized (401), clear session and redirect to login page
      if (error.status === 401) {
        if (isBrowser) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          router.navigate(['/login']);
        }
      }
      return throwError(() => error);
    })
  );
};
