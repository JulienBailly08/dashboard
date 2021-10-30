import { Component, OnInit } from '@angular/core';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-secondpage',
  templateUrl: './secondpage.component.html',
  styleUrls: ['./secondpage.component.css']
})
export class SecondpageComponent implements OnInit {

  constructor(private datesServices: DatesService ) { }

  ngOnInit(): void {
   this.datesServices.emitDates();
  }

}
