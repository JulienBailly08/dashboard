import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';
import * as Highcharts from 'highcharts';

import highchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';


highchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);
@Component({
  selector: 'app-paniers-abandonnes',
  templateUrl: './paniers-abandonnes.component.html',
  styleUrls: ['./paniers-abandonnes.component.css']
})
export class PaniersAbandonnesComponent implements OnInit, OnDestroy {
  ordersSub!: Subscription;
  orders!: any;
  lostBasket: any;
  chartOptions!: Highcharts.Options;
  value !: any;

  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {

    this.ordersSub = this.orderService.ordersSelectedSubject.subscribe(
      (response) => {

        this.orders = response;

        this.value=this.getLostBasket(this.orders);

        //chart below

        this.lostBasket = Highcharts;

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
            minColor: 'rgba(255, 255, 153, 0.8)',
            maxColor: '#ff6c02',
            min: 0,
            max: 100,
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
              y: -70
            },
            labels: {
              enabled: false
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
                '<span style="font-size:25px">{y} %</span><br/>' +
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

  getLostBasket(values: any[]){
    let nbOfCommande=0;
    let nbOfUnpaidCommand=0;
    values.forEach(element => {
      nbOfCommande+=1;
      if(!element.isPaid){
        nbOfUnpaidCommand+=1;
      }
    });
    return Math.round(nbOfUnpaidCommand/nbOfCommande*100);
  }


  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }
}


