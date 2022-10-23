import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder} from '@angular/forms';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cleaner-detail',
  templateUrl: './cleaner-detail.component.html',
  styleUrls: ['./cleaner-detail.component.scss']
})
export class CleanerDetailComponent implements OnInit {
  cleanerId!: string;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.cleanerId = this.route.snapshot.paramMap.get('cleanerId') || '';
    this.fetchCleaner();
  }

  fetchCleaner() {
    this.adminService.getCleanerInfo(this.cleanerId).subscribe(
      {
        next: (res) => {
          // TODO set vacations and orders for next 90 days
          console.log('details', res);
        },
        error: (e) => {
          console.log('error ', e);
        },

      }
    )
  }



}
