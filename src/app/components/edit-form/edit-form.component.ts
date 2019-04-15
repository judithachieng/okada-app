import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';

import { EditModalService } from '../shared/edit-modal.service';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { NotificationService } from '../shared/notification.service';

interface IDK {
  valid: boolean;
  rider?: any;
}

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.css']
})
export class EditFormComponent implements OnInit {

  constructor(
    public editModalService: EditModalService,
    private ridersService: RidersService,
    private router: Router,
    public dialogRef: MatDialogRef<EditFormComponent>,
    private notificationService: NotificationService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.ridersService.updateRider(this.editModalService.form.get('$key').value, this.editModalService.form.value).subscribe((data: {}) => {
    this.notificationService.success(':: Rider Updated Successfully');
    this.onClose({valid: true, rider: this.editModalService.rider});
  }, _err => {
    this.notificationService.success(':: There was a problem updating data, please try again');
    this.onClose({valid: false});
  });
}

onClose(value: IDK) {
  this.dialogRef.close(value);
}
}
