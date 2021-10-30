import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable,Subject } from 'rxjs';
import { Response } from 'src/app/models/response';
import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = `${environment.api + 'users'}`;

  dates!:number[];
  datesSub:any;
  usersSelectedSubject=new Subject<any>();
  usersSelected:any=[];

  constructor(private http: HttpClient,private datesServices: DatesService) {
    this.datesSub = this.datesServices.datesSubject.subscribe(
      (value)=>{
        this.dates = value;

        this.getUsers().subscribe(
          (response:Response)=>{
            this.usersSelected=[];
            console.log(response['hydra:member']);
            this.filterResultByDate(response['hydra:member']);
             this.emitUsersFiltered();
             console.log(this.usersSelected);
          }
        );
      }
    );
  }

  emitUsersFiltered():void{
    this.usersSelectedSubject.next(this.usersSelected);
  }

  filterResultByDate(orders:any){
    orders.forEach((element: { createdAt:string; }) => {
        if(Date.parse(element.createdAt)<this.dates[0] && Date.parse(element.createdAt)>this.dates[1]){
          this.usersSelected.push(element);
        }
    });
}

  getUsers() : Observable < Response > {
    return this.http.get<Response>(this.baseUrl);
  }
}
