import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog} from '@angular/material';
import { SuperUsersService } from '../UsersServices/super-users.service';
import { delay } from 'q';
import { UpdateCreatDialogComponent } from '../dialog/update-creat-dialog/update-creat-dialog.component';
import { DeleteConfirmationComponent } from '../dialog/delete-confirmation/delete-confirmation.component';
import { User } from '../models/user';
import { NgxSpinnerService } from "ngx-spinner"; 
import { SameMailComponent } from '../dialog/same-mail/same-mail.component';
import { UpdateSuperUserAndAdminComponent } from '../dialog/update-super-user-and-admin/update-super-user-and-admin.component';

@Component({
  selector: 'app-super-users-list',
  templateUrl: './super-users-list.component.html',
  styleUrls: ['./super-users-list.component.scss']
})
export class SuperUsersListComponent implements OnInit {
  showModal : boolean;
  email : String;
  superUser: User = new User("","","","","",null,"",null,"","","","",null,null,null,"");
  LisData: MatTableDataSource<any>;
  displayedColumn: string[] = ['firstName','lastName','email','country','region','status','actions'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: String;
  users : User[] ;
  usersAfterDelete : User[] ;

  constructor(private service : SuperUsersService , public dialog: MatDialog, public deletDialog: MatDialog) {
   }
  
  async ngOnInit() {
     this.users = await this.service.getList();
        this.LisData = new MatTableDataSource(this.users);
        this.LisData.sort=this.sort;
        this.LisData.paginator = this.paginator
       
      }
      onSearchClear(){
        this.searchKey = "";
        this.applyFilter();
      }
      applyFilter(){
        this.LisData.filter = this.searchKey.trim().toLowerCase();
      }
      onDelet(element){
       // let index = this.LisData.data.indexOf(element);
        const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
          {data : {message : "Do you really want to delete these records "+element.firstName+ "?"}});
          dialogRef.afterClosed().subscribe(result => {
            this.service.delete(element.id).subscribe(async (data)=>{
            this.users= await this.service.getList();
            this.LisData = new MatTableDataSource(this.users);
            this.LisData.sort=this.sort;
            this.LisData.paginator = this.paginator
            });
            
          });
         
      }
      onUpdate(row): void {
        this.service.userType="Superuser";
        const dialogRef = this.dialog.open(UpdateSuperUserAndAdminComponent, { 
          data : {id: row.id,
                  firstName: row.firstName,
                  lastName: row.lastName,
                  email: row.email,
                  phone:row.phone,
                  status: row.status,dateOfBirth: row.dateOfBirth,country: row.country,region: row.region,zip:row.zip,password:row.password,
                  roles : row.roles} });
        dialogRef.afterClosed().subscribe(result => {
         let index = this.LisData.data.indexOf(row);
         if(result != null){  
              this.LisData.data[index] = result;
              this.LisData._updateChangeSubscription();
         }
         this.service.userType="";
        });
        
  }
  onCreat() : void{
    this.service.userType="Superuser";
    let lastElem =this.LisData.data[this.LisData.data.length - 1];
    const dialogRef = this.dialog.open(UpdateCreatDialogComponent, { 
      data : {
              firstName : '',
              lastName: '',
              email: '',
              phone:'',
              status:null,dateOfBirth: null,country: "",region: "",zip:"",password:"",} });
    dialogRef.afterClosed().subscribe(async result => {
      if(result!=null){
           
          this.LisData.data.push(result);
          this.LisData._updateChangeSubscription();
          this.showModal = true; 
          this.email = result.email;    
        } 
        this.service.userType="";
      });
        
  }
  hide()
  {
    this.showModal = false;
  }
  }

