import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';


@Injectable()
export class Constants {
  id: number;

  private baseUrl = environment.baseUrl;

  LOGIN: string = this.baseUrl + 'acl/token';
  RIDERS: string = this.baseUrl + 'riders';
  USERS: string = this.baseUrl + 'users' ;
  // MOTOS: string = this.baseUrl + this.id + '/motos';

  // ROUTE NAMES
  LOGIN_ROUTE = '/login';
  RIDERS_ROUTE = '/riders';
  CLIENT_ROUTE = '/client';
  DRIVE_ROUTE = '/drive';

  // ERROR CODES
  UNAUTHORISED = 401;

  // Notification Messages
  DELETED = 'Are you sure, you want to delete Rider?';
  DELETED_SUCCESS = 'Rider Deleted successfully';

  // Form fields

  MOTO_FORM_FIELDS = [ 'motoMake', 'numberPlate', 'motoColor', 'used', 'actions'];
  GENDER = [
    {key: 'M', value: 'Male'},
    {key: 'F', value: 'Female'},
  ];
  COUNTRY = [
    {key: 'KE', value: 'Kenya'},
    {key: 'GH', value: 'Ghana'},
  ];

}
