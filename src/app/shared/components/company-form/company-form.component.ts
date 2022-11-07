import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import {  FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { MatDialog} from '@angular/material';
import { Company } from '../models/company';
import { CompanyService } from '../UsersServices/company.service';
import { Router } from '@angular/router';
import { Validation } from '../../models/validation';
import { UsersService } from '../UsersServices/users.service';
import { SuperUsersService } from '../UsersServices/super-users.service';
import { SuperUser } from '../models/super-user';
import { BusinessSectors } from '../../models/business-sectors';
import { BrancheCode } from '../../models/branche-code';
import { Observable } from 'rxjs';
import { map,startWith } from 'rxjs/operators';
import countries from '../../../data/countries.json';
import { NgxSpinnerService } from 'ngx-spinner';
 



@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  @ViewChild('registerofCommerce', {static: false}) InputVarRegisterofCommerce: ElementRef; 
  @ViewChild('taxIdSheet', {static: false}) InputVarTaxIdSheet: ElementRef;
  @ViewChild('otherFile', {static: false}) InputVarOtherFile: ElementRef; 
  @ViewChild('logoId', {static: false}) InputVarLogoId: ElementRef; 
listSuperUser:SuperUser[];
listBusinessSectors :BusinessSectors[];
listBrancheCode :BrancheCode[];
espase="    ";
  
  company:Company= new Company();
  validation = new Validation();
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  fileToUpload: File;
  fileToUploadTaxSheet:File;
  fileToUploadOtherFile:File;
  logoFile: File;
  fileType:any;
  verficationFile:any;
  filteredOption: Observable<String[]>;
  country: String[] = Object.keys(countries);
  controlCountry = new FormControl();
  controlCity=new FormControl();
  cities=[];
  filteredCitiesOption:Observable<String[]>;
  countryVar:any;
  verifTypeDocRegisterOfCommerce=false;
  verifTypeDocTaxId=false;
  verifTypeDocOtherFile=false;
  verifTypeDocLog=false;
  verifUplodFile=false;
  messgeErreurTypeDoc="Only pdf, doc and docx are allowed";
  messgeErreurTypelog="Only png, jepg and jpg are allowed!";
  messgeErreurUplodFile="Error to upload file!";
  fileTypesImg = [
    'image/jpeg',
    'image/jpg',
    'image/png'
  ]
  fileTypes= [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  constructor(private fb:FormBuilder,
    private companyService: CompanyService,private router: Router,private cdr:ChangeDetectorRef,public upladFileDialog: MatDialog,private superUsersService:SuperUsersService, public deletDialog: MatDialog,private spinnerService: NgxSpinnerService) {}
  
    async ngOnInit(){
      this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
     this.companyForm.valueChanges.subscribe((date) => {
      this.validation.buildValidationErrors(this.companyForm);
    })
    this.listBusinessSectors= this.companyService.getAllBusinessSectors();
    this.listSuperUser = await this.superUsersService.getList();
    console.log("super"+this.listSuperUser);
  
  }
    

  companyForm =   this.fb.group({
    companyName: ['', [Validators.required, Validators.minLength(2)]],
    idBusinessSectors: ['', [Validators.required]],
    companyPhone: ['', [Validators.required]],
    idBranchCode: ['', [Validators.required]],
    searchTerms: [''],
    companyEmail: ['', [Validators.required, Validators.email]],
    annualSale: [''],
    country: ['', [Validators.required]],
    adress: ['', [Validators.required]],
    zipCodeAdress: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
    poBoxNumber: [''],
    employeeNumber: ['', [Validators.required,Validators.min(Number.MIN_VALUE)]],
    region: ['',[Validators.required]],
    houseNr: [''],
    poBoxAdress: ['', [Validators.required]],
    zipCodeBox: [''],
    representativeFirstName: ['', [Validators.required]],
    representativePosition: ['', [Validators.required]],
    representativePhone: ['', [Validators.required]],
    representativeLastName: ['', [Validators.required]],
    representativeEmail: ['', [Validators.required,Validators.email]],
    numRegisterofCommerce: ['', [Validators.required]],
    taxNumber: ['', [Validators.required]],
    enable: ['', []],
    superUser:['', [Validators.required]],
    taxIdSheet:['', [Validators.required]],
    otherFile :['', []],
    registerofCommerce: ['', [Validators.required]],  
    logoId:['', [Validators.required]],





  }); 

handleBlurValidation(){
  this.validation.buildValidationErrors(this.companyForm)
}

data:any;
data1:any;

validFileTypeImg(file) {
  for(var i = 0; i < this.fileTypesImg.length; i++) {
    if(file.type === this.fileTypesImg[i]) {
      return true;
    }
  }

  return false;
}
validFileType(file) {
  for(var i = 0; i < this.fileTypes.length; i++) {
    if(file.type === this.fileTypes[i]) {
      return true;
    }
  }

  return false;
}

onFileSelected(event: any) {
  this.logoFile = event.target.files[0];
  if(!this.validFileTypeImg(this.logoFile)){
   this.companyForm.get('logoId').setValue(null);
     this.verifTypeDocLog=true; 
}
else {
 this.verifTypeDocLog=false; 
}
}
  async onSubmit() {
    if(this.companyForm.valid){
   this.spinnerService.show();
   await this.companyService.save(this.companyForm.value)
      .toPromise().then(async res => {
        this.data =res;
        this.uploadFile(this.data.id);
        this.listSuperUser = await this.superUsersService.getList();
        this.spinnerService.hide();
}, (err) => {
      });
      
  } 
  

else{
  this.validation.buildValidationOnSubmitErrors(this.companyForm);

}
}




handleFileInput(files: FileList) {
  console.log("est plein ", files.item(0))
  this.fileToUpload = files.item(0);
  if(!this.validFileType(this.fileToUpload)){
    this.companyForm.get('registerofCommerce').setValue(null);
    this.verifTypeDocRegisterOfCommerce=true;
    
  }
  else{
    this.verifTypeDocRegisterOfCommerce=false;
  }
}
handleFileInputTaxShit(files: FileList) {
  this.fileToUploadTaxSheet = files.item(0);
  if(!this.validFileType(this.fileToUploadTaxSheet)){
   this.companyForm.get('taxIdSheet').setValue(null); 
  this.verifTypeDocTaxId=true;
 }
 else{
   this.verifTypeDocTaxId=false;
 }
} 

handleFileInputOtherFile(files: FileList) {
  this.fileToUploadOtherFile = files.item(0);
  if(!this.validFileType(this.fileToUploadOtherFile)){
  this.companyForm.get('otherFile').setValue(null); 
   this.verifTypeDocOtherFile=true;
    }
    else{
      this.verifTypeDocOtherFile=false;
    }
}  
  

 uploadFile(id){
   this.companyService.uploadFile(this.fileToUpload,this.fileToUploadTaxSheet,this.fileToUploadOtherFile,this.logoFile,id).subscribe(res => {
    this.verficationFile=res;
    if (this.verficationFile=="failed"){
      this.verifUplodFile=true;
     }
     else if (this.verficationFile=="success"){
      this.router.navigate(['/companyTable']);
    }
   
   
   });
 }
 getbrancheCode(event){
  this.companyForm.get('idBranchCode').setValue(null);
  this.companyForm.get('idBranchCode').setValidators(Validators.required);
  let id =this.companyForm.value.idBusinessSectors;
  this.companyService.getAllBrancheCode(id).subscribe(res=>{console.log("res",res)
  this.listBrancheCode=res});
  }
 
  selectchange(ob){
    this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
    this.countryVar=this.companyForm.get('country').value;
    this.companyForm.get('region').setValue(null);
    this.companyForm.get('region').setValidators(Validators.required);
    this.cities=Object.values(countries[this.countryVar]);
    this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
    this.filteredCitiesOption = this.companyForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
  
      }
      refresh(){
       this.companyForm.get('region').reset;
       this.cities=Object.values(countries[ this.countryVar]);
       this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
       this.filteredCitiesOption = this.companyForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
    
       
      }
    
   _filterCountry(value: String): String[] {
   
    const filterValue = value.toLowerCase();
    return this.country.filter(country => country.toLowerCase().includes(filterValue));
  }
 
  _filterCity (value: String): String[] {
    
   const filterValue = value.toLowerCase();
    return this.cities.filter(region => region.toLowerCase().includes(filterValue));
  }
  showProductDetails(){
    this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));

  }

}
