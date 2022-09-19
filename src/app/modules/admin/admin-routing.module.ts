import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AdminAuthGuard} from '../../guards/admin-auth.guard';
import {OrdersComponent} from './orders/orders.component';
import {CleanersComponent} from './cleaners/cleaners.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AdminAuthGuard],
    component: DashboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: 'cleaners',
    component: CleanersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
