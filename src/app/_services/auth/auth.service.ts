import { Injectable, ɵConsole } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../../_models/user.model';
import { Constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;

  constructor(
    private constant: Constants,
    private backend: HttpBackend,
    private http: HttpClient) {
    this.http = new HttpClient(this.backend);
   }

   public get currentUserValue() {
     return localStorage.getItem('token');
}

login(username: string, password: string) {
    return this.http.post<any>(this.constant.LOGIN, {accountName : username, accountSecret: password})
        .pipe(map(_res => {
            // Check if there is a jwt token and login user
            if (_res && _res.data.tokenInfo.token) {
                // store the token in local storage so that the user stays loggedin
                localStorage.setItem('token', _res.data.tokenInfo.token);
                // this.currentUserSubject.next(_res.data);
                return _res;
            }
        },
        error => {}
        ));
}

logout() {
    // When a user logs out remove user from localstorage.
    localStorage.removeItem('token');
}

}
