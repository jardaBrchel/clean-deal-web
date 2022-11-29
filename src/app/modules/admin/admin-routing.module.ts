import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {AdminAuthGuard} from '../../guards/admin-auth.guard';
import {OrdersComponent} from './orders/orders.component';
import {CleanersComponent} from './cleaners/cleaners.component';
import {AddCleanerComponent} from './add-cleaner/add-cleaner.component';
import {EditCleanerComponent} from './edit-cleaner/edit-cleaner.component';
import {CleanerDetailComponent} from './cleaner-detail/cleaner-detail.component';
import {HomesComponent} from './homes/homes.component';
import {ClientsComponent} from './clients/clients.component';
import {HomeDetailComponent} from './home-detail/home-detail.component';
import {ClientDetailComponent} from './client-detail/client-detail.component';
import {OrderDetailComponent} from './order-detail/order-detail.component';
import {CreateOrderComponent} from './create-order/create-order.component';

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
    canActivate: [AdminAuthGuard],
    component: OrdersComponent
  },
  {
    path: 'orders/detail/:orderId',
    canActivate: [AdminAuthGuard],
    component: OrderDetailComponent
  },
  {
    path: 'cleaners',
    canActivate: [AdminAuthGuard],
    component: CleanersComponent
  },
  {
    path: 'cleaners/add',
    canActivate: [AdminAuthGuard],
    component: AddCleanerComponent
  },
  {
    path: 'cleaners/edit/:cleanerId',
    canActivate: [AdminAuthGuard],
    component: EditCleanerComponent
  },
  {
    path: 'cleaners/detail/:cleanerId',
    canActivate: [AdminAuthGuard],
    component: CleanerDetailComponent
  },
  {
    path: 'homes',
    canActivate: [AdminAuthGuard],
    component: HomesComponent
  },
  {
    path: 'homes/detail/:homeId',
    canActivate: [AdminAuthGuard],
    component: HomeDetailComponent
  },
  {
    path: 'clients',
    canActivate: [AdminAuthGuard],
    component: ClientsComponent
  },
  {
    path: 'clients/detail/:clientId',
    canActivate: [AdminAuthGuard],
    component: ClientDetailComponent
  },
  {
    path: 'create-order',
    canActivate: [AdminAuthGuard],
    component: CreateOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
