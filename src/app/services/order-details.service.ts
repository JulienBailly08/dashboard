import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Response } from 'src/app/models/response';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private baseUrl = `${environment.api + 'order_details'}`;

  dates!:number[];
  datesSub:any;
  ordersDetailsSelectedSubject=new Subject<any>();
  ordersDetailsSelected:any=[];

  constructor(private http: HttpClient, private datesServices: DatesService) {
    this.datesSub = this.datesServices.datesSubject.subscribe(
      (value)=>{
        this.dates = value;

        this.getOrderDetails().subscribe(
          (response:Response)=>{
            this.ordersDetailsSelected=[];
            this.filterResultByDate(response['hydra:member']);
            this.emitOrdersFiltered();
          }
        );
      }
    );

  }

  emitOrdersFiltered():void{
    this.ordersDetailsSelectedSubject.next(this.ordersDetailsSelected);
  }

  filterResultByDate(orders:any){
    orders.forEach((element: { createdAt:string; }) => {
        if(Date.parse(element.createdAt)<this.dates[0] && Date.parse(element.createdAt)>this.dates[1]){
          this.ordersDetailsSelected.push(element);
        }
    });
}

  getOrderDetails() : Observable < Response > {

      return this.http.get<Response>(this.baseUrl);
    }

}


