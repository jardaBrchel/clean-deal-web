import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {AdminClient, AdminOrder, OrderDataRes} from '../../../models/admin.model';
import {ActivatedRoute} from '@angular/router';
import {getWorkingDaysAfter} from '../../../helpers/datetime.helper';
import {PaymentCode} from "sepa-payment-code";
import * as QRCode from 'qrcode';
import {HelpService} from '../../../services/help.service';
import {OrderService} from '../../../services/order.service';
import {PAYMENT_CASH, PAYMENT_METHODS} from '../../../config/order-config';

@Component({
  selector: 'app-order-invoice',
  templateUrl: './order-invoice.component.html',
  styleUrls: ['./order-invoice.component.scss']
})
export class OrderInvoiceComponent implements OnInit {
  order!: AdminOrder;
  client!: AdminClient;
  token!: string;
  today = new Date();
  payUntil = new Date();
  qr!: any;
  totalPrice!: any;
  paymentType!: string;
  isPaid = false;

  constructor(
    public adminService: AdminService,
    public orderService: OrderService,
    public helpService: HelpService,
    public route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    const daysToPay = 3;
    const workingDays = getWorkingDaysAfter(daysToPay);
    this.payUntil.setDate(this.payUntil.getDate() + workingDays);

    this.token = this.route.snapshot.paramMap.get('token') || '';
    this.fetchOrder();
  }

  fetchOrder() {
    this.orderService.getOrderForInvoice(Number(this.token)).subscribe(
      {
        next: (res: any) => {
          this.order = res.order;
          this.client = res.client;
          this.totalPrice = res.totalPrice;
          this.paymentType = PAYMENT_METHODS.find(pm => pm.id === res.order.paymentMethod)?.label || '';
          if (res.order.paymentMethod === PAYMENT_CASH) {
            this.isPaid = true;
          }
          const canvas = document.getElementById('canvas')
          QRCode.toCanvas(canvas,
            `SPD*1.0*ACC:CZ1620100000002602271763*AM:${this.order?.price}*CC:CZK*X-VS:${this.order?.variableSymbol}*MSG:${this.order?.variableSymbol}`,
            {
              width: 260
            });
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

}
