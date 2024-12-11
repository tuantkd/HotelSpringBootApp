import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../../services/storage/user.service';
import { SideBarMenu } from '../../models/menu';
import { MenuService } from '../../services/common/menu.service';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss'],
})
export class FullComponent {
  search: boolean = false;
  routerActive: string = 'activelink';
  sidebarMenu: SideBarMenu[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly _menuService: MenuService,
    private readonly _userService: UserService,
  ) {}

  ngOnInit() {
    this.sidebarMenu = this._menuService.getMenuItems();
  }

  logOut(): void {
    this._userService.logOut();
  }
}
