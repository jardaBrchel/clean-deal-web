import {Injectable} from '@angular/core';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {StorageService} from './storage.service';
import {Config} from '../config/api.config';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/client.model';
import {removeClient, setClient} from '../actions/client.actions';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public client: Client | null = null;
  clientStorage = 'client';

  constructor(
    private store: Store<AppState>,
    public storage: StorageService,
    public http: HttpClient,
  ) {
  }

  setCurrentUser(client: Client) {
    this.client = client;
    this.store.dispatch(setClient(client));
    this.setUserToStorage(client);
  }

  getCurrentUser(): Client | null{
    return this.client;
  }

  async getUserFromStorage(): Promise<Client> {
    const data = await this.storage.get(this.clientStorage);
    console.log('getUserFromStorage', data);
    return JSON.parse(data);
  }

  setUserToStorage(client: Client) {
    this.storage.set(this.clientStorage, JSON.stringify(client));
  }

  loginViaEmail(email: string, password: string) {
    const url = Config.urlApi + '/client/login';
    const data = {
      email,
      password,
    };
    return this.http.post<any>(url, data);
  }

  resetPass(email: string, password: string) {
    const url = Config.urlApi + '/client/reset-pass';
    const data = {
      email,
      password,
    };
    return this.http.post<any>(url, data);
  }

  getClientOrders(clientId: string) {
    const url = Config.urlApi + '/client/orders';
    const data = {
      clientId,
    };
    return this.http.post<any>(url, data);
  }

  sendForgotPass(email: string) {
    const url = Config.urlApi + '/client/send-forgot-pass';
    const data = {
      email,
    };
    return this.http.post<any>(url, data);
  }

  logout() {
    this.store.dispatch(removeClient());
    this.removeCurrentUser();
    return this.storage.remove(this.clientStorage);
  }

  removeCurrentUser() {
    this.client = undefined!;
  }

}
