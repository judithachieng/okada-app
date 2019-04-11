import { Component, OnInit } from '@angular/core';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { Constants } from 'src/app/constants';
import { MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';

import { RidersFormComponent } from '../riders-form/riders-form.component';
import { RidersModalService } from '../shared/riders-modal.service';
import { EditModalService } from '../shared/edit-modal.service';
import { EditFormComponent } from '../edit-form/edit-form.component';



@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent implements OnInit {
 riders: [];


  constructor(private riderService: RidersService,
              private constants: Constants,
              private dialog: MatDialog,
              public ridersModalService: RidersModalService,
              public editModalService: EditModalService
              ) { }
    listData: MatTableDataSource<any>;
    displayedColumns: string[] = [ 'fullName', 'gender' , 'phone', 'status', 'actions'];

  riderUrl = this.constants.RIDERS_ROUTE;
  ngOnInit() {
    this.getRiders();

  }


  getRiders() {
    this.riderService.getRiders()
    .subscribe( data => {
        this.riders = data.items;
        this.listData = new MatTableDataSource(this.riders);
        console.log(this.listData);
    });

  }

  onCreate() {
    this.ridersModalService.InitializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '70%';
    this.dialog.open(RidersFormComponent, dialogConfig);
  }

  onEdit(rider) {
    this.editModalService.populateForm(rider);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '70%';
    this.dialog.open(EditFormComponent, dialogConfig);

  }
  onDelete(id) {
    this.riderService.deleteRider(id);
    if (window.confirm('Are you sure, you want to delete Rider?')) {
      this.riderService.deleteRider(id).subscribe(data => {
        this.getRiders();
      });
    }
  }

}
