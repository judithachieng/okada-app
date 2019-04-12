import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MotoService } from '../../_services/moto/moto.service';
import { Constants } from 'src/app/constants';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

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
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'motoMake', 'numberPlate', 'motoColor', 'used'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit() {
 this.getMoto();
  }
  // getRiderId() {
  //   this.route.params.subscribe((params: { [x: string]: any; }) => {
  //     const key = 'id';
  //     this.id = params[key];
  //     return this.id;
  //   });
  // }

  getMoto() {
    console.log(this.id);
    this.motoService.getMotos(this.id)
      .subscribe( (res: any) => {
        this.motos = res.items;
        this.listData = new MatTableDataSource(this.motos);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
        console.log(this.motos);
      });
  }



}
