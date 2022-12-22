import { Component, OnInit } from '@angular/core';
import {OrderDataRes} from '../../../models/admin.model';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CLEANING_TYPES, FREQUENCY, HOME_TYPES, PAYMENT_METHODS, TIMES} from '../../../config/order-config';
import {booleanToYesNo} from '../../../helpers/logic.helper';
import {HelpService} from '../../../services/help.service';
import {ExtrasMap} from '../../../models/order.model';
import {PAY_TAX_CONSTANT, PRICE_HOUR_CONSTANT, PRICE_HOUR_SHARE} from '../../../config/price-config';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  orderId!: number;
  orderData!: OrderDataRes;
  extras: any = [];
  isConfirmed!: string;
  isPaid!: string;
  cleaners!: string;
  homeType!: string;
  paymentMethod!: string;
  cashForCleaner!: number;
  mapLink!:string;

  constructor(
    private adminService: AdminService,
    private helpService: HelpService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.fetchOrder();
  }

  setExtras() {
    if (!this.orderData.order.extras) return;

    const extrasMap = ExtrasMap;

    this.orderData.order.extras.split(',').filter(a => !!a).map(e => {
      const [key, val] = e.split(':');
      this.extras.push({
        label: extrasMap.find(e => e.id === key)?.label,
        units: extrasMap.find(e => e.id === key)?.units,
        value: val,
      })
    });
  }

  countCashForCleaner() {
    const cleanShare = (this.orderData.order.cleaningDuration * PRICE_HOUR_CONSTANT) * PRICE_HOUR_SHARE;
    const tax = cleanShare * PAY_TAX_CONSTANT;
    this.cashForCleaner = cleanShare - tax;
  }

  fetchOrder() {
    this.adminService.getOrderDetail(this.orderId).subscribe(
      {
        next: (res: OrderDataRes) => {
          this.orderData = res;
          this.orderData.order.cleaningTime = TIMES.find(t => t.id === res.order.cleaningTime)?.label || '';
          this.orderData.order.frequency = FREQUENCY.find(t => t.id === res.order.frequency)?.label || '';
          this.orderData.order.cleaningType = CLEANING_TYPES.find(t => t.id === res.order.cleaningType)?.label || '';
          this.isConfirmed = booleanToYesNo(res.order.isConfirmed);
          this.isPaid = booleanToYesNo(res.order.isPaid);
          this.cleaners = res.cleaner.map(c => c.name).join(', ');
          this.homeType = HOME_TYPES.find(t => t.id === res.home.homeType)?.label || '';
          this.paymentMethod = PAYMENT_METHODS.find(t => t.id === res.order.paymentMethod)?.label || '';
          this.setExtras();
          console.log('res', res);
          this.countCashForCleaner();
          this.createMapLink();
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

  createMapLink() {
    const address = encodeURIComponent(`${this.orderData.home.address}, ${this.orderData.home.city} ${this.orderData.home.pscNumber}`);
    this.mapLink = `https://mapy.cz/letecka?q=${address}`;
  }
}
