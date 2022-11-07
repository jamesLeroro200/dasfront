import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RecognizedStandards } from 'src/app/shared/components/models/recognized-standards';
import { CompanyService } from 'src/app/shared/components/UsersServices/company.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-norm',
  templateUrl: './update-norm.component.html',
  styleUrls: ['./update-norm.component.scss']
})
export class UpdateNormComponent implements OnInit {
  recognizedStandards;
  version: any;
  recievedData;
  listRecognizedStandards: RecognizedStandards[];
  NumberOfChapters: Number;

  constructor(public dialogref: MatDialogRef<UpdateNormComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
              private companyService: CompanyService,  private formBuilder: FormBuilder) {
    this.recievedData = data;
    console.log("le contenu de data est ",data)
   this.updateDialogueNormForm.patchValue(this.recievedData);
    
    
  }

    updateDialogueNormForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    version: ['', [Validators.required]],
    price: ['', [Validators.required]],
    reviewerOneDeadline: ['', [Validators.required]],
    reviewerTwoDeadline: ['', [Validators.required]],
    validityPeriod:['', [Validators.required]],
    NumberOfChapters: ['', [Validators.required]],
  })


  ngOnInit() {
  this.listRecognizedStandards = this.companyService.getAllRecognizedStandards();
   console.log("le contenu de ssssss", this.listRecognizedStandards)
 
  
  
  }
  onClose(): void {
    this.dialogref.close();
  }

  getSelected(event) {
    this.recognizedStandards = this.updateDialogueNormForm.get('name').value
    console.log("getSelected");
    console.log(this.recognizedStandards);
    this.recievedData.version = this.recognizedStandards.version;
  }
}
