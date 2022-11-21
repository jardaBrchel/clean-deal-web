import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppState, selectCleanerUser, selectClient} from '../../reducers';
import {Store} from '@ngrx/store';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';
import {Cleaner} from '../../models/admin.model';
import {CleanerService} from '../../services/cleaner.service';
import {CleanerUser} from '../../models/cleaner.model';

@Component({
  selector: 'app-cleaner-layout',
  templateUrl: './cleaner-layout.component.html',
  styleUrls: ['../admin-layout/admin-layout.component.scss']
})
export class CleanerLayoutComponent implements OnInit {
  showSidebar = false;
  cleaner: CleanerUser | null = null;
  isLogged = false;

  constructor(
    private cleanerService: CleanerService,
    private router: Router,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.selectUser();
  }

  selectUser() {
    this.store.select(selectCleanerUser).pipe(
    ).subscribe(
      (cleaner: CleanerUser | null) => {
        this.cleaner = cleaner;
        this.isLogged = !!(cleaner && cleaner.username);
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
    this.cleanerService.logout();
    this.router.navigate(['/cleaner', 'login']);
  }

}
