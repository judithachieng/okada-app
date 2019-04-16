import { Component, OnInit, ViewChild } from '@angular/core';
import { RidersService } from 'src/app/_services/riders/riders.service';
import { Constants } from 'src/app/constants';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatSort, MatPaginator, MatDialogRef } from '@angular/material';

import { RidersFormComponent } from '../riders-form/riders-form.component';
import { RidersModalService } from '../shared/riders-modal.service';
import { EditModalService } from '../shared/edit-modal.service';
import { EditFormComponent } from '../edit-form/edit-form.component';
import { NotificationService } from '../shared/notification.service';


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

  constructor(
          private riderService: RidersService,
          private constants: Constants,
          private dialog: MatDialog,
          public ridersModalService: RidersModalService,
          public editModalService: EditModalService,
          private notificationService: NotificationService
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

    ref.afterClosed().subscribe(res => {
      // update the rider data
      if (res) {
        const sm = this.riders.map((val: any) => {
          if (res.$key === val.id) {
            res.id = res.$key;
            return res;
          }
          val.$key = val.id;
          return val;
        });

        this.listData = new MatTableDataSource([...sm]);
        this.listData._updateChangeSubscription();
      }
    });

  }
  onDelete(id) {
    this.riderService.deleteRider(id);
    if (window.confirm('Are you sure, you want to delete Rider?')) {
      this.riderService.deleteRider(id).subscribe(data => {
        this.notificationService.warn('Rider Deleted successfully');
      });
    }
  }

}
