import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { NgxSpinnerService } from "ngx-spinner"; 

@Injectable({
  providedIn: 'root'
})
export class SuperUsersService {
  private baseUrl = environment.baseUrl + "superUser/";
  userType:any; 
 message ;
  constructor(private http: HttpClient,private SpinnerService: NgxSpinnerService) { }
  
 Creat(adminUser){
   return this.http.post(this.baseUrl + "create", adminUser);
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
   this.SpinnerService.hide();
  });
    return list
  }

  Update(adminUser){
    return this.http.post<User[]>(this.baseUrl+"update",adminUser);
  }

  delete(id: String): Observable<any> {
    return this.http.get<User>(`${this.baseUrl+"delete"}/${id}`);
  }
}
