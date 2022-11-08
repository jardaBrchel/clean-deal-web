import { Component, OnInit } from '@angular/core';
import {AdminHome} from '../../../models/admin.model';
import {AdminService} from '../../../services/admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HOME_TYPES} from '../../../config/order-config';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.scss']
})
export class HomeDetailComponent implements OnInit {
  home!: AdminHome;
  homeId!: string;
  homeType!: string;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.homeId = this.route.snapshot.paramMap.get('homeId') || '';
    this.fetchHome();
  }

  fetchHome() {
    this.adminService.getHome(this.homeId).subscribe(
      {
        next: (res: AdminHome) => {
          this.home = res
          this.homeType = HOME_TYPES.find(t => t.id === res.homeType)?.label || '';

          console.log('details', res);
        },
        error: (e) => {
          console.log('error ', e);
        },
      }
    )
  }

}
