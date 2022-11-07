import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

const apiUrl = environment.baseUrl + 'auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {  
  isLoggedIn = false;
  redirectUrl: string;
  private userLoggedIn = new Subject<boolean>();
  constructor(private router: Router,private http: HttpClient) { 
    this.userLoggedIn.next(false);
  }
  login(data: any): Observable<any> {
    console.log("Inside auth Service");
    return this.http.post<any>(apiUrl+'/login', data)
      .pipe(
        tap(_ => this.isLoggedIn = true),
        catchError(this.handleError('login', []))
      );
  }
  
  getLogOut(): Observable<Object> {  
    this.setUserLoggedIn(false);
    localStorage.clear();
    this.router.navigate(['']);
    return this.http.get(apiUrl+'/logOut');  
  }
  
  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }
  setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
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
