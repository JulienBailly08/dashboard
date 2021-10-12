import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  truc = [150, 125, 123, 25, 98, 65, 210, 32, 98, 36, 125, 200];
  type = 'line';
  data = {
    labels:["Janvier", "Février", "Mars", "Avril", "Mai", "Juin","Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre" ],
    datasets: [
      {
        label:"Volume annuel des ventes",
        data: this.truc
      }
    ]
  };
  options={
    reponsive:false,
    maintainAspectRatio:false,

  };

  constructor() { }

  ngOnInit(): void {
  }

}
