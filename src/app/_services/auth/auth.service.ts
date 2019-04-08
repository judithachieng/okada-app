import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../../_models/user.model';
import { Constants } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private constant: Constants) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

login(username: string, password: string) {
    return this.http.post<any>(this.constant.LOGIN, {accountName : username, accountSecret: password})
        .pipe(map(user => {
            // Check if there is a jwt token and login user
            if (user && user.data.tokenInfo.token) {
                // store the token in local storage so that the user stays loggedin
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }

            return user;
        }));
}

logout() {
    // When a user logs out remove user from localstorage.
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

}
