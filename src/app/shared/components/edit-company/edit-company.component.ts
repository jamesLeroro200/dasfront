import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Company } from '../models/company';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Validation } from '../../models/validation';
import { CompanyService } from '../UsersServices/company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SuperUser } from '../models/super-user';
import { SuperUsersService } from '../UsersServices/super-users.service';
import { delay } from 'q';
import { MatDialog } from '@angular/material';
import { BusinessSectors } from '../../models/business-sectors';
import { BrancheCode } from '../../models/branche-code';
import { Observable } from 'rxjs';
import countries from '../../../data/countries.json';
import { map,startWith } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  listSuperUser:SuperUser[];
  idCompany:any;
  company:Company;
  companyForm: FormGroup
  visible = false ;
  fileToUpload: File;
  fileToUploadTaxSheet:File;
  fileToUploadOtherFile:File;
  logoFile: File;
  fileType:any;
  data:any;
  file: any;
  verficationFile:any;
  listBusinessSectors :BusinessSectors[];
  listBrancheCode :BrancheCode[];
  country: String[] = Object.keys(countries);
  controlCountry = new FormControl();
  filteredOption: Observable<String[]>;
  controlCity=new FormControl();
  cities=[];
  filteredCitiesOption:Observable<String[]>;
  companyUpdate:any;
  validation = new Validation();
  countryVar: any;
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

  constructor(private fb:FormBuilder,private companyService: CompanyService,public upladFileDialog: MatDialog,private router: Router,private routerActive:ActivatedRoute,private superUsersService:SuperUsersService,private spinnerService: NgxSpinnerService) {
    this.routerActive.params.subscribe(res=>{
      this.idCompany= res['id'];
    })
   }
  

    
    async ngOnInit(){
      this.filteredOption = this.controlCountry.valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
      await this.companyService.getCompany(this.idCompany).toPromise().then(res=>{
        this.company = <Company>res;
        this.companyService.getAllBrancheCode(this.company.idBusinessSectors).subscribe(data=>{
        this.listBrancheCode=data;
        this.listBusinessSectors= this.companyService.getAllBusinessSectors();
        this.countryVar = this.companyForm.get('country').value;
        this.cities = Object.values(countries[this.countryVar]);
        this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
        this.filteredCitiesOption = this.companyForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
       });
 
      });
      this.visible = true ;
      console.log(this.company);
      this.companyForm =   this.fb.group({
        companyName:['', [Validators.required]],
        idBusinessSectors:['', [Validators.required]],
        companyPhone : ['', [Validators.required]],
        idBranchCode : ['', [Validators.required]],
        searchTerms : [''],
        companyEmail : ['', [Validators.required,Validators.email]],
        annualSale : [''],
        country : ['', [Validators.required]],
        adress : ['', [Validators.required]],
        zipCodeAdress: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
        poBoxNumber : [''],
        employeeNumber : ['', [Validators.required,Validators.min(Number.MIN_VALUE)]],
        region : ['',[Validators.required]],
        houseNr : [''],
        poBoxAdress : ['', [Validators.required]],
        zipCodeBox : [''],
        representativeFirstName : ['', [Validators.required]],
        representativePosition : ['', [Validators.required]],
        representativePhone :['', [Validators.required]],
        representativeLastName : ['', [Validators.required]],
        representativeEmail : ['', [Validators.required,Validators.email]],
        numRegisterofCommerce : ['', [Validators.required]],
        taxNumber : ['', [Validators.required]],
        enable: ['', []],
        superUser:['', []],
        taxIdSheet:[''],
        otherFile :['', []],
        registerofCommerce: [''],  
        registerOfCommerceName: ['', []],  
        taxIdSheetName : [''],
        otherFileName : ['', []],
        logoId:[''],
        logoIdName:['',],
    
    
    
    
      });
      this.companyForm.valueChanges.subscribe((date) => {
        this.validation.buildValidationErrors(this.companyForm);
      })
      this.listSuperUser = await this.superUsersService.getList();
    }
    handleBlurValidation(){
      this.validation.buildValidationErrors(this.companyForm)
    }
    selectchange(ob) {
      this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
      this.countryVar = this.companyForm.get('country').value;
      this.companyForm.get('region').setValue(null);
      this.companyForm.get('region').setValidators(Validators.required);
      this.cities = Object.values(countries[this.countryVar]);
      this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
      this.filteredCitiesOption = this.companyForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
  
    }
    refresh() {
      this.companyForm.get('region').reset;
      this.cities = Object.values(countries[this.countryVar]);
      console.log(this.cities)
      this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
      this.filteredCitiesOption = this.companyForm.get('region').valueChanges.pipe(startWith(''), map(value => this._filterCity(value)));
  
  
    }
  
    _filterCountry(value: String): String[] {
  
      const filterValue = value.toLowerCase();
      return this.country.filter(country => country.toLowerCase().includes(filterValue));
    }
  
    _filterCity(value: String): String[] {
  
      const filterValue = value.toLowerCase();
      return this.cities.filter(region => region.toLowerCase().includes(filterValue));
    }
    showProductDetails() {
      this.filteredOption = this.companyForm.get('country').valueChanges.pipe(startWith(''), map(value => this._filterCountry(value)));
  
    }


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
       
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    if(!this.validFileType(this.fileToUpload)){
      this.companyForm.get('registerofCommerce').setValue(null);
        this.verifTypeDocRegisterOfCommerce=true;
        this.companyForm.get('registerofCommerce').setValidators(Validators.required);

    }
    else{
      this.verifTypeDocRegisterOfCommerce=false;
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
      handleFileInputTaxShit(files: FileList) {
        this.fileToUploadTaxSheet = files.item(0);
        if(!this.validFileType(this.fileToUploadTaxSheet)){
          this.companyForm.get('taxIdSheet').setValue(null); 
        this.verifTypeDocTaxId=true;
        this.companyForm.get('taxIdSheet').setValidators(Validators.required);
      
       }
       else{
         this.verifTypeDocTaxId=false;
       }
      } 
    
    onFileSelected(event: any) {
      this.logoFile = event.target.files[0];
      if(!this.validFileTypeImg(this.logoFile)){
        this.companyForm.get('logoId').setValue(null);
         this.verifTypeDocLog=true; 
         this.companyForm.get('logoId').setValidators(Validators.required);
    
    }
    else {
     this.verifTypeDocLog=false; 
    }
    }

  async onSubmit() {
  if(this.companyForm.valid){
    this.spinnerService.show();
    await this.companyService.updateCompany(this.idCompany,this.companyForm.value)
      .toPromise().then(async res => {
        this.data =res; 
        this.uploadFile(this.idCompany);
        this.spinnerService.hide();
       }, (err) => {
      });
    }
    else{
      this.validation.buildValidationOnSubmitErrors(this.companyForm);
    
    }
       
  } 
 
  region;
  // selectchangeCity(item, form){
  //   console.log('item city',item)
  //   this.region=item;
  //   this.companyForm.get('region').clearValidators();
  //   this.companyForm.get('region').updateValueAndValidity();

  // }
  


uploadFile(id){
  this.companyService.uploadFileUpdate(this.fileToUpload,this.fileToUploadTaxSheet,this.fileToUploadOtherFile,this.logoFile,id).subscribe(res => {
    this.verficationFile=res;
    if (this.verficationFile=="failed"){
      this.verifUplodFile=true;
     }
     else if (this.verficationFile=="success"){
      this.router.navigate(['/companyTable']);

    }
    
  });
}
async downloadFile(id,typeDoc) 
{
 await this.companyService.downloadFile(id, typeDoc).toPromise().then(data =>
   {
     this.file =data ; 
   });
   let url = window.URL.createObjectURL(this.file);
   let a = document.createElement('a');
   a.href = url;
   a.download = id;
   a.click();
   
window.URL.revokeObjectURL(url); 
   } 
   getbrancheCode(event){
    this.companyForm.get('idBranchCode').setValue(null);
    this.companyForm.get('idBranchCode').setValidators(Validators.required);
    let id =this.companyForm.value.idBusinessSectors;
    this.companyService.getAllBrancheCode(id).subscribe(res=>{console.log("res",res)
    this.listBrancheCode=res});
    }
}
