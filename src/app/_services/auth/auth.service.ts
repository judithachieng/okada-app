import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment.prod';
import { User } from '../../_models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: Observable<User>;

  constructor() { }

}
