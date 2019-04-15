import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MotoService } from '../../_services/moto/moto.service';
import { Constants } from 'src/app/constants';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, MatDialogConfig } from '@angular/material';
import { NotificationService } from '../shared/notification.service';
import { MotoModalService } from '../shared/moto-modal.service';
import { MotoFormComponent } from '../moto-form/moto-form.component';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.css']
})
export class MotoComponent implements OnInit {
// @Input() getRiderId: any ;
data: any;
motos: [];
@Input() id;
  constructor(
    private  motoService: MotoService,
    private constants: Constants,
    private notificationService: NotificationService,
    private motoModalService: MotoModalService,
    private dialog: MatDialog,
    // private motoFormComponent: MotoFormComponent,
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'motoMake', 'numberPlate', 'motoColor', 'used', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
 this.getMoto();
  }

  getMoto() {
    this.motoService.getMotos(this.id)
      .subscribe( (res: any) => {
        this.motos = res.items;
        this.listData = new MatTableDataSource(this.motos);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }

  onEdit(moto) {
    console.log(moto);
    this.motoModalService.populateForm(moto);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    // dialogConfig.height = 'auto';
    // dialogConfig.width = '100px';
    this.dialog.open(MotoFormComponent, dialogConfig);
  }

}
