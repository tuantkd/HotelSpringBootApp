import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { USER_CONST } from './utils/user-const';
import { NAVIGATE_ROUTE_CONST } from './utils/api-url-const';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem(USER_CONST.TOKEN);

  if (token) {
    const isExpired = isTokenExpired(token);

    if (isExpired) {
      localStorage.removeItem(USER_CONST.TOKEN); // Clear the expired token
      router.navigateByUrl(NAVIGATE_ROUTE_CONST.LOGIN); // Redirect to login page
      return next(req); // Optionally block the request
    }

    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(modifiedReq);
  }

  return next(req);
};

// Utility function to check token expiry
function isTokenExpired(token: string): boolean {
  try {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    return Date.now() > expiry * 1000;
  } catch {
    return true; // If token is invalid, treat it as expired
  }
}
