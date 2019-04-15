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


  // Create user
  createUser(user: User) {
    return this.http.post(this.constants.USERS, user);
  }

  // Update a user
updateUser(id, user: User) {
  return this.http.put(this.constants.RIDERS + '/' + id, user);
}

  // Delete a user
  deleteUser(id: number) {
    return this.http.delete(this.constants.USERS + '/' + id);
  }
}
