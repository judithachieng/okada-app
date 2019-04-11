import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { Constants } from '../constants';



@Injectable({
  providedIn: 'root'
})

/*
CanActivate interface which allows the guard to decide if a route can be
activated with the canActivate() method. If the method returns true the
route is activated (allowed to proceed), otherwise if the method returns
false the route is blocked.
*/
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private constants: Constants
  ) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;
    return this.checkLogin();
    this.router.navigate([this.constants.LOGIN_ROUTE]);
    return false;
  }

  checkLogin() {
    if (this.authService.isLoggedIn){
      return true;
    }

    this.router.navigate([this.constants.LOGIN_ROUTE]);
    return false;
  }

}


