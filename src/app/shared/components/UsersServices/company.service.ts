import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company';
import { environment } from 'src/environments/environment';
import { NgxSpinnerService } from "ngx-spinner";
import { BusinessSectors } from '../../models/business-sectors';
import { BrancheCode } from '../../models/branche-code';
import { RecognizedStandards } from '../models/recognized-standards';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private url: string;
  listBrancheCode: Array<String> = [];

  constructor(private http: HttpClient, private SpinnerService: NgxSpinnerService) {
    this.url = environment.baseUrl;
   
  }
    public async getAllCompany() {
    let list =[] ;
    await this.http.get<Company[]>(this.url+"listCompany").toPromise().then((data)=>
     {
       if(data!=null){
         for (let i = 0 ; i< data.length; i++){
         list.push(data[i]);     
    }
  }
   });
  
    return list;
   
  }
  public getAllBusinessSectors() {
    let list = [];
    this.http.get<BusinessSectors[]>(this.url + "allBusinessSectors").subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        list.push(data[i]);

      }
    });
    return list;
  }

  public getAllRecognizedStandards() {
    let list = [];
    console.log(this.url + "getAllRecognizedStandards"); 
    this.http.get<BusinessSectors[]>(this.url + "getAllRecognizedStandards").subscribe((data) => {
      for (let i = 0; i < data.length; i++) {
        list.push(data[i]);

      }
    });
    return list;
  }

  public getAllBrancheSelcted(id: String) {
    return this.http.get<String[]>(this.url + `allBrancheSelected/${id}`)
  }

  public getAllBranche(id: String): Observable<any> {
    return this.http.get<BrancheCode[]>(this.url + `allBranche/${id}`)
  }

  public getAllBrancheCode(id: any): Observable<any> {
    return this.http.get<any>(this.url + `allBrancheCode/${id}`)

  }
  public getBusinessSectors(id: String): Observable<any> {
    return this.http.get<any>(this.url + `selectBusinessSectors/${id}`)

  }
  public downloadFile(id, typeDoc): Observable<any> {
    return this.http.get(`${this.url}downloadFile/${id}/${typeDoc}`, { responseType: 'blob' })
  }

  public save(data): Observable<any> {
    return this.http.post(`${this.url}` + 'saveCompany/', data);
  }
  updateCompany(id: String, value: any): Observable<Object> {
    return this.http.put(`${this.url}updateCompany/${id}`, value);
  }
  deleteCompany(id: String): Observable<any> {
    return this.http.delete(`${this.url}deletCompany/${id}`, { responseType: 'text' });
  }
  getCompany(id: String): Observable<Object> {
    return this.http.get(`${this.url}company/${id}`);
  }
  headers = new HttpHeaders();

  uploadFile(fileToUploadUpdate: File, fileToUploadTaxidSheet: File, fileToUploadOtherFile: File,logo: File, idCompany: any) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers.append("Content-Type", "multipart/form-data");
    const options = { headers: this.headers };
    let formData = new FormData();
    formData.append('registreCommerce', fileToUploadUpdate);
    formData.append('taxIdSheet', fileToUploadTaxidSheet);
    formData.append('fileOtherFile', fileToUploadOtherFile);
    formData.append('logo', logo);
    formData.append('idCompany', idCompany);
    return this.http.post(`${this.url}updateFileFtpSession/`, formData, { ...options, responseType: 'text' });
  }
  uploadFileUpdate(fileToUploadUpdate: File, fileToUploadTaxidSheet: File, fileToUploadOtherFile: File,logo: File, idCompany: any) {
    this.headers.append('Accept', 'application/json;charset=UTF-8');
    this.headers.append("Content-Type", "multipart/form-data");
    const options = { headers: this.headers };
    let formData = new FormData();
    formData.append('registreCommerce', fileToUploadUpdate);
    formData.append('taxIdSheet', fileToUploadTaxidSheet);
    formData.append('fileOtherFile', fileToUploadOtherFile);
    formData.append('logo', logo);
    formData.append('idCompany', idCompany);
    return this.http.post(`${this.url}updateUploadFileFtpSession/`, formData, { ...options, responseType: 'text' });
  }


}
