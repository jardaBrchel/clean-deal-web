import {Injectable, isDevMode} from '@angular/core';
import {Config} from '../config/api.config';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(
    public http: HttpClient,
  ) {
  }

  public setConfigs() {
    this.setApiDomain();
    this.setIsProduction();
  }

  public setApiDomain(): void {
    if (!isDevMode()) {
      Config.urlApi = 'https://clean-deal-api-lfyuc.ondigitalocean.app';
    } else {
      Config.urlApi = 'http://localhost:3000';
    }
  }

  public setIsProduction(): void {
    if (!isDevMode()) {
      Config.isProduction = true;
    }
  }

  public getQrPayment() {
    const url = 'http://api.paylibo.com/paylibo/generator/czech/image?accountNumber=222885&bankCode=5500&amount=250.00&currency=CZK&vs=333&message=FOND%20HUMANITY%20CCK';

    return this.http.get<any>(url);
  }

  public fetchAddress(psc: string) {
    const url = 'https://api.apitalks.store/cpost.cz/psc';
    const headers = {
      'x-api-key': 'w3z9sZFpUw36jsmJ5yLlq4y3SQtFW2n7a0JrfmJI'
    }

    return this.http.get<any>(url, {
      headers, params: {
        filter: JSON.stringify({
          where: {
            PSC: psc,
          },
        }),
      },
    });

  }


}
