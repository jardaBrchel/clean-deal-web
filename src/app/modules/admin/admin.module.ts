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

@NgModule({
  declarations: [
    DashboardComponent,
    LoginComponent
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
  ],
  exports: [
    MatDatepickerModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}, DatePipe]
})
export class AdminModule {
}
