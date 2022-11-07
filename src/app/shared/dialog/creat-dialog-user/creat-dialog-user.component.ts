import { UsersService } from './../../components/UsersServices/users.service';
import { Component, OnInit, Inject, ChangeDetectorRef } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { SuperUser } from '../../components/models/super-user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SuperUsersService } from '../../components/UsersServices/super-users.service';
import { User } from '../../components/models/user';
import { Validation } from '../../models/validation';


@Component({
  selector: 'app-creat-dialog-user',
  templateUrl: './creat-dialog-user.component.html',
  styleUrls: ['./creat-dialog-user.component.scss']
})
export class CreatDialogUserComponent implements OnInit {

  [x: string]: any;
  email = new FormControl('', [Validators.required, Validators.email]);
  recievedData: any;
  linkedSuperUser: SuperUser;
  listSuperUser: SuperUser[];
  errorMessage: any;
 // superUser = new FormControl('', [Validators.required]);
  validation = new Validation();

  constructor(private superUsersService: SuperUsersService, private formBuilder: FormBuilder, public dialogref: MatDialogRef<CreatDialogUserComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    private usersService: UsersService) {
    this.recievedData = data;
  }
  async ngOnInit() {
    
    this.listSuperUser = await this.superUsersService.getList();
    console.log(this.listSuperUser);
    this.createDialogueUserForm.valueChanges.subscribe((data) => {
      this.validation.buildValidationErrors(this.createDialogueUserForm);
    })
  }
  compareFn(c1: any, c2:any): boolean {     
    return c1 && c2 ? c1.id === c2.id : c1 === c2; 
}
  createDialogueUserForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],

    superUserSelect: ['', [Validators.required]],
  },
  );
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }
  createOrUpdateUsersData() {
    console.log("createOrUpdateUsersData executed");
    if (this.recievedData.roles != null) {
    console.log("Inside If: for Update");
      this.usersService.Update(this.recievedData as User).subscribe(
        data => {
          this.dialogref.close(this.recievedData);
        },
        error => {
          console.log("Error block executed");
          this.errorMessage = "Some Error";
          return;
           });
      console.log(this.errorMessage);
      
    } else {
      console.log("Inside If: for Create");
      this.usersService.Creat(this.recievedData as User).subscribe(
        data => {
          this.dialogref.close(this.recievedData);
        },
        error => {
          console.log("Error block executed");
          this.errorMessage = this.recievedData.email + " already exists. Try another"
          return;
           });
      console.log(this.errorMessage);
    }
  }
  onClose(): void {
    this.dialogref.close();
  }

}
export class MyTel {
  constructor(public area: string, public exchange: string, public subscriber: string) { }
}



