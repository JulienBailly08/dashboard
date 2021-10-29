import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  dates:Date[]=[];
  datesSubject = new Subject<any>();

  constructor() { }

  emitDates():void{
    this.datesSubject.next(this.dates);
  }

  addDate(date1:Date, date2:Date):void{
    this.dates=[];
    this.dates.push(date1);
    this.dates.push(date2);
    this.emitDates();
  }

}
