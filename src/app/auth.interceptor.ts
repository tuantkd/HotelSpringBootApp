import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { USER_CONST } from './utils/user-const';
import { NAVIGATE_ROUTE_CONST } from './utils/api-url-const';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = localStorage.getItem(USER_CONST.TOKEN);

  if (token) {
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(modifiedReq);
  } else {
    router.navigateByUrl(NAVIGATE_ROUTE_CONST.LOGIN); // Redirect to login page
    return next(req); // Optionally block the request
  }

  return next(req);
};
