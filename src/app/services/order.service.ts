import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config/api.config';
import {AvailableTimesRes, AvailableTimesResItem, TimesMock} from "../models/order.model";
import { Observable, of } from 'rxjs';

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

  editOrder(data: any, orderId: number) {
    const url = Config.urlApi + '/order/' + orderId;
    return this.http.put<any>(url, data);
  }

  getAvailableTimes(orderId: number): Observable<AvailableTimesRes> {
    const url = Config.urlApi + '/cleaner/available-times';
    const data = {
      orderId,
    }
    return this.http.post<any>(url, data);
    // FIXME remove mock
    // return of(TimesMock);
  }

}
