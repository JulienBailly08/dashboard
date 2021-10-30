import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OrdersService } from 'src/app/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-panier-moyen',
  templateUrl: './panier-moyen.component.html',
  styleUrls: ['./panier-moyen.component.css']
})
export class PanierMoyenComponent implements OnInit, OnDestroy {

  constructor(private orderService:OrdersService) { }
  orders!:any;
  ordersSub !:Subscription;

  nbOfOrders!:number;
  yAxisMax!:number;


  panierMoy!:any;
  chartOptions!: Highcharts.Options;

  ngOnInit(): void {

    this.ordersSub = this.orderService.ordersSelectedSubject.subscribe(
      (data)=>{

        this.orders=data;
        console.log(this.orders);
        console.log(this.orders.length);

        this.nbOfOrders=this.calculateNbOfOrders(this.orders);

        this.yAxisMax = this.nbOfOrders+this.nbOfOrders*0.25;

        // chart param below
        this.panierMoy = Highcharts;

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
    });


  }

  calculateNbOfOrders(value:any){
    return value.length;
  }



  ngOnDestroy(){
    this.ordersSub.unsubscribe();
  }

}
