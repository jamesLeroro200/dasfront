import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-application-reviewer-dialog',
  templateUrl: './application-reviewer-dialog.component.html',
  styleUrls: ['./application-reviewer-dialog.component.scss']
})
export class ApplicationReviewerDialogComponent implements OnInit {
  recievedData;
  constructor(public dialogref: MatDialogRef<ApplicationReviewerDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.recievedData = data;
  }

  ngOnInit() {
  }
  onClose(): void {
    this.dialogref.close();
  }


}
