import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { ReportReviewer } from '../../models/report-reviewer';
import { ReportReviewerService } from '../../services/report-reviewer.service';
import { Router } from '@angular/router';
import { DeleteConfirmationComponent } from '../../dialog/delete-confirmation/delete-confirmation.component';
import { ReportReviewerDialogComponent } from '../../dialog/report-reviewer-dialog/report-reviewer-dialog.component';

@Component({
  selector: 'app-report-reviewer',
  templateUrl: './report-reviewer.component.html',
  styleUrls: ['./report-reviewer.component.scss']
})
export class ReportReviewerComponent implements OnInit {

  LisData: MatTableDataSource<any>;
  reportReviewerList: ReportReviewer[];
  showModal: boolean;
  displayedColumn: string[] = ['name', 'version', 'description', 'norm', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(public dialog: MatDialog, private service: ReportReviewerService, public deletDialog: MatDialog, public router: Router) { }

  async ngOnInit() {
    this.reportReviewerList = await this.service.getList();
    this.LisData = new MatTableDataSource(this.reportReviewerList);
  }

  onCreat() {
    let lastElem = this.LisData.data[this.LisData.data.length - 1];
    const dialogRef = this.dialog.open(ReportReviewerDialogComponent, {
      data: {
        name: "",
        version: "",
        description: "",
        questions: "{}",
        norm: null,
        status: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      let resp = this.service.create(result as ReportReviewer);
      resp.subscribe(data => {
        console.log(data);
        this.LisData.data.push(data);
        this.LisData._updateChangeSubscription();
      });
    });
  }

  onUpdate(row): void {
    const dialogRef = this.dialog.open(ReportReviewerDialogComponent, {
      data: {
        id: row.id,
        name: row.name,
        version: row.version,
        description: row.description,
        norm: row.norm,
        status: row.status
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      let index = this.LisData.data.indexOf(row);
      if (result != null) {
        let resp = this.service.update(result as ReportReviewer);
        resp.subscribe(data => {
          this.LisData.data[index] = data;
          this.LisData._updateChangeSubscription();
        });

      }
    });
  }

  onDelet(element) {
    let index = this.LisData.data.indexOf(element);
    const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
      { data: { message: "Are you sure you want to delete " + element.name + "?" } });
    dialogRef.afterClosed().toPromise().then(async result => {
      if (result == true) {
        await this.service.delete(element.id).toPromise().then((data) => {
        });
        this.reportReviewerList = await this.service.getList();
        this.LisData = new MatTableDataSource(this.reportReviewerList);
      }
    });
  }

  edit(row) {
    this.router.navigate(['/report/SurveyJsReviewer', row.id]);
  }

}



