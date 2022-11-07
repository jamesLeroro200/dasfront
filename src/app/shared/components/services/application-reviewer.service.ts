import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApplicationReviewer } from '../models/application-reviewer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationReviewerService {

  baseUrl = environment.baseUrl + "application";

  constructor(private http: HttpClient) { }

  async getList() {
    let list = [];
    await this.http.get<ApplicationReviewer[]>(this.baseUrl + "/getList").toPromise().then((data) => {
      for (let i = 0; i < data.length; i++) {
        list.push(data[i]);
      }
    });
    return list
  }

  create(applicationReviewer: ApplicationReviewer): Observable<ApplicationReviewer[]> {
    return this.http.post<ApplicationReviewer[]>(this.baseUrl + "/create", applicationReviewer);
  }

  update(applicationReviewer){
    return this.http.post(this.baseUrl+"/update",applicationReviewer);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl+"/delete"}/${id}`, { responseType: 'text' });
  }

  findApplicationReviewer(id){
    return this.http.get(`${this.baseUrl+"/findApplicationReviewer"}/${id}`,{responseType:'text' as 'json'});
  }

  findApplicationReviewer1(applicationReviewer): Observable<Object>{
    return this.http.post(this.baseUrl+"/findApplicationReviewer1",applicationReviewer,{responseType:'text' as 'json'});
  }

  findApplicationReviewer2(applicationReviewer): Observable<Object>{
    return this.http.post(this.baseUrl+"/findApplicationReviewer2",applicationReviewer,{responseType:'text' as 'json'});
  }
  
  applicationUpdateReviewer1(applicationReviewer){
    return this.http.post(this.baseUrl+"/applicationUpdateReviewer1",applicationReviewer,{responseType:'text' as 'json'});
  }

  applicationUpdateReviewer2(applicationReviewer){
    return this.http.post(this.baseUrl+"/applicationUpdateReviewer2",applicationReviewer,{responseType:'text' as 'json'});
  }
} 
