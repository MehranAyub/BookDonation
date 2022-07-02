import { InjectionToken } from '@angular/core';
import { IApiConfig } from './api-config.interface';

export const API_DI_CONFIG: IApiConfig = {
  JWTKeyName: 'jwtToken'
}
export let API_CONFIG = new InjectionToken<IApiConfig>('api.config');
