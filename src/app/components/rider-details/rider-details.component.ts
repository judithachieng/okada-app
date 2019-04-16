import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { MotoModalService } from '../shared/moto-modal.service';
import { Constants } from 'src/app/constants';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationService } from '../shared/notification.service';
import { MotoFormComponent } from '../moto-form/moto-form.component';

@Component({
  selector: 'app-rider-details',
  templateUrl: './rider-details.component.html',
  styleUrls: ['./rider-details.component.css']
})
export class RiderDetailsComponent implements OnInit {
  id: number;
  data: any;
  rider: [];

  constructor(
              private route: ActivatedRoute,
              private riderService: RidersService,
              private constants: Constants,
              private dialog: MatDialog,
              public motoModalService: MotoModalService,
              private notificationService: NotificationService,

              ) { }

  ngOnInit() {
    this.getRiderId();
    this.getRiderById();
 }

 getRiderId() {
  this.route.params.subscribe((params: { [x: string]: any; }) => {
    const key = 'id';
    this.id = params[key];
    // return this.id;
  });
}

getRiderById() {
  console.log(this.id);
  this.riderService.getRiderById(this.id)
    .subscribe( (res: any) => {
      this.data = res;
      this.rider = this.data.data;
      console.log(this.data);
    });
}

onCreate() {
  this.motoModalService.InitializeFormGroup();
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.height = 'auto';
  dialogConfig.data = {
    riderId: this.id,
  };
  this.dialog.open(MotoFormComponent, dialogConfig);
}

}

