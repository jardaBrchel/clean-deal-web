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
    path: 'cleaners',
    canActivate: [AdminAuthGuard],
    component: CleanersComponent
  },
  {
    path: 'add-cleaner',
    canActivate: [AdminAuthGuard],
    component: AddCleanerComponent
  },
  {
    path: 'edit-cleaner/:cleanerId',
    canActivate: [AdminAuthGuard],
    component: EditCleanerComponent
  },
  {
    path: 'cleaner-detail/:cleanerId',
    canActivate: [AdminAuthGuard],
    component: CleanerDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {
}
