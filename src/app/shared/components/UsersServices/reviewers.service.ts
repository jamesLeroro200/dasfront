import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { delay } from 'q';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { NgxSpinnerService } from "ngx-spinner"; 


@Injectable({
  providedIn: 'root'
})
export class ReviewersService {
  private baseUrl = environment.baseUrl + "reviewer/";
  //private baseUrl = 'http://localhost:2020/api';
  userType:any;

 message;
  constructor(private http: HttpClient,private SpinnerService: NgxSpinnerService) { }
 Creat(superUser){
  return this.http.post(this.baseUrl + "create",superUser);
}
  
  async getList(){
  this.SpinnerService.show(); 
  let list =[] ;
  
  await this.http.get<User[]>(this.baseUrl).toPromise().then((data)=> {
    if(data!=null){
      for (let i = 0 ; i< data.length; i++){
      list.push(data[i]);
      }
    }
  this.SpinnerService.hide()
});
console.log("List: "+list);
   return list;
}
 Update(Reviewer){
  return this.http.post(this.baseUrl + "update" ,Reviewer);
}
 delete(id: String): Observable<any> {
 return this.http.get<User>(`${this.baseUrl+"delete"}/${id}`);

}

createReviewer(reviewer: User) : Observable<User> {
    return this.http.post<User>(this.baseUrl, reviewer);
  } 
  
}
