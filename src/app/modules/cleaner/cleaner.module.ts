import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {AgGridModule} from 'ag-grid-angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {SharedModule} from '../shared/shared.module';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {momentAdapterFactory} from '../../app.module';
import {CleanerAuthGuard} from '../../guards/cleaner-auth.guard';
import {CleanerRoutingModule} from './cleaner-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { SettingsComponent } from './settings/settings.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

@NgModule({
  declarations: [
    LoginComponent,
    OrdersComponent,
    SettingsComponent,
    OrderDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CleanerRoutingModule,
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
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}, DatePipe, CleanerAuthGuard]
})
export class CleanerModule { }
