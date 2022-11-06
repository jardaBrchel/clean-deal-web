import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppState, selectClient} from '../../reducers';
import {Store} from '@ngrx/store';
import {Client} from '../../models/client.model';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrls: ['../admin-layout/admin-layout.component.scss']
})
export class ClientLayoutComponent implements OnInit {
  showSidebar = false;
  client: Client | null = null;
  isLogged = false;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.selectUser();
  }

  selectUser() {
    this.store.select(selectClient).pipe(
    ).subscribe(
      (client: Client | null) => {
        this.client = client;
        this.isLogged = !!(client && client.email);
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
    this.clientService.logout();
    this.router.navigate(['/client', 'login']);
  }

}
