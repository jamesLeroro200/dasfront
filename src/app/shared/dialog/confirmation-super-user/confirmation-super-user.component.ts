import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
@Component({
  selector: 'app-confirmation-super-user',
  templateUrl: './confirmation-super-user.component.html',
  styleUrls: ['./confirmation-super-user.component.scss']
})
export class ConfirmationSuperUserComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<ConfirmationSuperUserComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }
  ngOnInit() {
  }

}
