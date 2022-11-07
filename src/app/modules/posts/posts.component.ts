import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from "../dashboard.service";
import * as Highcharts from "highcharts";
import { element } from "protractor";
import { ApplicationStatistics } from "src/app/shared/models/applicationStatistics";

@Component({
  selector: "app-posts",
  templateUrl: "./posts.component.html",
  styleUrls: ["./posts.component.scss"],
})
export class PostsComponent implements OnInit {
  nbAdmin;
  nbAdminToday;
  nbSuperUser;
  nbSuperUserToday;
  nbUser;
  nbUserToday;
  nbReviewer;
  nbReviewerToday;
  // norms : string[] = [];
  // nbApplications :number[] = [];
  resp: ApplicationStatistics = {
    nbApplications: [],
    norms: [],
  };

  public options: any;

  constructor(
    private SpinnerService: NgxSpinnerService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    //nb ADMIN total
    this.dashboardService.nbAdmin().subscribe(
      (data) => {
        this.nbAdmin = data;
      },
      (err) => {
        console.log(err);
      }
    );
    // nb SUPER USER total
    this.dashboardService.nbSuperUser().subscribe(
      (data) => {
        this.nbSuperUser = data;
      },
      (err) => {
        console.log(err);
      }
    );
    // nb USER total
    this.dashboardService.nbUser().subscribe(
      (data) => {
        this.nbUser = data;
      },
      (err) => {
        console.log(err);
      }
    );

    // nb REVIERWER total
    this.dashboardService.nbReviewer().subscribe(
      (data) => {
        this.nbReviewer = data;
      },
      (err) => {
        console.log(err);
      }
    );

    // nb ADMIN TODAY
    this.dashboardService.nbAdminToday().subscribe((data) => {
      this.nbAdminToday = data;
    });

    // nb SUPER USER TODAY
    this.dashboardService.nbSuperUserToday().subscribe((data) => {
      this.nbSuperUserToday = data;
    });

    // nb USER TODAY
    this.dashboardService.nbUserToday().subscribe((data) => {
      this.nbUserToday = data;
    });

    // nb REVIERWER TODAY
    this.dashboardService.nbReviewerToday().subscribe((data) => {
      this.nbReviewerToday = data;
    });

    this.dashboardService.getNumberOfNormByApplication().subscribe(
      (data) => {
        console.log(data);
        this.resp = data;
        this.options = {
          Chart: {
            type: "area",
            height: 700,
          },
          title: {
            text: "Norm's Applications",
          },
          credits: {
            enabled: false,
          },
          xAxis: {
            categories: data.norms,
            tickmarkPlacement: "on",
            title: {
              enabled: false,
            },
          },
          series: [
            {
              name: "Number of Applications",
              data: data.nbApplications, //[0, 0, 6, 1, 1, 1, 0]//Object.values(this.nbApplications).map((v : any)=>[this.nbApplications[v]])
            },
            // , {
            //     name: 'Europe',
            //     data: [12, 13 , 14, 15, 16, 17, 18]
            // }, {
            //     name: 'America',
            //     data: [17, 19 , 14, 15, 16, 12, 13]
            // }
          ],
        };
        Highcharts.chart("container", this.options);
      },
      (err) => {
        console.log(err);
      }
    );

    // // NAME OF NORMS
    // this.dashboardService.normNames().subscribe(
    //   data => {
    //     this.norms = data;
    //     console.log(this.norms);
    //    // console.log(typeof(this.norms))
    //   }
    // )

    // // NUMBER OF APPLICATIONS BY NORM
    // this.dashboardService.getNumberOfApplicationByNorm().subscribe(
    //   data=>{
    //     this.nbApplications = data;
    //     //Object.values(data).map((v)=>this.nbApplications.push(v));
    //     console.log(typeof(this.nbApplications));
    //     console.log(this.nbApplications);
    //   }
    // )
  }
}
