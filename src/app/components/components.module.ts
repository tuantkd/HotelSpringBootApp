import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { FormsComponent } from './forms/forms.component';
import { DemoFlexyModule } from '../demo-flexy.module';
import { GridListComponent } from './grid-list/grid-list.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ProgressComponent } from './progress/progress.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { RolesComponent } from './roles/roles.component';
import { TableCommonComponent } from './table-common/table-common.component';
import { AddRoleComponent } from './roles/add-role/add-role.component';
import { DemoNgZorroAntdModule } from '../ng-zorro-antd.module';
import { UsersComponent } from './users/users.component';
import { AddPermissionComponent } from './permissions/add-permission/add-permission.component';

@NgModule({
  declarations: [
    UsersComponent,
    PermissionsComponent,
    AddPermissionComponent,
    RolesComponent,
    AddRoleComponent,
    SliderComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ProgressComponent,
    FormsComponent,
    AlertsComponent,
    GridListComponent,
    TableCommonComponent,
  ],
  imports: [
    CommonModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    UsersComponent,
    PermissionsComponent,
    AddPermissionComponent,
    RolesComponent,
    AddRoleComponent,
    SliderComponent,
    ToolbarComponent,
    ProgressSnipperComponent,
    SnackbarComponent,
    MenuComponent,
    TabsComponent,
    ExpansionComponent,
    ProgressComponent,
    FormsComponent,
    AlertsComponent,
    GridListComponent,
    TableCommonComponent,
  ],
})
export class ComponentsModule {}
