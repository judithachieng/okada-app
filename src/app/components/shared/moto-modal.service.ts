import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validator, Validators} from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class MotoModalService {

  constructor() { }
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    numberPlate: new FormControl('', Validators.required),
    registrationDocument: new FormControl('', Validators.required),
    motoMake: new FormControl('', Validators.required),
    motoColor: new FormControl('', Validators.required),
  });

  InitializeFormGroup() {
    this.form.setValue({
    $key: null,
    numberPlate: 'Number Plate',
    registrationDocument: 'Reg. Document',
    motoMake: ' Moto Make',
    motoColor: 'Moto Color',
    });
  }
  populateForm(moto) {
    this.form.setValue({
    $key: moto.id,
    numberPlate: moto.numberPlate,
    registrationDocument: moto.registrationDocument,
    motoMake: moto.motoMake,
    motoColor: moto.motoColor,
    });
  }
}
