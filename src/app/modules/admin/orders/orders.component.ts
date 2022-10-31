import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {AdminOrder, AdminOrdersRes, Cleaner} from '../../../models/admin.model';
import {AdminService} from '../../../services/admin.service';
import {booleanToYesNo} from '../../../helpers/logic.helper';
import {TIMES} from '../../../config/order-config';
import {dateToDmyFormat} from '../../../helpers/datetime.helper';
import {GridOrderActionsComponent} from '../grid-order-actions/grid-order-actions.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  ordersLoaded = false;
  colDefs = (historyOrders: boolean = false): ColDef[] => {
    return [
      {field: 'date', headerName: 'Datum', minWidth: 120 },
      {field: 'time', headerName: 'Čas', minWidth: 150},
      {field: 'client', headerName: 'Klient', minWidth: 150},
      {field: 'home', headerName: 'Domov', minWidth: 220},
      {field: 'duration', headerName: 'Doba', minWidth: 100},
      {field: 'price', headerName: 'Cena', minWidth: 100},
      {field: 'confirmed', headerName: 'Je potvrzeno', minWidth: 150},
      {field: 'paid', headerName: 'Je zaplaceno', minWidth: 150, initialHide: !historyOrders},
      {field: 'actions', headerName: 'Akce', cellRenderer: GridOrderActionsComponent, cellRendererParams: {
          type: 'order'
        },
        minWidth: 150
      },
    ];
  };

  tabs = [
    {
      id: 'planned',
      label: 'Naplánované',
      count: 0,
      active: true,
    },
    {
      id: 'history',
      label: 'Minulé',
      count: 0,
      active: false,
    }
  ]

  gridOptions = {
    onGridReady: (params: any) => {
      params.api.sizeColumnsToFit();
    },
    onViewportChanged: (params: any) => {
      params.api.sizeColumnsToFit();
    }
  }

  plannedOrdersOptions: any;
  historyOrdersOptions: any;

  constructor(
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  changeTab(index: number) {
    this.tabs = this.tabs.map(t => ({...t, active: false}));
    this.tabs[index].active = true;
  }

  mapOrdersToGrid = (order: AdminOrder) => {
    return {
      orderId: order.orderId,
      date: dateToDmyFormat(order.cleaningDate),
      time: TIMES.find(t => t.id === order.cleaningTime)?.label,
      client: order.clientName,
      home: order.homeName,
      duration: `${order.cleaningDuration / order.cleanersCount} hod.`,
      price: `${order.price} Kč`,
      cleaner: "",
      confirmed: booleanToYesNo(order.isConfirmed),
      paid: booleanToYesNo(order.isPaid),
    }
  }

  fetchOrders() {
    this.adminService.getOrders().subscribe(
      {
        next: (orders: AdminOrdersRes) => {
          this.ordersLoaded = true;
          this.plannedOrdersOptions = {
            ...this.gridOptions,
            columnDefs: this.colDefs(),
            rowData: orders.plannedOrders.map(this.mapOrdersToGrid),
          }
          this.historyOrdersOptions = {
            ...this.gridOptions,
            columnDefs: this.colDefs(true),
            rowData: orders.historyOrders.map(this.mapOrdersToGrid),
          }
          this.tabs[0].count = orders.plannedOrders.length;
          this.tabs[1].count = orders.historyOrders.length;
        },
        error: (e) => {
        },
      }
    );
  }

}
