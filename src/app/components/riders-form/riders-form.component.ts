import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MatSelectModule } from '@angular/material';

import { RidersModalService } from '../shared/riders-modal.service';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { NotificationService } from '../shared/notification.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Constants } from 'src/app/constants';

interface IDK {
  valid: boolean;
  rider?: any;
}


@Component({
  selector: 'app-riders-form',
  templateUrl: './riders-form.component.html',
  styleUrls: ['./riders-form.component.css']
})
export class RidersFormComponent implements OnInit {
  formSubmitted = false;

  gender = this.constants.GENDER;
  country = this.constants.COUNTRY;

  constructor(
    public ridersModalService: RidersModalService,
    private ridersService: RidersService,
    private router: Router,
    public dialogRef: MatDialogRef<RidersFormComponent>,
    private notificationService: NotificationService,
    private constants: Constants,

    ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.formSubmitted =  true;
    if (this.ridersModalService.form.valid) {
      this.ridersService.createRider(this.ridersModalService.form.value).subscribe((data: {}) => {
        this.router.navigate(['/riders']);
        this.ridersModalService.form.reset();
        // this.ridersModalService.InitializeFormGroup();
        this.notificationService.success(':: Rider Added Successfully');
        this.onClose();
      }, _err => {
        this.notificationService.success(':: There was a problem adding data, please try again');
        this.onClose();
      });
    }
  }

  onClose() {
    this.ridersModalService.form.reset();
    this.dialogRef.close();
  }

}
