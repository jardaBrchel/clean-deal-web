import { Component, OnInit } from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  showSidebar = false;

  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  logoutUser() {
    this.adminService.logout();
    this.router.navigate(['/admin', 'login']);
  }

}
