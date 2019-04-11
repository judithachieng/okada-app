import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../_services/auth/auth.service';
import { Constants } from '../constants';


/*
The HttpErrorInterceptor intercepts http responses from the api to check
if there were any errors. If there is a 401 Unauthorized response the
user is automatically logged out of the application
*/

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private constants: Constants
  ) {
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
        if (err.status === this.constants.UNAUTHORISED ) {
            // auto logout if 401 response returned from api
            this.authService.logout();
            location.reload(true);
        }

        const error = err.error.message || err.statusText;
        return throwError(error);
    }));
  }
}
