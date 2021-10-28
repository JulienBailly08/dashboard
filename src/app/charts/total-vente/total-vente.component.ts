import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/';

import highchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

highchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);



@Component({
  selector: 'app-total-vente',
  templateUrl: './total-vente.component.html',
  styleUrls: ['./total-vente.component.css']
})
export class TotalVenteComponent implements OnInit {

  constructor() { }

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


  ventes = Highcharts;

  chartOptions: Highcharts.Options = {
    chart: {
      type: 'solidgauge',
    },
    legend: {
      enabled: false
    },
    credits: {
      enabled: false
    },
    title: {
      text: undefined
    },
    pane: {
      center: ['50%', '85%'],
      size: '140%',
      startAngle: -90,
      endAngle: 90,
      background: [{
        backgroundColor: 'red',
        innerRadius: '60%',
        outerRadius: '100%',
        shape: 'arc'
      }],
    },

    exporting: {
      enabled: false
    },

    tooltip: {
      enabled: false
    },

    yAxis: {
      stops: [
        [0.1, '#55BF3B'], // green
        [0.5, '#DDDF0D'], // yellow
        [0.9, '#DF5353'] // red
      ],
      lineWidth: 0,
      tickWidth: 0,
      minorTickInterval: null,
      tickAmount: 2,
      title: {
        y: -70
      },
      labels: {
        y: 16
      }
    },

    plotOptions: {
      solidgauge: {
        dataLabels: {
          y: 5,
          borderWidth: 0,
          useHTML: true
        }
      }
    },

    series: [{
      type:'solidgauge',
      name: 'Vente',
      data: [80],
      dataLabels: {
        format:
          '<div style="text-align:center">' +
          '<span style="font-size:25px">{y}</span><br/>' +
          '<span style="font-size:12px;opacity:0.4">km/h</span>' +
          '</div>'
      },
      tooltip: {
        valueSuffix: ' km/h'
      }
    }]

  }




  ngOnInit(): void {
  }

}
