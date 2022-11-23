import { Component, OnInit } from '@angular/core';
import {CleanerService} from '../../../services/cleaner.service';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  cleaner: any;
  cleanerId!: string;

  constructor(
    public cleanerService: CleanerService,
    public adminService: AdminService,
  ) { }

  ngOnInit(): void {
    this.cleanerId = this.cleanerService.getCurrentUser().cleanerId || '';
    this.fetchCleaner();
  }

  fetchCleaner() {
    this.adminService.getCleanerInfo(this.cleanerId).subscribe(
      {
        next: (res) => {
          this.cleaner = res;
          console.log('details', res);
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

}
