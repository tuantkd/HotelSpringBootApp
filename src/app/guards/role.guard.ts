import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/storage/user.service';
import { API_URL_CONST } from '../utils/api-url-const';

export const canActivateChildGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  const _router = inject(Router);

  if (UserService.isAdminLogined() || UserService.isCustomerLogined()) {
    return true; // Have access
  }

  // Redirect if no permission
  _router.navigate([API_URL_CONST.LOGIN]);
  return false;
};
