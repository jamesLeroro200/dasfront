/*import { SideBarService } from './../../services/side-bar.service';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { TimeoutError } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  //private router: Router
  constructor(private router: Router, private sideBarService: SideBarService) { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,

  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        }
        localStorage.setItem('token', null);
        this.sideBarService.showLogin = true;
        this.sideBarService.showLogout=false;
        this.sideBarService.showSideBar=false;
        this.router.navigate(['']);
        console.log("After Router navigate");
        return throwError(errorMessage);
      })
    );
  }

}
*/