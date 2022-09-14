import {Injectable} from '@angular/core';
import {AdminUser} from '../models/admin.model';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {Observable, from} from 'rxjs';
import {StorageService} from './storage.service';
import {setAdminUser} from '../actions/admin-user.actions';
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
    this.store.dispatch(setAdminUser({adminUser}));
    this.setUserToStorage(adminUser);
  }

  getCurrentUser(): AdminUser {
    return this.adminUser;
  }


  getUserFromStorage(): Observable<any> {
    return from<any>(this.storage.get('adminUser'));
  }

  setUserToStorage(adminUser: AdminUser) {
    this.storage.set('adminUser', adminUser);
  }

  loginViaEmail(username: string, password: string) {
    const url = Config.urlApi + '/admin/login';
    const data = {
      username,
      password,
    };
    return this.http.post<any>(url, data);
  }

}
