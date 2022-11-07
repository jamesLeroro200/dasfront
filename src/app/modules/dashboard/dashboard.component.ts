import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bigChart =[];
  Cards = [];
  pieChart =[];
  ToDo =[];
  constructor(private dashboardService : DashboardService) { }

  ngOnInit() {
    this.bigChart = this.dashboardService.bigChats();
    this.Cards = this.dashboardService.Cards();
    this.pieChart = this.dashboardService.Pie();
    this.ToDo = this.dashboardService.ToDo();
  }

}
