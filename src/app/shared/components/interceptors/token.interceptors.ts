import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SideBarService } from '../../services/side-bar.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private sideBarService: SideBarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes("/auth/**") ||
      request.url.includes("/register/**") ||
      request.url.includes("/api/norm/NormList") ||
      request.url.includes("/api/norm/FindNormByKey/**")) {
      console.log(request);
      return next.handle(request);
    }
    else {
      const token = localStorage.getItem('token');
      if (token) {
        request = request.clone({
          setHeaders: {
            'Authorization': 'Bearer ' + token
          }
        });
      }

      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error);
          if (error.status === 401 || error.status === 400) {
            localStorage.setItem('token', null);
            this.sideBarService.showLogin = true;
            this.sideBarService.showLogout = false;
            this.sideBarService.showSideBar = false;
            this.router.navigate(['']);
            return of({}) as Observable<HttpEvent<any>>;

          }
          else {
            return throwError(error);
          }
        }));
    }
  }
}