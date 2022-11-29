import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../../services/admin.service';
import {Cleaner, DAYS} from '../../../models/admin.model';
import {Subject, tap, Observable} from 'rxjs';
import {firstUpper} from '../../../helpers/utils';


@Component({
  selector: 'app-cleaners',
  templateUrl: './cleaners.component.html',
  styleUrls: ['./cleaners.component.scss']
})
export class CleanersComponent implements OnInit {
  cleaners: Cleaner[] = [];

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

  // TODO add yes/no alert
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

  // Pokud ma uklizecka S/L, pak zobrazit S/L (klidne s pomlckama)
  getDayInfo(day: string, cleaner: Cleaner): string {
    if (cleaner.oddEvenWeeks) {
      // @ts-ignore
      return `Li  ${cleaner[day] || '/'} (Su ${cleaner['even' + firstUpper(day)] || '/'})`;
    } else {
      // @ts-ignore
      return cleaner[day] || '/';
    }
  }

}
