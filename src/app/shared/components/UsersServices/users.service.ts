import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { User } from "../models/user";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: "root",
})
export class UsersService {
  private baseUrl = environment.baseUrl;
  message;
  constructor(
    private http: HttpClient,
    private SpinnerService: NgxSpinnerService
  ) {}
  Creat(user) {
    return this.http.post(this.baseUrl + "user/create", user);
  }
  async getList() {
    this.SpinnerService.show();
    let list = [];
    await this.http
      .get<User[]>(this.baseUrl + "user")
      .toPromise()
      .then((data) => {
        if (data != null) {
          for (let i = 0; i < data.length; i++) {
            list.push(data[i]);
          }
        }
        this.SpinnerService.hide();
      });
    return list;
  }
  Update(user) {
    return this.http.post(this.baseUrl + "user/update", user);
  }
  delete(id: String): Observable<any> {
    return this.http.get<User>(`${this.baseUrl + "delete"}/${id}`);
  }

  resetUserPassword(token) {
    return this.http.post(this.baseUrl + "activate", token, {
      responseType: "text" as "json",
    });
  }

  forgotPassword(mail: string): Observable<{}> {
    return this.http.post(this.baseUrl + "auth/forgot-password", mail);
  }
  resetPassword(newPassword: string, resetKey: string): Observable<{}> {
    return this.http.post(this.baseUrl + "auth/change-password", {
      resetKey,
      newPassword,
    });
  }
}
