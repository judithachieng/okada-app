import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';


@Injectable()
export class Constants {
  id: number;

  private baseUrl = environment.baseUrl;

  LOGIN: string = this.baseUrl + 'acl/token';
  RIDERS: string = this.baseUrl + 'riders';
  // MOTOS: string = this.baseUrl + this.id + '/motos';

  // ROUTE NAMES
  LOGIN_ROUTE = '/login';
  RIDERS_ROUTE = '/riders';

  // ERROR CODES
  UNAUTHORISED = 401;

}
