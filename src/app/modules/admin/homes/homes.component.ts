import {Component, OnInit} from '@angular/core';
import {ColDef} from 'ag-grid-community';
import {GridOrderActionsComponent} from '../grid-order-actions/grid-order-actions.component';
import {AdminService} from '../../../services/admin.service';
import {AdminHome} from '../../../models/admin.model';
import {HOME_TYPES, TIMES, YARDAGE} from '../../../config/order-config';

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
    {field: 'address', headerName: 'Adresa'},
    {field: 'psc', headerName: 'PSČ'},
    {field: 'homeType', headerName: 'Typ objektu'},
    {field: 'houseFloors', headerName: 'Podlaží'},
    {field: 'rooms', headerName: 'Místností'},
    {field: 'kitchens', headerName: 'Kuchyní'},
    {field: 'bathrooms', headerName: 'Koupelen'},
    {field: 'toilets', headerName: 'Záchody'},
    {field: 'yardage', headerName: 'Výměra', cellRenderer: this.mSquareDef},
    {
      field: 'actions', headerName: 'Akce', cellRenderer: GridOrderActionsComponent, cellRendererParams: {
        type: 'home'
      },
    },];
  gridOptions: any;

  constructor(
    private adminService: AdminService,
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
    this.adminService.getHomes().subscribe(
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
