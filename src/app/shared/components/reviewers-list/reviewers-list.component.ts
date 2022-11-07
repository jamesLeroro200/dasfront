import { Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog} from '@angular/material';

import { ReviewersService } from '../UsersServices/reviewers.service';

import { DeleteConfirmationComponent } from '../dialog/delete-confirmation/delete-confirmation.component';
import { User } from '../models/user';

import { UpdateCreatReviewerComponent } from '../dialog/update-creat-reviewer/update-creat-reviewer.component';
import { UpdateReviewerComponent } from '../dialog/update-reviewer/update-reviewer.component';

@Component({
  selector: 'app-reviewers-list',
  templateUrl: './reviewers-list.component.html',
  styleUrls: ['./reviewers-list.component.scss']
})
export class ReviewersListComponent implements OnInit {

  constructor(private service : ReviewersService, public dialog: MatDialog,public deletDialog: MatDialog) { }
  showModal : boolean;
  email : String;
  LisData: MatTableDataSource<any>;
  displayedColumn: string[] = ['firstName','lastName','email','country','region','listIdBrancheCode','recognizedStandards','status' ,'actions'];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  searchKey: String;
  users : User[];
  async ngOnInit() {
        this.users = await this.service.getList();
        console.log("Reviewers: "+this.users);
        this.LisData = new MatTableDataSource(this.users);
        this.LisData.sort=this.sort;
        this.LisData.paginator = this.paginator;
        this.LisData._updateChangeSubscription;
        
      }
      onSearchClear(){
        this.searchKey = "";
        this.applyFilter();
      }
      applyFilter(){
        this.LisData.filter = this.searchKey.trim().toLowerCase();
      }
      onDelet(element){
        let index = this.LisData.data.indexOf(element);
        const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
          {data : {message : "Do you really want to delete these records "+element.firstName+ "?"}});
          dialogRef.afterClosed().subscribe(result => {
            if (result == true){
              this.service.delete(element.id).subscribe(async (data)=>{
                this.users= await this.service.getList();
                this.LisData = new MatTableDataSource(this.users);
                this.LisData.sort=this.sort;
                this.LisData.paginator = this.paginator
           });
              
            }
          });
      }
      onUpdate(row: User): void {
        this.service.userType="Reviewer";
        console.log("On Update Method");
        const dialogRef = this.dialog.open(UpdateReviewerComponent, { 
          data : {id: row.id,
                  firstName: row.firstName,
                  lastName: row.lastName,
                  email: row.email,
                  phone:row.phone,
                  status: row.status,dateOfBirth: row.dateOfBirth,
                  country: row.country,region: row.region,zip:row.zip,password:row.password,
                  roles : row.roles,
                  listIdBusinessSectors:row.listIdBusinessSectors,
                  listIdBranchCode:row.listIdBranchCode} });
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
    this.service.userType="Reviewer";
    let lastElem =this.LisData.data[this.LisData.data.length - 1];
    const dialogRef = this.dialog.open(UpdateCreatReviewerComponent, { 
      data : {
              firstName : '',
              lastName: '',
              email: '',
              phone:'',
              status:null,dateOfBirth: null,country: "",region: "",zip:"",password:""} });
    dialogRef.afterClosed().subscribe(result => {
if(result!=null){
      this.LisData.data.push(result);
      this.LisData._updateChangeSubscription();
      this.showModal = true; 
      this.email = result.email;

} this.service.userType="";  });    
  }
  hide()
  {
    this.showModal = false;
  }
}