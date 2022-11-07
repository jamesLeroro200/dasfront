import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const apiUrl = environment.baseUrl + 'register';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post<any>(apiUrl+'/registerAdminUser', data)
      .pipe(
        tap(_ => this.log('Register')),
        catchError(this.handleError('Register', []))
      );
  }
  validateAdminToken(token: string){
    return this.http.get(apiUrl + '/resetAdminPassword?tokenId=' + token, {responseType: 'text'});   
  }

  resetUserPassword(token: any): Observable<any> {
    return this.http.post<any>(apiUrl + '/activate', token);
  }

   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }
}
