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
      password: ['', Validators.required]
    });

    this.authService.logout();

  }

  get formFields() {
    return this.loginForm.controls;
  }

  onFormSubmit() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login(this.formFields.username.value, this.formFields.password.value)
            .subscribe(
                data => {
                    this.router.navigate([this.constants.RIDERS_ROUTE]);
                },
                error => {
                    this.error = error;
                });

  }
}
