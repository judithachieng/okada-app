import { Component, OnInit, ViewChild } from '@angular/core';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { Constants } from 'src/app/constants';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator, MatDialogRef } from '@angular/material';

import { RidersFormComponent } from '../riders-form/riders-form.component';
import { RidersModalService } from '../shared/riders-modal.service';
import { EditModalService } from '../shared/edit-modal.service';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { NotificationService } from '../shared/notification.service';
import { AuthService } from 'src/app/_services/auth/auth.service';


@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.css']
})
export class RidersComponent implements OnInit {
 riders: [];

 listData: MatTableDataSource<any> = new MatTableDataSource();
 displayedColumns: string[] = [ 'no', 'fullName', 'gender' , 'phone', 'status', 'actions'];
 @ViewChild(MatSort) sort: MatSort;
 @ViewChild(MatPaginator) paginator: MatPaginator;
 riderUrl = this.constants.RIDERS_ROUTE;
 dialogref: MatDialogRef<EditFormComponent>;
  tableData: any;

  constructor(
          private riderService: RidersService,
          private constants: Constants,
          private dialog: MatDialog,
          public ridersModalService: RidersModalService,
          public editModalService: EditModalService,
          private notificationService: NotificationService,
          private authService: AuthService
              ) { }

  ngOnInit() {
    this.getRiders();
  }

  getRiders() {
    this.riderService.getRiders()
    .subscribe( data => {
        this.riders = data.items;
        this.listData = new MatTableDataSource(this.riders);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
    });
  }

  onCreate() {
    this.ridersModalService.InitializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    this.dialog.open(RidersFormComponent, dialogConfig);
  }

  onEdit(rider) {
    this.editModalService.populateForm(rider);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '70%';
    const ref = this.dialog.open(EditFormComponent, dialogConfig);

    ref.afterClosed().subscribe(({ rider }: any) => {
      // update the rider data
      if (rider) {
        const sm = this.riders.map((val: any) => {
          if (rider.$key === val.id) {
            return { ...val, ...rider};
          }
          val.$key = val.id;
          return { ...val };
        });

        this.listData = new MatTableDataSource(sm);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      }
    });

  }
  onDelete(id) {
    if (window.confirm(this.constants.DELETED)) {
      this.riderService.deleteRider(id).subscribe(data => {
        this.notificationService.warn(this.constants.DELETED_SUCCESS);
        this.tableData = this.listData.data;
        const riderIndex = this.tableData.findIndex(obj => obj.id === id);
        this.listData.data.splice(riderIndex, 1);
        this.listData = new MatTableDataSource(this.listData.data);
        this.listData.paginator = this.paginator;
      });

    }
  }

}
