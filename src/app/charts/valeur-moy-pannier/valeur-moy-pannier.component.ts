import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts'

@Component({
  selector: 'app-valeur-moy-pannier',
  templateUrl: './valeur-moy-pannier.component.html',
  styleUrls: ['./valeur-moy-pannier.component.css']
})
export class ValeurMoyPannierComponent implements OnInit {
  public options : any = {
    chart:{
      type: 'line'
    },
    title: {
      text:null},
    xAxis: {
      categories: ['Hier', 'Ajd'],
    },
    tooltip: {
      headerFormat: '<b>Montant d\'un panier moyen</b><br>',
      pointFormat: '{point.category}: {point.y}€'
    },
    yAxis: {
      title:{
        text: 'Montant en euros'
      }
    },
    series: [{
      name: "Valeur moyenne d'une commande",
      data: [100.23, 52.68]

    }]

  }
  constructor() { }

  ngOnInit(): void {
    Highcharts.setOptions({
      colors: ['#287265']
  });
    Highcharts.chart('chartTest',this.options);
  }

}
