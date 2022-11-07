import { ReviewersService } from './../../UsersServices/reviewers.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user';
import { Validation } from 'src/app/shared/models/validation';
import { BusinessSectors } from 'src/app/shared/models/business-sectors';
import { CompanyService } from '../../UsersServices/company.service';
import { BrancheCode } from 'src/app/shared/models/branche-code';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import countries from 'src/app/data/countries.json';

@Component({
  selector: 'app-update-creat-reviewer',
  templateUrl: './update-creat-reviewer.component.html',
  styleUrls: ['./update-creat-reviewer.component.scss']
})
export class UpdateCreatReviewerComponent implements OnInit {
  email = new FormControl('', [Validators.required, Validators.email]);
  recievedData;
  errorMessage: any;
  validation = new Validation();
  listBusinessSectors: BusinessSectors[];
  listAllBrancheCode: Array<BrancheCode> = [];
  businessCodeList: Array<String> = [];
  country: String[] = Object.keys(countries);
  controlCountry = new FormControl();
  filteredOption: Observable<String[]>;
  filteredCitiesOption:Observable<String[]>;
  cities=[];
  controlCity=new FormControl();
  countryVar:any;

  constructor(public dialogref: MatDialogRef<UpdateCreatReviewerComponent>, @Inject(MAT_DIALOG_DATA) public data: any,
    public reviewersService: ReviewersService,
    private formBuilder: FormBuilder, private companyService: CompanyService) {
    this.recievedData = data;
    
  }
  async ngOnInit() {
    this.filteredOption = this.updateCreateDialogueUserForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
    this.updateCreateDialogueUserForm.valueChanges.toPromise().then((data) => {
      this.validation.buildValidationErrors(this.updateCreateDialogueUserForm);
    })
    this.listBusinessSectors = this.companyService.getAllBusinessSectors();
    await this.companyService.getAllBranche(this.recievedData.email).toPromise().then(res => {
      this.listAllBrancheCode = res;
    });
   await this.companyService.getAllBrancheSelcted(this.recievedData.email).toPromise().then(res => {
      this.recievedData.listIdBrancheCode = res;
    });
    this.countryVar = this.recievedData.country;
    this.cities=Object.values(countries[this.countryVar]);
    this.filteredOption = this.updateCreateDialogueUserForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
    this.filteredCitiesOption = this.updateCreateDialogueUserForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
 
    

  }

  updateCreateDialogueUserForm = this.formBuilder.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    listIdBusinessSectors: ['', [Validators.required]],
    listIdBrancheCode: ['', [Validators.required]],
    country : ['',[Validators.required]],
    region : ['', [Validators.required]],

  })
  handleBlurValidation() {
    this.validation.buildValidationErrors(this.updateCreateDialogueUserForm)
  }

  getSelected(event) {
    this.businessCodeList = this.updateCreateDialogueUserForm.get('listIdBusinessSectors').value
    this.companyService.getAllBrancheCode(this.businessCodeList).subscribe(res => {
      this.listAllBrancheCode = res;
    });
  }
  selectchange(ob){
    this.countryVar = ob.value;
     console.log(this.countryVar)
     this.updateCreateDialogueUserForm.get('region').reset;
     this.cities=Object.values(countries[this.countryVar]);
    
     this.filteredOption = this.updateCreateDialogueUserForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
     this.filteredCitiesOption = this.updateCreateDialogueUserForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
  
      }
      refresh(){
       this.updateCreateDialogueUserForm.get('region').reset;
       this.cities=Object.values(countries[ this.countryVar]);
       this.filteredOption = this.updateCreateDialogueUserForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
       this.filteredCitiesOption = this.updateCreateDialogueUserForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
    
       
      }

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
      this.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  _filterCountry(value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.country.filter(country => country.toLowerCase().includes(filterValue));
  }
 
  _filterCity (value: String): String[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(country => country.toLowerCase().includes(filterValue));
  }

  async createOrUpdateReviewerData() {
    if (this.recievedData.roles != null) {
      await this.reviewersService.Update(this.recievedData as User).toPromise().then(
        data => {
          this.dialogref.close(data);
        },
        error => {
          this.errorMessage = "Some Error";
          return;
        });
    } else {
      this.reviewersService.Creat(this.recievedData as User).subscribe(
        data => {
          this.dialogref.close(data);
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



