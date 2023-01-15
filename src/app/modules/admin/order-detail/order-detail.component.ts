import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderDataRes} from '../../../models/admin.model';
import {CLEANING_TYPES, FREQUENCY, HOME_TYPES, TIMES} from '../../../config/order-config';
import {booleanToYesNo} from '../../../helpers/logic.helper';

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

  constructor(
    private adminService: AdminService,
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

    const extrasMap = [
      {
        id: 'windows',
        label: 'Okna',
        units: `m<sup>2</sup>`
      },
      {
        id: 'windowBlinds',
        label: 'Žaluzie',
        units: `m<sup>2</sup>`
      },
    ]

    this.orderData.order.extras.split(',').filter(a => !!a).map(e => {
      const [key, val] = e.split(':');
      this.extras.push({
        label: extrasMap.find(e => e.id === key)?.label,
        units: extrasMap.find(e => e.id === key)?.units,
        value: val,
      })
    });
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
          this.setExtras();
          console.log('res', res);
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

  downloadInvoice() {
    this.adminService.getOrderInvoice(this.orderId).subscribe(
      {
        next: (res: any) => {
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }
}
