import { Component, OnInit, ViewChild,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import {MatTableDataSource, MatSort, MatPaginator, MatDialog} from '@angular/material';
import { Company } from '../models/company';
import { CompanyService } from '../UsersServices/company.service';
import { DeleteConfirmationComponent } from '../dialog/delete-confirmation/delete-confirmation.component';
import { delay } from 'q';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner"; 
@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  LisData;
  go = false;
  displayedColumn: string[] = ['companyName','companyPhone','companyEmail','country','adress','employeeNumber','enable','superUser','registerOfCommerce' ,'taxIdSheet','otherFile','actions'];
  @ViewChild(MatSort,{static:false}) sort: MatSort;
  @ViewChild(MatPaginator,{static:false}) paginator: MatPaginator;
  searchKey: String;
  companys = [];
  file: any;
  
  constructor( private router: Router,private companyService:CompanyService, public dialog: MatDialog, public deletDialog: MatDialog ,private SpinnerService: NgxSpinnerService) { }

  async ngOnInit() {
    this.companys = await this.companyService.getAllCompany();
    this.LisData = new MatTableDataSource(this.companys);
    this.LisData.sort=this.sort;
    this.LisData.paginator = this.paginator;
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
      {data : {message : "Do you really want to delete these records "+element.companyName+ "?"}});
      dialogRef.afterClosed().subscribe(result => {
        if (result == true){
          this.companyService.deleteCompany(element.id).subscribe(async (data)=>{
          this.companys = await this.companyService.getAllCompany();
          this.LisData = new MatTableDataSource(this.companys);
          this.LisData.sort = this.sort;
          this.LisData.paginator = this.paginator;
       });
       
         
        }
      });
   
  }
  onCreat() {
    this.router.navigate(['/companyTable/newCompany']) 

  }
  edit(element){
    this.router.navigate(['/companyTable/editCompany',element.id])
  } 
  async downloadFile(id,typeDoc) 
 {
  await this.companyService.downloadFile(id, typeDoc).toPromise().then(data =>
    {
      this.file =data ; 
    });
    let url = window.URL.createObjectURL(this.file);
    let a = document.createElement('a');
    a.href = url;
    a.download = id;
    a.click();
    window.URL.revokeObjectURL(url); 
    } 

}
