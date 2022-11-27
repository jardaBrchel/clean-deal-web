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
import {getPageTitle} from '../../helpers/utils';

const routes: Routes = [
  {
    path: WEB_URLS.HOME_PAGE,
    pathMatch: 'full',
    component: HomePageComponent,
    title: getPageTitle('Úklid domácností v Praze a okolí')
  },
  {
    path: WEB_URLS.PRICES,
    component: PricesComponent,
    title: getPageTitle('Ceník úklidových prací')
  },
  {
    path: WEB_URLS.NEW_ORDER,
    component: NewOrderComponent,
    title: getPageTitle('Poptávka nového úklidu')
  },
  {
    path: WEB_URLS.JOBS,
    component: JobsComponent,
    title: getPageTitle('Kariéra')
  },
  {
    path: WEB_URLS.CONTACTS,
    component: ContactsComponent,
    title: getPageTitle('Kontakty')
  },
  {
    path: WEB_URLS.FAQ,
    component: FaqComponent,
    title: getPageTitle('Časté otázky')
  },
  {
    path: WEB_URLS.TERMS,
    component: TermsComponent,
    title: getPageTitle('Všeobecné obchodní podmínky')
  },
  {
    path: WEB_URLS.GDPR,
    component: GdprComponent,
    title: getPageTitle('GDPR')
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {
}
