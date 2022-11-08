import { Component, OnInit } from '@angular/core';
import {NewOrderBaseComponent} from '../../shared/new-order-base/new-order-base.component';
import {ClientService} from '../../../services/client.service';
import {Client} from '../../../models/client.model';
import {AdminHome} from '../../../models/admin.model';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss', '../../shared/new-order-base/new-order-base.component.scss']
})
export class CreateOrderComponent extends NewOrderBaseComponent implements OnInit {
  clientData: Client | null = {};
  homesData!: AdminHome[];
  homesDataLoaded = false;

  constructor(
    public clientService: ClientService,
  ) {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.clientData = this.clientService.getCurrentUser()
    // fetch homes
    this.fetchHomes();
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

}
