import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReportReviewer } from '../models/report-reviewer';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReportReviewerService {

  baseUrl = environment.baseUrl + "report";

  constructor(private http: HttpClient) { }

  async getList() {
    let list = [];
    await this.http.get<ReportReviewer[]>(this.baseUrl + "/getList").toPromise().then((data) => {
      for (let i = 0; i < data.length; i++) {
        list.push(data[i]);
      }
    });
    return list
  }

  create(reportReviewer: ReportReviewer): Observable<ReportReviewer> {
    console.log('Begin of createReport')
    return this.http.post<ReportReviewer>(this.baseUrl + "/create", reportReviewer);
  }

  update(reportReviewer){
    return this.http.post(this.baseUrl+"/update",reportReviewer);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl+"/delete"}/${id}`, { responseType: 'text' });
  }

  findReportReviewer(id){
    return this.http.get(`${this.baseUrl+"/findReportReviewer"}/${id}`,{responseType:'text' as 'json'});
  }

  createByNorm(id){
    return this.http.get(`${this.baseUrl+"/createByNorm"}/${id}`,{responseType:'text' as 'json'});
  }
}
