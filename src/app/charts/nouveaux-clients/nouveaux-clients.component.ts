import { Component, OnDestroy, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nouveaux-clients',
  templateUrl: './nouveaux-clients.component.html',
  styleUrls: ['./nouveaux-clients.component.css']
})
export class NouveauxClientsComponent implements OnInit {

  constructor(private userService:UsersService) { }

  clients!:any;
  clientsSub !:Subscription;

  nbOfClients!:number;
  yAxisMax!:number;


  nbClients!:any;
  chartOptions!: Highcharts.Options;


ngOnInit(): void {

  this.clientsSub = this.userService.usersSelectedSubject.subscribe(
    (response)=>{

      this.clients=response;

      this.nbOfClients=this.calculateNbOfOrders(this.clients);

      this.yAxisMax = this.nbOfClients+this.nbOfClients*0.25;

      // chart param below
      this.nbClients = Highcharts;

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
          data: [this.nbOfClients],
          color: '#ff6c02',
          dataLabels: {
            enabled: true,
            useHTML: true,
              format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"></span>' +
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
  return value.length;
}
ngOnDestroy(){
  this.clientsSub.unsubscribe();
}


}
