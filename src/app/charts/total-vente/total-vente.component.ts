import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts/';

import highchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';


import { Subscription } from 'rxjs';
import { OrderDetailsService } from 'src/app/services/order-details.service';
import { DatesService } from 'src/app/services/dates.service';

highchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);



@Component({
  selector: 'app-total-vente',
  templateUrl: './total-vente.component.html',
  styleUrls: ['./total-vente.component.css']
})
export class TotalVenteComponent implements OnInit, OnDestroy {

  constructor(private orderDetailService: OrderDetailsService,
              private datesServices:DatesService) { }



  ordersDetails!: any;
  ordersDetailsSub !: Subscription;

  ventes !: any;
  chartOptions!: Highcharts.Options;
  value !:any;


  ngOnInit(): void {

    this.ordersDetailsSub = this.orderDetailService.ordersDetailsSelectedSubject.subscribe(
      (response) => {

        this.ordersDetails = response;


        this.value=this.getTotalSales(this.ordersDetails);

        //chart below

        this.ventes = Highcharts;

        this.chartOptions = {
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
            center: ['50%', '70%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: [{
              backgroundColor: 'white',
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
              [0.1, 'rgba(90, 129, 0, 0.75)'], // vert
              [0.5, 'rgba(255, 255, 153, 0.8)'], // pale
              [0.9, '#ff6c02'] // orange
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
              y: -70
            },
            labels: {
              enabled:false
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
            type: 'solidgauge',
            name: 'Vente',
            data: [this.value],
            dataLabels: {
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y} €</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"></span>' +
                '</div>'
            },
          }]

        }

      },
      (error) => {
        console.log(error);
      }
    );

  }

getTotalSales(item:any){
  let total=0;
item.forEach((element: { total: number; }) => {
  total+=element.total
});
return Math.round(total);
}

ngOnDestroy(){
  this.ordersDetailsSub.unsubscribe();
}

}
