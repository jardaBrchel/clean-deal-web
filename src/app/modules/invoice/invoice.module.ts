import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {InvoiceRoutingModule} from './invoice-routing.module';
import { OrderInvoiceComponent } from './order-invoice/order-invoice.component';

@NgModule({
  declarations: [
    OrderInvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    InvoiceRoutingModule,
  ],
  exports: [],
  providers: []
})
export class InvoiceModule {
}
