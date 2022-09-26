import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {ServicesComponent} from './services/services.component';
import {PricesComponent} from './prices/prices.component';
import {ReferencesComponent} from './references/references.component';
import {JobsComponent} from './jobs/jobs.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {WebRoutingModule} from './web-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {FaqComponent} from './faq/faq.component';
import {NewOrderComponent} from './new-order/new-order.component';
import {ContactsComponent} from './contacts/contacts.component';
import {CustomDateAdapter} from '../../components/custom-date-adapter';
import { TermsComponent } from './terms/terms.component';
import { GdprComponent } from './gdpr/gdpr.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ServicesComponent,
    PricesComponent,
    ReferencesComponent,
    JobsComponent,
    FaqComponent,
    NewOrderComponent,
    ContactsComponent,
    TermsComponent,
    GdprComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    WebRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  exports: [
    MatDatepickerModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'},
    { provide: DateAdapter, useClass: CustomDateAdapter },
    DatePipe,
  ]
})
export class WebModule {
}
