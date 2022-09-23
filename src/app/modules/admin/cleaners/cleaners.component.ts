import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Cleaner} from '../../../models/admin.model';
import {Subject, tap, Observable} from 'rxjs';


@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.scss']
})
export class CleanersComponent implements OnInit {
  cleaners: Cleaner[] = [];
  private cleaners$ = new Subject();

  constructor(
    private adminService: AdminService,
  ) {
  }

  ngOnInit(): void {
    this.adminService.getCleaners().subscribe(
      {
        next: (cleaners: Cleaner[]) => {
          this.cleaners = cleaners
        },
        error: (e) => {
        },
      }
    );
  }

  deleteCleaner(cleanerId: string) {
    this.adminService.deleteCleaner(cleanerId).subscribe(
      {
        next: (res) => {
          // Deleted
        },
        error: (e) => {
        },
      }
    )
  }

}
