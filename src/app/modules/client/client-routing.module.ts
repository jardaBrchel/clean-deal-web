import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientLoginComponent} from './client-login/client-login.component';
import {ResetPassComponent} from './reset-pass/reset-pass.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {ClientAuthGuard} from '../../guards/client-auth.guard';
import {OrdersComponent} from './orders/orders.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [ClientAuthGuard],
    component: OrdersComponent
  },
  {
    path: 'orders',
    canActivate: [ClientAuthGuard],
    component: OrdersComponent
  },
  {
    path: 'login',
    component: ClientLoginComponent
  },
  {
    path: 'forgot-pass',
    component: ForgotPassComponent
  },
  {
    path: 'reset-pass/:token',
    component: ResetPassComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {
}
