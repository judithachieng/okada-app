import { Component, OnInit } from '@angular/core';
import { UsersModalService } from '../shared/users-modal.service';
import { UsersService } from 'src/app/_services/users/users.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from '../shared/notification.service';
import { Constants } from 'src/app/constants';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.css']
})
export class UsersFormComponent implements OnInit {
  formSubmitted = false;

  gender = this.constants.GENDER;
  country = this.constants.COUNTRY;
  constructor(
    public usersModalService: UsersModalService,
    private usersService: UsersService,
    private router: Router,
    private dialogRef: MatDialogRef<UsersFormComponent>,
    private notificationService: NotificationService,
    private constants: Constants,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    this.formSubmitted =  true;
    if (this.usersModalService.form.valid) {
      if (!this.usersModalService.form.get('$key').value) {
        this.usersService.createUser(this.usersModalService.form.value).subscribe((data: {}) => {
          this.usersModalService.form.reset();
          this.usersModalService.InitializeFormGroup();
          this.notificationService.success(':: User Added Successfully');
          this.onClose();
        });
      } else {
        this.usersService.updateUser(this.usersModalService.form.get('$key').value, this.usersModalService.form.value);
        this.usersModalService.form.reset();
        this.usersModalService.InitializeFormGroup();
        this.notificationService.success(':: User Updated Successfully');
        this.onClose();
      }

      }


    }


  onClose() {
    this.usersModalService.form.reset();
    this.usersModalService.InitializeFormGroup();
    this.dialogRef.close();
  }
}
