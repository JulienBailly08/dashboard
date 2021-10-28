import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  truc = [{
    name: 'Chrome',
    y: 61.41
  }, {
    name: 'Internet Explorer',
    y: 11.84
  }, {
    name: 'Firefox',
    y: 10.85
  }, {
    name: 'Edge',
    y: 4.67
  }, {
    name: 'Safari',
    y: 4.18
  }, {
    name: 'Sogou Explorer',
    y: 1.64
  }, {
    name: 'Opera',
    y: 1.6
  }, {
    name: 'QQ',
    y: 1.2
  }, {
    name: 'Other',
    y: 2.61
  }];

  testChart = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      plotBackgroundColor: 'silver',
      plotBorderWidth: 2,
      plotShadow: true,
      type: 'solidgauge'
    },
    title:{
      text: undefined
    },
    legend:{
      enabled:false
    },
    credits:{
      enabled:false
    },

    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: false,
          format: '<b>{point.name}</b>: {point.percentage:.1f} %'
        }
      }
    },
    series: [{
      name: 'Brands',
      colorByPoint: true,
      type: 'pie',
      data: this.truc
    }]
  }


  constructor() { }

  ngOnInit(): void {
  }





}
