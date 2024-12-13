import { Injectable } from '@angular/core';
import { SideBarMenu } from '../../models/menu';
import { UserService } from '../storage/user.service';
import { MENU_ITEMS } from '../../utils/menu-const';

@Injectable({
  providedIn: 'root',
})
export class MenuService {

  constructor() {}

  // Get menu items based on the user's role
  getMenuItems(): SideBarMenu[] {
    const userPermissions = UserService.getUserPermissions();
    return MENU_ITEMS.filter((item) => userPermissions.includes(item.permission));;
  }
}
