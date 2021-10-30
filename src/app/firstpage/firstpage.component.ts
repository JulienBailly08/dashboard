import { Component, OnInit } from '@angular/core';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-firstpage',
  templateUrl: './firstpage.component.html',
  styleUrls: ['./firstpage.component.css']
})
export class FirstpageComponent implements OnInit{


  constructor(private datesServices: DatesService ) { }

  ngOnInit(): void {
   this.datesServices.emitDates();
  }

}


