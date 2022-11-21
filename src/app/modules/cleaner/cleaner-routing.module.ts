import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CleanerAuthGuard} from '../../guards/cleaner-auth.guard';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [CleanerAuthGuard],
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'orders',
  //   canActivate: [CleanerAuthGuard],
  //   component: OrdersComponent
  // },
  // {
  //   path: 'orders/detail/:orderId',
  //   canActivate: [CleanerAuthGuard],
  //   component: OrderDetailComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CleanerRoutingModule {
}
