import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Norm } from 'src/app/shared/components/models/norms/norm';
import { Router } from '@angular/router';
import { NormService } from 'src/app/shared/components/models/norms/service/norm.service';
import { delay } from 'q';
import { Chapter } from 'src/app/shared/components/models/norms/chapter';
import { FormBuilder, Validators } from '@angular/forms';
import { RecognizedStandards } from 'src/app/shared/components/models/recognized-standards';
import { CompanyService } from 'src/app/shared/components/UsersServices/company.service';
import { Validation } from 'src/app/shared/models/validation';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent implements OnInit {
  recievedData;
  Norm;
  NumberOfChapters: Number;
  chapter = [];
  recognizedStandards;
  listRecognizedStandards: RecognizedStandards[];
  version: any;
  validation = new Validation();
  constructor(public dialogref: MatDialogRef<EditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public router: Router, 
  public service: NormService, private formBuilder: FormBuilder, private companyService: CompanyService) {
    this.recievedData = data;
  }

  async ngOnInit() {
    this.listRecognizedStandards = this.companyService.getAllRecognizedStandards();
  }

  createDialogueNormForm = this.formBuilder.group({
    name: ['', [Validators.required]],
    version: ['', [Validators.required]],
    NumberOfChapters: ['', [Validators.required]],
    price: ['', [Validators.required]],
    reviewerOneDeadline: ['', [Validators.required]],
    reviewerTwoDeadline: ['', [Validators.required]],
    validityPeriod:['', [Validators.required]],
   
   
  })

  onClose() {
    this.dialogref.close();
  }
  async onSubmit() {
    if (this.createDialogueNormForm.valid){
    console.log(this.NumberOfChapters);
    this.recievedData.name = this.recognizedStandards.description;
    let chaptersof: Array<Chapter> = new Array<Chapter>();
    let NormCreated = new Norm("", this.recievedData.name, this.recievedData.version, this.recievedData.description, chaptersof, false, 
    Number(this.recievedData.price), this.recievedData.reviewerOneDeadline, this.recievedData.reviewerTwoDeadline,this.recievedData.validityPeriod);
    console.log(NormCreated);
    let chapter: Chapter;
    for (let i = 0; i < Number(this.NumberOfChapters); i++) {

      await this.service.Chaptercreat(new Chapter("", "chapter" + i, [])).toPromise().then((result: Chapter) => chapter = result);

      //NormCreated.chapters.push(chapter);
      chaptersof.push(chapter);
    }
    NormCreated.chapters = chaptersof;
    let norm;
    await this.service.Creat(NormCreated).toPromise().then(result => norm = result);
    this.router.navigate(['/Norms/Normchapter', JSON.parse(norm).id]);
    this.dialogref.close();
  }
  else {
    this.validation.buildValidationOnSubmitErrors(this.createDialogueNormForm);
  }
  }

  getSelected(event) {
    this.recognizedStandards = this.createDialogueNormForm.get('name').value
    console.log("getSelected");
    console.log(this.recognizedStandards);
    this.recievedData.version = this.recognizedStandards.version;
  }

}
