import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {AgGridModule} from 'ag-grid-angular';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {ClientRoutingModule} from './client-routing.module';
import {ClientLoginComponent} from './client-login/client-login.component';
import {ResetPassComponent} from './reset-pass/reset-pass.component';
import {OrdersComponent} from './orders/orders.component';
import {HomesComponent} from './homes/homes.component';
import {ForgotPassComponent} from './forgot-pass/forgot-pass.component';
import {ClientAuthGuard} from '../../guards/client-auth.guard';

@NgModule({
  declarations: [

    ClientLoginComponent,
       ResetPassComponent,
       OrdersComponent,
       HomesComponent,
       ForgotPassComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ClientRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    AgGridModule,
    MatAutocompleteModule,
  ],
  exports: [
    MatDatepickerModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}, DatePipe, ClientAuthGuard]
})
export class ClientModule {
}
