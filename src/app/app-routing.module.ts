import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlertsComponent } from './components/alerts/alerts.component';
import { RolesComponent } from './components/roles/roles.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ExpansionComponent } from './components/expansion/expansion.component';
import { FormsComponent } from './components/forms/forms.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProgressSnipperComponent } from './components/progress-snipper/progress-snipper.component';
import { ProgressComponent } from './components/progress/progress.component';
import { PermissionsComponent } from './components/permissions/permissions.component';
import { SliderComponent } from './components/slider/slider.component';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ProductComponent } from './components/users/users.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FullComponent } from './layouts/full/full.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { canActivateChildGuard } from './guards/role.guard';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: FullComponent,
    canActivateChild: [canActivateChildGuard],
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'home',
        component: DashboardComponent,
        data: { allowedRoles: ['ADMIN', 'CUSTOMER'] },
      },
      { path: 'alerts', component: AlertsComponent },
      { path: 'forms', component: FormsComponent },
      { path: 'users', component: ProductComponent },
      { path: 'grid-list', component: GridListComponent },
      { path: 'menu', component: MenuComponent },
      { path: 'tabs', component: TabsComponent },
      { path: 'expansion', component: ExpansionComponent },
      { path: 'chips', component: ChipsComponent },
      { path: 'progress', component: ProgressComponent },
      { path: 'toolbar', component: ToolbarComponent },
      { path: 'progress-snipper', component: ProgressSnipperComponent },
      { path: 'snackbar', component: SnackbarComponent },
      { path: 'slider', component: SliderComponent },
      { path: 'permissions', component: PermissionsComponent },
      { path: 'roles', component: RolesComponent },
    ],
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
