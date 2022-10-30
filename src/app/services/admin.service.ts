import {Injectable} from '@angular/core';
import {AdminUser} from '../models/admin.model';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {Observable, from, map} from 'rxjs';
import {StorageService} from './storage.service';
import {removeAdminUser, setAdminUser} from '../actions/admin-user.actions';
import {Config} from '../config/api.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public adminUser: AdminUser = {};
  adminUserStorage = 'adminUser';

  constructor(
    private store: Store<AppState>,
    public storage: StorageService,
    public http: HttpClient,
  ) {
  }

  setCurrentUser(adminUser: AdminUser) {
    this.adminUser = adminUser;
    this.store.dispatch(setAdminUser(adminUser));
    this.setUserToStorage(adminUser);
  }

  getCurrentUser(): AdminUser {
    return this.adminUser;
  }

  async getUserFromStorage(): Promise<AdminUser> {
    const data = await this.storage.get(this.adminUserStorage);
    console.log('getUserFromStorage', data);
    return JSON.parse(data);
  }

  setUserToStorage(adminUser: AdminUser) {
    this.storage.set(this.adminUserStorage, JSON.stringify(adminUser) );
  }

  loginViaEmail(username: string, password: string) {
    const url = Config.urlApi + '/admin/login';
    const data = {
      username,
      password,
    };
    return this.http.post<any>(url, data);
  }

  getCleaners() {
    const url = Config.urlApi + '/admin/cleaners';
    return this.http.get<any>(url);
  }

  getCleanerDetails(cleanerId: string) {
    console.log('service, cleanerId', cleanerId);
    const url = Config.urlApi + '/admin/cleaner/' + cleanerId;
    return this.http.get<any>(url);
  }

  // CLEANERS- Jobs, Vacations...
  getCleanerInfo(cleanerId: string) {
    const url = Config.urlApi + '/admin/cleaner-info/' + cleanerId;
    return this.http.get<any>(url);
  }

  addNewCleaner(data: any) {
    const url = Config.urlApi + '/admin/cleaner';
    return this.http.post<any>(url, data);
  }

  addCleanerVacation(data: any) {
    const url = Config.urlApi + '/admin/cleaner-vacation';
    return this.http.post<any>(url, data);
  }

  editCleanerVacation(data: any) {
    const url = Config.urlApi + '/admin/cleaner-vacation';
    return this.http.put<any>(url, data);
  }

  removeCleanerVacation(id: number) {
    const url = Config.urlApi + '/admin/cleaner-vacation/' + id;
    return this.http.delete<any>(url);
  }

  removeOrder(id: number) {
    const url = Config.urlApi + '/admin/order/' + id;
    return this.http.delete<any>(url);
  }

  editCleaner(data: any) {
    const url = Config.urlApi + '/admin/cleaner';
    return this.http.put<any>(url, data);
  }

  deleteCleaner(cleanerId: string) {
    const url = Config.urlApi + '/admin/cleaner/' + cleanerId;
    return this.http.delete<any>(url);
  }

  // ORDERS
  getOrders() {
    const url = Config.urlApi + '/admin/orders';
    return this.http.get<any>(url);
  }

  // CLIENTS
  getClients() {
    const url = Config.urlApi + '/admin/clients';
    return this.http.get<any>(url);
  }

  // HOMES
  getHomes() {
    const url = Config.urlApi + '/admin/homes';
    return this.http.get<any>(url);
  }


  logout() {
    this.store.dispatch(removeAdminUser());
    this.removeCurrentUser();
    return this.storage.remove(this.adminUserStorage);
  }

  removeCurrentUser() {
    this.adminUser = undefined!;
  }

}
