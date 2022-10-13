import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {PricesComponent} from './prices/prices.component';
import {JobsComponent} from './jobs/jobs.component';
import {FaqComponent} from './faq/faq.component';
import {NewOrderComponent} from './new-order/new-order.component';
import {ContactsComponent} from './contacts/contacts.component';
import {TermsComponent} from './terms/terms.component';
import {GdprComponent} from './gdpr/gdpr.component';
import {WEB_URLS} from "../../config/web.config";

const routes: Routes = [
  {path: WEB_URLS.HOME_PAGE, pathMatch: 'full', component: HomePageComponent},
  {path: WEB_URLS.PRICES, component: PricesComponent},
  {path: WEB_URLS.NEW_ORDER, component: NewOrderComponent},
  {path: WEB_URLS.JOBS, component: JobsComponent},
  {path: WEB_URLS.CONTACTS, component: ContactsComponent},
  {path: WEB_URLS.FAQ, component: FaqComponent},
  {path: WEB_URLS.TERMS, component: TermsComponent},
  {path: WEB_URLS.GDPR, component: GdprComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {
}
