import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomePageComponent} from './home-page/home-page.component';
import {ServicesComponent} from './services/services.component';
import {PricesComponent} from './prices/prices.component';
import {JobsComponent} from './jobs/jobs.component';
import {ReferencesComponent} from './references/references.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomePageComponent},
  {path: 'sluzby', component: ServicesComponent},
  {path: 'cenik', component: PricesComponent},
  {path: 'reference', component: ReferencesComponent},
  {path: 'kariera', component: JobsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebRoutingModule {
}