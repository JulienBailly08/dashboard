import { Component, OnInit } from '@angular/core';
import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-thirdpage',
  templateUrl: './thirdpage.component.html',
  styleUrls: ['./thirdpage.component.css']
})
export class ThirdpageComponent implements OnInit {

  constructor(private datesServices: DatesService ) { }

  ngOnInit(): void {
   this.datesServices.emitDates();
  }

}
