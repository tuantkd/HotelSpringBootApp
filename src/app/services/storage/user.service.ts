import { Injectable } from '@angular/core';
import { USER_CONST } from '../../utils/user-const';
import { User, UserStorage } from '../../models/user';
import { Router } from '@angular/router';
import { NAVIGATE_ROUTE_CONST } from '../../utils/api-url-const';
import { NzModalService } from 'ng-zorro-antd/modal';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private readonly _router: Router,
    private readonly _modalService: NzModalService
  ) {}

  static saveTokenLocalStorage(token: string): void {
    localStorage.removeItem(USER_CONST.TOKEN);
    localStorage.setItem(USER_CONST.TOKEN, token);
  }

  static saveUserLocalStorage(user: UserStorage): void {
    localStorage.removeItem(USER_CONST.USER_INFO);
    localStorage.setItem(USER_CONST.USER_INFO, JSON.stringify(user));
  }

  static getTokenLocalStorage(): string {
    return String(localStorage.getItem(USER_CONST.TOKEN));
  }

  static getUserLocalStorage(): UserStorage {
    return JSON.parse(
      localStorage.getItem(USER_CONST.USER_INFO) as any
    ) as UserStorage;
  }

  static getUser(): User {
    const user = this.getUserLocalStorage();
    return user?.user ?? {};
  }

  static getUserRoles(): Array<string> {
    const user = this.getUserLocalStorage();
    return user?.userRoles ?? [];
  }

  static getUserPermissions(): Array<string> {
    const user = this.getUserLocalStorage();
    return user?.userPermissions ?? [];
  }

  static isLogined(): boolean {
    if (this.getTokenLocalStorage()) {
      return true;
    }
    return false;
  }

  logOut(): void {
    this._modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to log out?',
      nzOkText: 'Okie',
      nzCancelText: 'Cancel',
      nzOnOk: () => {
        localStorage.removeItem(USER_CONST.TOKEN);
        localStorage.removeItem(USER_CONST.USER_INFO);
        this._router.navigateByUrl(NAVIGATE_ROUTE_CONST.LOGIN);
      },
    });
  }
}
