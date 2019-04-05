import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';



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
    private authService: AuthService

  ) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.authService.currentUserValue;

    // check if user is loggen in

    if (currentUser) {
      return true;
    }

    // redirect user if they are not logged in
    this.router.navigate([`/login`]);
    return false;
  }

}
