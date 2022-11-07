import { catchError } from 'rxjs/operators';
import { SideBarService } from 'src/app/shared/services/side-bar.service';
import { AdminUser } from './../models/admin-user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator, throwMatDialogContentAlreadyAttachedError } from '@angular/material';
import { DeleteConfirmationComponent } from '../dialog/delete-confirmation/delete-confirmation.component';
import { UpdateCreatDialogComponent } from '../dialog/update-creat-dialog/update-creat-dialog.component';
import { AdminUsersService } from '../UsersServices/admin-users.service';
import { UpdateSuperUserAndAdminComponent } from '../dialog/update-super-user-and-admin/update-super-user-and-admin.component';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.scss']
})
export class AdminUsersListComponent implements OnInit {
  showModal: boolean;
  email: String;
  LisData: MatTableDataSource<any>;
  displayedColumn: string[] = ['firstName', 'lastName', 'email', 'country','region', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  searchKey: String;
  users: AdminUser[];
  disableDelete= false;
  emailofUsers: String;
  result:any;
  userType:any;
  constructor(private service: AdminUsersService, public dialog: MatDialog, public deletDialog: MatDialog, private sideBarService: SideBarService) { }

  async ngOnInit() {
 
    this.users = await this.service.getList();
    this.LisData = new MatTableDataSource(this.users);

    this.LisData.sort = this.sort;
    this.LisData.paginator = this.paginator
    console.log("this.loggedUser: "+this.sideBarService.email);
    this.users.forEach(element => {     
      if (this.sideBarService.email==element.email) {
        console.log("Inside If");
        element.enabled = false;        
      }
      else{
        element.enabled = true;
      }
     });

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
      { data: { message: "Are you sure you want to delete " + element.firstName + "?" } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.service.delete(element.id).subscribe((data) => {
          if (index == this.LisData.data.length - 1) {
            this.LisData.data.splice(-1, 1);
            this.LisData._updateChangeSubscription();
          } else {
            this.LisData.data.splice(index, 1);
            this.LisData._updateChangeSubscription();
          }
        });
      }
    });

  }
  onUpdate(row: AdminUser): void {
    this.service.userType= "Admin";
    const dialogRef = this.dialog.open(UpdateSuperUserAndAdminComponent, {
      data: {
        id: row.id,
        firstName: row.firstName,
        lastName: row.lastName,
        email: row.email,
        phone: row.phone,
        status: row.status,
        dateOfBirth: row.dateOfBirth,
        country: row.country,
        city: row.region,
        zip: row.zip,
        role: row.role,
        enabled: row.enabled,
        password: row.password,
        adress: row.adress,
        photoId:row.photoId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      let index = this.LisData.data.indexOf(row);
      if (result != null) {
        /*   if(row.phone == null){
             result.phone = row.phone;
           }*/
           
          this.LisData.data[index] = result;
          this.LisData._updateChangeSubscription();        
      }
      this.service.userType="";
    });
    
  }
  onCreat(): void {
    this.service.userType= "Admin";
    let lastElem = this.LisData.data[this.LisData.data.length - 1];
    const dialogRef = this.dialog.open(UpdateCreatDialogComponent, {
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
        enabled:"",
      }
    });
    dialogRef.afterClosed().subscribe(result => { 
      if(result!=null){
        console.log("Inside If");
      console.log("After Closed executed");    
         console.log(result);
         result.enabled=true;
        this.LisData.data.push(result);
        this.LisData._updateChangeSubscription();
        this.showModal = true;
        this.email = result.email;
      }
      this.service.userType="";
    } );
    
  }
  hide() {
    this.showModal = false;
  }

}
