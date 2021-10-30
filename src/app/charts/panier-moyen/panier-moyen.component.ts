import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { OrderDetailsService } from 'src/app/services/order-details.service';

@Component({
  selector: 'app-panier-moyen',
  templateUrl: './panier-moyen.component.html',
  styleUrls: ['./panier-moyen.component.css']
})
export class PanierMoyenComponent implements OnInit, OnDestroy {

  constructor(private ordersDetailsService:OrderDetailsService) { }


  ordersDetails!:any;
  ordersDetailsSub !:Subscription;

  nbOfOrders!:number;
  yAxisMax!:number;


  panierMoy!:any;
  chartOptions!: Highcharts.Options;

  ngOnInit(): void {

    this.ordersDetailsSub = this.ordersDetailsService.ordersDetailsSelectedSubject.subscribe(
      (data)=>{

        this.ordersDetails=data;

        this.nbOfOrders=this.calculateNbOfOrders(this.ordersDetails);

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
            color: 'rgba(255, 255, 153, 0.8)',
            dataLabels: {
              enabled: true,
              useHTML: true,
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y} €</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"></span>' +
                '</div>',
              crop: false
            }
          }]
        }
    });


  }

  calculateNbOfOrders(orderinfos:any){
    let tabresults: number[]=[];
    let total=0;
    let nbElement;
    let tabOrders: any[]=[];

    orderinfos.forEach((element: { myOrder: string; }) => {
      if(!tabOrders.includes(element.myOrder)){
        tabOrders.push(element.myOrder);
      }
    });

    tabOrders.forEach(element => {
      let sommeElement=0;
      orderinfos.forEach((orderinfo: { myOrder: any; total: number; }) => {
        if(orderinfo.myOrder == element){
          sommeElement+=orderinfo.total;
        }
      });
      tabresults.push(sommeElement);
    });

    tabresults.forEach(element => {
      total+=element;
    });
    nbElement=tabresults.length;
    if(nbElement!=0){
      return Math.round(total/nbElement);
    }
    return 0;


  }



  ngOnDestroy(){
    this.ordersDetailsSub.unsubscribe();
  }

}
