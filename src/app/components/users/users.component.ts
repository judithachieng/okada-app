import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/_services/users/users.service';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog, MatDialogConfig } from '@angular/material';
import { UsersModalService } from '../shared/users-modal.service';
import { UsersFormComponent } from '../users-form/users-form.component';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
users: [];
searchKey: string;

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private usersModalService: UsersModalService,
    private notificationService: NotificationService
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

  onCreate() {
    this.usersModalService.InitializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = 'auto';
    this.dialog.open(UsersFormComponent, dialogConfig);
  }

  onDelete(id) {
    this.usersService.deleteUser(id);
    if (window.confirm('Are you sure, you want to delete Rider?')) {
      this.usersService.deleteUser(id).subscribe(data => {
        this.notificationService.warn('User Deleted successfully');
      });
    }
  }

  onEdit(user) {
    this.usersModalService.populateForm(user);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '70%';
    this.dialog.open(UsersFormComponent, dialogConfig);
  }

  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();

  }
  onSearchClear() {
    this.searchKey = '';
  }

}
