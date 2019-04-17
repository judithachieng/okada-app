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

  constructor(
    private constant: Constants,
    private backend: HttpBackend,
    private http: HttpClient) {
    this.http = new HttpClient(this.backend);
   }

login(username: string, password: string) {
    return this.http.post<any>(this.constant.LOGIN, {accountName : username, accountSecret: password})
        .pipe(map(res => {
            // Check if there is a jwt token and login user
            if (res && res.data.tokenInfo.token) {
                localStorage.setItem('token', res.data.tokenInfo.token);
                return res;
            }
        },
        error => {}
        ));
}

logout() {
    // When a user logs out remove user from localstorage.
    localStorage.removeItem('token');
}

get isLoggedIn() {
  return localStorage.getItem('token');
}
}
