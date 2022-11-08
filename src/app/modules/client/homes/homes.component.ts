import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {GridOrderActionsComponent} from '../../admin/grid-order-actions/grid-order-actions.component';
import {AdminHome} from '../../../models/admin.model';
import {HOME_TYPES, YARDAGE} from '../../../config/order-config';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-homes',
  templateUrl: './homes.component.html',
  styleUrls: ['./homes.component.scss']
})
export class HomesComponent implements OnInit {
  homesLoaded = false;
  homeCount = 0;
  mSquareDef = (params: any) => {
    return params.value+' m<sup>2</sup>';
  }
  colDefs: ColDef[] = [
    {field: 'address', headerName: 'Adresa', minWidth: 200},
    {field: 'psc', headerName: 'PSČ', minWidth: 120},
    {field: 'homeType', headerName: 'Typ objektu', minWidth: 160},
    {field: 'houseFloors', headerName: 'Podlaží', minWidth: 150},
    {field: 'rooms', headerName: 'Místnosti', minWidth: 150},
    {field: 'kitchens', headerName: 'Kuchyně', minWidth: 120},
    {field: 'bathrooms', headerName: 'Koupelny', minWidth: 120},
    {field: 'toilets', headerName: 'Záchody', minWidth: 120},
    {field: 'yardage', headerName: 'Výměra', cellRenderer: this.mSquareDef, minWidth: 150},
    {
      field: 'actions', headerName: 'Akce', cellRenderer: GridOrderActionsComponent, cellRendererParams: {
        type: 'home',
        module: 'client',
      },
      minWidth: 150
    },];
  gridOptions: any;

  constructor(
    private clientService: ClientService,
  ) {
  }

  ngOnInit(): void {
    this.fetchHomes();
  }

  mapClientsToGrid = (home: AdminHome) => {
    return {
      homeId: home.homeId,
      address: home.address,
      psc: home.pscNumber,
      homeType: HOME_TYPES.find(t => t.id === home.homeType)?.label,
      houseFloors: home.houseFloors,
      rooms: home.rooms,
      kitchens: home.kitchens,
      bathrooms: home.bathrooms,
      toilets: home.toilets,
      yardage: YARDAGE.find(t => t.id === home.yardage)?.label,
    }
  }

  fetchHomes() {
    this.clientService.getHomes(this.clientService.getCurrentUser()?.clientId || '').subscribe(
      {
        next: (res: AdminHome[]) => {
          this.homeCount = res.length;
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
          this.homesLoaded = true;
        },
        error: (e) => {
        },
      }
    );
  }


}
