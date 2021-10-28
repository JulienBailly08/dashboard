import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-nbr-commande',
  templateUrl: './nbr-commande.component.html',
  styleUrls: ['./nbr-commande.component.css']
})
export class NbrCommandeComponent implements OnInit {

  constructor() { }
  @Input() items!: any;


  //values2:Promise<any> = this.items.length;
  values =[59];

  commandes = Highcharts;

  chartOptions: Highcharts.Options = {
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
      max: 150,
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
      data: this.values,
      color: 'rgba(90, 129, 0, 0.75)',
      dataLabels: {
        enabled: true,
        crop: false
      }
    }]
  }



ngOnInit(): void {

}


}
