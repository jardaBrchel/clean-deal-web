import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderInvoiceComponent} from './order-invoice/order-invoice.component';

const routes: Routes = [
  {
    path: ':token',
    pathMatch: 'full',
    component: OrderInvoiceComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InvoiceRoutingModule {
}
