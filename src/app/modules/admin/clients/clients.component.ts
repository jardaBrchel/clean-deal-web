import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {GridOrderActionsComponent} from '../grid-order-actions/grid-order-actions.component';
import {AdminClient} from '../../../models/admin.model';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  clientsLoaded = false;
  clientCount = 0;
  colDefs: ColDef[] = [
    {field: 'name', headerName: 'Jméno', minWidth: 150},
    {field: 'surname', headerName: 'Příjmení', minWidth: 150},
    {field: 'email', headerName: 'E-mail', minWidth: 220},
    {field: 'phone', headerName: 'Telefon', minWidth: 150},
    {
      field: 'actions', headerName: 'Akce', cellRenderer: GridOrderActionsComponent, cellRendererParams: {
        type: 'client'
      },
      minWidth: 150
    },];
  gridOptions: any;

  constructor(
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.fetchClients();
  }

  mapClientsToGrid = (client: AdminClient) => {
    return {
      clientId: client.clientId,
      name: client.name,
      surname: client.surname,
      email: client.email,
      phone: client.phone,
    }
  }

  fetchClients() {
    this.adminService.getClients().subscribe(
      {
        next: (res: AdminClient[]) => {
          this.clientCount = res.length;
          this.gridOptions = {
            columnDefs: this.colDefs,
            onGridReady: (params: any) => {
              params.api.sizeColumnsToFit();
            },
            onViewportChanged: (params: any) => {
              params.api.sizeColumnsToFit();
            },
            rowData: res.map(this.mapClientsToGrid),
          }
          this.clientsLoaded = true;
        },
        error: (e) => {
        },
      }
    );
  }

}
