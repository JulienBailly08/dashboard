import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrdersService } from 'src/app/services/orders.service';
import { Subscription } from 'rxjs';

import highcharts3D from 'highcharts/highcharts-3d';

import highchartsMore from 'highcharts/highcharts-more';


highcharts3D(Highcharts);
highchartsMore(Highcharts);


@Component({
  selector: 'app-nbr-commande',
  templateUrl: './nbr-commande.component.html',
  styleUrls: ['./nbr-commande.component.css']
})
export class NbrCommandeComponent implements OnInit,OnDestroy {

  constructor(private orderService:OrdersService) { }

  orders!:any;
  orderSub !:Subscription;

  nbOfOrders!:number;
  yAxisMax!:number;


  commandes!:any;
  chartOptions!: Highcharts.Options;


ngOnInit(): void {

  this.orderSub = this.orderService.ordersSelectedSubject.subscribe(
    (response)=>{

      this.orders=response;

      this.nbOfOrders=this.calculateNbOfOrders(this.orders);

      this.yAxisMax = this.nbOfOrders+this.nbOfOrders*0.25;

      // chart param below
      this.commandes = Highcharts;

      this.chartOptions = {
        chart: {
          type: 'column',
          options3d: {
            enabled: true,
            alpha: 25,
            beta: 25,
            depth: 100,
            viewDistance: 35
          }
        },

        title: {
          text: undefined
        },

        legend: {
          enabled: false
        },

        credits: {
          enabled: false
        },

        yAxis: {
          labels: {
            enabled: false
          },
          gridLineWidth: 1,
          max: this.yAxisMax,
          title: {
            text: null
          }
        },

        xAxis: {
          visible: false
        },

        tooltip: {
          enabled: false
        },

        series: [{
          type: 'column',
          depth: 100,
          name: 'Nombre de commande',
          data: [this.nbOfOrders],
          color: 'rgba(90, 129, 0, 0.75)',
          dataLabels: {
            enabled: true,
            useHTML: true,
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"></span><br>' +
                '</div>',
            crop: false
          }
        }]
      }
    },
    (error)=>{
      console.log(error);
    }
  );
}

calculateNbOfOrders(value:any){
  let nb=0;
  value.forEach((element: { isPaid: boolean; }) => {
    if(element.isPaid){
      nb ++;
    }
  });
  return nb;
}
ngOnDestroy(){
  this.orderSub.unsubscribe();
}

}
