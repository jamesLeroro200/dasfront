import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { NormService } from '../../models/norms/service/norm.service';
import { Norm } from '../../models/norms/norm';

@Component({
  selector: 'app-report-reviewer-dialog',
  templateUrl: './report-reviewer-dialog.component.html',
  styleUrls: ['./report-reviewer-dialog.component.scss']
})
export class ReportReviewerDialogComponent implements OnInit {
  listNorm:Norm[];
  recievedData;
  constructor(private normService:NormService,public dialogref: MatDialogRef<ReportReviewerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.recievedData = data;
  }

  async ngOnInit() {
    this.listNorm =  await this.normService.getList();
    console.log(this.listNorm);
  }
  onClose(): void {
    this.dialogref.close();
  }

}
