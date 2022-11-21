import {Injectable} from '@angular/core';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {StorageService} from './storage.service';
import {Config} from '../config/api.config';
import {HttpClient} from '@angular/common/http';
import {CleanerUser} from '../models/cleaner.model';
import {removeCleanerUser, setCleanerUser} from '../actions/cleaner-user.actions';

@Injectable({
  providedIn: 'root'
})
export class CleanerService {
  public cleanerUser: CleanerUser = {};
  cleanerUserStorage = 'cleanerUser';

  constructor(
    private store: Store<AppState>,
    public storage: StorageService,
    public http: HttpClient,
  ) {
  }

  setCurrentUser(cleanerUser: CleanerUser) {
    this.cleanerUser = cleanerUser;
    this.store.dispatch(setCleanerUser(cleanerUser));
    this.setUserToStorage(cleanerUser);
  }

  getCurrentUser(): CleanerUser {
    return this.cleanerUser;
  }

  async getUserFromStorage(): Promise<CleanerUser> {
    const data = await this.storage.get(this.cleanerUserStorage);
    console.log('getUserFromStorage', data);
    return JSON.parse(data);
  }

  setUserToStorage(cleanerUser: CleanerUser) {
    this.storage.set(this.cleanerUserStorage, JSON.stringify(cleanerUser));
  }

  loginViaEmail(username: string, password: string) {
    const url = Config.urlApi + '/cleaner/login';
    const data = {
      username,
      password,
    };
    return this.http.post<any>(url, data);
  }


  logout() {
    this.store.dispatch(removeCleanerUser());
    this.removeCurrentUser();
    return this.storage.remove(this.cleanerUserStorage);
  }

  removeCurrentUser() {
    this.cleanerUser = undefined!;
  }

}
