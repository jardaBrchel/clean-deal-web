import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Config} from '../config/api.config';
import {AvailableTimesResItem, TimesMock} from "../models/order.model";
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

  getAvailableTimes(): Observable<AvailableTimesResItem[]> {
    // const url = Config.urlApi + '/cleaner/available-times';
    // return this.http.get<any>(url);
    // FIXME remove mock
    return of(TimesMock);
  }

}
