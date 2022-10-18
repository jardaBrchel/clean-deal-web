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

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent,
    OrdersComponent,
    CleanersComponent,
    AddCleanerComponent,
    EditCleanerComponent
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
  ],
  exports: [
    MatDatepickerModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}, DatePipe, AdminAuthGuard]
})
export class AdminModule {
}
