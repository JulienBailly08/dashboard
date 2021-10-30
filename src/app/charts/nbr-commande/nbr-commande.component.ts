import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrdersService } from 'src/app/services/orders.service';
import { Response } from 'src/app/models/response';
import { Subscription } from 'rxjs';


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
          type: 'column'
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
          name: 'Nombre de commande',
          data: [this.nbOfOrders],
          color: 'rgba(90, 129, 0, 0.75)',
          dataLabels: {
            enabled: true,
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
  return value.length;
}
ngOnDestroy(){
  this.orderSub.unsubscribe();
}

}
