import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Response } from 'src/app/models/response';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = `${environment.api + 'orders'}`;

  dates!:Date[];
  datesSub:any;

  constructor(private http: HttpClient,
              private datesServices: DatesService
    ) {
    this.datesSub = this.datesServices.datesSubject.subscribe(
      (value)=>{
        this.dates = value; console.log(this.dates);
      }
    );
    this.datesServices.emitDates();
  }

  getOrders() : Observable < Response > {
    return this.http.get<Response>(this.baseUrl);
  }


}
