import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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

@NgModule({
  declarations: [
    HomePageComponent,
    ServicesComponent,
    PricesComponent,
    ReferencesComponent,
    JobsComponent,
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
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'cs-CZ'}]
})
export class WebModule {
}
