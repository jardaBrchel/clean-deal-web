import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(
    public http: HttpClient,
  ) {
  }

  addNewOrderFromWeb(data: any) {
    const url = Config.urlApi + '/order';
    return this.http.post<any>(url, data);
  }

}
