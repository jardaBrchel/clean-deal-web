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
  colDefs: ColDef[] = [
    {field: 'date', headerName: 'Datum'},
    {field: 'time', headerName: 'Čas'},
    {field: 'client', headerName: 'Klient'},
    {field: 'home', headerName: 'Domov'},
    {field: 'duration', headerName: 'Doba'},
    {field: 'price', headerName: 'Cena'},
    {field: 'confirmed', headerName: 'Je potvrzeno'},
    {field: 'actions', headerName: 'Akce', cellRenderer: GridOrderActionsComponent, cellRendererParams: {
        type: 'order'
      },
    },
  ];

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
    columnDefs: this.colDefs,
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
    }
  }

  fetchOrders() {
    this.adminService.getOrders().subscribe(
      {
        next: (orders: AdminOrdersRes) => {
          this.ordersLoaded = true;
          this.plannedOrdersOptions = {
            ...this.gridOptions,
            rowData: orders.plannedOrders.map(this.mapOrdersToGrid),
          }
          this.historyOrdersOptions = {
            ...this.gridOptions,
            rowData: orders.historyOrders.map(this.mapOrdersToGrid),
          }
          this.tabs[0].count = orders.plannedOrders.length;
          this.tabs[1].count = orders.historyOrders.length;
          console.log('orders', orders);
        },
        error: (e) => {
        },
      }
    );
  }

}
