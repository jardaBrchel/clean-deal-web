import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {AdminRoutingModule} from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import {AdminAuthGuard} from '../../guards/admin-auth.guard';
import { OrdersComponent } from './orders/orders.component';
import { CleanersComponent } from './cleaners/cleaners.component';
import { AddCleanerComponent } from './add-cleaner/add-cleaner.component';
import { EditCleanerComponent } from './edit-cleaner/edit-cleaner.component';
import { MatIconModule} from '@angular/material/icon';
import { CleanerDetailComponent } from './cleaner-detail/cleaner-detail.component';
import {AgGridModule} from 'ag-grid-angular';
import { HomesComponent } from './homes/homes.component';
import { HomeDetailComponent } from './home-detail/home-detail.component';
import { ClientsComponent } from './clients/clients.component';
import { ClientDetailComponent } from './client-detail/client-detail.component';
import { GridOrderActionsComponent } from './grid-order-actions/grid-order-actions.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { CreateOrderComponent } from './create-order/create-order.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {momentAdapterFactory} from '../../app.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    OrdersComponent,
    CleanersComponent,
    AddCleanerComponent,
    EditCleanerComponent,
    CleanerDetailComponent,
    HomesComponent,
    HomeDetailComponent,
    ClientsComponent,
    ClientDetailComponent,
    GridOrderActionsComponent,
    OrderDetailComponent,
    CreateOrderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    AgGridModule,
    MatAutocompleteModule,
    SharedModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  exports: [
    MatDatepickerModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}, DatePipe, AdminAuthGuard]
})
export class AdminModule {
}
