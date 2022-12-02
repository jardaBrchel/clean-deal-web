import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {AdminService} from '../../../services/admin.service';
import {ClientService} from '../../../services/client.service';
import {OrderDataRes} from '../../../models/admin.model';
import {CLEANING_TYPES, FREQUENCY, HOME_TYPES, PAYMENT_METHODS, TIMES} from '../../../config/order-config';
import {booleanToYesNo} from '../../../helpers/logic.helper';

@Component({
  selector: 'app-grid-order-actions',
  templateUrl: './grid-order-actions.component.html',
  styleUrls: ['./grid-order-actions.component.scss']
})
export class GridOrderActionsComponent implements ICellRendererAngularComp {
  private params: any;
  public refresh: any;
  public itemId!: number | string;
  public type!: 'order' | 'client' | 'homes';
  public module!: 'client' | 'admin';
  public isEditable!: true;
  public isRemovable!: boolean;

  constructor(
    private adminService: AdminService,
    private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
    this.type = params.type;
    this.module = params.module;
    this.isEditable = params.isEditable;
    this.itemId = params.data[params.type + 'Id'];
    if (params.data.date) {
      const [day, month, year] = params.data.date.split('.');
      const orderDate = new Date();
      const removableLimit = new Date();
      removableLimit.setDate(removableLimit.getDate() + 2);
      orderDate.setFullYear(year);
      orderDate.setMonth(month - 1);
      orderDate.setDate(day);
      orderDate.setHours(12);
      this.isRemovable = orderDate > removableLimit;
    }
  }

  deleteItem() {
    const titles = {
      'order': 'Samzat úklid?',
      'client': 'Samzat klienta?',
      'homes': 'Samzat domov?',
    }

    let deleteFunction;
    if (confirm(titles[this.type])) {
      switch (this.type) {
        case 'order':
          deleteFunction = this.adminService.removeOrder.bind(this.adminService);
          break;
        case 'client':
          // deleteFunction = this.clientService.deleteClient;
          break;
        case 'homes':
          // deleteFunction =
          break;
      }
    } else {

    }

    if (deleteFunction) {
      console.log('deleteFunction', deleteFunction);
      deleteFunction(this.itemId as number).subscribe(
        {
          next: (res: OrderDataRes) => {
            window.location.reload();
          },
          error: (e) => {
            console.log('error ', e);
          },
        }
      )
    }
  }

}
