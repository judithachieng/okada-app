import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class UsersModalService {

  constructor() { }
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    msisdn: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    country: new FormControl('', [Validators.required, Validators.maxLength(2)]),
  });

  InitializeFormGroup() {
    this.form.setValue({
    $key: null,
    firstName: 'Firstname',
    lastName: 'Lastname ',
    gender: 'Gender',
    msisdn: 'Phone Number',
    country: 'CC',
    password: 'password',
    confirmPassword: 'confirm password'
    });
  }
  populateForm(user) {
    this.form.setValue({
    $key: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    gender: user.gender,
    msisdn: user.msisdn,
    country: user.country,
    password: 'password',
    confirmPassword: 'confirm paswword'
    });
  }
}
