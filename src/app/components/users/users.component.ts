import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/_services/users/users.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users: [];

  constructor(
    private usersService: UsersService,
  ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [ 'no', 'firstName', 'lastName' , 'gender', 'country', 'status', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.getRiders();
  }

  getRiders() {
    this.usersService.getUsers()
    .subscribe( data => {
        this.users = data.items;
        this.listData = new MatTableDataSource(this.users);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
    });

  }

}
