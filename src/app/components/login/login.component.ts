import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/_services/auth/auth.service';
import { Constants } from 'src/app/constants';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formSubmitted = false;
  error: any;
  isLoading = false;
  isAdmin = false;
  isClient = false;
  isRider = false;
  userOptions = ['Admin', 'Rider', 'Client'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private constants: Constants

  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      userType: ['', Validators.required]
    });

    // this.authService.logout();

  }

  get formFields() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.isLoading = true;
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.authService.login(this.formFields.username.value, this.formFields.password.value)
            .subscribe(
                data => {
                    this.isLoading = false;
                    if (this.isAdmin) {
                      this.router.navigate([this.constants.RIDERS_ROUTE]);
                    } else if (this.isClient) {
                       this.router.navigate([this.constants.CLIENT_ROUTE]);
                    } else if (this.isRider) {
                      this.router.navigate([this.constants.DRIVE_ROUTE]);
                    }
                },
                error => {
                    this.isLoading = false;
                    this.error = error;
                });

  }
  getUserValue(val) {
    if (val === 'Admin') {
      this.isAdmin = true;
    } else if (val === 'Client') {
        this.isClient = true;
    } else if (val === 'Rider') {
      this.isRider = true;
    }
  }
}
