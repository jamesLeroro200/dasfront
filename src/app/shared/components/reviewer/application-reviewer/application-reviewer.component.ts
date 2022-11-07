import { Component, OnInit, ViewChild } from '@angular/core';
import { ApplicationReviewerDialogComponent } from '../../dialog/application-reviewer-dialog/application-reviewer-dialog.component';
import { MatDialog, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ApplicationReviewerService } from '../../services/application-reviewer.service';
import { ApplicationReviewer } from '../../models/application-reviewer';
import { DeleteConfirmationComponent } from '../../dialog/delete-confirmation/delete-confirmation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-application-reviewer',
  templateUrl: './application-reviewer.component.html',
  styleUrls: ['./application-reviewer.component.scss']
})
export class ApplicationReviewerComponent implements OnInit {
  applicationReviewerCreatedList : ApplicationReviewer [] ;
  LisData: MatTableDataSource<any>;
  applicationReviewerList : ApplicationReviewer [] ;
  showModal: boolean;
  displayedColumn: string[] = ['name', 'version', 'reviewerOneDeadline', 'reviewerTwoDeadline', 'description', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: ApplicationReviewerService,public deletDialog: MatDialog, public router : Router) { }

  async ngOnInit() {
    this.applicationReviewerList = await this.service.getList();
    console.log(this.applicationReviewerList);
    this.LisData = new MatTableDataSource(this.applicationReviewerList);
  }

   async onCreat() {
    let lastElem = this.LisData.data[this.LisData.data.length - 1];
    const dialogRef = this.dialog.open(ApplicationReviewerDialogComponent, {
      data: {
        name: "",
        version: "",
        reviewerOneDeadline:6,
        reviewerTwoDeadline:3,
        description: "",
        questions:"{}",
        status: false
      }
    });
     await dialogRef.afterClosed().toPromise().then(async result => {
        await this.service.create(result as ApplicationReviewer).toPromise().then(data => {
      });
    });
    this.applicationReviewerList = await this.service.getList();
    this.LisData = new MatTableDataSource(this.applicationReviewerList);
  }

  onUpdate(row): void {
    const dialogRef = this.dialog.open(ApplicationReviewerDialogComponent, {
      data: {
        id: row.id,
        name: row.name,
        reviewerOneDeadline: row.reviewerOneDeadline,
        reviewerTwoDeadline: row.reviewerTwoDeadline,
        version: row.version,
        description: row.description,
        status: row.status
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      let index = this.LisData.data.indexOf(row);
      if (result != null) {
        let resp = this.service.update(result as ApplicationReviewer);
        resp.subscribe(data => {
          this.LisData.data[index] = data;
          this.LisData._updateChangeSubscription();
        });

      }
    });
  }

  onDelet(element){
    let index = this.LisData.data.indexOf(element);
    const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
      {data : {message : "Are you sure you want to delete "+element.name+ "?"}});
      dialogRef.afterClosed().subscribe(result => {
        if (result == true){
          this.service.delete(element.id).subscribe((data)=>{
            if(index == this.LisData.data.length-1){
              this.LisData.data.splice(-1,1);
              this.LisData._updateChangeSubscription();
            }else{
              this.LisData.data.splice(index, 1);
              this.LisData._updateChangeSubscription();
            }
       });   
        }
      });
  }

  edit(row){
    this.router.navigate(['/application/SurveyJsReviewer',row.id]);
  }

}
