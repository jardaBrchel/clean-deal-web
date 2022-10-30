import {Component} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-grid-order-actions',
  templateUrl: './grid-order-actions.component.html',
  styleUrls: ['./grid-order-actions.component.scss']
})
export class GridOrderActionsComponent implements ICellRendererAngularComp  {
  private params: any;
  public refresh: any;
  public itemId!: number| string;
  public type!: 'order'|'client'|'home';

  constructor(
    private adminService: AdminService,
  ) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
    this.type = params.type;
    this.itemId = params.data[params.type + 'Id'];
  }

  deleteItem() {
    let fnc;
    if (this.type) {
      fnc = this.adminService.removeOrder(this.itemId as number);
    }
    // TODO delete order
  }

}
