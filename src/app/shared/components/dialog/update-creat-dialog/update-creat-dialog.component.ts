import { ReviewersService } from './../../UsersServices/reviewers.service';
import { SuperUsersService } from './../../UsersServices/super-users.service';
import { AdminUsersService } from './../../UsersServices/admin-users.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { Validation } from 'src/app/shared/models/validation';

@Component({
  selector: 'app-update-creat-dialog',
  templateUrl: './update-creat-dialog.component.html',
  styleUrls: ['./update-creat-dialog.component.scss'],
})
export class UpdateCreatDialogComponent implements OnInit {
  [x: string]: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  recievedData;
  errorMessage:any;
  validation = new Validation();
  role:any;
  constructor(public dialogref: MatDialogRef<UpdateCreatDialogComponent>, @Inject(MAT_DIALOG_DATA) public data:any,
  public service:AdminUsersService,public superUsersService: SuperUsersService, public reviewersService: ReviewersService,
  private formBuilder: FormBuilder) { 
    this.recievedData = data;
  }
  
  ngOnInit() {
    this.updateCreateDialogueUserForm.valueChanges.subscribe((data) => {
      this.validation.buildValidationErrors(this.updateCreateDialogueUserForm);
    })
    
  }
  
  updateCreateDialogueUserForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]]})

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  createOrUpdateAdminData(){
    console.log("createOrUpdateAdminData executed");
    if(this.recievedData.role!=null){
      console.log(this.receivedData);
      this.service.update(this.recievedData).subscribe(
        data =>{
          this.dialogref.close(data);
        },
        error=>{
          console.log("Error block executed");
          this.errorMessage=" Some Error. Try again"
          return;
        }); 
        console.log(this.errorMessage);  
        
    }else{
      
    this.service.create(this.recievedData).subscribe(   
        
      data =>{
            this.dialogref.close(data);
      },
      error=>{
        console.log("Error block executed");
        this.errorMessage=this.recievedData.email+" already exists. Try another"
        return;
      }); 
      console.log(this.errorMessage);        

}
  }

  createOrUpdateSuperUserData(){
    console.log("createOrUpdateSuperUserData executed");
    if(this.recievedData.roles!=null){
     
      this.superUsersService.Update(this.recievedData as User).subscribe(
        data =>{

          this.dialogref.close(data);
        },
        error=>{
          console.log("Error block executed");
          this.errorMessage="Some Error. Try again";
          return;
        }); 
        console.log(this.errorMessage); 
        
    }else{
    this.superUsersService.Creat(this.recievedData as User).subscribe(
      data =>{
        this.dialogref.close(data);
      },
      error=>{
        console.log("Error block executed");
        this.errorMessage=this.recievedData.email+" already exists. Try another"
        return;
      }); 
      console.log(this.errorMessage);        
    }
}
createOrUpdateReviewerData(){
  console.log("createOrUpdateReviewerData executed");
    if(this.recievedData.roles!=null){
    console.log("Inside If: Update");
    this.reviewersService.Update(this.recievedData as User).subscribe(
      data =>{
        this.dialogref.close(data);
      },
      error=>{
        console.log("Error block executed");
        this.errorMessage="Some Error";
        return;
      }); 
      console.log(this.errorMessage);        
  
  }else{
    console.log("Inside else: Create");
  this.reviewersService.Creat(this.recievedData as User).subscribe(
    data =>{
      this.dialogref.close(data);
    },
    error=>{
      console.log("Error block executed");
      this.errorMessage=this.recievedData.email+" already exists. Try another"
      return;
    }); 
    console.log(this.errorMessage);        
}
}

   onClose():void{
    this.dialogref.close();
   }
   
}
export class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) {}
}
