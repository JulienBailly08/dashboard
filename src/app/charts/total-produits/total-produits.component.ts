import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import * as Highcharts from 'highcharts';
import { OrderDetailsService } from 'src/app/services/order-details.service';

import highcharts3D from 'highcharts/highcharts-3d';

import highchartsMore from 'highcharts/highcharts-more';


highcharts3D(Highcharts);
highchartsMore(Highcharts);

@Component({
  selector: 'app-total-produits',
  templateUrl: './total-produits.component.html',
  styleUrls: ['./total-produits.component.css']
})
export class TotalProduitsComponent implements OnInit, OnDestroy {

  constructor(private ordersDetailsService:OrderDetailsService) { }

  ordersDetails!:any;
  ordersDetailsSub !:Subscription;

  nbOfProducts!:number;
  yAxisMax!:number;


  productsSales!:any;
  chartOptions!: Highcharts.Options;

  ngOnInit(): void {

    this.ordersDetailsSub = this.ordersDetailsService.ordersDetailsSelectedSubject.subscribe(
      (data)=>{

        this.ordersDetails=data;
        this.nbOfProducts = this.getNbOfProducts(this.ordersDetails);

        this.yAxisMax = this.nbOfProducts+this.nbOfProducts*0.25;

        // chart param below
        this.productsSales = Highcharts;

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
            name: 'Nombre de produits',
            data: [this.nbOfProducts],
            color: 'rgba(255, 255, 153, 0.8)',
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
    });
  }

  getNbOfProducts(datas:any){
    let nbOfProducts=0;
    datas.forEach((data: { quantity: number; }) => {
      nbOfProducts+=data.quantity;
    });
    return nbOfProducts;
  }



  ngOnDestroy(){
    this.ordersDetailsSub.unsubscribe();
  }

}
