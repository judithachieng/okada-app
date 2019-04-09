import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';


@Injectable()
export class Constants {

  private baseUrl = environment.baseUrl;

  LOGIN: string = this.baseUrl + 'acl/token';
  RIDERS: string = this.baseUrl + 'riders';

  
  // ROUTE NAMES
  LOGIN_ROUTE = '/login';
  RIDERS_ROUTE = '/riders';

  // ERROR CODES
  UNAUTHORISED = 401;

}
