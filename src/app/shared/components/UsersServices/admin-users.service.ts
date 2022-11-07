import { AdminUser } from './../models/admin-user';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  private baseUrl = environment.baseUrl + "admin/";
  userType:any;
 message ;
  constructor(private http: HttpClient,private SpinnerService: NgxSpinnerService) { }
  
 create(adminUser: AdminUser){
   console.log(adminUser);
   return this.http.post(this.baseUrl + "create", adminUser);
 }
  async getList(){
    this.SpinnerService.show(); 
    let list =[] ;
    await this.http.get<AdminUser[]>(this.baseUrl).toPromise().then((data)=> {
      if(data!=null){
        for (let i = 0 ; i< data.length; i++){
        list.push(data[i]);
        }
      }
   this.SpinnerService.hide();
  });
    return list
  }

   update(adminUser:AdminUser){
    console.log(adminUser);
    return this.http.post<AdminUser[]>(this.baseUrl+"update",adminUser);
  }

  delete(id: String): Observable<any> {
    return this.http.delete(`${this.baseUrl+"delete"}/${id}`, { responseType: 'text' });
  }
}
