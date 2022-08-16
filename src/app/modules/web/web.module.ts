import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HomePageComponent} from './home-page/home-page.component';
import {ServicesComponent} from './services/services.component';
import {PricesComponent} from './prices/prices.component';
import {ReferencesComponent} from './references/references.component';
import {JobsComponent} from './jobs/jobs.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {WebRoutingModule} from './web-routing.module';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {FaqComponent} from './faq/faq.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ServicesComponent,
    PricesComponent,
    ReferencesComponent,
    JobsComponent,
    FaqComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    WebRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  exports: [
    MatDatepickerModule,
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}, DatePipe]
})
export class WebModule {
}
