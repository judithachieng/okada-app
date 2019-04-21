import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class EditModalService {

  constructor() { }
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullname: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    licenseId: new FormControl('', Validators.required),
    country: new FormControl('', [Validators.required, Validators.maxLength(2)]),
    msisdn: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    postalBox: new FormControl('', Validators.required),
  });

  InitializeFormGroup() {
    this.form.setValue({
    fullname: 'Full Name',
    gender: 'F',
    licenseId: 'KE-FG-67J',
    country: 'KE',
    msisdn: '+254786000000',
    pinNumber: '1234',
    dateOfBirth: '28/12/2019',
    address: 'ONE STREET',
    postalBox: '98056',
    });
  }
  populateForm(rider) {
    if  (rider.dateOfBirth) {
      const DATE_OF_BIRTH = rider.dateOfBirth.split(' ')[0];
    }
    const DATE_OF_BIRTH = '28/12/1984';

    this.form.setValue({
      $key: rider.id,
      fullname: rider.fullname,
      gender: rider.gender,
      licenseId: rider.licenseId,
      country: rider.country,
      msisdn: rider.msisdn,
      dateOfBirth: DATE_OF_BIRTH || '28/12/2019',
      address: rider.address || 'Enter address',
      postalBox: rider.postalBox || 'Enter Postal Address',
    });
  }


  get rider() {
    return this.form.value;
  }
}
