import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { NavigationEnd } from '@angular/router';

describe('AuthGuard', () => {
  class MockRouter {
    navigate(path) {
    }
  }

  let authGuard: AuthGuard;
  let authService;
  let router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
/*
Check if  canActivate returns true for a loggedin user
*/
  describe('CanActivate', () => {

    it('should be true for a logged in user', () => {
      authService = { isLoggedIn: () => true };
      expect(authGuard.canActivate(authService, router)).toEqual(true);
    });

    /*
  Check if  canActivate returns false for a logged out user.
  And if the user is redirected to login page.
*/

    it('should navigate to login for a logged out user', () => {
    authService = { isLoggedIn: () => false };
    router = new MockRouter();
    spyOn(router, 'navigate');

    expect(authGuard.canActivate(authService, router)).toEqual(false);
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
  });
});
