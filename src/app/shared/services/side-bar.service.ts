import { AdminUser } from './../components/models/admin-user';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';


@Injectable({
  providedIn: 'root'
})

export class SideBarService {
 
  private baseUrl = environment.baseUrl ;
  public showLogin= true;
  public showLogout= false;
  public showSideBar=false;
  public adminUser: AdminUser;
  public adminUserFullName:string;
  public email:string = "";
  public role:string;
  public image: any;
  public photoid:String;
  public objectURL:any;
  
  
  constructor(private http: HttpClient, private sanitizer: DomSanitizer ) { }
  async toggle() {
    console.log("Side Bar Service Executed");
    this.showLogin = false;
    this.showLogout = true;
    this.showSideBar = true;
   await this.getAdminUser().toPromise().then(async res=>{
      this.adminUser = <AdminUser>res;
      if(this.adminUser!=null){
        console.log("Inside If");
        this.adminUserFullName = this.adminUser.firstName + " " + this.adminUser.lastName;
        this.email = this.adminUser.email;
        if(this.adminUser.photoId!=null){    
        this.photoid=this.adminUser.photoId;
      }
      }
    });
    await this.getRole().toPromise().then(async res=>{
      if(res!=null){
        this.role = res.role;
      }
    });
    if(this.adminUser.photoId!=null){    
       await this.getPhoto(this.photoid).toPromise().then(async res=>{
         console.log("Service Photo Id: "+this.photoid)
      if(res!=null){    
        this.image = res.image;
        this.objectURL = 'data:image/jpeg;base64,' +this.image;               
        }

    });

  }
  } 
  getAdminUser(): Observable<Object> {  
    return this.http.get<AdminUser>(this.baseUrl+"user/adminUser");  
  }
  getRole(): Observable<any> {  
    console.log("Inside GetRole Method");
    return this.http.get(this.baseUrl+"user/role");  
  } 
  getPhoto(id:any): Observable<any>{
    return this.http.get<String>(`${this.baseUrl+"getphoto"}/${id}`);     
  }
  
  addPhoto(image:File): Observable<any> {  
  console.log("Inside addPhoto Method");
let requestParam = new FormData();    
 let  email = this.email
 requestParam.append('image',image);
 requestParam.append('userEmail',email);
   console.log("requestParam: "+requestParam.get('userEmail'));
   return this.http.post<any>(this.baseUrl+"addPhoto",requestParam );

}
}
 


