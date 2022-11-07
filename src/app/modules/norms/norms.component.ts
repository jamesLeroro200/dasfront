import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { EditModalComponent } from '../modal/edit-modal/edit-modal.component';
import { NormService } from 'src/app/shared/components/models/norms/service/norm.service';
import { DeleteConfirmationComponent } from 'src/app/shared/components/dialog/delete-confirmation/delete-confirmation.component';
import { NgxSpinnerService } from "ngx-spinner";
import { ReportReviewerService } from 'src/app/shared/components/services/report-reviewer.service';
import { ReportReviewer } from 'src/app/shared/components/models/report-reviewer';
import { Norm } from 'src/app/shared/components/models/norms/norm';
import { UpdateNormComponent } from './update-norm/update-norm.component';
@Component({
  selector: 'app-norms',
  templateUrl: './norms.component.html',
  styleUrls: ['./norms.component.scss']
})
export class NormsComponent implements OnInit {
  reportReviewer: ReportReviewer = new ReportReviewer('', '', '', '', true, '', null);
  searchKey: String;
  LisData: MatTableDataSource<any>;
  normsList;
  displayedColumn: string[] = ['name', 'version', 'price', 'reviewerOneDeadline', 'reviewerTwoDeadline','validityPeriod', 'description', 'status', 'actions'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private router: Router, public dialog: MatDialog, public service: NormService,
    public reportReviewerService: ReportReviewerService, public deletDialog: MatDialog, private SpinnerService: NgxSpinnerService) { }

  async ngOnInit() {
    this.SpinnerService.show();
    this.normsList = await this.service.getList();
    this.LisData = new MatTableDataSource(this.normsList);
    this.SpinnerService.hide();
  }

  
  open(row) {
    this.router.navigate(['/Norms/Normchapter', row.id]);
  }

  onCreat() {
    const dialogRef = this.dialog.open(EditModalComponent, {
      data: {
        id: "",
        name: "",
        version: "",
        description: "",
        chapters: [],
        status: false,
        price: 0,
        reviewerOneDeadline:6,
        reviewerTwoDeadline:3,
        validityPeriod:1,
      }
    });
  }

  async onUpdate(row): Promise<void> {
    const dialogRef = this.dialog.open(UpdateNormComponent, {
      data: {
        id: row.id,
        name: row.name,
        version: row.version,
        description: row.description,
        status: row.status,
        price: row.price,
        reviewerOneDeadline:row.reviewerOneDeadline,
        reviewerTwoDeadline:row.reviewerTwoDeadline,
        validityPeriod:row.validityPeriod,
      }
    });
    this.SpinnerService.show();
   await dialogRef.afterClosed().toPromise().then(async result => {
      let index = this.LisData.data.indexOf(row);
      if (result != null) {
        let resp = this.service.updateNorm(result as Norm);
       await resp.toPromise().then();
      }
    });
    this.normsList = await this.service.getList();
    this.LisData = new MatTableDataSource(this.normsList);
    this.SpinnerService.hide();
  }

  onDelet(row) {
    let index = this.LisData.data.indexOf(row);
    const dialogRef = this.deletDialog.open(DeleteConfirmationComponent,
      { data: { message: "Are you sure you want to delete " + row.name + "?" } });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true) {
        this.service.DeletNorm(row.id).subscribe((data) => {
          console.log("success");
        });
        if (index == this.LisData.data.length - 1) {
          this.LisData.data.splice(-1, 1);
          this.LisData._updateChangeSubscription();
        } else {
          this.LisData.data.splice(index, 1);
          this.LisData._updateChangeSubscription();
        }
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

  show(id) {
    this.router.navigateByUrl("/")
  }

  async createReport(row) {
    this.SpinnerService.show();
    await this.reportReviewerService.createByNorm(row.id).toPromise().then();
    this.normsList = await this.service.getList();
    this.LisData = new MatTableDataSource(this.normsList);
    this.SpinnerService.hide();
  }

  updateReport(row) {

  }

}
