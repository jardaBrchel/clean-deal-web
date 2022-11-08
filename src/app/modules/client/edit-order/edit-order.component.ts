import { Component, OnInit } from '@angular/core';
import {NewOrderBaseComponent} from '../../shared/new-order-base/new-order-base.component';
import {Client} from '../../../models/client.model';
import {AdminHome, AdminOrder, OrderDataRes} from '../../../models/admin.model';
import {ClientService} from '../../../services/client.service';
import {ActivatedRoute} from '@angular/router';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss', '../../shared/new-order-base/new-order-base.component.scss']
})
export class EditOrderComponent extends NewOrderBaseComponent  implements OnInit {
  clientData: Client | null = {};
  homesData!: AdminHome[];
  homesDataLoaded = false;
  orderDataLoaded = false;
  orderId!: number;
  orderData!: AdminOrder;

  constructor(
    public clientService: ClientService,
    public adminService: AdminService,
    public route: ActivatedRoute,
  ) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.clientData = this.clientService.getCurrentUser()
    // fetch homes
    this.fetchHomes();
    this.fetchOrder();
  }

  fetchHomes() {
    this.clientService.getHomes(this.clientService.getCurrentUser()?.clientId || '').subscribe(
      {
        next: (res: AdminHome[]) => {
          this.homesData = res;
          this.homesDataLoaded = true;
        },
        error: (e) => {
        },
      }
    );
  }

  fetchOrder() {
    this.adminService.getOrderDetail(this.orderId).subscribe(
      {
        next: (res: OrderDataRes) => {
          this.orderData = res.order;
          this.orderDataLoaded = true;
        },
        error: (e) => {
        },
      }
    );
  }

}
