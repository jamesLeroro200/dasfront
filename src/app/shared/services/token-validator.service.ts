import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenValidatorService {
      
  constructor(private http: HttpClient) { }

  responseValue : any;


 private baseUrl = environment.baseUrl;
 // private baseUrl = 'http://localhost:2020/api/';


  validateToken(token){
    // return this.http.get(this.baseUrl + '/resetPassword?tokenId' + token, {responseType: 'text'});
     return this.http.get(this.baseUrl + 'token/isValid?tokenId=' + token, {responseType: 'text'});
     

   }
}