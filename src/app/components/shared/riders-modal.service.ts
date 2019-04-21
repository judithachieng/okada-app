import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class RidersModalService {

  constructor() { }
  form: FormGroup = new FormGroup({
    fullname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    licenseId: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    msisdn: new FormControl('', Validators.required),
    pinNumber: new FormControl('', [Validators.required, Validators.maxLength(4)]),
  });

  // InitializeFormGroup() {
  //   this.form.setValue({
  //   fullname: 'Jane Doe',
  //   gender: 'F',
  //   licenseId: 'KE-FG-67J',
  //   country: 'KE',
  //   msisdn: '+254786000000',
  //   pinNumber: '1234'
  //   });
  // }
  populateForm(rider) {
    this.form.setValue({
      fullname: rider.fullname,
      gender: rider.gender,
      licenseId: rider.licenseId,
      country: rider.country,
      msisdn: rider.msisdn,
      pinNumber: '****',
    });
  }

  get rider() {
    return this.form.value;
  }
}
