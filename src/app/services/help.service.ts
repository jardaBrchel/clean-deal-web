import {Injectable, isDevMode} from '@angular/core';
import {Config} from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor(
  ) {
  }

  public setConfigs() {
    this.setApiDomain();
    this.setIsProduction();
  }

  public setApiDomain(): void {
    if (!isDevMode()) {
      Config.urlApi = 'https://cleandeal.cz/api';
    } else {
      Config.urlApi = 'http://localhost:3000';
    }
  }

  public setIsProduction(): void {
    if (!isDevMode()) {
      Config.isProduction = true;
    }
  }


}
