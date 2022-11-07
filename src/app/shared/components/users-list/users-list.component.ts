import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { delay } from 'q';
import { UsersService } from '../UsersServices/users.service';
import { UpdateCreatDialogComponent } from '../dialog/update-creat-dialog/update-creat-dialog.component';
import { User } from '../models/user';
import { DeleteConfirmationComponent } from '../dialog/delete-confirmation/delete-confirmation.component';
import { CreatDialogUserComponent } from '../../dialog/creat-dialog-user/creat-dialog-user.component';

import { SameMailComponent } from '../dialog/same-mail/same-mail.component';
import { UpdateUserComponent } from '../dialog/update-user/update-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  users: User[];
  constructor(private service: UsersService, public dialog: MatDialog, public deletDialog: MatDialog, public dialogSameMail: MatDialog) { }
  showModal: boolean;
  email: String;
  LisData: MatTableDataSource<any>;
  displayedColumn: string[] = ['firstName', 'lastName', 'email', 'linkedSuperUser', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: String;
  async ngOnInit() {
    this.users = await this.service.getList();
    this.LisData = new MatTableDataSource(this.users);
    this.LisData.sort = this.sort;
    this.LisData.paginator = this.paginator;

  }
  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.LisData.filter = this.searchKey.trim().toLowerCase();
  }
  onDelet(element) {
    let index = this.LisData.data.indexOf(element);
    const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
      { data: { message: "Do you really want to delete these records  " + element.firstName + "?" } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.service.delete(element.id).subscribe(async (data) => {
          this.users= await this.service.getList();
            this.LisData = new MatTableDataSource(this.users);
            this.LisData.sort=this.sort;
            this.LisData.paginator = this.paginator
        });
      }
    });
  }
  onUpdate(row): void {
   const dialogRef = this.dialog.open(UpdateUserComponent, {
      data: {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        phone: row.phone,
        status: row.status, dateOfBirth: row.dateOfBirth, 
        country: row.country, 
        region: row.region, 
        zip: row.zip, 
        password: row.password,
        roles: row.roles,
        linkedSuperUser: row.linkedSuperUser

      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
      let index = this.LisData.data.indexOf(row);
      this.LisData.data[index] = result;
      this.LisData._updateChangeSubscription();
    }});
  }
  onCreat(): void {
    let lastElem = this.LisData.data[this.LisData.data.length - 1];
    const dialogRef = this.dialog.open(CreatDialogUserComponent, {
      data: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: null,
        dateOfBirth: null,
        country: "",
        region: "",
        zip: "",
        password: "",
        linkedSuperUser: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result!=null){
      this.LisData.data.push(result);
      this.LisData._updateChangeSubscription();
      this.showModal = true;
      this.email = result.email;
    }});

  }

  //Bootstrap Modal Close event
  hide() {
    this.showModal = false;
  }
}

