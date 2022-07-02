import { Injectable, Inject } from '@angular/core'; 
import { debug } from 'util';
import { IApiConfig } from '../../app-config/api-config.interface';
import { API_CONFIG } from '../../app-config/api-config.constants';

@Injectable({providedIn:'root'})
export class JwtService {
  /**
   *
   */
  constructor(@Inject(API_CONFIG) private apiConfig: IApiConfig) {

  }

  getToken(): string {
    return window.localStorage[this.apiConfig.JWTKeyName];
  }

  saveToken(token: string) {
    debugger
    window.localStorage[this.apiConfig.JWTKeyName] = token;
  }

  destroyToken() {
    window.localStorage.removeItem(this.apiConfig.JWTKeyName);
  }
}
