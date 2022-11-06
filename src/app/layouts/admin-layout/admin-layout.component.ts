import {Component, OnInit} from '@angular/core';
import {AdminService} from '../../services/admin.service';
import {Router} from '@angular/router';
import {AdminUser} from '../../models/admin.model';
import {AppState, selectAdminUser} from '../../reducers';
import {Store} from '@ngrx/store';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  showSidebar = false;
  adminUser: AdminUser = null!;
  isLogged = false;

  constructor(
    public adminService: AdminService,
    public router: Router,
    public store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.selectUser();
  }

  selectUser() {
    this.store.select(selectAdminUser).pipe(
    ).subscribe(
      (adminUser: AdminUser) => {
        this.adminUser = adminUser;
        this.isLogged = !!(adminUser && adminUser.username);
      }
    );
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }

  hideSidebarMobile() {
    this.showSidebar = false;
  }

  logoutUser() {
    this.toggleSidebar();
    this.adminService.logout();
    this.router.navigate(['/admin', 'login']);
  }

}
