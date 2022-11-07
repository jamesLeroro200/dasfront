import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplicationStatistics } from "../shared/models/applicationStatistics";

const apiUrl = environment.baseUrl;
@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {}

  bigChats() {
    return [
      {
        name: "Asia",
        data: [502, 635, 809, 947, 1402, 3634, 5268],
      },
      {
        name: "Africa",
        data: [106, 107, 111, 133, 221, 767, 1706],
      },
      {
        name: "Europe",
        data: [163, 203, 276, 408, 547, 729, 628],
      },
      {
        name: "America",
        data: [18, 31, 54, 156, 339, 818, 1201],
      },
      {
        name: "Oceania",
        data: [2, 2, 2, 6, 13, 30, 46],
      },
    ];
  }
  Cards() {
    return [71, 78, 39, 66];
  }
  Pie() {
    return [
      {
        name: "Chrome",
        y: 61.41,
        sliced: true,
        selected: true,
      },
      {
        name: "Internet Explorer",
        y: 11.84,
      },
      {
        name: "Firefox",
        y: 10.85,
      },
      {
        name: "Edge",
        y: 4.67,
      },
      {
        name: "Safari",
        y: 4.18,
      },
      {
        name: "Sogou Explorer",
        y: 1.64,
      },
      {
        name: "Opera",
        y: 1.6,
      },
      {
        name: "QQ",
        y: 1.2,
      },
      {
        name: "Other",
        y: 2.61,
      },
    ];
  }
  ToDo() {
    return [
      { title: "check New Super Users" },
      { title: "Update New Super Users", isChecked: false },
      { title: "check New Rviewers", isChecked: false },
      { title: "Update New Reviewers", isChecked: false },
      { title: "check Reports", isChecked: false },
      { title: "do some random stuff", isChecked: false },
    ];
  }

  nbAdmin() {
    return this.http.get(this.baseUrl + "stat/nb-admin");
  }

  nbSuperUser() {
    return this.http.get(this.baseUrl + "stat/nb-super-user");
  }
  nbUser() {
    return this.http.get(this.baseUrl + "stat/nb-user");
  }
  nbReviewer() {
    return this.http.get(this.baseUrl + "stat/nb-reviewer");
  }
  nbAdminToday() {
    return this.http.get(this.baseUrl + "stat/nb-admin-today");
  }
  nbSuperUserToday() {
    return this.http.get(this.baseUrl + "stat/nb-super-user-today");
  }
  nbUserToday() {
    return this.http.get(this.baseUrl + "stat/nb-user-today");
  }
  nbReviewerToday() {
    return this.http.get(this.baseUrl + "stat/nb-reviewer-today");
  }

  normNames() {
    return this.http.get<string[]>(this.baseUrl + "stat/nameOfNorm");
  }
  getNumberOfApplicationByNorm() {
    return this.http.get<number[]>(
      this.baseUrl + "stat/getNumberOfApplication"
    );
  }

  getNumberOfNormByApplication(): Observable<ApplicationStatistics> {
    return this.http.get<ApplicationStatistics>(
      this.baseUrl + "stat/norm-application"
    );
  }
}
