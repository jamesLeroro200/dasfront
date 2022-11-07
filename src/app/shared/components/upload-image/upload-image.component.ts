import { DomSanitizer } from '@angular/platform-browser';
import { SideBarService } from 'src/app/shared/services/side-bar.service';
import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Validation } from '../../models/validation';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss']
})
export class UploadImageComponent implements OnInit {

error:String;
  constructor(private sanitizer: DomSanitizer, private formBuilder: FormBuilder, public dialogref: MatDialogRef<UploadImageComponent>, private sideBarService: SideBarService) { }


  selectedFile: any = File;
  fileType:any;
  ngOnInit() {
    /*this.photoUploadForm.valueChanges.subscribe((date) => {
       this.validation.buildValidationErrors(this.photoUploadForm)
     }); */
  }
  /*photoUploadForm = this.formBuilder.group({
     image : ['',[Validators.required]]
       });*/

  onNoClick(): void {
    this.dialogref.close();
  }
  onFileSelected(event: any) {
    console.log("OnFileSelect Method Triggered");
        this.selectedFile = event.target.files[0];
        this.fileType=this.selectedFile.type;
      console.log(this.selectedFile);
  
  }


  onUploadPhoto() {
    if(this.fileType.match(/image\/*/)!=null){
    if(this.selectedFile.size<=2150400){
    console.log("Inside onUploadPhoto Method");
    this.sideBarService.addPhoto(this.selectedFile).subscribe(async res => {
      console.log("res: " + res.message + res.id);
      this.sideBarService.getPhoto(res.id).subscribe(async res => {
        this.sideBarService.image = res.image;
        this.sideBarService.toggle();
      }
      )
    });
    this.dialogref.close();
  }  else{
    this.error="Selected Photo is greater than 2MB.  Please choose again"
    return;
  }
}
else{
  this.error="Only Images can be Uploaded";
  return;
}
  }
  
}
