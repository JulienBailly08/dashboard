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

  dates!:number[];
  datesSub:any;
  ordersFromApi:any;
  ordersSelected:any[]=[];

  constructor(private http: HttpClient,
              private datesServices: DatesService
  ){
    this.datesSub = this.datesServices.datesSubject.subscribe(
      (value)=>{
        this.dates = value;
        this.ordersSelected=[];
        this.getOrders().subscribe(
          (response:Response)=>{
            this.ordersFromApi = response['hydra:member'];
            this.filterResultByDate(response['hydra:member']);
            console.log(this.ordersSelected);
          }
        );
      }
    );
    this.datesServices.emitDates();

  }

  getOrders() : Observable < Response > {
    return this.http.get<Response>(this.baseUrl);
  }

  getOrdersFiltered():Observable <any[]> {
    return this.ordersSelected;
  }

  filterResultByDate(orders:any){
      orders.forEach((element: { createdAt:string; }) => {
          if(Date.parse(element.createdAt)<this.dates[0] && Date.parse(element.createdAt)>this.dates[1]){
            this.ordersSelected.push(element);
          }
      });
  }


}
