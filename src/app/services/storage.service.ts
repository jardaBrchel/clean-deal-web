import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private aStorage: any;

  constructor() {
    this.init();
  }

  async init() {
    this.aStorage = localStorage;
  }

  public set(key: string, value: any) {
    this.aStorage.setItem(key, value);
  }

  public get(key: string): Promise<any> {
    return this.aStorage?.getItem(key);
  }

  public remove(key: string): Promise<any> {
    return this.aStorage.removeItem(key);
  }
}
