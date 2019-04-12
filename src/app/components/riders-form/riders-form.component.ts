import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { RidersModalService } from '../shared/riders-modal.service';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { NotificationService } from '../shared/notification.service';


@Component({
  selector: 'app-riders-form',
  templateUrl: './riders-form.component.html',
  styleUrls: ['./riders-form.component.css']
})
export class RidersFormComponent implements OnInit {


  constructor(
    public ridersModalService: RidersModalService,
    private ridersService: RidersService,
    private router: Router,
    public dialogRef: MatDialogRef<RidersFormComponent>,
    private notificationService: NotificationService
    ) { }

  ngOnInit() {
  }

  onClear() {
    this.ridersModalService.form.reset();
    this.dialogRef.close();
    this.router.navigate(['/riders']);
  }

  onSubmit() {
    console.log('I am here submit');
    if (this.ridersModalService.form.valid) {
      this.ridersService.createRider(this.ridersModalService.form.value).subscribe((data: {}) => {
        this.router.navigate(['/riders']);
        this.ridersModalService.form.reset();
        this.ridersModalService.InitializeFormGroup();
        this.notificationService.success(':: Rider Added Successfully');
        this.onClose();
      });
    }
  }

  onClose() {
    console.log('I am here clear');
    this.ridersModalService.form.reset();
    this.ridersModalService.InitializeFormGroup();
    this.dialogRef.close();
  }

}
