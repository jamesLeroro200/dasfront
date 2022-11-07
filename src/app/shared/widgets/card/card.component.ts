import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() label: string;
  @Input() total: string;
  @Input() percentage: string;
  chartOptions = {};
  Highcharts = Highcharts;
  constructor() { }
  @Input() data =[];
  ngOnInit() {
    this.chartOptions = {
      chart: {
          type: 'area',
          backgroundColor: null,
          borderWidth: 0,
          margin: [2,2,2,2],
          height: 60
      },
      title: {
          text: null
      },
      subtitle: {
        text: null
    },
      tooltip: {
          enabled: false,
          split: false,
          valueSuffix: ' millions'
      },
      legend : {
        enabled : false
      },
      credits : {
        enabled : false
      },
      exporting:{
        enabled : false,
      },
      xAxis:{
        labels:{
          enabled: false,
        },
        title : {
         text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions:[]
      },
      yAxis:{
        labels:{
          enabled: false,
        },
        title : {
         text: null
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions:[]
      },
      series: [{
        data : this.data
      }]
  };
    HC_exporting(this.Highcharts);
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }

}
