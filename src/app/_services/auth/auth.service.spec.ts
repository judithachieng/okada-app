import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {

  const url = 'https://okada.herokuapp.com/api/acl/token';

  beforeEach(() => TestBed.configureTestingModule({
    imports: [ HttpClientTestingModule],
    providers: [AuthService]
    }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  /*
  Check if user with valid credential is logged in
  */

  it('should perform login a user with correct credentials',
    fakeAsync(
      inject(
        [AuthService, HttpTestingController],
        (authService: AuthService, backend: HttpTestingController) => {
          const responseObject = {
            success: true,
            message: 'login was successful'
          };
          let response = null;

          authService.login('+254720242707', 'password').subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );
          expect(response.body).toEqual(responseObject);
          expect(response.status).toBe(200);
        }
      )
    )
  );

  /*
  Check if user with invalid credential is not logged in
  */

  it('should not login a user with bad credentials', fakeAsync(
      inject(
        [AuthService, HttpTestingController],
        (authService: AuthService, backend: HttpTestingController) => {

          const responseObject = {
            success: false,
            message: 'email and password combination is wrong'
          };
          let response = null;

          authService.login('255890356', 'wrongPassword').subscribe(
            (receivedResponse: any) => {
              response = receivedResponse;
            },
            (error: any) => {}
          );
          expect(response.body).toEqual(responseObject);
          expect(response.status).toBe(400);
        }
      )
    )
  );

});
