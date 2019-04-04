import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { DebugElement } from '@angular/core';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let loginElement: DebugElement;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      // imports: [ReactiveFormsModule, FormsModule, HttpModule, RouterTestingModule],
            declarations: [LoginComponent],
            providers: [AuthService],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*
  Test that the Auth Service login method is called when login form is submitted.
  */

  it('should call login method', async(() => {
    const loginSpy = spyOn(authService , `Login`).and.callThrough();
    const debugElement = fixture.debugElement;

    authService = debugElement.injector.get(AuthService);
    loginElement = fixture.debugElement.query(By.css('form'));
    component.loginForm.controls[`username`].setValue('254720242707');
    component.loginForm.controls[`password`].setValue('1234567');
    loginElement.triggerEventHandler('ngSubmit', null);
    expect(loginSpy).toHaveBeenCalledTimes(1);
  }));

  afterEach(() => {
      authService = null;
      component = null;
  });

/*
Test if isLoggedIn method returns true if the user is authenticated
*/
  it('canlogin should returns true when the user is authenticated', () => {
      spy = spyOn(authService, 'isloggedIn').and.returnValue(true);
      expect(component.canLogin()).toBeTruthy();
      expect(authService.isLoggedIn()).toHaveBeenCalled();

  });

  /*
Test if isLoggedIn method returns false if the user is not authenticated
*/

  it('canlogin should returns false when the user is authenticated', () => {
  spy = spyOn(authService, 'isloggedIn').and.returnValue(false);
  expect(component.canLogin()).toBeFalsy();
  expect(authService.isLoggedIn()).toHaveBeenCalled();

});


});
