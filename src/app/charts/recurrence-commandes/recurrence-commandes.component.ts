import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

import highchartsMore from 'highcharts/highcharts-more';
import HighchartsSolidGauge from 'highcharts/modules/solid-gauge';

import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/services/orders.service';


highchartsMore(Highcharts);
HighchartsSolidGauge(Highcharts);

@Component({
  selector: 'app-recurrence-commandes',
  templateUrl: './recurrence-commandes.component.html',
  styleUrls: ['./recurrence-commandes.component.css']
})
export class RecurrenceCommandesComponent implements OnInit, OnDestroy {

  constructor(private orderService: OrdersService,
  ) { }

  orders!: any;
  ordersSub !: Subscription;

  recurenceCommand !: any;
  chartOptions!: Highcharts.Options;
  value !: any;

  ngOnInit(): void {

    this.ordersSub = this.orderService.ordersSelectedSubject.subscribe(
      (response) => {

        this.orders = response;

        this.value=this.getRecurse(this.orders);



        //chart below

        this.recurenceCommand = Highcharts;

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
            minColor:'rgba(255, 255, 153, 0.8)',
            maxColor:'#ff6c02',
            min:0,
            max:100,
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

  getRecurse(datas: any) {
    let tabOrders: any[] = [];
    let tabresults: number[]=[];
    let nbClientMultiOrders=0;

    datas.forEach((element: { user: string; }) => {
      if (!tabOrders.includes(element.user)) {
        tabOrders.push(element.user);
      }
    });

    tabOrders.forEach(element => {
      let nbCommand=0;
      datas.forEach((orderinfo: { user: string }) => {
        if(orderinfo.user == element){
          nbCommand+=1;
        }
      });
      tabresults.push(nbCommand);
    });

    tabresults.forEach(element => {
        if(element>1){
          nbClientMultiOrders+=1;
        }
    });

    return Math.round((nbClientMultiOrders/tabresults.length)*100);

  };


  ngOnDestroy() {
    this.ordersSub.unsubscribe();
  }
}


