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
import {OrderFormComponent} from './order-form/order-form.component';
import { NewOrderBaseComponent } from './new-order-base/new-order-base.component';
import { EventsCalendarComponent } from './events-calendar/events-calendar.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {momentAdapterFactory} from '../../app.module';
import localeCs from '@angular/common/locales/cs';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeCs);

@NgModule({
  declarations: [
    OrderFormComponent,
    NewOrderBaseComponent,
    EventsCalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatIconModule,
    AgGridModule,
    MatAutocompleteModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: momentAdapterFactory }),
  ],
  exports: [
    MatDatepickerModule,
    OrderFormComponent,
    EventsCalendarComponent,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}, DatePipe]
})
export class SharedModule {
}
