import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-same-mail',
  templateUrl: './same-mail.component.html',
  styleUrls: ['./same-mail.component.scss']
})
export class SameMailComponent implements OnInit {

  constructor(public dialogref: MatDialogRef<SameMailComponent>,@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit() {
  }

}
