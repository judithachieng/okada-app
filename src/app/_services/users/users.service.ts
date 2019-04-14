import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Constants } from 'src/app/constants';
import { User } from './../../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
    private  constants: Constants,
    ) { }


  // Get all users

  getUsers(): Observable<any> {
    return this.http.get(this.constants.USERS);
  }

//   // Get rider by ID

//   getRiderById(id: number) {
//     return this.http.get(this.constants.RIDERS + `/` + id );
//   }

//   // Create rider
//   createRider(rider: Rider) {
//     return this.http.post(this.constants.RIDERS, rider);
//   }

//   // Update rider
// updateRider(id, rider: Rider) {
//   return this.http.put(this.constants.RIDERS + '/' + id, rider);
// }

//   // Delete a rider
//   deleteRider(id: number) {
//     return this.http.delete(this.constants.RIDERS + '/' + id);
//   }
}
