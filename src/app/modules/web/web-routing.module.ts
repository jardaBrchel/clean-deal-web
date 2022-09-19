import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ServicesComponent} from './services/services.component';
import {PricesComponent} from './prices/prices.component';
import {JobsComponent} from './jobs/jobs.component';
import {ReferencesComponent} from './references/references.component';
import {FaqComponent} from './faq/faq.component';
import {NewOrderComponent} from './new-order/new-order.component';
import {ContactsComponent} from './contacts/contacts.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent},
  {path: 'sluzby', component: ServicesComponent},
  {path: 'cenik', component: PricesComponent},
  {path: 'objednavka-uklidu', component: NewOrderComponent},
  {path: 'reference', component: ReferencesComponent},
  {path: 'kariera', component: JobsComponent},
  {path: 'kontakty', component: ContactsComponent},
  {path: 'caste-otazky', component: FaqComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {
}
