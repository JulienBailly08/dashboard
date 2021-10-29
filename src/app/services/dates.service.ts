import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  dates:any[]=[];
  datesSubject = new Subject<any>();

  constructor() { }

  emitDates():void{
    this.datesSubject.next(this.dates);
  }

  addDate(date1:any, date2:any):void{
    this.dates=[];
    this.dates.push(Date.parse(date1));
    this.dates.push(Date.parse(date2));
    this.emitDates();
  }

}
