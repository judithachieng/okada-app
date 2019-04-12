import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class MotoModalService {

  constructor() { }
  form: FormGroup = new FormGroup({
    numberPlate: new FormControl('', Validators.required),
    registrationDocument: new FormControl('', Validators.required),
    motoMake: new FormControl('', Validators.required),
    motoColor: new FormControl('', Validators.required),
  });

  InitializeFormGroup() {
    this.form.setValue({
    numberPlate: 'Number Plate',
    registrationDocument: 'Reg. Document',
    motoMake: ' Moto Make',
    motoColor: 'Moto Color',
    });
  }
  // populateForm(rider) {
  //   this.form.setValue({
  //     $key: rider.id,
  //     fullname: rider.fullname,
  //     gender: rider.gender,
  //     licenseId: rider.licenseId,
  //     country: rider.country,
  //     msisdn: rider.msisdn,
  //     dateOfBirth: rider.dateOfBirth,
  //     address: 'ONE STREET',
  //     postalBox: '98056',
  //   });
  // }
}
