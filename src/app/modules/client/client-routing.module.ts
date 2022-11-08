import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientLoginComponent} from './client-login/client-login.component';
import {ResetPassComponent} from './reset-pass/reset-pass.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {ClientAuthGuard} from '../../guards/client-auth.guard';
import {OrdersComponent} from './orders/orders.component';
import {HomesComponent} from './homes/homes.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {HomeDetailComponent} from './home-detail/home-detail.component';
import {CreateOrderComponent} from './create-order/create-order.component';
import {EditOrderComponent} from './edit-order/edit-order.component';

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
    path: 'orders/detail/:orderId',
    canActivate: [ClientAuthGuard],
    component: OrderDetailComponent
  },
  {
    path: 'orders/edit/:orderId',
    canActivate: [ClientAuthGuard],
    component: EditOrderComponent
  },
  {
    path: 'orders/create-order',
    canActivate: [ClientAuthGuard],
    component: CreateOrderComponent
  },
  {
    path: 'homes',
    canActivate: [ClientAuthGuard],
    component: HomesComponent
  },
  {
    path: 'homes/detail/:homeId',
    canActivate: [ClientAuthGuard],
    component: HomeDetailComponent
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
